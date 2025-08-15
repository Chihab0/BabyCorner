# BabyCorner Backend

This is the backend for BabyCorner, an e-commerce platform for baby clothing. Built with Node.js, Express, PostgreSQL, Drizzle ORM, Multer, JWT, Zod, and bcrypt.

## Features
- Product, order, and delivery company management
- Admin authentication (JWT)
- Image uploads (Multer)
- Request validation (Zod)
- Drizzle ORM migrations and seeds

## Folder Structure
- `src/config/` - Configuration (db, multer, dotenv)
- `src/db/` - Drizzle schema and migrations
- `src/models/` - Drizzle table definitions
- `src/controllers/` - Business logic
- `src/routes/` - Express routers
- `src/middlewares/` - Auth, error handling, validation
- `src/utils/` - Helper functions
- `public/images/products/` - Uploaded product images

## Setup
1. Copy `.env.example` to `.env` and fill in your environment variables.
2. Install dependencies: `npm install`
3. Run migrations and seed: `npm run drizzle:migrate && npm run seed`
4. Start the server: `npm run dev`

## API
See the included Postman collection for all endpoints and example requests.
