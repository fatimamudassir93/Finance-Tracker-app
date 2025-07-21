# 🚀 Personal Finance Tracker - Setup Guide

## Quick Start

Your personal finance tracker is now fully functional! Follow these steps to get it running:

### 1. Environment Setup

Create a `.env.local` file in the root directory with the following content:

```env
# MongoDB Connection String
# Replace with your actual MongoDB connection string
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/finance-tracker

# JWT Secret for authentication
# Generate a secure random string for production
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key
```

### 2. MongoDB Setup

1. **Create a MongoDB Atlas account** (free tier available):
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account
   - Create a new cluster

2. **Get your connection string**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Replace `<dbname>` with `finance-tracker`

3. **Example connection string**:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/finance-tracker
   ```

### 3. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. First Time Setup

1. **Register an account** at `/register`
2. **Sign in** with your credentials
3. **Start adding transactions**:
   - Add income: `/dashboard/income`
   - Add expenses: `/dashboard/expense`
   - View all transactions: `/dashboard/transactions`

## 🎯 Features Available

### ✅ Authentication
- Secure user registration and login
- JWT token-based authentication
- Protected routes

### ✅ Dashboard
- Real-time financial overview
- Monthly income/expense summaries
- Savings rate calculation
- Interactive charts and trends

### ✅ Transaction Management
- Add income and expenses
- Categorize transactions
- Search and filter transactions
- Delete transactions
- Sort by date, amount, or category

### ✅ Responsive Design
- Works perfectly on desktop, tablet, and mobile
- Mobile-friendly navigation
- Touch-optimized interface

### ✅ Analytics
- Monthly trend analysis
- Category breakdown
- Financial insights
- Visual charts with Recharts

## 🔧 Technical Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: JWT tokens
- **Charts**: Recharts
- **Animations**: Framer Motion

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** (1200px+): Full sidebar navigation
- **Tablet** (768px - 1199px): Collapsible sidebar
- **Mobile** (320px - 767px): Mobile menu with overlay

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Input validation and sanitization
- Secure database queries

## 🚀 Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🐛 Troubleshooting

### Common Issues

1. **"MongoDB connection failed"**
   - Check your connection string in `.env.local`
   - Ensure your MongoDB cluster is running
   - Verify your IP is whitelisted in MongoDB Atlas

2. **"JWT_SECRET not defined"**
   - Add JWT_SECRET to your `.env.local` file
   - Generate a secure random string

3. **"Cannot find module" errors**
   - Run `npm install` to install dependencies
   - Clear node_modules and reinstall if needed

4. **Authentication issues**
   - Clear browser localStorage
   - Check if JWT token is being stored correctly
   - Verify API routes are working

### Getting Help

If you encounter any issues:
1. Check the browser console for errors
2. Verify your environment variables
3. Ensure MongoDB is properly configured
4. Check the README.md for detailed documentation

## 🎉 You're All Set!

Your personal finance tracker is now ready to use. Start tracking your finances and gain insights into your spending patterns!

---

**Happy coding! 💰📊** 