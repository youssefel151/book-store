const THEME_KEY = "bookstore-theme";
const toggle = document.getElementById("darkModeToggle");
const memoryStore = {};

const readStore = (key, fallback = null) => {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch (error) {
    return Object.prototype.hasOwnProperty.call(memoryStore, key) ? memoryStore[key] : fallback;
  }
};

const writeStore = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    memoryStore[key] = value;
  }
};

const catalogSections = [
  {
    name: "Fiction",
    accent: "#7c3aed",
    books: [
      ["Fictions", "Jorge Luis Borges", 18.99, 4.8, "images/fictions.jpg"],
      ["Tomorrow, and Tomorrow, and Tomorrow", "Gabrielle Zevin", 21.5, 4.7],
      ["Lessons in Chemistry", "Bonnie Garmus", 19.75, 4.8],
      ["The Seven Husbands of Evelyn Hugo", "Taylor Jenkins Reid", 17.95, 4.7],
      ["Demon Copperhead", "Barbara Kingsolver", 23.25, 4.9],
      ["Yellowface", "R. F. Kuang", 20.2, 4.5],
      ["Sea of Tranquility", "Emily St. John Mandel", 18.4, 4.6],
      ["The Heaven & Earth Grocery Store", "James McBride", 22.8, 4.8],
      ["Cloud Cuckoo Land", "Anthony Doerr", 16.99, 4.6],
      ["Remarkably Bright Creatures", "Shelby Van Pelt", 18.25, 4.7]
    ]
  },
  {
    name: "Business",
    accent: "#0891b2",
    books: [
      ["Atomic Habits", "James Clear", 16.95, 4.9],
      ["The Lean Startup", "Eric Ries", 18.2, 4.6],
      ["Zero to One", "Peter Thiel", 15.99, 4.5],
      ["Good to Great", "Jim Collins", 17.5, 4.7],
      ["The Psychology of Money", "Morgan Housel", 14.99, 4.8],
      ["Measure What Matters", "John Doerr", 19.3, 4.6],
      ["Start with Why", "Simon Sinek", 16.4, 4.7],
      ["Deep Work", "Cal Newport", 15.75, 4.8],
      ["The Hard Thing About Hard Things", "Ben Horowitz", 20.8, 4.7],
      ["Rework", "Jason Fried", 13.95, 4.5]
    ]
  },
  {
    name: "Self Development",
    accent: "#16a34a",
    books: [
      ["The Mountain Is You", "Brianna Wiest", 15.25, 4.7],
      ["Can't Hurt Me", "David Goggins", 21.95, 4.8],
      ["The 7 Habits", "Stephen R. Covey", 17.99, 4.8],
      ["Mindset", "Carol S. Dweck", 14.8, 4.7],
      ["The Power of Now", "Eckhart Tolle", 13.99, 4.6],
      ["Essentialism", "Greg McKeown", 16.2, 4.7],
      ["Make Your Bed", "William H. McRaven", 12.95, 4.6],
      ["Grit", "Angela Duckworth", 15.5, 4.7],
      ["Think Again", "Adam Grant", 18.1, 4.8],
      ["The Art of Possibility", "Rosamund Stone Zander", 14.4, 4.5]
    ]
  },
  {
    name: "Science",
    accent: "#dc2626",
    books: [
      ["A Brief History of Time", "Stephen Hawking", 13.95, 4.7],
      ["Cosmos", "Carl Sagan", 17.5, 4.8],
      ["The Gene", "Siddhartha Mukherjee", 19.9, 4.8],
      ["Astrophysics for People in a Hurry", "Neil deGrasse Tyson", 12.99, 4.6],
      ["The Body", "Bill Bryson", 18.75, 4.7],
      ["The Sixth Extinction", "Elizabeth Kolbert", 16.99, 4.6],
      ["Entangled Life", "Merlin Sheldrake", 18.4, 4.7],
      ["The Order of Time", "Carlo Rovelli", 14.3, 4.5],
      ["Being Mortal", "Atul Gawande", 15.8, 4.8],
      ["The Immortal Life of Henrietta Lacks", "Rebecca Skloot", 16.25, 4.8]
    ]
  },
  {
    name: "Fantasy",
    accent: "#9333ea",
    books: [
      ["The Name of the Wind", "Patrick Rothfuss", 18.95, 4.8],
      ["The Way of Kings", "Brandon Sanderson", 24.99, 4.9],
      ["A Game of Thrones", "George R. R. Martin", 19.99, 4.7],
      ["The Priory of the Orange Tree", "Samantha Shannon", 21.5, 4.6],
      ["The Fifth Season", "N. K. Jemisin", 17.95, 4.7],
      ["Mistborn", "Brandon Sanderson", 16.99, 4.8],
      ["The Poppy War", "R. F. Kuang", 18.2, 4.6],
      ["Jonathan Strange & Mr Norrell", "Susanna Clarke", 20.4, 4.5],
      ["The City of Brass", "S. A. Chakraborty", 17.75, 4.7],
      ["Babel", "R. F. Kuang", 22.3, 4.6]
    ]
  },
  {
    name: "Mystery",
    accent: "#475569",
    books: [
      ["The Thursday Murder Club", "Richard Osman", 15.99, 4.6],
      ["Gone Girl", "Gillian Flynn", 14.75, 4.5],
      ["The Silent Patient", "Alex Michaelides", 16.25, 4.6],
      ["In the Woods", "Tana French", 15.5, 4.5],
      ["The Girl with the Dragon Tattoo", "Stieg Larsson", 17.4, 4.6],
      ["Big Little Lies", "Liane Moriarty", 14.9, 4.5],
      ["The Guest List", "Lucy Foley", 15.95, 4.4],
      ["Magpie Murders", "Anthony Horowitz", 16.8, 4.6],
      ["The Reversal", "Michael Connelly", 13.99, 4.5],
      ["Still Life", "Louise Penny", 14.25, 4.6]
    ]
  },
  {
    name: "History",
    accent: "#b45309",
    books: [
      ["Sapiens", "Yuval Noah Harari", 18.99, 4.8],
      ["The Silk Roads", "Peter Frankopan", 20.25, 4.6],
      ["1776", "David McCullough", 17.8, 4.7],
      ["The Wright Brothers", "David McCullough", 16.99, 4.7],
      ["Team of Rivals", "Doris Kearns Goodwin", 22.5, 4.8],
      ["The Warmth of Other Suns", "Isabel Wilkerson", 19.95, 4.9],
      ["Guns, Germs, and Steel", "Jared Diamond", 17.4, 4.5],
      ["SPQR", "Mary Beard", 18.75, 4.6],
      ["The Splendid and the Vile", "Erik Larson", 18.2, 4.7],
      ["A People's History", "Howard Zinn", 16.5, 4.5]
    ]
  },
  {
    name: "Technology",
    accent: "#2563eb",
    books: [
      ["Clean Code", "Robert C. Martin", 29.99, 4.7],
      ["Designing Data-Intensive Applications", "Martin Kleppmann", 34.5, 4.9],
      ["The Pragmatic Programmer", "David Thomas", 27.95, 4.8],
      ["Hooked", "Nir Eyal", 18.99, 4.5],
      ["Inspired", "Marty Cagan", 22.25, 4.7],
      ["Refactoring", "Martin Fowler", 31.8, 4.8],
      ["You Don't Know JS Yet", "Kyle Simpson", 24.4, 4.6],
      ["The Phoenix Project", "Gene Kim", 19.99, 4.7],
      ["Accelerate", "Nicole Forsgren", 21.95, 4.7],
      ["Don't Make Me Think", "Steve Krug", 17.5, 4.8]
    ]
  },
  {
    name: "Kids",
    accent: "#e11d48",
    books: [
      ["The Very Hungry Caterpillar", "Eric Carle", 9.99, 4.9],
      ["Where the Wild Things Are", "Maurice Sendak", 10.95, 4.8],
      ["Charlotte's Web", "E. B. White", 8.99, 4.8],
      ["Matilda", "Roald Dahl", 9.5, 4.8],
      ["Wonder", "R. J. Palacio", 11.25, 4.8],
      ["The Tale of Peter Rabbit", "Beatrix Potter", 7.95, 4.7],
      ["Goodnight Moon", "Margaret Wise Brown", 8.25, 4.8],
      ["The One and Only Ivan", "Katherine Applegate", 10.4, 4.7],
      ["A Wrinkle in Time", "Madeleine L'Engle", 9.8, 4.6],
      ["The Hobbit", "J. R. R. Tolkien", 12.5, 4.8]
    ]
  },
  {
    name: "Romance",
    accent: "#db2777",
    books: [
      ["Book Lovers", "Emily Henry", 15.99, 4.6],
      ["Happy Place", "Emily Henry", 17.5, 4.5],
      ["Red, White & Royal Blue", "Casey McQuiston", 15.75, 4.6],
      ["The Love Hypothesis", "Ali Hazelwood", 14.95, 4.5],
      ["Beach Read", "Emily Henry", 15.5, 4.6],
      ["People We Meet on Vacation", "Emily Henry", 15.8, 4.5],
      ["The Hating Game", "Sally Thorne", 13.99, 4.4],
      ["It Ends with Us", "Colleen Hoover", 14.5, 4.5],
      ["Seven Days in June", "Tia Williams", 16.25, 4.6],
      ["Part of Your World", "Abby Jimenez", 15.95, 4.7]
    ]
  }
];

