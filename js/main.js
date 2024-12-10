const topBar = document.getElementById("top-bar");
const exteriorColorSection = document.getElementById("exterior-buttons");
const interiorColorSection = document.getElementById("interior-buttons");
const exteriorImage = document.getElementById("exterior-image");
const interiorImage = document.getElementById("interior-image");

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
            const alt = button.querySelector("img").alt;
            exteriorImage.src = exteriorImages[alt];
        }

        // Change Interior Image
        if(event.currentTarget === interiorColorSection) {
            const alt = button.querySelector("img").alt;
            interiorImage.src = interiorImages[alt];
        }
    }
}


window.addEventListener("scroll", () => requestAnimationFrame(handleScroll));

exteriorColorSection.addEventListener('click', handleColorButtonClick);
interiorColorSection.addEventListener('click', handleColorButtonClick);