# MONOLITH — E-Commerce Store

> A fully client-side e-commerce SPA built with React & vanilla CSS — zero backend, zero dependencies beyond React itself.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=flat&logo=javascript)
![CSS3](https://img.shields.io/badge/CSS3-Responsive-1572B6?style=flat&logo=css3)
![Status](https://img.shields.io/badge/Status-Live-brightgreen?style=flat)

---

## ✨ Features

### 🛍️ Shopping Experience
- **Product Listing** — 12 products with emoji-based artwork, badges (New / Sale / Hot), ratings & review counts
- **Category Filter** — Filter by Audio, Keyboards, Monitors, Peripherals & more via nav tabs
- **Advanced Sidebar** — Sort by price / rating / reviews, price range slider, multi-tag filter
- **Grid / List Toggle** — Switch between card grid and compact list view

### 🛒 Cart Management
- **Slide-in Cart Drawer** — Animated drawer with full cart contents
- **Quantity Controls** — Increment / decrement / remove items
- **Live Totals** — Subtotal, shipping (free over $200), tax (8%), grand total
- **Promo Code UI** — Input field for discount codes
- **Quick-Add on Hover** — Add items directly from the product card hover state

### 💳 Checkout Flow
- **4-step wizard** — Contact Info → Shipping Address → Payment → Order Review
- **Step indicator** — Visual progress bar across steps
- **Form fields** — Email, name, address, card details with country dropdown
- **Order confirmation** — Success screen with unique order ID

### 🎨 UI / DX Details
- **Toast notifications** — Animated bottom-center feedback on add-to-cart
- **Persistent badge** — Cart icon shows live item count
- **Noise texture overlay** — Subtle grain for depth
- **CSS custom properties** — Fully themeable via `:root` variables
- **Responsive** — Mobile-first, adapts from 320px to 4K

---

## 🏗️ Architecture

```
App
├── Nav (sticky, blur backdrop, category tabs, cart button)
├── Hero (stats, display typography)
├── ShopLayout
│   ├── Sidebar (sort, price range, tags)
│   └── ProductsArea
│       └── ProductCard × N (grid/list view)
├── CartDrawer (slide-in panel)
├── CheckoutModal (4-step wizard + success screen)
└── Toast (notification system)
```

**State management** — 100% React `useState` hooks, no Redux or external state library.

**Data flow** — Unidirectional: product actions bubble up via callbacks, cart state lives in `App`.

---

## 🚀 Getting Started

This is a single-file app — no build step required.

```bash
# Clone
git clone https://github.com/yourusername/monolith-store.git
cd monolith-store

# Open directly in browser
open index.html

# OR serve with any static server
npx serve .
# or
python3 -m http.server 8080
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| UI Library | React 18 (CDN, no build tool) |
| Language | JavaScript ES2022 |
| Styling | CSS3 — Custom Properties, Grid, Flexbox, Animations |
| Fonts | Bebas Neue (display), DM Sans (body), DM Mono (mono) |
| State | React Hooks (useState, useEffect, useRef, useCallback) |
| Backend | None — fully client-side |

---

## 📐 Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| `< 480px` | 2-column product grid, full-width cart drawer |
| `480–900px` | Single-column sidebar stacked above products |
| `900px+` | Fixed 260px sidebar + fluid product grid |

---

## 🔧 Customization

All design tokens are CSS variables in `:root`:

```css
:root {
  --bg: #0a0a0a;
  --accent: #e8ff47;   /* Primary accent — change to any color */
  --accent2: #ff4757;  /* Sale/error accent */
  --font-display: 'Bebas Neue', sans-serif;
  --font-body: 'DM Sans', sans-serif;
}
```

Products are defined in the `PRODUCTS` array — add/edit freely.

---

## 📸 Key Component Decisions

- **No backend** — Demonstrates strong component architecture and state management without any server dependency
- **No build tool** — React loaded via CDN for simplicity; trivially upgradeable to Vite/CRA
- **Single file** — Intentional for portfolio clarity; easily split into components
- **CSS-only animations** — `@keyframes`, `transition`, and `animation-delay` with zero JS animation libraries

---

## 📄 License

MIT — free to use, modify, and distribute.

---

*Built as a portfolio project demonstrating React state management, responsive layout, and full client-side shopping cart flow.*
