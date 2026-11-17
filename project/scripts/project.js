
const products = [
    {
        id: 1,
        name: "Classic Black Leather Slippers",
        category: "slippers",
        audience: "men",
        description: "Stylish black open-toe leather slide slippers for everyday comfort.",
        image: "https://alpenkindmode.com/cdn/shop/files/herren-offene-zehen-slide-sandalen-mit-einteiligem-riemen-alpenkind-2.jpg?v=1774201108&width=1445",
        imageAlt: "Men's black open-toe leather slide slippers",
        featured: true
    },
    {
        id: 2,
        name: "Brown Leather Slide Slippers",
        category: "slippers",
        audience: "men",
        description: "Smart brown open-toe slippers with a simple and comfortable design.",
        image: "https://backend.amarbay.com/media/images/product/back/_DSC4392.jpg",
        imageAlt: "Men's brown open-toe leather slide slippers",
        featured: true
    },
    {
        id: 3,
        name: "Perforated Comfort Slippers",
        category: "slippers",
        audience: "men",
        description: "Comfortable open-toe slippers with a detailed leather finish.",
        image: "https://greenbay.pe/cdn/shop/files/SAHARA_-_006SG-MARRON_1.webp?v=1746816591&width=533",
        imageAlt: "Men's brown open-toe perforated leather slippers",
        featured: true
    },
    {
        id: 4,
        name: "Black Indoor Slide Slippers",
        category: "slippers",
        audience: "men",
        description: "Simple black open-toe slides suitable for relaxed everyday wear.",
        image: "https://content.rozetka.com.ua/goods/images/big/244335488.jpg",
        imageAlt: "Men's black open-toe indoor slide slippers",
        featured: false
    },
    {
        id: 5,
        name: "Women's Casual Sandals",
        category: "sandals",
        audience: "women",
        description: "Casual sandals designed for everyday outings and comfort.",
        image: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=700",
        imageAlt: "Women's casual sandals",
        featured: true
    },
    {
        id: 6,
        name: "Women's Fashion Slippers",
        category: "slippers",
        audience: "women",
        description: "Fashionable slippers for relaxed and comfortable everyday use.",
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd?w=700",
        imageAlt: "Women's footwear",
        featured: false
    },
    {
        id: 7,
        name: "Children's Everyday Sandals",
        category: "sandals",
        audience: "children",
        description: "Lightweight footwear for children's everyday activities.",
        image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=700",
        imageAlt: "Children's footwear",
        featured: false
    },
    {
        id: 8,
        name: "Family Palm Slippers",
        category: "palm",
        audience: "everyone",
        description: "Simple palm slippers for comfortable everyday use.",
        image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=700",
        imageAlt: "Casual everyday slippers",
        featured: false
    }
];

const FAVOURITES_KEY = "providiahnelly-favourites";
const ENQUIRIES_KEY = "providiahnelly-enquiries";

function getFavourites() {
    return JSON.parse(localStorage.getItem(FAVOURITES_KEY)) || [];
}

function saveFavourites(favourites) {
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
}

function getCategoryLabel(category) {
    const labels = {
        slippers: "Slippers",
        sandals: "Sandals",
        palm: "Palm slippers"
    };

    return labels[category] || "Other";
}

function createProductCard(product) {
    const favourites = getFavourites();
    const isSaved = favourites.includes(product.id);

    return `
        <article class="product-card">
            <div class="product-image-wrap">
                <img
                    src="${product.image}"
                    alt="${product.imageAlt}"
                    loading="lazy"
                    width="600"
                    height="450"
                >

                <span class="product-tag">
                    ${getCategoryLabel(product.category)}
                </span>

                <button
                    class="save-button ${isSaved ? "is-saved" : ""}"
                    type="button"
                    data-favourite="${product.id}"
                    aria-label="${isSaved ? "Remove from" : "Add to"} favourites"
                    aria-pressed="${isSaved}"
                >
                    ${isSaved ? "♥" : "♡"}
                </button>
            </div>

            <div class="product-info">
                <p class="product-category">
                    ${getCategoryLabel(product.category)}
                </p>

                <h3>${product.name}</h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <p class="product-audience">
                    Designed for: ${product.audience}
                </p>

                <div class="product-card-bottom">
                    <span>Ask for current price</span>

                    <a href="contact.html?product=${encodeURIComponent(product.name)}">
                        Enquire
                    </a>
                </div>
            </div>
        </article>
    `;
}

function updateFavouriteCount() {
    const countElement = document.querySelector("#favourite-count");

    if (countElement) {
        countElement.textContent = getFavourites().length;
    }
}

function renderProducts(productList, target) {
    if (!target) return;

    if (productList.length === 0) {
        target.innerHTML = `
            <p class="empty-message">
                No products found. Try another search or category.
            </p>
        `;
        return;
    }

    target.innerHTML = productList
        .map(product => createProductCard(product))
        .join("");

    setupFavouriteButtons();
}

