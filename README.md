# Perfume E-Commerce Store

A full-featured, enterprise-grade perfume e-commerce platform built with modern web technologies. This platform serves both customers and administrators with role-based access control, a powerful admin dashboard, and a complete shopping experience from browsing to checkout.

---

## 1. Project Overview

Perfume E-Commerce Store is a production-ready online shopping platform focused on perfumes, fragrance brands, and scent notes. It delivers a seamless customer experience while providing administrators with advanced management and monitoring tools.

The system includes:

- A user-facing storefront
- A role-based admin dashboard
- Secure authentication and authorization
- Scalable architecture for future growth

---

## 2. Features

### ✅ User Features

- Home Page
- Brands Page
- Products Listing Page
  - View product details
  - Add to cart
  - Place orders
- Perfume Notes Page
- Favorites Page
- Cart & Checkout Page
- Contact Us Page
- About Us Page
- Light & Dark Mode

---

### ✅ Admin Features

#### 👷 Worker Role

- Add products
- Edit products
- Add brands
- Edit brands
- Add perfume notes
- Edit perfume notes
- Review customer orders

#### 👑 Admin Role

- All Worker permissions
- Delete products
- Delete brands
- Delete perfume notes
- Add new workers
- Remove workers
- Manage all users
- Review all system orders

---

## 3. User Roles & Permissions

| Role   | Permissions                                     |
| ------ | ----------------------------------------------- |
| Guest  | Browse products and brands                      |
| User   | Place orders, manage favorites and cart         |
| Worker | Manage products, brands, notes, view orders     |
| Admin  | Full system control including users and workers |

---

## 4. Pages & Navigation

- `/` → Home Page
- `/brands` → All Brands
- `/products` → Products Listing
- `/products/[id]` → Product Details
- `/notes` → Perfume Notes
- `/favorites` → Favorites
- `/cart` → Cart & Checkout
- `/contact` → Contact Us
- `/about` → About Us

### Admin Dashboard:

- `/dashboard`
- `/dashboard/products`
- `/dashboard/brands`
- `/dashboard/notes`
- `/dashboard/orders`
- `/dashboard/users`

---

## 5. Tech Stack (Auto-Detected)

- **Next.js** – Web Framework
- **React 18**
- **TypeScript**
- **Supabase** – Authentication & Database
- **Redux Toolkit & React Redux** – State Management
- **Tailwind CSS** – Styling
- **Radix UI** – Accessible UI Components
- **Lucide Icons & FontAwesome**
- **Swiper** – Sliders
- **Framer Motion** – Animations
- **Next Themes** – Dark Mode
- **ESLint** – Code Quality

---

## 6. Installation & Setup

```bash
git clone <your-repo-url>
cd project-folder
npm install
npm run dev
```

Open: `http://localhost:3000`

---

## 7. Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_secret_key
```

---

## 8. Project Structure (Example)

```
src/
├── app
├── components
├── store
├── lib
├── hooks
├── services
├── styles
├── types
```

---

## 9. Screenshots (Coming Soon)

- Home Page
- Products Page
- Cart & Checkout
- Admin Dashboard

---

## 10. Future Improvements

- Online Payments (Stripe / PayPal)
- Full Admin Analytics
- Advanced Search & Filtering
- Product Reviews & Ratings
- Email Notifications
- Multi-language Support

---

## 11. Author & License

**Author:** Perfume Store Team  
**License:** MIT License
