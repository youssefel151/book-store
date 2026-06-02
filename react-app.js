(function () {
  if (!window.React || !window.ReactDOM || !window.Bookstore) return;

  const { createElement: h, useMemo, useState } = window.React;
  const { catalogSections, coverFor, formatPrice, productPage, sectionId, sectionPage } = window.Bookstore;

  const initialsFor = (title) => title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  const BookCard = ({ book, section, index }) => {
    const [title, author, price, rating, image] = book;
    const [hasImage, setHasImage] = useState(true);

    return h(
      "article",
      {
        className: "book-card",
        "data-title": title.toLowerCase(),
        "data-author": author,
        "data-price": price,
        "data-rating": rating,
        "data-section": section.name,
        onClick: (event) => {
          if (event.target.closest("a, button")) return;
          window.location.href = productPage(section.name, title);
        },
        style: {
          "--cover-accent": section.accent,
          "--cover-shift": `${index * 18}deg`
        }
      },
      h(
        "a",
        { "aria-label": `View ${title}`, className: "book-card-media", href: productPage(section.name, title) },
        h("div", { className: `book-cover${hasImage ? " cover-fallback" : ""}`, "aria-hidden": "true" }, h("span", null, initialsFor(title))),
        hasImage && h("img", {
          alt: `${title} cover`,
          className: "book-cover-image",
          loading: "lazy",
          onError: () => setHasImage(false),
          src: coverFor(title, image)
        })
      ),
      h(
        "div",
        { className: "book-info" },
        h("p", { className: "book-section" }, section.name),
        h("h3", null, h("a", { href: productPage(section.name, title) }, title)),
        h("p", { className: "book-author" }, author),
        h(
          "div",
          { className: "book-meta" },
          h("span", null, formatPrice(price)),
          h("span", null, `${rating.toFixed(1)} stars`)
        ),
        h(
          "button",
          {
            className: "btn-secondary add-to-cart",
            type: "button",
            "data-title": title,
            "data-author": author,
            "data-price": price,
            "data-section": section.name
          },
          "Add to Cart"
        )
      )
    );
  };

  const CategoryTile = ({ section }) => h(
    "a",
    {
      className: "category-tile",
      href: sectionPage(section.name),
      style: { "--tile-accent": section.accent }
    },
    h("span", null, section.name),
    h("small", null, `${section.books.length} books`)
  );

  const HomeFeatured = () => h(
    window.React.Fragment,
    null,
    ...catalogSections.slice(0, 6).map((section, index) => h(BookCard, {
      book: section.books[index],
      index,
      key: section.name,
      section
    }))
  );

  const HomeCategories = () => h(
    window.React.Fragment,
    null,
    ...catalogSections.map((section) => h(CategoryTile, { key: section.name, section }))
  );

  const sortBooks = (books, mode) => {
    const sorted = books.map((book, index) => ({ book, index }));

    sorted.sort((a, b) => {
      if (mode === "price-low") return a.book[2] - b.book[2];
      if (mode === "price-high") return b.book[2] - a.book[2];
      if (mode === "rating") return b.book[3] - a.book[3];
      return a.index - b.index;
    });

    return sorted;
  };

  const ShopApp = () => {
    const [query, setQuery] = useState("");
    const [activeSection, setActiveSection] = useState("all");
    const [sortMode, setSortMode] = useState("featured");
    const normalizedQuery = query.trim().toLowerCase();

    const visibleSections = useMemo(() => catalogSections
      .map((section) => {
        const books = sortBooks(section.books, sortMode).filter(({ book }) => {
          const [title, author] = book;
          const matchesSection = activeSection === "all" || section.name === activeSection;
          const matchesSearch = !normalizedQuery ||
            title.toLowerCase().includes(normalizedQuery) ||
            author.toLowerCase().includes(normalizedQuery) ||
            section.name.toLowerCase().includes(normalizedQuery);

          return matchesSection && matchesSearch;
        });

        return { ...section, books };
      })
      .filter((section) => section.books.length > 0), [activeSection, normalizedQuery, sortMode]);

    const scrollToSection = (name) => {
      document.getElementById(sectionId(name))?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return h(
      window.React.Fragment,
      null,
      h(
        "div",
        { className: "filters glass" },
        h("input", {
          "aria-label": "Search books",
          className: "search-bar",
          id: "bookSearch",
          onChange: (event) => setQuery(event.target.value),
          placeholder: "Search books, authors, or sections...",
          type: "search",
          value: query
        }),
        h(
          "select",
          {
            "aria-label": "Filter by section",
            id: "sectionFilter",
            onChange: (event) => setActiveSection(event.target.value),
            value: activeSection
          },
          h("option", { value: "all" }, "All Sections"),
          ...catalogSections.map((section) => h("option", { key: section.name, value: section.name }, section.name))
        ),
        h(
          "select",
          {
            "aria-label": "Sort books",
            id: "sortFilter",
            onChange: (event) => setSortMode(event.target.value),
            value: sortMode
          },
          h("option", { value: "featured" }, "Featured First"),
          h("option", { value: "price-low" }, "Price: Low to High"),
          h("option", { value: "price-high" }, "Price: High to Low"),
          h("option", { value: "rating" }, "Top Rated")
        )
      ),
      h(
        "nav",
        { className: "section-nav glass", id: "sectionNav", "aria-label": "Book sections" },
        ...catalogSections.map((section) => h(
          "button",
          {
            className: "section-nav-button",
            key: section.name,
            onClick: () => scrollToSection(section.name),
            type: "button"
          },
          section.name
        ))
      ),
      h(
        "div",
        { className: "catalog", id: "catalogSections" },
        visibleSections.length
          ? visibleSections.map((section) => h(
            "section",
            {
              className: "catalog-section",
              "data-section": section.name,
              id: sectionId(section.name),
              key: section.name
            },
            h(
              "div",
              { className: "section-heading" },
              h("div", null, h("p", { className: "eyebrow" }, "Curated shelf"), h("h2", null, section.name)),
              h("a", { className: "section-count-link", href: sectionPage(section.name) }, `${section.books.length} books`)
            ),
            h(
              "div",
              { className: "book-row" },
              ...section.books.map(({ book, index }) => h(BookCard, {
                book,
                index,
                key: `${section.name}-${book[0]}`,
                section
              }))
            ),
            null
          ))
          : h(
            "div",
            { className: "empty-state glass" },
            h("h2", null, "No books found"),
            h("p", null, "Try a different search term or choose another section.")
          )
      )
    );
  };

  const mount = (id, component) => {
    const element = document.getElementById(id);
    if (!element) return;

    window.ReactDOM.createRoot(element).render(component);
  };

  mount("featuredBooks", h(HomeFeatured));
  mount("categoryGrid", h(HomeCategories));
  mount("shopApp", h(ShopApp));
}());