const setTheme = (theme) => {
  const isDark = theme === "dark";

  document.body.classList.toggle("dark", isDark);

  if (toggle) {
    toggle.textContent = isDark ? "Light" : "Dark";
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
  }
};

setTheme(readStore(THEME_KEY, "light"));

const markActiveNavigation = () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".navbar nav a").forEach((link) => {
    const linkPage = link.getAttribute("href");
    const isSectionPage = currentPage.startsWith("section-");
    const isActive = linkPage === currentPage ||
      (currentPage === "" && linkPage === "index.html") ||
      (isSectionPage && linkPage === "shop.html");

    link.classList.toggle("is-active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
  });
};

const setupRevealMotion = () => {
  const targets = document.querySelectorAll(
    ".featured, .categories, .testimonials, .newsletter, .site-links, .page-intro, .info-card, .catalog-section, .checkout-layout, .account-layout, .contact-layout, .cart-items, .product, .reviews"
  );

  if (!targets.length) return;

  targets.forEach((target) => target.classList.add("reveal-item"));

  if (!("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

  targets.forEach((target) => observer.observe(target));
};

toggle?.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("dark") ? "light" : "dark";
  writeStore(THEME_KEY, nextTheme);
  setTheme(nextTheme);
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".is-disabled")) {
    event.preventDefault();
    return;
  }

  const cartButton = event.target.closest(".add-to-cart");

  if (cartButton) {
    event.preventDefault();

    const item = {
      title: cartButton.dataset.title,
      author: cartButton.dataset.author,
      price: cartButton.dataset.price,
      section: cartButton.dataset.section
    };

    if (item.title && item.author && item.price) {
      addToCart(item);
      cartButton.textContent = "Added";
      renderCart();
      renderCheckout();
      renderMiniCart();
      showToast(`${item.title} added to cart`);
    }
  }

  const bookCard = event.target.closest(".book-card");

  if (bookCard && !event.target.closest("a, button")) {
    const productLink = bookCard.querySelector(".book-info h3 a, .book-card-media");
    const href = productLink?.getAttribute("href");

    if (href) {
      window.location.href = href;
      return;
    }
  }

  const removeButton = event.target.closest(".remove-from-cart");

  if (removeButton) {
    event.preventDefault();
    removeFromCart(removeButton.dataset.id);
    renderCart();
    renderCheckout();
    renderMiniCart(true);
    return;
  }

  const anchor = event.target.closest('a[href^="#"]');

  if (!anchor) return;

  const target = document.querySelector(anchor.getAttribute("href"));

  if (!target) return;

  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
});

