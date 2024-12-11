const topBar = document.getElementById("top-bar");
const exteriorColorSection = document.getElementById("exterior-buttons");
const interiorColorSection = document.getElementById("interior-buttons");
const exteriorImage = document.getElementById("exterior-image");
const interiorImage = document.getElementById("interior-image");
const wheelbuttonsSection = document.getElementById("wheel-buttons");
const performanceBtn = document.getElementById("performance-btn");
const totalPriceElement = document.getElementById("total-price");
const fullSelfDrivingCheckbox = document.getElementById("full-self-driving-checkbox");
const accessoryCheckboxes = document.querySelectorAll(".accessory-form-checkbox");
const downPaymentElement = document.getElementById('down-payment');
const monthlyPaymentElement = document.getElementById('monthly-payment');


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

const basePrice = 52490;
let currentPrice = basePrice;

const pricing = {
    'Performance Wheels': 2500,
    'Preformance Package': 5000,
    'Full Self-Driving': 8500,
    'Accessories': {
        'Center Console Trays': 35,
        'Sunshade': 105,
        'All-Weather Interior Liners': 255,
    }
}

// My Way To Keep Selected Color When Select Performance Wheels:
// let currentSelectedColor = "model-y-stealth-grey";

// Brad Way To Keep Selected Color When Select Performance Wheels:
let selectedColor = 'Stealth Grey';
const selectedOptions = {
    'Performance Wheels': false,
    'Preformance Package': false,
    'Full Self-Driving': false,
    // My Way For Adding Accessory Prices:
    // 'Accessories': {
    //     'Center Console Trays': false,
    //     'Sunshade': false,
    //     'All-Weather Interior Liners': false,
    // }
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
        buttons.forEach(btn => {
            btn.classList.remove("bg-gray-700", "text-white");
            btn.classList.add("bg-gray-200");
        });

        // Add Selected Styles To Button
        event.target.classList.add("bg-gray-700", "text-white");

        // My Way To Keep Selected Color When Select Performance Wheels:
        // const selectedWheel = event.target.textContent.includes("Performance");

        // exteriorImage.src = selectedWheel ? `./images/${currentSelectedColor}-performance.jpg` : `./images/${currentSelectedColor}.jpg`;

        // Brad Way To Keep Selected Color When Select Performance Wheels:
        selectedOptions['Performance Wheels'] = event.target.textContent.includes("Performance");
        updateExteriorImage();

        updateTotalPrice();
    }
}

// Performance Package Selection
function handlePerformanceButtonClick() {
    const isSelected = performanceBtn.classList.toggle("bg-gray-700");
    performanceBtn.classList.toggle("text-white");

    // Update Selected Options
    selectedOptions['Preformance Package'] = isSelected;

    updateTotalPrice();
}

// Update Total Price in The UI
function updateTotalPrice() {
    // Reset current price to base price
    currentPrice = basePrice;

    // Performance Wheel Option
    if(selectedOptions['Performance Wheels']) {
        currentPrice += pricing['Performance Wheels'];
    }

    // Performance Package Option
    if(selectedOptions['Preformance Package']) {
        currentPrice += pricing['Preformance Package'];
    }

    // Full Self Driving Option
    if(selectedOptions['Full Self-Driving']) {
        currentPrice += pricing['Full Self-Driving'];
    }

    // My Way For Adding Accessory Prices:
    // Accessory Options
    // if(selectedOptions['Accessories']['All-Weather Interior Liners']) {
    //     currentPrice += pricing['Accessories']['All-Weather Interior Liners'];
    // }
    // if(selectedOptions['Accessories']['Center Console Trays']) {
    //     currentPrice += pricing['Accessories']['Center Console Trays'];
    // }
    // if(selectedOptions['Accessories']['Sunshade']) {
    //     currentPrice += pricing['Accessories']['Sunshade'];
    // }

    // Brad Way For Adding Accessory Prices:
    // Accessory Checkboxes
    accessoryCheckboxes.forEach((checkbox) => {
        // Extract the accessory label
        const accessoryLabel = checkbox.closest('label').querySelector('span:nth-of-type(1)')
        .textContent.trim();
        
        // Extract the accessory price
        const accessoryPrice = pricing['Accessories'][accessoryLabel];
        
        // Add to current price if accessory is selected
        if(checkbox.checked) {
            currentPrice += accessoryPrice;
        }
    })

    // Update total price in UI
    totalPriceElement.textContent = `$${currentPrice.toLocaleString()}`;

    updatePaymentBreakdown();
}

// Full Self Driving Selection
function fullSelfDrivingChange() {
    const isSelected = fullSelfDrivingCheckbox.checked;

    selectedOptions['Full Self-Driving'] = isSelected;
    updateTotalPrice();
}

// My Way For Adding Accessory Prices:
// Accessories Selection
// function accessoriesChange(event) {
//     const isAccessorySelected = event.target.checked; 
//     const accessoryText = event.target.closest('span').previousElementSibling.textContent;
    
//     selectedOptions['Accessories'][`${accessoryText}`] = isAccessorySelected;

//     updateTotalPrice();
// }

// Brad Way For Adding Accessory Prices:
// Handle Accessory Checkbox Listeners
accessoryCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => updateTotalPrice());
});


// Update Payment Breakdown Based on Current Price
function updatePaymentBreakdown() {
    // Calculate down payment
    const downPayment = currentPrice * 0.1;
    downPaymentElement.textContent = `$${downPayment.toLocaleString()}`;

    // Calculate loan details (assuming 60-month loan and 3% interest rate)
    const loanTermMonths = 60;
    const interestRate = 0.03;

    const loanAmount = currentPrice - downPayment;

    // My Way to Calculate Monthly payment:
    const monthlyInterestRate = interestRate / 12;

    const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -loanTermMonths));

    // Brad Way to Calculate Monthly payment:
    //     Monthly payment formula: P * (r(1+r)^n) / ((1+r)^n - 1)
//   const monthlyInterestRate = interestRate / 12;

//   const monthlyPayment = (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths))) / (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);

    monthlyPaymentElement.textContent = `$${monthlyPayment.toFixed(2).toLocaleString()}`;   
}

// Initial Update Total Price
updateTotalPrice();

// Event Listeners
window.addEventListener("scroll", () => requestAnimationFrame(handleScroll));

exteriorColorSection.addEventListener('click', handleColorButtonClick);
interiorColorSection.addEventListener('click', handleColorButtonClick);

wheelbuttonsSection.addEventListener("click", handleWheelButtonClick);

performanceBtn.addEventListener('click', handlePerformanceButtonClick);

fullSelfDrivingCheckbox.addEventListener('change', fullSelfDrivingChange);

// My Way For Adding Accessory Prices:
// accessoryCheckboxes.forEach(accessoryCheckbox => {
//     accessoryCheckbox.addEventListener('change', accessoriesChange);
// });