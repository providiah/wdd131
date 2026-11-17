// Providiahnelly website interactions
const products = [
    {
        id: "slip-01",
        name: "Everyday Ease Slippers",
        category: "slippers",
        audience: ["men", "women"],
        description: "A relaxed everyday style for casual moments and easy movement.",
        priceLabel: "Ask for current price",
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=700&q=80",
        imageAlt: "Casual footwear in a clean product setting",
        tag: "Everyday"
    },
    {
        id: "sand-02",
        name: "Classic Walk Sandals",
        category: "sandals",
        audience: ["women", "men"],
        description: "A versatile sandal style for outings and everyday wear.",
        priceLabel: "Ask for current price",
        image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=700&q=80",
        imageAlt: "Fashion footwear photographed in a neutral setting",
        tag: "Versatile"
    },
    {
        id: "palm-03",
        name: "Daily Comfort Palm",
        category: "palm",
        audience: ["men", "women"],
        description: "A simple casual option for comfortable day-to-day use.",
        priceLabel: "Ask for current price",
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=700&q=80",
        imageAlt: "Casual everyday footwear",
        tag: "Casual"
    },
    {
        id: "slip-04",
        name: "Family Day Slippers",
        category: "slippers",
        audience: ["children", "women", "men"],
        description: "A laid-back footwear choice for family everyday activities.",
        priceLabel: "Ask for current price",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
        imageAlt: "Bright casual footwear",
        tag: "Family"
    },
    {
        id: "sand-05",
        name: "Weekend Style Sandals",
        category: "sandals",
        audience: ["women", "children"],
        description: "An easy-to-style option for relaxed weekends and outings.",
        priceLabel: "Ask for current price",
        image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=700&q=80",
        imageAlt: "Modern footwear displayed for a product photograph",
        tag: "Weekend"
    },
    {
        id: "palm-06",
        name: "Simple Steps Palm Slippers",
        category: "palm",
        audience: ["men", "children"],
        description: "A practical casual style for simple everyday comfort.",
        priceLabel: "Ask for current price",
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=700&q=80",
        imageAlt: "Casual footwear in a product display",
        tag: "Classic"
    }
];

const FAVOURITES_KEY = "providiahnelly-favourites";
const ENQUIRIES_KEY = "providiahnelly-enquiries";

function getFavourites() {
    const savedItems = localStorage.getItem(FAVOURITES_KEY);
    return savedItems ? JSON.parse(savedItems) : [];
}

function saveFavourites(favourites) {
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
}

function createProductCard(product, favourites) {
    const isSaved = favourites.includes(product.id);
    const categoryName = product.category === "palm" ? "Palm slippers" : product.category;
    const audienceText = product.audience.map((person) => person.charAt(0).toUpperCase() + person.slice(1)).join(`, `);

    return `
    <article class="product-card">
      <div class="product-image-wrap">
        <img src="${product.image}" alt="${product.imageAlt}" loading="lazy" width="700" height="700">
        <span class="product-tag">${product.tag}</span>
        <button class="save-button ${isSaved ? "is-saved" : ""}" type="button" data-favourite="${product.id}" aria-pressed="${isSaved}" aria-label="${isSaved ? "Remove" : "Save"} ${product.name} ${isSaved ? "from" : "to"} favourites">
          <span aria-hidden="true">${isSaved ? "♥" : "♡"}</span>
        </button>
      </div>
      <div class="product-info">
        <p class="product-category">${categoryName}</p>
        <h3>${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <p class="product-audience">For: ${audienceText}</p>
        <div class="product-card-bottom"><span>${product.priceLabel}</span><a href="contact.html?product=${encodeURIComponent(product.name)}">Enquire <span aria-hidden="true">→</span></a></div>
      </div>
    </article>
  `;
}

function updateFavouriteCount() {
    const countElement = document.querySelector("#favourite-count");
    if (countElement) {
        countElement.textContent = `${getFavourites().length}`;
    }
}

function renderProducts(target, items) {
    if (!target) {
        return;
    }

    const favourites = getFavourites();
    target.innerHTML = items.map((product) => createProductCard(product, favourites)).join("");

    const emptyMessage = document.querySelector("#empty-state");
    if (emptyMessage) {
        emptyMessage.hidden = items.length > 0;
    }

    const resultsCount = document.querySelector("#results-count");
    if (resultsCount) {
        resultsCount.textContent = `Showing ${items.length} ${items.length === 1 ? "style" : "styles"}`;
    }

    updateFavouriteCount();
}

function toggleFavourite(productId) {
    const favourites = getFavourites();
    const alreadySaved = favourites.includes(productId);
    const updatedFavourites = alreadySaved
        ? favourites.filter((id) => id !== productId)
        : [...favourites, productId];

    saveFavourites(updatedFavourites);
    return updatedFavourites;
}