const formatPrice = (price) => `$${price.toFixed(2)}`;
const slugify = (value) => value
  .toLowerCase()
  .replace(/['’]/g, "")
  .replace(/&/g, " and ")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");
const sectionId = (name) => `section-${slugify(name)}`;
const sectionPage = (name) => `${sectionId(name)}.html`;
const productPage = (sectionName, title) => `pdt/${slugify(sectionName)}/${slugify(title)}.html`;
const coverFor = (title, image) => image || `https://covers.openlibrary.org/b/title/${encodeURIComponent(title)}-L.jpg?default=false`;
const CART_KEY = "bookstore-cart";
const SHIPPING = 4.99;
const TAX_RATE = 0.1;

const getCart = () => JSON.parse(readStore(CART_KEY, "[]"));
const saveCart = (cart) => writeStore(CART_KEY, JSON.stringify(cart));
const cartItemId = (title, author) => `${title}::${author}`.toLowerCase();

const bookCard = (book, section, index) => {
  const [title, author, price, rating, image] = book;
  const initials = title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  return `
    <article class="book-card" data-title="${title.toLowerCase()}" data-author="${author}" data-price="${price}" data-rating="${rating}" data-section="${section.name}" style="--cover-accent: ${section.accent}; --cover-shift: ${index * 18}deg">
      <a class="book-card-media" href="${productPage(section.name, title)}" aria-label="View ${title}">
        <div class="book-cover cover-fallback" aria-hidden="true">
          <span>${initials}</span>
        </div>
        <img class="book-cover-image" src="${coverFor(title, image)}" alt="${title} cover" loading="lazy" onerror="this.remove();">
      </a>
      <div class="book-info">
        <p class="book-section">${section.name}</p>
        <h3><a href="${productPage(section.name, title)}">${title}</a></h3>
        <p class="book-author">${author}</p>
        <div class="book-meta">
          <span>${formatPrice(price)}</span>
          <span>${rating.toFixed(1)} stars</span>
        </div>
        <button class="btn-secondary add-to-cart" type="button" data-title="${title}" data-author="${author}" data-price="${price}" data-section="${section.name}">Add to Cart</button>
      </div>
    </article>
  `;
};

const addToCart = ({ title, author, price, section }) => {
  const cart = getCart();
  const id = cartItemId(title, author);
  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id,
      title,
      author,
      section,
      price: Number(price),
      quantity: 1
    });
  }

  saveCart(cart);
  return cart;
};

