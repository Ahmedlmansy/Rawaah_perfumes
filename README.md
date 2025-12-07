# Rawaah Perfume E-Commerce Store

<div align="center">

![Rawaah Perfumes](https://img.shields.io/badge/Status-Production%20Ready-success)
![Next.js](https://img.shields.io/badge/Next.js-14.2.33-black)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/License-MIT-green)

_A modern, full-featured e-commerce platform for luxury perfumes with comprehensive admin dashboard and role-based access control_

</div>

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [User Roles & Permissions](#-user-roles--permissions)
- [Pages & Navigation](#-pages--navigation)
- [Tech Stack](#-tech-stack)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Future Improvements](#-future-improvements)
- [Author & License](#-author--license)

---

## 🌟 Project Overview

**Rawaah Perfume E-Commerce Store** is a production-grade, full-stack e-commerce application built specifically for the perfume retail industry. The platform provides a seamless shopping experience for customers while offering powerful management tools for administrators and workers through a comprehensive dashboard.

The application features a modern, responsive design with smooth animations, real-time state management, secure authentication, and a robust backend powered by Supabase. It supports complete e-commerce workflows including product browsing, cart management, checkout, order processing, and administrative operations with granular permission controls.

**Key Highlights:**

- 🛍️ Complete shopping cart and checkout system
- 🔐 Secure authentication with role-based access control (RBAC)
- 📱 Fully responsive design optimized for all devices
- ⚡ Server-side rendering with Next.js 14 for optimal performance
- 🎨 Modern UI with smooth animations and transitions
- 💾 Real-time data synchronization with Supabase
- 🎯 Advanced product filtering and search capabilities
- ❤️ User favorites and wishlist management

---

## ✨ Features

### 👤 User Features (Customer-Facing)

#### **Product Discovery & Shopping**

- **Home Page**: Featured products, seasonal collections, and promotional banners
- **Brands Page**: Browse perfumes by luxury brands with detailed brand information
- **Products Listing**:
  - Grid/list view toggle
  - Advanced filtering (by brand, notes, price range, gender)
  - Product search functionality
  - Detailed product pages with descriptions, notes, and pricing
- **Perfume Notes Page**: Explore fragrances by top, middle, and base notes
- **Product Details**:
  - High-resolution product images with zoom functionality
  - Comprehensive fragrance information
  - Customer reviews and ratings
  - Related product recommendations

#### **Shopping & Account Management**

- **Shopping Cart**:
  - Add/remove products
  - Quantity adjustment
  - Real-time price calculations
  - Persistent cart across sessions
- **Favorites/Wishlist**:
  - Save products for later
  - Quick add to cart from favorites
  - Share wishlist functionality
- **Checkout Process**:
  - Multi-step checkout flow
  - Shipping address management
  - Order summary and confirmation
  - Integrated payment processing

#### **Information & Support**

- **Contact Us**: Customer support form with inquiry tracking
- **About Us**: Company story, values, and mission

---

### 🛠️ Admin Dashboard Features

The admin dashboard provides comprehensive tools for managing the entire e-commerce operation with two distinct permission levels:

#### **Worker Role Capabilities**

**Product Management**

- ➕ Add new products with complete details (name, description, price, images, notes)
- ✏️ Edit existing product information
- 📊 Monitor product inventory levels
- 🏷️ Manage product categories and tags

**Brand Management**

- ➕ Add new perfume brands
- ✏️ Edit brand information and assets
- 📝 Update brand descriptions and stories

**Fragrance Notes Management**

- ➕ Create new perfume notes (top, middle, base)
- ✏️ Edit note descriptions and categorizations
- 🔗 Associate notes with products

**Order Processing**

- 📦 Review and process customer orders
- 📋 Update order statuses
- 🚚 Manage shipping information
- 📧 Send order notifications to customers

#### **Admin Role Capabilities**

**All Worker Permissions PLUS:**

**Advanced Product Control**

- 🗑️ Delete products from catalog
- 📊 Bulk product operations
- 📈 Product performance analytics

**Brand & Notes Administration**

- 🗑️ Remove brands from the system
- 🗑️ Delete perfume notes
- 🔧 Advanced brand/notes management

**Team Management**

- 👥 Add new worker accounts
- 🔐 Assign role-based permissions
- ❌ Remove worker access
- 📊 Monitor worker activity logs

**User Management**

- 👁️ View all registered users
- 📊 User activity analytics
- 🛡️ User account moderation
- 📧 Bulk user communications

**Order Administration**

- 📊 Comprehensive order history
- 💰 Revenue and sales analytics
- 📈 Order trends and reporting
- 🔍 Advanced order search and filtering

**System Configuration**

- ⚙️ Site settings and preferences
- 🎨 Theme and branding customization
- 📧 Email template management
- 🔔 Notification settings

---

## 🔐 User Roles & Permissions

| Feature                | Customer | Worker        | Admin     |
| ---------------------- | -------- | ------------- | --------- |
| Browse Products        | ✅       | ✅            | ✅        |
| Add to Cart & Purchase | ✅       | ✅            | ✅        |
| Manage Favorites       | ✅       | ✅            | ✅        |
| Add Products           | ❌       | ✅            | ✅        |
| Edit Products          | ❌       | ✅            | ✅        |
| Delete Products        | ❌       | ❌            | ✅        |
| Manage Brands          | ❌       | ✅ (Add/Edit) | ✅ (Full) |
| Manage Notes           | ❌       | ✅ (Add/Edit) | ✅ (Full) |
| Process Orders         | ❌       | ✅            | ✅        |
| View All Orders        | ❌       | ❌            | ✅        |
| Manage Workers         | ❌       | ❌            | ✅        |
| View All Users         | ❌       | ❌            | ✅        |
| System Settings        | ❌       | ❌            | ✅        |

---

## 🗺️ Pages & Navigation

### **Public Pages**

```
/                           → Home Page
/brands                     → Brands Listing
/products                   → Products Listing & Filters
/products/[id]             → Product Detail Page
/notes                      → Perfume Notes Explorer
/favorites                  → User Favorites (Auth Required)
/cart                       → Shopping Cart
/checkout                   → Checkout Process
/contact                    → Contact Us Form
/about                      → About Us
/auth/login                → User Login
/auth/register             → User Registration
```

### **Admin Dashboard Pages**

```
/admin                      → Dashboard Overview
/admin/products            → Product Management
/admin/products/new        → Add New Product
/admin/products/edit/[id]  → Edit Product
/admin/brands              → Brand Management
/admin/brands/new          → Add New Brand
/admin/brands/edit/[id]    → Edit Brand
/admin/notes               → Notes Management
/admin/notes/new           → Add New Note
/admin/notes/edit/[id]     → Edit Note
/admin/orders              → Orders Management
/admin/workers             → Workers Management (Admin Only)
/admin/users               → Users Overview (Admin Only)
/admin/settings            → System Settings (Admin Only)
```

---

## 🛠️ Tech Stack

### **Frontend Framework**

- **[Next.js 14.2.33](https://nextjs.org/)** - React framework with App Router, server-side rendering, and static site generation
- **[React 18](https://react.dev/)** - JavaScript library for building user interfaces
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript superset for enhanced developer experience

### **UI & Styling**

- **[Tailwind CSS 3.4.1](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI development
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible component primitives:
  - `@radix-ui/react-alert-dialog` (1.1.15)
  - `@radix-ui/react-avatar` (1.1.11)
  - `@radix-ui/react-dialog` (1.1.15)
  - `@radix-ui/react-dropdown-menu` (2.1.16)
  - `@radix-ui/react-label` (2.1.8)
  - `@radix-ui/react-navigation-menu` (1.2.14)
  - `@radix-ui/react-select` (2.2.6)
  - `@radix-ui/react-separator` (1.1.8)
  - `@radix-ui/react-slider` (1.3.6)
  - `@radix-ui/react-slot` (1.2.4)
  - `@radix-ui/react-tabs` (1.1.13)
  - `@radix-ui/react-tooltip` (1.2.8)
- **[Framer Motion 12.23.24](https://www.framer.com/motion/)** - Production-ready animation library
- **[next-themes 0.4.6](https://github.com/pacocoursey/next-themes)** - Dark mode and theme switching support
- **[class-variance-authority 0.7.1](https://cva.style/)** - CSS variant utility for component styling
- **[clsx 2.1.1](https://github.com/lukeed/clsx)** - Utility for constructing className strings
- **[tailwind-merge 3.4.0](https://github.com/dcastil/tailwind-merge)** - Merge Tailwind CSS classes without conflicts
- **[tailwindcss-animate 1.0.7](https://github.com/jamiebuilds/tailwindcss-animate)** - Animation utilities for Tailwind

### **Icons & Visual Assets**

- **[Font Awesome](https://fontawesome.com/)** - Comprehensive icon library:
  - `@fortawesome/fontawesome-svg-core` (7.1.0)
  - `@fortawesome/react-fontawesome` (3.1.0)
  - `@fortawesome/free-solid-svg-icons` (7.1.0)
  - `@fortawesome/free-regular-svg-icons` (7.1.0)
  - `@fortawesome/free-brands-svg-icons` (7.1.0)
- **[Lucide React 0.554.0](https://lucide.dev/)** - Beautiful, consistent icon set

### **UI Components & Interactions**

- **[Swiper 12.0.3](https://swiperjs.com/)** - Modern mobile touch slider with hardware-accelerated transitions
- **[Sonner 2.0.7](https://sonner.emilkowal.ski/)** - Opinionated toast notification component

### **State Management**

- **[@reduxjs/toolkit 2.11.0](https://redux-toolkit.js.org/)** - Official Redux toolset for efficient state management
- **[react-redux 9.2.0](https://react-redux.js.org/)** - Official React bindings for Redux

### **Backend & Database**

- **[Supabase](https://supabase.com/)** - Open-source Firebase alternative with PostgreSQL:
  - `@supabase/supabase-js` (2.86.0) - JavaScript client library
  - `@supabase/ssr` (0.8.0) - Server-side rendering utilities
  - `@supabase/auth-helpers-nextjs` (0.15.0) - Next.js authentication helpers

### **Development Tools**

- **[ESLint 8](https://eslint.org/)** - JavaScript/TypeScript linting
- **[eslint-config-next 14.2.33](https://nextjs.org/docs/basic-features/eslint)** - Next.js-specific ESLint configuration
- **[PostCSS 8](https://postcss.org/)** - CSS transformations and processing

### **Architecture Patterns**

- **Server Components & Server Actions** - Leverage Next.js 14 App Router features
- **Client-Side Rendering** - For interactive components requiring browser APIs
- **API Routes** - RESTful API endpoints for backend operations
- **Middleware** - Request/response manipulation and authentication guards
- **Role-Based Access Control (RBAC)** - Secure permission system using Supabase

---

## 🚀 Installation & Setup

### **Prerequisites**

Ensure you have the following installed on your system:

- **Node.js** 20.x or higher
- **npm** or **yarn** package manager
- **Git** for version control
- **Supabase Account** (free tier available at [supabase.com](https://supabase.com))

### **Step 1: Clone the Repository**

```bash
git clone https://github.com/yourusername/rawaah-perfumes.git
cd rawaah-perfumes
```

### **Step 2: Install Dependencies**

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

### **Step 3: Configure Environment Variables**

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Fill in the required environment variables (see [Environment Variables](#-environment-variables) section below).

### **Step 4: Set Up Supabase**

1. Create a new project on [Supabase](https://supabase.com)
2. Navigate to **Project Settings** → **API**
3. Copy your **Project URL** and **anon public key**
4. Set up the database schema (see `supabase/schema.sql` if provided)
5. Configure authentication providers
6. Set up Row Level Security (RLS) policies for data protection

### **Step 5: Run Database Migrations**

```bash
npm run migrate
```

### **Step 6: Start Development Server**

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### **Step 7: Build for Production**

```bash
npm run build
npm run start
```

### **Step 8: Run Linting**

```bash
npm run lint
```

---

## 🔒 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Rawaah Perfumes"

# Authentication
NEXT_PUBLIC_AUTH_REDIRECT_URL=http://localhost:3000/auth/callback

# Payment Gateway (if integrated)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Email Service (if configured)
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your_email@example.com
EMAIL_SERVER_PASSWORD=your_email_password
EMAIL_FROM=noreply@rawaahperfumes.com

# Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_google_analytics_id

# Node Environment
NODE_ENV=development
```

### **Environment Variable Descriptions**

| Variable                             | Description                                  | Required |
| ------------------------------------ | -------------------------------------------- | -------- |
| `NEXT_PUBLIC_SUPABASE_URL`           | Your Supabase project URL                    | ✅       |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`      | Supabase anonymous/public key                | ✅       |
| `SUPABASE_SERVICE_ROLE_KEY`          | Supabase service role key (server-side only) | ✅       |
| `NEXT_PUBLIC_APP_URL`                | Base URL of your application                 | ✅       |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe public key for payments               | ⚠️       |
| `STRIPE_SECRET_KEY`                  | Stripe secret key (server-side only)         | ⚠️       |
| `EMAIL_SERVER_*`                     | SMTP configuration for transactional emails  | ⚠️       |

**Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never expose sensitive keys with this prefix.

---

## 📁 Project Structure

```
rawaah-perfumes/
├── app/                          # Next.js 14 App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── login/
│   │   └── register/
│   ├── (customer)/               # Customer-facing pages
│   │   ├── page.tsx             # Home page
│   │   ├── brands/
│   │   ├── products/
│   │   ├── notes/
│   │   ├── favorites/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── contact/
│   │   └── about/
│   ├── (admin)/                  # Admin dashboard
│   │   └── admin/
│   │       ├── dashboard/
│   │       ├── products/
│   │       ├── brands/
│   │       ├── notes/
│   │       ├── orders/
│   │       ├── workers/
│   │       └── users/
│   ├── api/                      # API routes
│   │   ├── auth/
│   │   ├── products/
│   │   ├── orders/
│   │   └── payments/
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/                    # Reusable components
│   ├── ui/                       # UI primitives (Radix + custom)
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   └── ...
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── Navigation.tsx
│   ├── product/                  # Product-related components
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductFilters.tsx
│   │   └── ProductDetails.tsx
│   ├── cart/                     # Cart components
│   │   ├── CartItem.tsx
│   │   ├── CartSummary.tsx
│   │   └── CartDrawer.tsx
│   └── admin/                    # Admin-specific components
│       ├── DataTable.tsx
│       ├── StatsCard.tsx
│       └── AdminNav.tsx
├── lib/                          # Utility functions & configs
│   ├── supabase/                 # Supabase clients
│   │   ├── client.ts            # Browser client
│   │   ├── server.ts            # Server client
│   │   └── middleware.ts        # Middleware client
│   ├── utils.ts                  # Utility functions
│   ├── constants.ts              # App constants
│   └── validations.ts            # Form validation schemas
├── store/                        # Redux store
│   ├── index.ts                  # Store configuration
│   ├── slices/                   # Redux slices
│   │   ├── authSlice.ts
│   │   ├── cartSlice.ts
│   │   ├── productsSlice.ts
│   │   └── favoritesSlice.ts
│   └── hooks.ts                  # Typed Redux hooks
├── types/                        # TypeScript type definitions
│   ├── database.ts               # Supabase generated types
│   ├── products.ts
│   ├── orders.ts
│   └── users.ts
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts
│   ├── useCart.ts
│   ├── useProducts.ts
│   └── useDebounce.ts
├── middleware.ts                 # Next.js middleware (auth guards)
├── public/                       # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
├── supabase/                     # Supabase migrations & schemas
│   ├── migrations/
│   └── seed.sql
├── .env.local                    # Environment variables (not committed)
├── .env.example                  # Environment variables template
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Project dependencies
└── README.md                     # Project documentation
```

---

## 📸 Screenshots

> **Note:** Add actual screenshots of your application here to showcase the UI and features.

### **Customer-Facing Pages**

#### Home Page

```
[Screenshot Placeholder]
- Hero section with featured products
- Category navigation
- Promotional banners
```

#### Products Listing

```
[Screenshot Placeholder]
- Product grid with filters
- Search functionality
- Price range selector
```

#### Product Detail Page

```
[Screenshot Placeholder]
- Product images gallery
- Add to cart button
- Fragrance notes breakdown
- Related products
```

#### Shopping Cart

```
[Screenshot Placeholder]
- Cart items list
- Quantity adjustment
- Order summary
- Checkout button
```

### **Admin Dashboard**

#### Dashboard Overview

```
[Screenshot Placeholder]
- Sales statistics
- Recent orders
- Quick actions
- Analytics charts
```

#### Product Management

```
[Screenshot Placeholder]
- Product data table
- Search and filters
- Bulk actions
- Add/Edit buttons
```

#### Order Management

```
[Screenshot Placeholder]
- Order list with status
- Order details modal
- Status update controls
```

#### User Management (Admin Only)

```
[Screenshot Placeholder]
- User list with roles
- User activity logs
- Role assignment interface
```

---

## 🚀 Future Improvements

### **Planned Features**

#### **Customer Experience**

- [ ] Advanced product recommendation engine using AI/ML
- [ ] Virtual fragrance consultation chatbot
- [ ] Augmented Reality (AR) bottle preview
- [ ] Subscription boxes for curated perfume selections
- [ ] Gift wrapping and personalized message options
- [ ] Social login integration (Google, Facebook, Apple)
- [ ] Product reviews and ratings system
- [ ] User-generated content gallery
- [ ] Loyalty rewards program
- [ ] Multi-currency support
- [ ] Multi-language internationalization (i18n)

#### **Technical Enhancements**

- [ ] Progressive Web App (PWA) capabilities
- [ ] Enhanced SEO optimization with JSON-LD schemas
- [ ] Image optimization with WebP/AVIF formats
- [ ] Lazy loading and code splitting improvements
- [ ] Advanced caching strategies (ISR, SWR)
- [ ] Real-time inventory management
- [ ] Automated email marketing campaigns
- [ ] Integration with shipping providers (FedEx, UPS, DHL)
- [ ] Advanced analytics dashboard with custom reports
- [ ] A/B testing framework for conversion optimization

#### **Admin Dashboard**

- [ ] Inventory forecasting and alerts
- [ ] Bulk import/export functionality (CSV, Excel)
- [ ] Advanced reporting and data visualization
- [ ] Automated reorder point notifications
- [ ] Multi-warehouse management
- [ ] Discount and coupon management system
- [ ] Customer segmentation tools
- [ ] Email template builder
- [ ] Activity audit logs with detailed tracking
- [ ] Role customization beyond Worker/Admin

#### **Mobile Experience**

- [ ] Dedicated mobile apps (iOS & Android) using React Native
- [ ] Push notifications for order updates and promotions
- [ ] Offline mode with data synchronization
- [ ] Mobile-optimized checkout flow
- [ ] Barcode scanning for quick product lookup

#### **Marketing & SEO**

- [ ] Blog/Content management system
- [ ] Newsletter subscription management
- [ ] Integration with email marketing platforms (Mailchimp, SendGrid)
- [ ] Social media integration for sharing products
- [ ] Affiliate marketing program
- [ ] Referral system with incentives

#### **Performance & Security**

- [ ] Rate limiting and DDoS protection
- [ ] Two-factor authentication (2FA)
- [ ] Advanced fraud detection
- [ ] GDPR compliance tools
- [ ] Automated database backups
- [ ] Performance monitoring with Sentry/DataDog
- [ ] Load testing and optimization

---

## 👨‍💻 Author & License

### **Author**

**Rawaah Perfumes Development Team**

For questions, suggestions, or support, please contact:

- **Email:** support@rawaahperfumes.com
- **Website:** [www.rawaahperfumes.com](https://www.rawaahperfumes.com)
- **GitHub:** [github.com/rawaah-perfumes](https://github.com/rawaah-perfumes)

### **Contributing**

We welcome contributions from the community! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

### **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Rawaah Perfumes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

- **Next.js Team** - For the incredible framework
- **Vercel** - For seamless deployment and hosting
- **Supabase** - For the powerful backend infrastructure
- **Radix UI** - For accessible component primitives
- **Tailwind Labs** - For the amazing CSS framework
- **Open Source Community** - For the countless libraries that made this project possible

---

<div align="center">

**Built with ❤️ by the Rawaah Perfumes Team**

⭐ If you find this project useful, please consider giving it a star on GitHub! ⭐

</div>
