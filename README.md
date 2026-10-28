# H Mart Dried Seafood Duplicate - Ultra-Fast Online Store

High-performance e-commerce platform replicating the layout, filters, and user experience of [H Mart's Dried Seafood](https://www.hmart.com/seafood/dried-seafood) department, optimized for a modern Dried Fish & Seafood online business.

---

## ⚡ Performance Highlights
- **Sub-Second Load Time**: Total gzipped JS + CSS bundle is under **100 kB**.
- **Instant Client-Side Filtering**: Category filtering, price slider, and instant keyword autocomplete search with 0ms network lag.
- **Dynamic Weight Selector**: Switch pack sizes (e.g. 250g, 500g, 1kg) directly on product cards with instant price updates.
- **Cart & Wishlist Persistence**: Integrated slide-out Cart Drawer with Free Delivery threshold meter (Rs. 5,000) and persistent `localStorage` support.

---

## 🛠️ Tech Stack
- **Framework**: React 19 + Vite 6
- **Styling**: Tailwind CSS v4 + Lucide Icons
- **State Management**: React Context (`CartContext`) with `localStorage` persistence
- **Typography**: Plus Jakarta Sans

---

## 🚀 How to Run Locally

1. Open PowerShell or Command Prompt:
   ```bash
   cd D:\DRY-FISH-online-business
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the local URL (usually `http://localhost:5173`).

---

## 📦 How to Build for Production

```bash
npm run build
```

The optimized static production files will be generated in `dist/`, ready to deploy to **Vercel**, **Netlify**, **Cloudflare Pages**, or any static web host.

---

## 🐟 Included Product Catalog
- **Katta Karawala (Queenfish Steaks)** - Traditional sun-dried
- **Thora Karawala (King Seer Fish)** - Premium prime cutlets
- **Halmesso / Myeolchi** - Large broth stock anchovies & crisp stir-fry grades
- **Sun-Dried Jumbo Prawns & Crispy Baby Shrimp**
- **Shredded Dried Squid (Ojingeochae)** & Whole Dried Cuttlefish
- **Maldive Fish (Umbalakada)** - Hard smoke-cured chips & flakes
- **Korean Style Dashi Broth Tea-Bag Pouches**
- **Balaya / Skipjack Tuna Steaks**
- **Seasoned Crisp Anchovy & Almond Snacks**

---

## 📁 Project Structure

```
D:\DRY-FISH-online-business\
├── src\
│   ├── components\
│   │   ├── Header\
│   │   │   ├── TopBanner.jsx        # Free shipping promo announcement bar
│   │   │   └── Header.jsx           # Logo, Live search autocomplete, cart counter
│   │   ├── Navigation\
│   │   │   └── CategoryNav.jsx      # Horizontal department switcher
│   │   ├── Catalog\
│   │   │   ├── Breadcrumbs.jsx      # Navigation breadcrumbs
│   │   │   ├── CategoryHero.jsx     # H Mart hero banner with filter pills
│   │   │   ├── FilterSidebar.jsx    # Collapsible category, price & process filters
│   │   │   ├── SortAndToolbar.jsx   # Grid/List switcher, count, sorting
│   │   │   ├── ProductCard.jsx      # Card with weight switcher, quick add, badges
│   │   │   └── ProductGrid.jsx      # Responsive grid / list renderer
│   │   ├── Modals\
│   │   │   └── QuickViewModal.jsx   # Product popup with culinary tips & details
│   │   ├── Cart\
│   │   │   ├── CartDrawer.jsx       # Slide-out drawer with free delivery meter
│   │   │   └── WishlistDrawer.jsx   # Saved favorites drawer
│   │   ├── Common\
│   │   │   └── Toast.jsx            # Notification toast
│   │   └── Footer\
│   │       └── Footer.jsx           # H Mart style footer with newsletter & guarantee
│   ├── context\
│   │   └── CartContext.jsx          # Cart & wishlist state management
│   ├── data\
│   │   └── products.js              # Rich catalog with pricing, images, and culinary tips
│   ├── App.jsx                      # Main app container
│   ├── index.css                    # Tailwind CSS imports & custom styling
│   └── main.jsx                     # App entry point
├── dist\                            # Production build
├── package.json
└── vite.config.js
```
