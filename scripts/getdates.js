
// WDD 131 - Dynamic Web Fundamentals
// Dynamically display copyright year and last modified date.

// Get the current year.
const currentYear = new Date().getFullYear();

// Display the current year in the footer.
document.getElementById("currentyear").textContent = currentYear;

// Display the document's last modified date.
document.getElementById("lastModified").textContent =
    `Last Modified: ${document.lastModified}`;