const removeFromCart = (id) => {
  if (!id) return;

  saveCart(getCart().filter((item) => item.id !== id));
};

const cartSubtotal = (cart) => cart.reduce((total, item) => total + item.price * item.quantity, 0);

const showToast = (message) => {
  let toastStack = document.getElementById("cartToastStack");

  if (!toastStack) {
    toastStack = document.createElement("div");
    toastStack.id = "cartToastStack";
    toastStack.className = "cart-toast-stack";
    toastStack.setAttribute("aria-live", "polite");
    toastStack.setAttribute("aria-atomic", "false");
    Object.assign(toastStack.style, {
      left: "1rem",
      maxWidth: "min(360px, calc(100vw - 2rem))",
      pointerEvents: "none",
      position: "fixed",
      top: "1rem",
      zIndex: "2000"
    });
    document.body.appendChild(toastStack);
  }

  const toast = document.createElement("div");
  toast.className = "cart-toast";
  toast.setAttribute("role", "status");
  toast.style.position = "static";
  toast.textContent = message;
  toastStack.prepend(toast);

  requestAnimationFrame(() => {
    toast.classList.add("is-visible");
  });

  setTimeout(() => {
    toast.classList.remove("is-visible");
    toast.addEventListener("transitionend", () => toast.remove(), { once: true });
  }, 2400);
};

