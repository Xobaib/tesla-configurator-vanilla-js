const topBar = document.getElementById("top-bar");
const exteriorColorSection = document.getElementById("exterior-buttons");
const interiorColorSection = document.getElementById("interior-buttons");
const exteriorImage = document.getElementById("exterior-image");
const interiorImage = document.getElementById("interior-image");
const wheelbuttonsSection = document.getElementById("wheel-buttons");
// console.log(exteriorColorSection);

// Image Mapping
const exteriorImages = {
    "Stealth Grey": './images/model-y-stealth-grey.jpg',
    "Pearl White": "./images/model-y-pearl-white.jpg",
    "Deep Blue": "./images/model-y-deep-blue-metallic.jpg",
    "Solid Black": "./images/model-y-solid-black.jpg",
    "Ultra Red": "./images/model-y-ultra-red.jpg",
    "Quicksilver": "./images/model-y-quicksilver.jpg",
};

const interiorImages = {
    "Dark": "./images/model-y-interior-dark.jpg",
    "Light": "./images/model-y-interior-light.jpg",
};

// My Way To Keep Selected Color When Select Performance Wheels:
// let currentSelectedColor = "model-y-stealth-grey";

// Brad Way To Keep Selected Color When Select Performance Wheels:
let selectedColor = 'Stealth Grey';
const selectedOptions = {
    'Performance Wheels': false,
    'Preformance Package': false,
    'Full Self-Driving': false,
};

// Handle Top Bar On Scroll
function handleScroll() {
    const isAtTop = window.scrollY === 0;
    
    // My Way:
    // 
    if(isAtTop) {
        topBar.classList.add("comeDownAnimate");
        topBar.classList.remove("goUpAnimate");
    }else {
        topBar.classList.add("goUpAnimate");
        topBar.classList.remove("comeDownAnimate");
    }

    // Brad Way:
    // 
    // topBar.classList.toggle("comeDownAnimate", isAtTop);
    // topBar.classList.toggle("goUpAnimate", !isAtTop);
}

// Handle Color Selection
function handleColorButtonClick(event) {
    let button;
    
    if(event.target.tagName === "IMG") {
        button = event.target.closest("button");
    }else if(event.target.tagName === "BUTTON") {
        button = event.target;
    }

    if(button) {
        const buttons = event.currentTarget.querySelectorAll("button");
        // My Way:
        buttons.forEach(btn => {
            if(btn === button) {
                btn.classList.add("btn-selected");
            }else {
                btn.classList.remove("btn-selected");
            }
        });

        // Bard Way
        // buttons.forEach(btn => btn.classList.remove("btn-selected"));
        // button.classList.add("btn-selected");

        // Change Exterior Image
        if(event.currentTarget === exteriorColorSection) {
            // Brad Way To Keep Selected Color When Select Performance Wheels:
            selectedColor = button.querySelector("img").alt;
            updateExteriorImage();
            // My Way To Keep Selected Color When Select Performance Wheels:
            // currentSelectedColor = exteriorImages[alt].replace("./images/", "").replace(".jpg", "");
        }

        // Change Interior Image
        if(event.currentTarget === interiorColorSection) {
            const alt = button.querySelector("img").alt;
            interiorImage.src = interiorImages[alt];
        }
    }
}

// Brad Way To Keep Selected Color When Select Performance Wheels:
// Update Exterior Image Base On Color and Wheels
function updateExteriorImage() {
    const performanceSuffix = selectedOptions['Performance Wheels'] ? '-performance' : '';
    const colorKey = selectedColor in exteriorImages ? selectedColor : 'Stealth Grey';
    exteriorImage.src = exteriorImages[colorKey].replace(".jpg", `${performanceSuffix}.jpg`);
}

// Wheel Selection
function handleWheelButtonClick(event) {
    if(event.target.tagName === "BUTTON") {
        const buttons = document.querySelectorAll("#wheel-buttons button");
        buttons.forEach(btn => btn.classList.remove("bg-gray-700", "text-white"));

        // Add Selected Styles To Button
        event.target.classList.add("bg-gray-700", "text-white");

        // My Way To Keep Selected Color When Select Performance Wheels:
        // const selectedWheel = event.target.textContent.includes("Performance");

        // exteriorImage.src = selectedWheel ? `./images/${currentSelectedColor}-performance.jpg` : `./images/${currentSelectedColor}.jpg`;

        // Brad Way To Keep Selected Color When Select Performance Wheels:
        selectedOptions['Performance Wheels'] = event.target.textContent.includes("Performance");
        updateExteriorImage();
    }
}


window.addEventListener("scroll", () => requestAnimationFrame(handleScroll));

exteriorColorSection.addEventListener('click', handleColorButtonClick);
interiorColorSection.addEventListener('click', handleColorButtonClick);

wheelbuttonsSection.addEventListener("click", handleWheelButtonClick);