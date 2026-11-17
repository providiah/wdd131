
// ======================================
// TEMPLE DATA ARRAY
// ======================================

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },

    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },

    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },

    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },

    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },

    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },

    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },

    // ======================================
    // THREE ADDITIONAL TEMPLE OBJECTS
    // ======================================

    {
        templeName: "Salt Lake Utah",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-75243.jpg"
    },
    {
        templeName: "Accra Ghana",
        location: "Accra, Ghana",
        dedicated: "2004, January, 11",
        area: 17500,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/accra-ghana-temple/accra-ghana-temple-71217.jpg"
    },
    {
        templeName: "Durban South Africa",
        location: "Durban, South Africa",
        dedicated: "2020, February, 16",
        area: 19860,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/durban-south-africa-temple/durban-south-africa-temple-72674.jpg"
    },
    {
        templeName: "Nairobi Kenya",
        location: "Nairobi, Kenya",
        dedicated: "2025, May, 18",
        area: 19870,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/nairobi-kenya-temple/nairobi-kenya-temple-61298.jpg"
    }
];


// ======================================
// SELECT HTML ELEMENTS
// ======================================

const templeContainer = document.querySelector("#temple-container");

const filterLinks = document.querySelectorAll(".navigation a");

const menuButton = document.querySelector("#menu-button");

const navigation = document.querySelector("#navigation");


// ======================================
// FORMAT DEDICATION DATE
// ======================================

function formatDate(dateString) {

    const [year, month, day] = dateString.split(", ");

    const date = new Date(
        Number(year),
        new Date(`${month} 1, ${year}`).getMonth(),
        Number(day)
    );

    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    }).format(date);
}


// ======================================
// DISPLAY TEMPLE CARDS
// ======================================

function displayTemples(templeList) {

    templeContainer.innerHTML = "";

    if (templeList.length === 0) {

        const message = document.createElement("p");

        message.classList.add("no-results");

        message.textContent = "No temples found.";

        templeContainer.appendChild(message);

        return;
    }

    templeList.forEach((temple) => {

        // Create temple card
        const card = document.createElement("article");

        card.classList.add("temple-card");

        // Temple name
        const name = document.createElement("h2");

        name.textContent = temple.templeName;

        // Temple location
        const location = document.createElement("p");

        const locationLabel = document.createElement("strong");

        locationLabel.textContent = "Location: ";

        location.appendChild(locationLabel);

        location.appendChild(
            document.createTextNode(temple.location)
        );

        // Dedication date
        const dedicated = document.createElement("p");

        const dedicatedLabel = document.createElement("strong");

        dedicatedLabel.textContent = "Dedicated: ";

        dedicated.appendChild(dedicatedLabel);

        dedicated.appendChild(
            document.createTextNode(formatDate(temple.dedicated))
        );

        // Temple area
        const area = document.createElement("p");

        const areaLabel = document.createElement("strong");

        areaLabel.textContent = "Area: ";

        area.appendChild(areaLabel);

        area.appendChild(
            document.createTextNode(
                `${temple.area.toLocaleString("en-US")} sq ft`
            )
        );

        // Temple image
        const image = document.createElement("img");

        image.src = temple.imageUrl;

        image.alt = `${temple.templeName} temple`;

        image.loading = "lazy";

        image.width = 400;

        image.height = 250;

        // Add all elements to card
        card.appendChild(name);

        card.appendChild(location);

        card.appendChild(dedicated);

        card.appendChild(area);

        card.appendChild(image);

        // Add card to page
        templeContainer.appendChild(card);

    });
}


// ======================================
// FILTER TEMPLE DATA
// ======================================

function filterTemples(filter) {

    let filteredTemples = [];

    switch (filter) {

        // Temples dedicated before 1900
        case "old":

            filteredTemples = temples.filter((temple) => {

                const year = Number(
                    temple.dedicated.split(",")[0]
                );

                return year < 1900;

            });

            break;


        // Temples dedicated after 2000
        case "new":

            filteredTemples = temples.filter((temple) => {

                const year = Number(
                    temple.dedicated.split(",")[0]
                );

                return year > 2000;

            });

            break;


        // Temples larger than 90,000 square feet
        case "large":

            filteredTemples = temples.filter((temple) => {

                return temple.area > 90000;

            });

            break;


        // Temples smaller than 10,000 square feet
        case "small":

            filteredTemples = temples.filter((temple) => {

                return temple.area < 10000;

            });

            break;


        // Display all temples
        case "home":

        default:

            filteredTemples = temples;

            break;
    }

    displayTemples(filteredTemples);
}


// ======================================
// NAVIGATION LINK EVENTS
// ======================================

filterLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

        const filter = link.dataset.filter;

        // Display filtered temples
        filterTemples(filter);

        // Remove active class from all links
        filterLinks.forEach((item) => {

            item.classList.remove("active");

        });

        // Highlight selected link
        link.classList.add("active");

        // Close mobile navigation
        navigation.classList.remove("show");

        menuButton.setAttribute("aria-expanded", "false");

    });

});


// ======================================
// MOBILE MENU TOGGLE
// ======================================

menuButton.addEventListener("click", () => {

    navigation.classList.toggle("show");

    const isExpanded = navigation.classList.contains("show");

    menuButton.setAttribute("aria-expanded", isExpanded);

});


// ======================================
// FOOTER COPYRIGHT YEAR
// ======================================

document.querySelector("#currentyear").textContent =
    new Date().getFullYear();


// ======================================
// FOOTER LAST MODIFIED DATE
// ======================================

document.querySelector("#lastModified").textContent =
    document.lastModified;


// ======================================
// DISPLAY ALL TEMPLES ON PAGE LOAD
// ======================================

displayTemples(temples);
