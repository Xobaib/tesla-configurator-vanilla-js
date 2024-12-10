const topBar = document.getElementById("top-bar");
const exteriorColorSection = document.getElementById("exterior-buttons");
const interiorColorSection = document.getElementById("interior-buttons");
const exteriorImage = document.getElementById("exterior-image");
const interiorImage = document.getElementById("interior-image");

// console.log(exteriorColorSection);


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
    }
}


window.addEventListener("scroll", () => requestAnimationFrame(handleScroll));

exteriorColorSection.addEventListener('click', handleColorButtonClick);
interiorColorSection.addEventListener('click', handleColorButtonClick);