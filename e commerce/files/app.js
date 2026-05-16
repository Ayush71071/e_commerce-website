
'use strict';

const { useState, useRef } = React;



const PRODUCTS = [
  { id: 1,  name: 'Arctis Nova Pro',       category: 'Audio',      price: 349, oldPrice: 449, emoji: '🎧', badge: 'new',  rating: 4.9, reviews: 312, tags: ['Electronics', 'Premium']    },
  { id: 2,  name: 'Keychron Q3 Max',       category: 'Keyboards',  price: 219,               emoji: '⌨️', badge: 'hot',  rating: 4.8, reviews: 189, tags: ['Electronics', 'Mechanical'] },
  { id: 3,  name: 'Logitech MX Master 3S', category: 'Peripherals',price: 99,  oldPrice: 129, emoji: '🖱️', badge: 'sale', rating: 4.7, reviews: 541, tags: ['Electronics']               },
  { id: 4,  name: 'LG UltraFine 4K 27"',  category: 'Monitors',   price: 799,               emoji: '🖥️', badge: '',     rating: 4.6, reviews: 207, tags: ['Electronics', 'Premium']    },
  { id: 5,  name: 'Sony WH-1000XM5',       category: 'Audio',      price: 299, oldPrice: 349, emoji: '🎵', badge: 'sale', rating: 4.8, reviews: 892, tags: ['Audio', 'Premium']          },
  { id: 6,  name: 'Stream Deck MK.2',      category: 'Streaming',  price: 149,               emoji: '🎮', badge: 'hot',  rating: 4.7, reviews: 433, tags: ['Electronics']               },
  { id: 7,  name: 'Rode NT-USB Mini',      category: 'Audio',      price: 99,                emoji: '🎙️', badge: 'new',  rating: 4.6, reviews: 167, tags: ['Audio']                     },
  { id: 8,  name: 'Artisan Sakura XL',     category: 'Mousepads',  price: 49,                emoji: '🌸', badge: '',     rating: 4.9, reviews: 78,  tags: ['Accessories']               },
  { id: 9,  name: 'Elgato Key Light Air',  category: 'Lighting',   price: 129, oldPrice: 159, emoji: '💡', badge: 'sale', rating: 4.5, reviews: 345, tags: ['Streaming']                 },
  { id: 10, name: 'Razer Basilisk V3',     category: 'Peripherals',price: 79,                emoji: '🖱️', badge: '',     rating: 4.6, reviews: 612, tags: ['Electronics']               },
  { id: 11, name: 'ASUS ROG Strix',        category: 'Headsets',   price: 189,               emoji: '🎧', badge: 'hot',  rating: 4.7, reviews: 234, tags: ['Audio', 'Gaming']           },
  { id: 12, name: 'Wooting 60HE',          category: 'Keyboards',  price: 175,               emoji: '⌨️', badge: 'new',  rating: 4.9, reviews: 91,  tags: ['Electronics', 'Mechanical'] },
];

const CATEGORIES   = ['All', ...new Set(PRODUCTS.map(p => p.category))];
const TAGS         = ['Electronics', 'Audio', 'Premium', 'Mechanical', 'Gaming', 'Streaming', 'Accessories'];
const SORT_OPTIONS = [
  { label: 'Featured',            val: 'featured'   },
  { label: 'Price: Low → High',   val: 'price-asc'  },
  { label: 'Price: High → Low',   val: 'price-desc' },
  { label: 'Top Rated',           val: 'rating'     },
  { label: 'Most Reviewed',       val: 'reviews'    },
];

/* ─── HELPERS ─── */

/** Render 5 star characters based on a rating value */
function Stars({ n }) {
  const filled = Math.round(n);
  return React.createElement(
    'span', { className: 'stars' },
    Array.from({ length: 5 }, (_, i) => (i < filled ? '★' : '☆')).join('')
  );
}

/* ─── TOAST ─── */

function Toast({ toasts }) {
  return React.createElement(
    'div', { className: 'toast-container' },
    toasts.map(t =>
      React.createElement('div', { key: t.id, className: 'toast' }, t.msg)
    )
  );
}