function getFilteredProducts() {
    const categoryFilter = document.querySelector("#category-filter");
    const audienceFilter = document.querySelector("#audience-filter");
    const searchInput = document.querySelector("#product-search");

    const selectedCategory = categoryFilter?.value || "all";
    const selectedAudience = audienceFilter?.value || "all";
    const searchTerm = searchInput?.value.toLowerCase().trim() || "";

    return products.filter(product => {
        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        const matchesAudience =
            selectedAudience === "all" ||
            product.audience === selectedAudience ||
            product.audience === "everyone";

        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm);

        return matchesCategory && matchesAudience && matchesSearch;
    });
}

function setupCollectionFilters() {
    const productContainer = document.querySelector("#all-products");

    if (!productContainer) return;

    const categoryFilter = document.querySelector("#category-filter");
    const audienceFilter = document.querySelector("#audience-filter");
    const searchInput = document.querySelector("#product-search");
    const resultsCount = document.querySelector("#results-count");

    function updateProducts() {
        const filteredProducts = getFilteredProducts();

        renderProducts(filteredProducts, productContainer);

        if (resultsCount) {
            resultsCount.textContent =
                `${filteredProducts.length} products found`;
        }
    }

    categoryFilter?.addEventListener("change", updateProducts);
    audienceFilter?.addEventListener("change", updateProducts);
    searchInput?.addEventListener("input", updateProducts);

    updateProducts();
}

function setupFeaturedProducts() {
    const featuredContainer = document.querySelector("#featured-products");

    if (!featuredContainer) return;

    const featuredProducts = products
        .filter(product => product.featured)
        .slice(0, 3);

    renderProducts(featuredProducts, featuredContainer);
}

function setupFavouriteButtons() {
    const favouriteButtons = document.querySelectorAll("[data-favourite]");

    favouriteButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productId = Number(button.dataset.favourite);
            let favourites = getFavourites();

            if (favourites.includes(productId)) {
                favourites = favourites.filter(id => id !== productId);
            } else {
                favourites.push(productId);
            }

            saveFavourites(favourites);

            const productContainer = document.querySelector("#all-products");
            const featuredContainer = document.querySelector("#featured-products");

            if (productContainer) {
                renderProducts(getFilteredProducts(), productContainer);
            } else if (featuredContainer) {
                renderProducts(
                    products.filter(product => product.featured).slice(0, 3),
                    featuredContainer
                );
            }

            updateFavouriteCount();
        });
    });

    updateFavouriteCount();
}

function setupEnquiryForm() {
    const enquiryForm = document.querySelector("#enquiry-form");

    if (!enquiryForm) return;

    const feedback = document.querySelector("#form-feedback");
    const interestSelect = document.querySelector("#interest");

    const urlParameters = new URLSearchParams(window.location.search);
    const selectedProduct = urlParameters.get("product");

    if (selectedProduct && interestSelect) {
        const matchedProduct = products.find(
            product => product.name === selectedProduct
        );

        if (matchedProduct) {
            interestSelect.value = getCategoryLabel(matchedProduct.category);
        }
    }

    enquiryForm.addEventListener("submit", event => {
        event.preventDefault();

        const formData = new FormData(enquiryForm);

        const enquiry = {
            name: formData.get("fullName"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            interest: formData.get("interest"),
            audience: formData.get("audience"),
            message: formData.get("message"),
            date: new Date().toISOString()
        };

        if (
            !enquiry.name ||
            !enquiry.email ||
            !enquiry.interest ||
            !enquiry.message
        ) {
            if (feedback) {
                feedback.textContent = "Please complete all required fields.";
            }
            return;
        }

        const enquiries =
            JSON.parse(localStorage.getItem(ENQUIRIES_KEY)) || [];

        enquiries.push(enquiry);

        localStorage.setItem(
            ENQUIRIES_KEY,
            JSON.stringify(enquiries)
        );

        if (feedback) {
            feedback.textContent =
                "Thank you! Your enquiry has been saved in this browser. Please contact us by phone to send your message directly.";
            feedback.classList.add("is-success");
        }

        enquiryForm.reset();
    });
}

function setupMobileNavigation() {
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".primary-nav");

    if (!menuButton || !navigation) return;

    menuButton.addEventListener("click", () => {
        const isExpanded =
            menuButton.getAttribute("aria-expanded") === "true";

        menuButton.setAttribute("aria-expanded", String(!isExpanded));
        navigation.classList.toggle("show");
    });
}

function setCurrentYear() {
    const yearElement = document.querySelector("#current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

function initializeWebsite() {
    setupFeaturedProducts();
    setupCollectionFilters();
    setupEnquiryForm();
    setupMobileNavigation();
    updateFavouriteCount();
    setCurrentYear();
}

document.addEventListener("DOMContentLoaded", initializeWebsite);
