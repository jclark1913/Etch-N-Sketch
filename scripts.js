// Variable declarations
let singleCell;
let gridRefreshCounter = 0;
let gridContainer = document.getElementById('grid-container');
initializeGrid(24);
let allGridItems = document.querySelectorAll(".single-cell");


// Drawing functionality

// Stroke Color Selector

strokeColorSelector = document.getElementById("stroke-color-selector");
strokeColorSelector.addEventListener("change", changeStrokeColor);
let strokeColor = strokeColorSelector.value;

function changeStrokeColor() {
    strokeColor = strokeColorSelector.value;
}

// Background Color Selector

backgroundColorSelector = document.getElementById("background-color-selector");
backgroundColorSelector.addEventListener("change", changeBackgroundColor);
let backgroundColor = backgroundColorSelector.value;

function changeBackgroundColor() {
    backgroundColor = backgroundColorSelector.value;
    allGridItems.forEach(function (gridItem) {
        if (gridItem.getAttribute("isDrawn") === "") {
            gridItem.style.backgroundColor = backgroundColor
        }
    });
    if (eraserActivated){
        strokeColor = backgroundColor;
    }
}

let eraserActivated = false;
let previousColor;

let isMouseDown = false;

document.addEventListener('mousedown', function () {
    isMouseDown = true;
});

document.addEventListener('mouseup', function () {
    isMouseDown = false;
})

function fillCellOnClick() {
    this.style.backgroundColor = strokeColor;
    this.setAttribute("isDrawn", "true")
    if (eraserActivated){
        this.setAttribute("isDrawn", "");
    }
}

function fillCellOnHover() {
    if (isMouseDown) {
        this.style.backgroundColor = strokeColor;
        this.setAttribute("isDrawn", "true");
        if (eraserActivated){
            this.setAttribute("isDrawn", "")
        }
    }
};

// Init

// Eraser functionality

let eraserButton = document.getElementById("eraser-button");
eraserButton.addEventListener("click", toggleEraser);

function toggleEraser() {
    eraserActivated = !eraserActivated;
    if (eraserActivated) {
        previousColor = strokeColor;
        strokeColor = backgroundColor;
    } else {
        strokeColor = previousColor;
    }
    console.log(eraserActivated)
}

// Slider functionality

let sizeSlider = document.getElementById("size-slider");
sizeSlider.addEventListener('change', changeGridSize);

function changeGridSize() {
    let gridSize = sizeSlider.valueAsNumber;
    clearGrid();
    populateGrid(gridSize);
    updateGridSizeText(gridSize);
    allGridItems = document.querySelectorAll(".single-cell")
    // Check for and generate outline (TODO: GENERALIZE THIS SECTION)
    allGridItems.forEach(function (gridItem) {
        if (outlineVisible) {
            gridItem.style.outline = "1px solid #4e4a4a";
        } else {
            gridItem.style.outline = "";
        }
    });
}

//      BUTTONS


// Toggle grid lines
let outlineVisible = false;
let gridLinesButton = document.getElementById("toggle-grid-lines");
gridLinesButton.addEventListener('click', toggleGridLines)
toggleGridLines();

function toggleGridLines() {
    outlineVisible = !outlineVisible;
    allGridItems.forEach(function (gridItem) {
        if (outlineVisible) {
            gridItem.style.outline = "1px solid #4e4a4a";
        } else {
            gridItem.style.outline = "";
        }
    });
}

// Clear

let clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', changeGridSize)

// Functions

function populateGrid(num) {
    let dimensions = 'calc(100%/ ' + num + ')';
    for (let i = 0; i < num * num; i++) {
        singleCell = document.createElement('div');
        singleCell.classList.add('single-cell');
        singleCell.setAttribute("isDrawn", "")
        singleCell.style.width = dimensions;
        singleCell.style.height = dimensions;
        singleCell.addEventListener('mousedown', fillCellOnClick);
        singleCell.addEventListener('mouseover', fillCellOnHover);
        gridContainer.appendChild(singleCell);
        singleCell.style.backgroundColor = backgroundColor;
    };
}

function initializeGrid(num) {
    let dimensions = 'calc(100%/ ' + num + ')';
    for (let i = 0; i < num * num; i++) {
        singleCell = document.createElement('div');
        singleCell.classList.add('single-cell');
        singleCell.setAttribute("isDrawn", "")
        singleCell.style.width = dimensions;
        singleCell.style.height = dimensions;
        singleCell.addEventListener('mousedown', fillCellOnClick);
        singleCell.addEventListener('mouseover', fillCellOnHover);
        gridContainer.appendChild(singleCell);
    };
}

function clearGrid() {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
}

function updateGridSizeText(gridSize) {
    let gridSizeText = document.getElementById("size-indicator-text");
    gridSizeText.textContent = `Grid Size: ${gridSize} x ${gridSize}`
}

// Initialize on page load