/* ─── PRODUCT CARD ─── */

function ProductCard({ product, onAdd }) {
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAdd(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return React.createElement('div', { className: 'product-card' },

    /* Badge */
    product.badge && React.createElement(
      'span', { className: `card-badge badge-${product.badge}` }, product.badge
    ),

    /* Image area */
    React.createElement('div', { className: 'card-img-wrap' },
      React.createElement('span', { className: 'card-emoji' }, product.emoji),
      React.createElement('button', { className: 'quick-add', onClick: handleAdd }, '+ QUICK ADD')
    ),

    /* Card body */
    React.createElement('div', { className: 'card-body' },
      React.createElement('div', { className: 'card-category' }, product.category),
      React.createElement('div', { className: 'card-name' }, product.name),

      React.createElement('div', { className: 'card-bottom' },

        /* Price block */
        React.createElement('div', null,
          React.createElement('span', { className: 'card-price' }, `$${product.price}`),
          product.oldPrice && React.createElement(
            'span', { className: 'card-price-old' }, `$${product.oldPrice}`
          )
        ),

        /* Rating + add-to-cart button */
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('div', { className: 'card-rating' },
            React.createElement(Stars, { n: product.rating }),
            React.createElement('span', { className: 'rating-count' }, `(${product.reviews})`)
          ),
          React.createElement('button', {
            className: `add-btn${added ? ' added' : ''}`,
            onClick: handleAdd,
            title: 'Add to cart',
          }, added ? '✓' : '+')
        )
      )
    )
  );
}

/* ─── CART DRAWER ─── */