const renderCart = () => {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const checkoutLink = document.getElementById("checkoutLink");

  if (!cartItems || !cartTotal) return;

  const cart = getCart();

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-state glass">
        <h2>Your cart is empty</h2>
        <p>Choose books from the shop first, then come back here to checkout.</p>
        <a class="btn-primary" href="shop.html">Shop Books</a>
      </div>
    `;
    cartTotal.textContent = "Total: $0.00";
    checkoutLink?.classList.add("is-disabled");
    checkoutLink?.setAttribute("aria-disabled", "true");
    return;
  }

  cartItems.innerHTML = cart.map((item) => `
    <article class="cart-item glass">
      <div class="mini-cover" aria-hidden="true">${item.title.slice(0, 2).toUpperCase()}</div>
      <div class="cart-item-copy">
        <p class="book-section">${item.section}</p>
        <h3>${item.title}</h3>
        <p>${item.author}</p>
        <p>${formatPrice(item.price)} x ${item.quantity}</p>
      </div>
      <div class="cart-item-side">
        <strong>${formatPrice(item.price * item.quantity)}</strong>
        <button class="remove-from-cart" type="button" data-id="${item.id}">Remove</button>
      </div>
    </article>
  `).join("");

  cartTotal.textContent = `Total: ${formatPrice(cartSubtotal(cart))}`;
  checkoutLink?.classList.remove("is-disabled");
  checkoutLink?.removeAttribute("aria-disabled");
};

const renderCheckout = () => {
  const checkoutSummary = document.getElementById("checkoutSummary");
  const checkoutTotal = document.getElementById("checkoutTotal");

  if (!checkoutSummary || !checkoutTotal) return;

  const cart = getCart();

  if (cart.length === 0) {
    checkoutSummary.innerHTML = `
      <div class="empty-state">
        <p>Your checkout is empty. Add books before placing an order.</p>
        <a class="btn-primary" href="shop.html">Shop Books</a>
      </div>
    `;
    checkoutTotal.innerHTML = `<span>Total</span><strong>$0.00</strong>`;
    return;
  }

  const subtotal = cartSubtotal(cart);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + SHIPPING + tax;

  checkoutSummary.innerHTML = `
    ${cart.map((item) => `
      <div class="summary-line">
        <span>${item.title} <small>x${item.quantity}</small></span>
        <strong>${formatPrice(item.price * item.quantity)}</strong>
      </div>
    `).join("")}
    <div class="summary-line"><span>Shipping</span><strong>${formatPrice(SHIPPING)}</strong></div>
    <div class="summary-line"><span>Tax</span><strong>${formatPrice(tax)}</strong></div>
  `;
  checkoutTotal.innerHTML = `<span>Total</span><strong>${formatPrice(total)}</strong>`;
};

const renderMiniCart = (openPanel = false) => {
  const cartToggle = document.getElementById("cartToggle");
  const cartCount = document.getElementById("cartCount");
  const miniCart = document.getElementById("miniCartPanel");
  const miniCartItems = document.getElementById("miniCartItems");
  const miniCartTotal = document.getElementById("miniCartTotal");

  if (!cartToggle || !cartCount || !miniCart || !miniCartItems || !miniCartTotal) return;

  const cart = getCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  cartCount.textContent = String(itemCount);

  if (cart.length === 0) {
    miniCartItems.innerHTML = `<p class="mini-cart-empty">Your cart is empty.</p>`;
    miniCartTotal.textContent = "Total: $0.00";
    miniCart.querySelector(".btn-primary")?.classList.add("is-disabled");
  } else {
    miniCartItems.innerHTML = cart.map((item) => `
      <div class="mini-cart-item">
        <div>
          <strong>${item.title}</strong>
          <span>${item.author}</span>
          <small>${formatPrice(item.price)} x ${item.quantity}</small>
        </div>
        <div class="mini-cart-side">
          <b>${formatPrice(item.price * item.quantity)}</b>
          <button class="remove-from-cart" type="button" data-id="${item.id}" aria-label="Remove ${item.title} from cart">Remove</button>
        </div>
      </div>
    `).join("");
    miniCartTotal.textContent = `Total: ${formatPrice(cartSubtotal(cart))}`;
    miniCart.querySelector(".btn-primary")?.classList.remove("is-disabled");
  }

  if (openPanel) {
    miniCart.hidden = false;
    cartToggle.setAttribute("aria-expanded", "true");
  }
};

const setupMiniCart = () => {
  const cartToggle = document.getElementById("cartToggle");
  const miniCart = document.getElementById("miniCartPanel");

  if (!cartToggle || !miniCart) return;

  cartToggle.addEventListener("click", () => {
    const shouldOpen = miniCart.hidden;
    miniCart.hidden = !shouldOpen;
    cartToggle.setAttribute("aria-expanded", String(shouldOpen));
    renderMiniCart();
  });

  document.addEventListener("click", (event) => {
    if (miniCart.hidden) return;
    if (
      event.target.closest("#miniCartPanel") ||
      event.target.closest("#cartToggle") ||
      event.target.closest(".add-to-cart") ||
      event.target.closest(".remove-from-cart")
    ) return;

    miniCart.hidden = true;
    cartToggle.setAttribute("aria-expanded", "false");
  });
};

const renderCatalog = () => {
  const shopApp = document.getElementById("shopApp");
  let catalog = document.getElementById("catalogSections");
  let filter = document.getElementById("sectionFilter");
  let search = document.getElementById("bookSearch");
  let sort = document.getElementById("sortFilter");
  let sectionNav = document.getElementById("sectionNav");

  if (!catalog && shopApp) {
    shopApp.innerHTML = `
      <div class="filters glass">
        <input class="search-bar" id="bookSearch" type="search" placeholder="Search books, authors, or sections..." aria-label="Search books">
        <select id="sectionFilter" aria-label="Filter by section"></select>
        <select id="sortFilter" aria-label="Sort books">
          <option value="featured">Featured First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
      <nav class="section-nav glass" id="sectionNav" aria-label="Book sections"></nav>
      <div class="catalog" id="catalogSections"></div>
    `;

    catalog = document.getElementById("catalogSections");
    filter = document.getElementById("sectionFilter");
    search = document.getElementById("bookSearch");
    sort = document.getElementById("sortFilter");
    sectionNav = document.getElementById("sectionNav");
  }

  if (!catalog) return;

  catalog.innerHTML = catalogSections.map((section, sectionIndex) => `
    <section class="catalog-section" id="${sectionId(section.name)}" data-section="${section.name}">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Curated shelf</p>
          <h2>${section.name}</h2>
        </div>
        <a class="section-count-link" href="${sectionPage(section.name)}">${section.books.length} books</a>
      </div>
      <div class="book-row">
        ${section.books.map((book, index) => bookCard(book, section, index)).join("")}
      </div>
    </section>
  `).join("");

  if (filter) {
    filter.innerHTML = `<option value="all">All Sections</option>${catalogSections.map((section) => `<option value="${section.name}">${section.name}</option>`).join("")}`;
  }

  if (sectionNav) {
    sectionNav.innerHTML = catalogSections.map((section) => `<button class="section-nav-button" type="button" data-target="${sectionId(section.name)}">${section.name}</button>`).join("");
    sectionNav.addEventListener("click", (event) => {
      const button = event.target.closest("[data-target]");
      if (!button) return;

      document.getElementById(button.dataset.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  const applyFilters = () => {
    const term = search?.value.trim().toLowerCase() || "";
    const activeSection = filter?.value || "all";

    document.querySelectorAll(".catalog-section").forEach((sectionElement) => {
      const sectionName = sectionElement.dataset.section;
      let visibleBooks = 0;

      sectionElement.querySelectorAll(".book-card").forEach((card) => {
        const matchesSection = activeSection === "all" || sectionName === activeSection;
        const matchesSearch = !term || card.dataset.title.includes(term) || sectionName.toLowerCase().includes(term);
        const isVisible = matchesSection && matchesSearch;

        card.hidden = !isVisible;
        if (isVisible) visibleBooks += 1;
      });

      sectionElement.hidden = visibleBooks === 0;
    });
  };

  const sortRows = () => {
    const mode = sort?.value || "featured";

    document.querySelectorAll(".book-row").forEach((row) => {
      const cards = Array.from(row.querySelectorAll(".book-card"));

      cards
        .sort((a, b) => {
          if (mode === "price-low") return Number(a.dataset.price) - Number(b.dataset.price);
          if (mode === "price-high") return Number(b.dataset.price) - Number(a.dataset.price);
          if (mode === "rating") return Number(b.dataset.rating) - Number(a.dataset.rating);
          return 0;
        })
        .forEach((card) => row.appendChild(card));
    });

    applyFilters();
  };

  search?.addEventListener("input", applyFilters);
  filter?.addEventListener("change", applyFilters);
  sort?.addEventListener("change", sortRows);
};

const renderHomeHighlights = () => {
  const featured = document.getElementById("featuredBooks");
  const categories = document.getElementById("categoryGrid");

  if (featured) {
    const picks = catalogSections.slice(0, 6).map((section, index) => bookCard(section.books[index], section, index));
    featured.innerHTML = picks.join("");
  }

  if (categories) {
    categories.innerHTML = catalogSections.map((section) => `
      <a class="category-tile" href="${sectionPage(section.name)}" style="--tile-accent: ${section.accent}">
        <span>${section.name}</span>
        <small>${section.books.length} books</small>
      </a>
    `).join("");
  }
};

const renderSectionPage = () => {
  const sectionRoot = document.getElementById("sectionPage");

  if (!sectionRoot) return;

  const requestedSection = sectionRoot.dataset.section;
  const section = catalogSections.find((item) => item.name === requestedSection);

  if (!section) {
    sectionRoot.innerHTML = `
      <div class="empty-state glass">
        <h1>Section not found</h1>
        <p>Return to the shop to browse all available shelves.</p>
        <a class="btn-primary" href="shop.html">Back to Shop</a>
      </div>
    `;
    return;
  }

  sectionRoot.innerHTML = `
    <div class="section-page-hero glass" style="--section-accent: ${section.accent}">
      <div>
        <p class="eyebrow">Full section</p>
        <h1>${section.name}</h1>
        <p>${section.books.length} carefully selected books from the ${section.name.toLowerCase()} shelf.</p>
      </div>
      <div class="section-page-stat">
        <span>${section.books.length}</span>
        <small>books</small>
      </div>
    </div>
    <div class="section-page-actions">
      <a class="btn-secondary" href="shop.html#${sectionId(section.name)}">Back to catalog shelf</a>
      <a class="btn-primary" href="shop.html">Browse all sections</a>
    </div>
    <div class="book-grid section-book-grid">
      ${section.books.map((book, index) => bookCard(book, section, index)).join("")}
    </div>
  `;
};

window.Bookstore = {
  catalogSections,
  coverFor,
  formatPrice,
  productPage,
  slugify,
  sectionId,
  sectionPage
};

markActiveNavigation();
renderCatalog();
renderHomeHighlights();
renderSectionPage();
renderCart();
renderCheckout();
renderMiniCart();
setupMiniCart();
setupRevealMotion();