function setupCollectionFilters() {
    const productGrid = document.querySelector("#all-products");
    if (!productGrid) {
        return;
    }

    const categoryFilter = document.querySelector("#category-filter");
    const audienceFilter = document.querySelector("#audience-filter");
    const searchInput = document.querySelector("#product-search");
    const params = new URLSearchParams(window.location.search);
    const requestedCategory = params.get("category");

    if (requestedCategory && ["slippers", "sandals", "palm"].includes(requestedCategory)) {
        categoryFilter.value = requestedCategory;
    }

    function applyFilters() {
        const selectedCategory = categoryFilter.value;
        const selectedAudience = audienceFilter.value;
        const searchTerm = searchInput.value.trim().toLowerCase();

        const matchingProducts = products.filter((product) => {
            const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
            const matchesAudience = selectedAudience === "all" || product.audience.includes(selectedAudience);
            const searchableText = `${product.name} ${product.description} ${product.category} ${product.tag}`.toLowerCase();
            const matchesSearch = searchableText.includes(searchTerm);

            return matchesCategory && matchesAudience && matchesSearch;
        });

        renderProducts(productGrid, matchingProducts);
    }

    categoryFilter.addEventListener("change", applyFilters);
    audienceFilter.addEventListener("change", applyFilters);
    searchInput.addEventListener("input", applyFilters);
    applyFilters();
}

function setupFeaturedProducts() {
    const featuredGrid = document.querySelector("#featured-products");
    if (featuredGrid) {
        renderProducts(featuredGrid, products.slice(0, 3));
    }
}

function setupFavouriteButtons() {
    document.addEventListener("click", (event) => {
        const favouriteButton = event.target.closest("[data-favourite]");
        if (!favouriteButton) {
            return;
        }

        toggleFavourite(favouriteButton.dataset.favourite);
        const collectionGrid = document.querySelector("#all-products");
        const featuredGrid = document.querySelector("#featured-products");

        if (collectionGrid) {
            const categoryFilter = document.querySelector("#category-filter");
            const audienceFilter = document.querySelector("#audience-filter");
            const searchInput = document.querySelector("#product-search");
            const selectedCategory = categoryFilter.value;
            const selectedAudience = audienceFilter.value;
            const searchTerm = searchInput.value.trim().toLowerCase();

            const visibleProducts = products.filter((product) => {
                const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
                const matchesAudience = selectedAudience === "all" || product.audience.includes(selectedAudience);
                const searchableText = `${product.name} ${product.description} ${product.category} ${product.tag}`.toLowerCase();
                return matchesCategory && matchesAudience && searchableText.includes(searchTerm);
            });

            renderProducts(collectionGrid, visibleProducts);
        } else if (featuredGrid) {
            renderProducts(featuredGrid, products.slice(0, 3));
        }
    });
}

function setupEnquiryForm() {
    const enquiryForm = document.querySelector("#enquiry-form");
    if (!enquiryForm) {
        return;
    }

    const feedback = document.querySelector("#form-feedback");
    const params = new URLSearchParams(window.location.search);
    const requestedProduct = params.get("product");
    const interestSelect = document.querySelector("#interest");

    if (requestedProduct) {
        const matchedProduct = products.find((product) => product.name === requestedProduct);
        if (matchedProduct) {
            interestSelect.value = matchedProduct.category === "palm"
                ? "Palm slippers"
                : `${matchedProduct.category.charAt(0).toUpperCase()}${matchedProduct.category.slice(1)}`;
        }
    }

    enquiryForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!enquiryForm.checkValidity()) {
            enquiryForm.reportValidity();
            return;
        }

        const formData = new FormData(enquiryForm);
        const enquiry = {
            name: formData.get("fullName").trim(),
            email: formData.get("email").trim(),
            phone: formData.get("phone").trim(),
            interest: formData.get("interest"),
            audience: formData.get("audience"),
            message: formData.get("message").trim(),
            submittedAt: new Date().toISOString()
        };

        const savedEnquiries = JSON.parse(localStorage.getItem(ENQUIRIES_KEY) || "[]");
        savedEnquiries.push(enquiry);
        localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(savedEnquiries));

        feedback.textContent = `Thank you, ${enquiry.name}. Your ${enquiry.interest.toLowerCase()} enquiry has been saved in this browser. This demonstration form does not send messages to an inbox. Please call +234 912 318 8881 to contact Providiahnelly directly.`;
        feedback.classList.add("is-success");
        enquiryForm.reset();
    });
}

function setupMobileNavigation() {
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".primary-nav");

    if (!menuButton || !navigation) {
        return;
    }

    menuButton.addEventListener("click", () => {
        const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
        menuButton.setAttribute("aria-expanded", `${!isExpanded}`);
        navigation.classList.toggle("is-open", !isExpanded);
        menuButton.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
    });
}

function setCurrentYear() {
    const yearElement = document.querySelector("#current-year");
    if (yearElement) {
        yearElement.textContent = `${new Date().getFullYear()}`;
    }
}

function initializeWebsite() {
    setCurrentYear();
    setupMobileNavigation();
    setupFeaturedProducts();
    setupCollectionFilters();
    setupFavouriteButtons();
    setupEnquiryForm();
}

initializeWebsite();
