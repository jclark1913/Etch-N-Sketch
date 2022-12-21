
addCells(24);

// Functions

function addCells(num){
    let singleCell;
    let gridContainer;
    let dimensions = 'calc(100%/ ' + num + ')';
    console.log(dimensions)
    for (let i = 0; i < num * num; i++){
        singleCell = document.createElement('div');
        singleCell.classList.add('single-cell');
        singleCell.style.width = dimensions;
        singleCell.style.height = dimensions;

        gridContainer = document.getElementById('grid-container');
        gridContainer.appendChild(singleCell)
    }
}