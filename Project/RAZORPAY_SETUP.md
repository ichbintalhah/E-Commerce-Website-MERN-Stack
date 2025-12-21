# Razorpay Setup Instructions

## ✅ What's Already Done:

- ✅ Backend Razorpay integration completed
- ✅ Frontend Razorpay payment flow implemented
- ✅ Razorpay npm package installed
- ✅ Environment variables placeholders added

## 🔑 How to Get Razorpay Credentials (When You Can Sign In):

### Step 1: Sign up for Razorpay

1. Go to https://razorpay.com/
2. Click "Sign Up" or "Log In"
3. Complete the registration process

### Step 2: Get Test Mode Credentials

1. After logging in, go to **Settings** (left sidebar)
2. Click on **API Keys**
3. Click **Generate Test Key**
4. You'll see:
   - **Key ID** (starts with `rzp_test_`)
   - **Key Secret** (click "Show" to reveal it)

### Step 3: Add Credentials to Your Project

#### Backend (.env file):

Open: `Project/backend/.env`

```env
RAZORPAY_KEY_ID = "rzp_test_YOUR_KEY_ID_HERE"
RAZORPAY_KEY_SECRET = "YOUR_KEY_SECRET_HERE"
```

#### Frontend (.env file):

Open: `Project/frontend/.env`

```env
VITE_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID_HERE
```

### Step 4: Restart Your Servers

After adding the credentials:

```bash
# Stop your backend and frontend servers (Ctrl+C)
# Then restart them
```

## 💡 For Now (Without Razorpay Account):

You can still test the app using:

- ✅ **Cash on Delivery (COD)** - Works perfectly
- ✅ **Stripe** - Already configured and working

## 🧪 Test Mode:

- Razorpay test mode doesn't charge real money
- You can use test card numbers once you get credentials
- Test Card: 4111 1111 1111 1111, any future expiry, any CVV

## 📝 Notes:

- Currency is set to INR (Indian Rupees) for Razorpay
- The integration is complete and will work immediately once you add credentials
- No code changes needed - just add the keys!

## ❓ Alternative If You Can't Get Razorpay:

You can simply use COD or Stripe for now. Razorpay button will still appear, but won't process payments without valid credentials.
