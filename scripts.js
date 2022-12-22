// Initialize + populate grid on page load
let singleCell;
let gridContainer = document.getElementById('grid-container');
populateGrid(24);

// Drawing functionality

let isMouseDown = false;

document.addEventListener('mousedown', function () {
    isMouseDown = true;
    console.log(isMouseDown)
});

document.addEventListener('mouseup', function () {
    isMouseDown = false;
    console.log(isMouseDown)
})

function fillCell() {
    if (isMouseDown) {
        this.style.backgroundColor = "#000FFF";
    }
};

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
            gridItem.style.outline = "1px solid black";
        } else {
            gridItem.style.outline = "";
        }
    });
}

//      BUTTONS


// Toggle grid lines
let outlineVisible = false;
let allGridItems = document.querySelectorAll(".single-cell");
let gridLinesButton = document.getElementById("toggle-grid-lines");
gridLinesButton.addEventListener('click', toggleGridLines)
toggleGridLines();

function toggleGridLines() {
    outlineVisible = !outlineVisible;
    allGridItems.forEach(function (gridItem) {
        if (outlineVisible) {
            gridItem.style.outline = "1px solid black";
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
        singleCell.style.width = dimensions;
        singleCell.style.height = dimensions;
        singleCell.addEventListener('mouseover', fillCell);
        gridContainer.appendChild(singleCell)
    }
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

