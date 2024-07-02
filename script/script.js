// Get DOM elements
const track = document.querySelector(".carousel-slides");
const slides = Array.from(track.children);
const nextButtons = document.querySelectorAll(".carousel-button-next");
const prevButtons = document.querySelectorAll(".carousel-button-previous");

// Monitor slideWidth
let slideWidth;

// Set slideWidth
function setSlideWidth() {
    slideWidth = slides[0].getBoundingClientRect().width;
    slides.forEach((slide, index) => {
        slide.style.left = `${slideWidth * index}px`;
    });
}

// Set initial slideWidth 
setSlideWidth();

// Monitor screen size and update slideWidth when screen size changes
window.addEventListener("resize", setSlideWidth);

// Monitor current slide index
let currentSlideIndex = 0;

// Update slide position
function updateSlidePosition() {
    const amountToMove = -currentSlideIndex * slideWidth;
    slides.forEach((slide) => {
        slide.style.transform = `translateX(${amountToMove}px)`;
    });
}

// Enable/disable buttons
function toggleButtons() {
    // Previous button
    if (currentSlideIndex === 0) {
        prevButtons.forEach((button) => {
            button.disabled = true;
        }) 
    } else {
        prevButtons.forEach((button) => {
            button.disabled = false;
        })
    }
    // Next button
    if (currentSlideIndex === slides.length - 1) {
        nextButtons.forEach((button) => {
            button.disabled = true;
        })
    } else {
        nextButtons.forEach((button) => {
            button.disabled = false;
        })
    }
}

// Initially enable/disable buttons 
toggleButtons();

// Move to the next slide
nextButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (currentSlideIndex < slides.length - 1) {
            currentSlideIndex++;
        } 
        updateSlidePosition();
        toggleButtons();
    });
});

// Move to the previous slide
prevButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
        } 
        updateSlidePosition();
        toggleButtons();
    });
});