function CartDrawer({ open, onClose, cart, onUpdate, onRemove, onCheckout }) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping  = subtotal > 200 ? 0 : 12.99;
  const tax       = subtotal * 0.08;
  const total     = subtotal + shipping + tax;

  return React.createElement(React.Fragment, null,

    /* Overlay */
    React.createElement('div', {
      className: `cart-overlay${open ? ' open' : ''}`,
      onClick: onClose,
    }),

    /* Drawer panel */
    React.createElement('div', { className: `cart-drawer${open ? ' open' : ''}` },

      /* Header */
      React.createElement('div', { className: 'cart-header' },
        React.createElement('div', { className: 'cart-title' }, 'CART'),
        React.createElement('button', { className: 'close-btn', onClick: onClose }, '✕')
      ),

      /* Items list */
      React.createElement('div', { className: 'cart-items' },
        cart.length === 0
          ? React.createElement('div', { className: 'cart-empty' },
              React.createElement('span', { className: 'cart-empty-icon' }, '🛒'),
              React.createElement('span', null, 'YOUR CART IS EMPTY'),
              React.createElement('span', { style: { fontSize: 11 } }, 'ADD SOME ITEMS TO GET STARTED')
            )
          : cart.map(item =>
              React.createElement('div', { key: item.id, className: 'cart-item' },
                React.createElement('div', { className: 'cart-item-img' }, item.emoji),
                React.createElement('div', { className: 'cart-item-info' },
                  React.createElement('div', { className: 'cart-item-name' }, item.name),
                  React.createElement('div', { className: 'cart-item-price' },
                    `$${(item.price * item.qty).toFixed(2)}`
                  )
                ),
                React.createElement('div', { className: 'cart-item-controls' },
                  React.createElement('button', { className: 'qty-btn', onClick: () => onUpdate(item.id, item.qty - 1) }, '−'),
                  React.createElement('span',  { className: 'qty-num' }, item.qty),
                  React.createElement('button', { className: 'qty-btn', onClick: () => onUpdate(item.id, item.qty + 1) }, '+'),
                  React.createElement('button', { className: 'remove-btn', onClick: () => onRemove(item.id), title: 'Remove' }, '🗑')
                )
              )
            )
      ),

      /* Footer: promo + summary + checkout */
      React.createElement('div', { className: 'cart-footer' },
        React.createElement('div', { className: 'cart-promo' },
          React.createElement('input', { className: 'promo-input', placeholder: 'PROMO CODE' }),
          React.createElement('button', { className: 'promo-btn' }, 'APPLY')
        ),
        React.createElement('div', { className: 'cart-summary' },
          React.createElement('div', { className: 'summary-row' },
            React.createElement('span', null, 'SUBTOTAL'),
            React.createElement('span', null, `$${subtotal.toFixed(2)}`)
          ),
          React.createElement('div', { className: 'summary-row' },
            React.createElement('span', null, 'SHIPPING'),
            React.createElement('span', null, shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`)
          ),
          React.createElement('div', { className: 'summary-row' },
            React.createElement('span', null, 'TAX (8%)'),
            React.createElement('span', null, `$${tax.toFixed(2)}`)
          ),
          React.createElement('div', { className: 'summary-row total' },
            React.createElement('span', null, 'TOTAL'),
            React.createElement('span', { className: 'val' }, `$${total.toFixed(2)}`)
          )
        ),
        React.createElement('button', {
          className: 'checkout-btn',
          disabled: cart.length === 0,
          onClick: onCheckout,
        }, 'CHECKOUT')
      )
    )
  );
}

/* ─── CHECKOUT MODAL ─── */

function CheckoutModal({ open, onClose, cart, onSuccess }) {
  const [step, setStep] = useState(0); // 0 contact | 1 shipping | 2 payment | 3 review | 4 success
  const [form, setForm] = useState({
    email: '', first: '', last: '',
    addr: '', city: '', zip: '', country: '',
    card: '', expiry: '', cvv: '',
  });

  const subtotal  = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping  = subtotal > 200 ? 0 : 12.99;
  const tax       = subtotal * 0.08;
  const total     = subtotal + shipping + tax;
  const orderId   = useRef(`ORD-${Math.random().toString(36).substr(2, 8).toUpperCase()}`);
  const steps     = ['Contact', 'Shipping', 'Payment', 'Review'];

  const setField = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const input = (placeholder, key, type = 'text') =>
    React.createElement('input', {
      className: 'form-input', placeholder, type,
      value: form[key], onChange: setField(key),
    });

  const handlePlace = () => {
    setStep(4);
    setTimeout(() => { onSuccess(); onClose(); setStep(0); }, 3500);
  };

  /* Step content factory */
  const stepContent = () => {

    if (step === 4) return React.createElement('div', { className: 'success-state' },
      React.createElement('span', { className: 'success-icon' }, '✅'),
      React.createElement('div', { className: 'success-title' }, 'ORDER PLACED!'),
      React.createElement('div', { className: 'success-msg' },
        'Thank you for your purchase.\nYour order is being processed and will ship within 1–2 business days.'
      ),
      React.createElement('div', { className: 'order-number' }, orderId.current)
    );

    if (step === 0) return React.createElement('div', null,
      React.createElement('label', { className: 'form-label' }, 'Email Address'),
      input('you@example.com', 'email', 'email'),
      React.createElement('div', { className: 'form-row' },
        React.createElement('div', null,
          React.createElement('label', { className: 'form-label' }, 'First Name'),
          input('John', 'first')
        ),
        React.createElement('div', null,
          React.createElement('label', { className: 'form-label' }, 'Last Name'),
          input('Doe', 'last')
        )
      )
    );

    if (step === 1) return React.createElement('div', null,
      React.createElement('label', { className: 'form-label' }, 'Street Address'),
      input('123 Main Street, Apt 4', 'addr'),
      React.createElement('div', { className: 'form-row' },
        React.createElement('div', null,
          React.createElement('label', { className: 'form-label' }, 'City'),
          input('New York', 'city')
        ),
        React.createElement('div', null,
          React.createElement('label', { className: 'form-label' }, 'ZIP Code'),
          input('10001', 'zip')
        )
      ),
      React.createElement('label', { className: 'form-label' }, 'Country'),
      React.createElement('select', {
        className: 'form-input', value: form.country, onChange: setField('country'),
      },
        React.createElement('option', { value: '' }, 'Select Country'),
        ['United States', 'India', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France']
          .map(c => React.createElement('option', { key: c, value: c }, c))
      )
    );

    if (step === 2) return React.createElement('div', null,
      React.createElement('label', { className: 'form-label' }, 'Card Number'),
      input('4242 4242 4242 4242', 'card'),
      React.createElement('div', { className: 'form-row' },
        React.createElement('div', null,
          React.createElement('label', { className: 'form-label' }, 'Expiry'),
          input('MM/YY', 'expiry')
        ),
        React.createElement('div', null,
          React.createElement('label', { className: 'form-label' }, 'CVV'),
          input('123', 'cvv', 'password')
        )
      ),
      React.createElement('div', {
        style: { marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', display: 'flex', gap: 12 },
      },
        ['💳 Visa', '💳 Mastercard', '💳 Amex', '💳 PayPal']
          .map(c => React.createElement('span', { key: c }, c))
      )
    );

    if (step === 3) return React.createElement('div', null,
      React.createElement('div', { className: 'checkout-items' },
        cart.map(item =>
          React.createElement('div', { key: item.id, className: 'checkout-item' },
            React.createElement('div', { className: 'checkout-item-left' },
              React.createElement('span', { className: 'checkout-item-emoji' }, item.emoji),
              React.createElement('div', null,
                React.createElement('div', { style: { fontSize: 13 } }, item.name),
                React.createElement('div', { className: 'checkout-item-qty' }, `×${item.qty}`)
              )
            ),
            React.createElement('span', { className: 'checkout-item-price' },
              `$${(item.price * item.qty).toFixed(2)}`
            )
          )
        )
      ),
      React.createElement('div', { className: 'cart-summary' },
        React.createElement('div', { className: 'summary-row' },
          React.createElement('span', null, 'SUBTOTAL'), React.createElement('span', null, `$${subtotal.toFixed(2)}`)
        ),
        React.createElement('div', { className: 'summary-row' },
          React.createElement('span', null, 'SHIPPING'), React.createElement('span', null, shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`)
        ),
        React.createElement('div', { className: 'summary-row' },
          React.createElement('span', null, 'TAX (8%)'), React.createElement('span', null, `$${tax.toFixed(2)}`)
        ),
        React.createElement('div', { className: 'summary-row total' },
          React.createElement('span', null, 'TOTAL'),
          React.createElement('span', { className: 'val' }, `$${total.toFixed(2)}`)
        )
      )
    );
  };

  if (!open) return null;
  return React.createElement('div', {
    className: `modal-overlay${open ? ' open' : ''}`,
    onClick: (e) => e.target === e.currentTarget && onClose(),
  },
    React.createElement('div', { className: 'modal' },

      /* Modal header */
      React.createElement('div', { className: 'modal-header' },
        React.createElement('div', { className: 'modal-title' }, step < 4 ? 'CHECKOUT' : ''),
        React.createElement('button', { className: 'close-btn', onClick: onClose }, '✕')
      ),

      /* Modal body */
      React.createElement('div', { className: 'modal-body' },

        /* Step indicator */
        step < 4 && React.createElement(React.Fragment, null,
          React.createElement('div', { className: 'step-indicator' },
            steps.map((_, i) => React.createElement('div', {
              key: i,
              className: `step${i < step ? ' done' : i === step ? ' active' : ''}`,
            }))
          ),
          React.createElement('div', { className: 'step-labels' },
            steps.map((s, i) => React.createElement('span', {
              key: i,
              className: `step-label${i === step ? ' active' : ''}`,
            }, s))
          )
        ),

        stepContent(),

        /* Nav buttons */
        step < 4 && React.createElement('div', { className: 'form-actions' },
          step > 0 && React.createElement('button', {
            className: 'btn-secondary', onClick: () => setStep(s => s - 1),
          }, 'BACK'),
          step < 3
            ? React.createElement('button', { className: 'btn-primary', onClick: () => setStep(s => s + 1) }, 'NEXT')
            : React.createElement('button', { className: 'btn-primary', onClick: handlePlace }, 'PLACE ORDER')
        )
      )
    )
  );
}

