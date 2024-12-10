const topBar = document.getElementById("top-bar");


// Handle top bar on scroll
function handleScroll() {
    const isAtTop = window.scrollY === 0;
    // console.log(isAtTop);
    
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


window.addEventListener("scroll", () => requestAnimationFrame(handleScroll));

