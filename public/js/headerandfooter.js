const hamburger = document.querySelector(".hamburger");
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".closeBtn");

// Toggle the navigation menu when clicking on the burger icon
hamburger.addEventListener("click", openNav);
closeBtn.addEventListener("click", closeNav);

function openNav(){
    // Add a class to the "body" element to make it scrollable while navbar is active
    document.body.classList.add("scroll-lock");
    // Show the overlay and add an event listener for click events
    overlay.classList.add("active");
    overlay.addEventListener("click", closeNavOnClick);
}
function closeNav(){
    document.body.classList.remove("scroll-lock");
    overlay.classList.remove("active");
}

function closeNavOnClick(){
    closeNav();
    // Remove the click event listener, so the function won't be called anymore if clicked
    overlay.removeEventListener("click", closeNavOnClick);

}
