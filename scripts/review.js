
// Get the submitted form information from the URL
const params = new URLSearchParams(window.location.search);

const productId = params.get("productName");
const rating = params.get("rating");
const installationDate = params.get("installationDate");

// The product IDs that are valid for this assignment
const validProductIds = [
    "fc-1888",
    "fc-2050",
    "fs-1987",
    "ac-2000",
    "jj-1969"
];

// Find the selected product name
const selectedProduct = validProductIds.includes(productId)
    ? productId
    : null;

// Check that the required information was submitted
const validRating = ["1", "2", "3", "4", "5"].includes(rating);

const validDate = installationDate &&
    !Number.isNaN(Date.parse(`${installationDate}T00:00:00`));

const validSubmission = selectedProduct && validRating && validDate;

// Select confirmation page elements
const reviewCountElement = document.querySelector("#reviewCount");
const confirmationTitle = document.querySelector("#confirmationTitle");
const confirmationMessage = document.querySelector("#confirmationMessage");
const reviewDetails = document.querySelector("#reviewDetails");

// Retrieve the saved review count
let reviewCount = Number(localStorage.getItem("reviewCount")) || 0;

if (validSubmission) {
    // Increment the number of completed reviews
    reviewCount++;

    // Save the updated count in localStorage
    localStorage.setItem("reviewCount", reviewCount);

    // Display confirmation information
    confirmationTitle.textContent = "Thank You!";
    confirmationMessage.textContent =
        "Your product review has been submitted successfully.";

    document.querySelector("#confirmedProduct").textContent = productId;
    document.querySelector("#confirmedRating").textContent = rating;

    reviewDetails.hidden = false;
} else {
    // Do not count an invalid or direct visit as a submission
    confirmationTitle.textContent = "No Review Submitted";
    confirmationMessage.textContent =
        "Please complete the required fields on the review form before submitting.";

    reviewDetails.hidden = true;
}

// Display the total number of reviews
reviewCountElement.textContent = reviewCount;

// Display footer information
document.querySelector("#currentyear").textContent =
    new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    document.lastModified;