/* ─── ROOT APP ─── */

function App() {
  const [cart,        setCart]        = useState([]);
  const [cartOpen,    setCartOpen]    = useState(false);
  const [checkoutOpen,setCheckoutOpen]= useState(false);
  const [category,    setCategory]    = useState('All');
  const [sort,        setSort]        = useState('featured');
  const [maxPrice,    setMaxPrice]    = useState(800);
  const [activeTags,  setActiveTags]  = useState([]);
  const [view,        setView]        = useState('grid');
  const [toasts,      setToasts]      = useState([]);

  /* Toast helper */
  const addToast = (msg) => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2500);
  };

  /* Cart actions */
  const addToCart = (product) => {
    setCart(c => {
      const existing = c.find(i => i.id === product.id);
      return existing
        ? c.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
        : [...c, { ...product, qty: 1 }];
    });
    addToast(`✓ ${product.name} added to cart`);
  };

  const updateQty = (id, qty) => {
    if (qty < 1) { removeFromCart(id); return; }
    setCart(c => c.map(i => i.id === id ? { ...i, qty } : i));
  };

  const removeFromCart = (id) => setCart(c => c.filter(i => i.id !== id));

  /* Tag toggle */
  const toggleTag = (tag) =>
    setActiveTags(t => t.includes(tag) ? t.filter(x => x !== tag) : [...t, tag]);

  /* Filtered + sorted product list */
  const filtered = PRODUCTS
    .filter(p => category === 'All' || p.category === category)
    .filter(p => p.price <= maxPrice)
    .filter(p => activeTags.length === 0 || activeTags.some(t => p.tags.includes(t)))
    .sort((a, b) => {
      if (sort === 'price-asc')  return a.price  - b.price;
      if (sort === 'price-desc') return b.price  - a.price;
      if (sort === 'rating')     return b.rating - a.rating;
      if (sort === 'reviews')    return b.reviews - a.reviews;
      return 0; // featured — original order
    });

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return React.createElement('div', null,

    /* ── NAV ── */
    React.createElement('nav', null,
      React.createElement('div', { className: 'nav-logo' }, 'MONOLITH'),
      React.createElement('div', { className: 'nav-right' },
        React.createElement('div', { className: 'nav-filter' },
          CATEGORIES.slice(0, 5).map(cat =>
            React.createElement('button', {
              key: cat,
              className: `filter-btn${category === cat ? ' active' : ''}`,
              onClick: () => setCategory(cat),
            }, cat)
          )
        ),
        React.createElement('button', {
          className: 'cart-btn',
          onClick: () => setCartOpen(true),
        },
          `CART (${cartCount})`,
          cartCount > 0 && React.createElement('span', { className: 'cart-badge' }, cartCount)
        )
      )
    ),

    /* ── HERO ── */
    React.createElement('div', { className: 'hero' },
      React.createElement('div', null,
        React.createElement('h1', { className: 'hero-title' },
          'NEXT LEVEL', React.createElement('br', null),
          React.createElement('span', null, 'GEAR')
        ),
        React.createElement('div', { className: 'hero-sub' },
          React.createElement('span', null, 'Premium Electronics'),
          React.createElement('span', null, 'Free Shipping $200+')
        )
      ),
      React.createElement('div', { className: 'hero-meta' },
        React.createElement('strong', null, `${PRODUCTS.length}`),
        React.createElement('div', null, 'PRODUCTS IN STOCK'),
        React.createElement('br', null),
        React.createElement('strong', null, '4.8'),
        React.createElement('div', null, 'AVG RATING'),
        React.createElement('br', null),
        React.createElement('strong', null, '24H'),
        React.createElement('div', null, 'DISPATCH TIME')
      )
    ),

    /* ── SHOP LAYOUT ── */
    React.createElement('div', { className: 'shop-layout' },

      /* Sidebar */
      React.createElement('aside', { className: 'sidebar' },

        /* Sort */
        React.createElement('div', { className: 'sidebar-section' },
          React.createElement('div', { className: 'sidebar-label' }, 'SORT BY'),
          SORT_OPTIONS.map(opt =>
            React.createElement('button', {
              key: opt.val,
              className: `sort-option${sort === opt.val ? ' active' : ''}`,
              onClick: () => setSort(opt.val),
            }, opt.label)
          )
        ),

        /* Price range */
        React.createElement('div', { className: 'sidebar-section' },
          React.createElement('div', { className: 'sidebar-label' }, 'MAX PRICE'),
          React.createElement('div', { className: 'price-range' },
            React.createElement('input', {
              type: 'range', className: 'range-slider',
              min: 30, max: 800, value: maxPrice,
              onChange: e => setMaxPrice(Number(e.target.value)),
            }),
            React.createElement('div', { className: 'range-display' },
              React.createElement('span', null, '$30'),
              React.createElement('span', { style: { color: 'var(--accent)' } }, `$${maxPrice}`),
              React.createElement('span', null, '$800')
            )
          )
        ),

        /* Tags */
        React.createElement('div', { className: 'sidebar-section' },
          React.createElement('div', { className: 'sidebar-label' }, 'TAGS'),
          React.createElement('div', { className: 'tag-grid' },
            TAGS.map(tag =>
              React.createElement('button', {
                key: tag,
                className: `tag${activeTags.includes(tag) ? ' active' : ''}`,
                onClick: () => toggleTag(tag),
              }, tag)
            )
          )
        )
      ),

      /* Products area */
      React.createElement('main', { className: 'products-area' },

        /* Toolbar */
        React.createElement('div', { className: 'products-header' },
          React.createElement('div', { className: 'products-count' },
            React.createElement('strong', null, filtered.length),
            ` of ${PRODUCTS.length} products`
          ),
          React.createElement('div', { className: 'view-toggle' },
            React.createElement('button', {
              className: `view-btn${view === 'grid' ? ' active' : ''}`,
              onClick: () => setView('grid'), title: 'Grid view',
            }, '▦'),
            React.createElement('button', {
              className: `view-btn${view === 'list' ? ' active' : ''}`,
              onClick: () => setView('list'), title: 'List view',
            }, '☰')
          )
        ),

        /* Grid */
        React.createElement('div', { className: `products-grid${view === 'list' ? ' list-view' : ''}` },
          filtered.length === 0
            ? React.createElement('div', {
                style: { gridColumn: '1/-1', textAlign: 'center', padding: 60, fontFamily: 'var(--font-mono)', color: 'var(--muted)', fontSize: 13 },
              },
                React.createElement('div', { style: { fontSize: 40, marginBottom: 12 } }, '🔍'),
                React.createElement('div', null, 'NO PRODUCTS MATCH YOUR FILTERS')
              )
            : filtered.map(p =>
                React.createElement(ProductCard, {
                  key: p.id, product: p,
                  onAdd: addToCart,
                  inCart: cart.some(i => i.id === p.id),
                })
              )
        )
      )
    ),

    /* ── FOOTER ── */
    React.createElement('footer', null,
      React.createElement('div', { className: 'footer-brand' }, 'MONOLITH'),
      React.createElement('div', { className: 'footer-links' },
        ['About', 'Shipping', 'Returns', 'Privacy', 'Contact'].map(l =>
          React.createElement('span', { key: l, className: 'footer-link' }, l)
        )
      ),
      React.createElement('div', { className: 'footer-copy' }, '© 2025 MONOLITH STORE')
    ),

    /* ── CART DRAWER ── */
    React.createElement(CartDrawer, {
      open: cartOpen,
      onClose: () => setCartOpen(false),
      cart,
      onUpdate: updateQty,
      onRemove: removeFromCart,
      onCheckout: () => { setCartOpen(false); setCheckoutOpen(true); },
    }),

    /* ── CHECKOUT MODAL ── */
    React.createElement(CheckoutModal, {
      open: checkoutOpen,
      onClose: () => setCheckoutOpen(false),
      cart,
      onSuccess: () => {
        setCart([]);
        addToast('🎉 Order placed successfully!');
      },
    }),

    /* ── TOASTS ── */
    React.createElement(Toast, { toasts })
  );
}

/* ─── MOUNT ─── */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
