let n = 10;
const array = [];

numOfElements();

function randomize() {
    for (let i = 0; i < n; i++) {
        array[i] = Math.floor((Math.random() * 200) + 1);
    }
    displayBars();
}
function numOfElements() {
    array.length = 0;
    let box = document.getElementById("visual");
    box.innerHTML = "";
    let size = document.getElementById("slider").value;
    n = size;
    for (var i = 1; i <= size; i++) {
        let elements = document.createElement('div');
        elements.setAttribute("id", "" + i);
        elements.setAttribute("class", "bar");
        box.appendChild(elements);
        let h6 = document.createElement('h6');
        h6.setAttribute("id", "h6" + i);
        h6.innerHTML = `${i}`;
        elements.appendChild(h6);
    }
}
function visualize() {
    let algo = document.getElementById("algo").value;
    if (algo == "bubble") {
        const swap = bubbleSort([...array]);
        animate(swap);

    }
    else if (algo == "insertion") {
        const swap = insertionSort([...array]);
        animate(swap);
    }
    else if (algo == "selection") {
        const swap = selectionSort([...array]);
        animate(swap);
    }
    //other algorithms get included here.
}

function animate(swaps) {
    
    let speed = document.getElementById("speed").value;
    if (swaps.length == 0) {
        displayBars();
        return;
    }
    const [i, j] = swaps.shift(0);
    [array[i], array[j]] = [array[j], array[i]];
    displayBars([i, j]);
    setTimeout(function () {
        animate(swaps);
    }, speed);
    
}
function displayBars(indices) {
    let box = document.getElementById("visual");
    box.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i] + "px";
        bar.classList.add("bar");
        let h6 = document.createElement('h6');
        h6.setAttribute("id", "h6" + i);
        h6.innerHTML = `${array[i]}`;
        bar.appendChild(h6);
        if (indices && indices.includes(i)) {
            bar.style.backgroundColor = "rgba(19, 38, 64, 1)";
            h6.style.color = "white";
        }
        box.appendChild(bar);
    }
}
function bubbleSort(array) {
    const swaps = [];
    do {
        var swapped = false;
        for (let i = 1; i < array.length; i++) {
            if (array[i - 1] > array[i]) {
                swaps.push([i - 1, i]);
                swapped = true;
                [array[i - 1], array[i]] = [array[i], array[i - 1]];
            }
        }
    } while (swapped);
    return swaps;
}
function insertionSort(arr) {
    const swaps = [];
    for (let i = 1; i < arr.length; i++) {
        for (let j = i - 1; j > -1; j--) {
            if (arr[j + 1] < arr[j]) {
                swaps.push([j + 1, j]);
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
            }
        }
    };

    return swaps;
}
function selectionSort(arr) {
    const swaps = [];
    for (let i = 0; i < arr.length; i++) {
        let lowest = i
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[lowest]) {
                lowest = j
            }
        }
        if (lowest !== i) {
            swaps.push([i, lowest]);
            [arr[i], arr[lowest]] = [arr[lowest], arr[i]];
        }
    }
    return swaps
}


//////////speeeeeed issueeeeeeeeeeeee