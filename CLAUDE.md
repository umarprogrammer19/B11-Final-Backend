# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

B11-Final-Backend is a Node.js/Express API for the Furniro e-commerce platform. It provides authentication, product management, orders, and Stripe payment integration.

## Tech Stack

- **Runtime**: Node.js with ES Modules (`"type": "module"`)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer + Cloudinary
- **Payment**: Stripe
- **Documentation**: Swagger/OpenAPI
- **Email**: Nodemailer

## Development Commands

```bash
# Start development server with hot reload
npm run dev

# Start production server
node index.js
```

## Project Structure

### Entry Point
- `index.js` - Main Express app configuration, middleware setup, and route mounting

### Source Directory (`src/`)

- **`controllers/`** - Business logic for each domain
  - `auth.controllers.js` - Authentication (login, signup)
  - `product.controllers.js` - CRUD for products
  - `orders.controllers.js` - Order management
  - `payment.controllers.js` - Stripe payment handling
  - `users.controllers.js` - User profile management
  - `contact.controllers.js` - Contact form handling

- **`routes/`** - API route definitions with Swagger docs
  - `auth.routes.js` - `/api/v1/*` - Authentication routes
  - `products.routes.js` - `/api/v2/*` - Product CRUD
  - `orders.routes.js` - `/api/v3/*` - Orders
  - `checkout.routes.js` - `/api/v4/*` - Stripe checkout
  - `contact.routes.js` - `/api/v5/*` - Contact forms

- **`models/`** - Mongoose schemas
  - `products.models.js` - Product with stock field
  - `users.models.js` - User with embedded orders
  - `orders.models.js` - Order schema
  - `furniro.models.js` - Additional user data
  - `contact.models.js` - Contact form submissions

- **`middleware/`** - Express middleware
  - `auth.middleware.js` - JWT verification
  - `userRef.middleware.js` - User reference injection
  - `multer.middleware.js` - File upload handling

- **`admin/`** - Admin-only routes and middleware
  - `routes/` - Admin authentication and management
  - `middleware/admin.middleware.js` - Admin role verification
  - `handlers/login.handler.js` - Admin login logic

- **`db/`** - Database connection
  - `index.js` - MongoDB connection setup

- **`utils/`** - Utility functions
  - `cloudinary.js` - Cloudinary image upload

- **`pages/`** - HTML pages for documentation

## API Endpoints Overview

| Base Path | Purpose |
|-----------|---------|
| `/api/v1` | User Authentication (signup, login, getUser) |
| `/api/v2` | Products (GET public, POST/PUT/DELETE admin only) |
| `/api/v3` | Orders |
| `/api/v4` | Stripe Checkout |
| `/api/v5` | Contact Forms |
| `/api/admin` | Admin Management |
| `/api-docs` | Swagger Documentation |

## Environment Variables

Required in `.env`:
- `PORT` - Server port
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `NODE_ENV` - development/production

## Product Model Schema

```javascript
{
  title: String (required),
  description: String (required),
  price: Number (required),
  stock: Number (required),
  imageUrl: String (required),
  tags: [String],
  discountPercentage: Number (default: 0),
  isNew: Boolean (default: false),
  category: String (enum: ["chair", "sofa", "light", "bed", "table", "items"]),
  userRef: ObjectId (ref: "users")
}
```

## Authentication Flow

1. User registers at `POST /api/v1/signup`
2. User logs in at `POST /api/v1/login` → receives HTTP-only cookie with JWT
3. Protected routes use `authenticate` or `authenticateUser` middleware
4. JWT payload contains user `_id` and `email`

## CORS Configuration

Frontend origins allowed:
- `https://uf-furniro-store.vercel.app`
- `http://localhost:3000`
- Various other deployed staging domains

## Image Upload Flow

1. Multer handles multipart/form-data upload
2. File saved temporarily to `uploads/` directory
3. Cloudinary uploads the image and returns URL
4. URL stored in MongoDB `imageUrl` field

## Stock Management

- `stock` field is required on products
- Frontend should check stock before adding to cart
- No automatic stock decrement on order (implement if needed)

## Stripe Integration

- Creates checkout sessions at `/api/v4/create-checkout-session`
- Webhook handling at `/api/v4/webhook` (if configured)
- Test cards: Use Stripe test mode credentials
