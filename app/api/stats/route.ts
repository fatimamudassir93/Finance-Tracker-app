import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import jwt from "jsonwebtoken";

// Helper function to verify JWT token
async function verifyToken(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  
  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    return decoded;
  } catch (error) {
    return null;
  }
}

// GET - Fetch financial statistics for a user
export async function GET(req: NextRequest) {
  try {
    const user = await verifyToken(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("finance-tracker");
    
    // Get current month and year
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // Calculate date range for current month
    const startOfMonth = new Date(currentYear, currentMonth, 1);
    const endOfMonth = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59);

    // Fetch expenses for current month
    const monthlyExpenses = await db.collection("expenses")
      .find({
        userId: user.userId,
        date: {
          $gte: startOfMonth.toISOString(),
          $lte: endOfMonth.toISOString()
        }
      })
      .toArray();

    // Fetch income for current month
    const monthlyIncome = await db.collection("income")
      .find({
        userId: user.userId,
        date: {
          $gte: startOfMonth.toISOString(),
          $lte: endOfMonth.toISOString()
        }
      })
      .toArray();

    // Calculate totals
    const totalExpenses = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalIncome = monthlyIncome.reduce((sum, income) => sum + income.amount, 0);
    const netIncome = totalIncome - totalExpenses;

    // Calculate expenses by category
    const expensesByCategory = monthlyExpenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    // Calculate income by category
    const incomeByCategory = monthlyIncome.reduce((acc, income) => {
      acc[income.category] = (acc[income.category] || 0) + income.amount;
      return acc;
    }, {} as Record<string, number>);

    // Get recent transactions (last 10)
    const recentExpenses = await db.collection("expenses")
      .find({ userId: user.userId })
      .sort({ date: -1 })
      .limit(5)
      .toArray();

    const recentIncome = await db.collection("income")
      .find({ userId: user.userId })
      .sort({ date: -1 })
      .limit(5)
      .toArray();

    const recentTransactions = [...recentExpenses, ...recentIncome]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);

    // Calculate monthly trend (last 6 months)
    const monthlyTrend = [];
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(currentYear, currentMonth - i, 1);
      const monthEnd = new Date(currentYear, currentMonth - i + 1, 0, 23, 59, 59);
      
      const monthExpenses = await db.collection("expenses")
        .find({
          userId: user.userId,
          date: {
            $gte: monthStart.toISOString(),
            $lte: monthEnd.toISOString()
          }
        })
        .toArray();

      const monthIncome = await db.collection("income")
        .find({
          userId: user.userId,
          date: {
            $gte: monthStart.toISOString(),
            $lte: monthEnd.toISOString()
          }
        })
        .toArray();

      const monthExpenseTotal = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      const monthIncomeTotal = monthIncome.reduce((sum, income) => sum + income.amount, 0);

      monthlyTrend.push({
        month: monthStart.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        expenses: monthExpenseTotal,
        income: monthIncomeTotal,
        net: monthIncomeTotal - monthExpenseTotal
      });
    }

    const stats = {
      currentMonth: {
        totalExpenses,
        totalIncome,
        netIncome,
        expensesByCategory,
        incomeByCategory
      },
      recentTransactions,
      monthlyTrend,
      summary: {
        totalTransactions: recentTransactions.length,
        averageExpense: monthlyExpenses.length > 0 ? totalExpenses / monthlyExpenses.length : 0,
        averageIncome: monthlyIncome.length > 0 ? totalIncome / monthlyIncome.length : 0,
        savingsRate: totalIncome > 0 ? (netIncome / totalIncome) * 100 : 0
      }
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 