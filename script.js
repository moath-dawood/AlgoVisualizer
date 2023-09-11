let n = 10;
const array = [];

numOfElements();

function randomize() {
    numOfElements()
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
    disableButtons();
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
    else if (algo == "quick") { // Handle the new algorithm
        const swap = quickSort([...array]);
        animate(swap);
    }
    else if (algo == "heap") { // Handle the new algorithm
        const swap = heapSort([...array]);
        animate(swap);
    }
}

function animate(swaps) {
    let speed = document.getElementById("speed").value;
    if (swaps.length == 0) {
        displayBars();
        // Enable buttons when animation is finished
        enableButtons();
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

function disableButtons() {
    document.getElementById("visualizeBtn").disabled = true;
    document.getElementById("visualizeBtn").classList.add("disabled-button");
    document.getElementById("randomizeBtn").disabled = true;
    document.getElementById("randomizeBtn").classList.add("disabled-button");
    document.getElementById("algo").disabled = true;
    document.getElementById("slider").disabled = true;
    document.getElementById("size").disabled = true;
    document.getElementById("size").classList.add("disabled-button");

}

function enableButtons() {
    document.getElementById("visualizeBtn").disabled = false;
    document.getElementById("visualizeBtn").classList.remove("disabled-button");
    document.getElementById("randomizeBtn").disabled = false;
    document.getElementById("randomizeBtn").classList.remove("disabled-button");
    document.getElementById("algo").disabled = false;
    document.getElementById("slider").disabled = false;
    document.getElementById("size").disabled = false;
    document.getElementById("size").classList.remove("disabled-button");
}

function measureExecutionTime(sortFunction, arr) {
    const startTime = performance.now();
    const swaps = sortFunction([...arr]); // Clone the array before sorting
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    return { swaps, executionTime };
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
function quickSort(arr) {
    const swaps = [];

    // Helper function to perform the partitioning
    function partition(left, right) {
        const pivotValue = arr[Math.floor((left + right) / 2)];
        let i = left;
        let j = right;

        while (i <= j) {
            while (arr[i] < pivotValue) {
                i++;
            }
            while (arr[j] > pivotValue) {
                j--;
            }
            if (i <= j) {
                if (i !== j) {
                    swaps.push([i, j]);
                }
                [arr[i], arr[j]] = [arr[j], arr[i]];
                i++;
                j--;
            }
        }
        return i;
    }

    // Recursive function to perform the sorting
    function quickSortRecursive(left, right) {
        if (left < right) {
            const pivotIndex = partition(left, right);
            quickSortRecursive(left, pivotIndex - 1);
            quickSortRecursive(pivotIndex, right);
        }
    }

    quickSortRecursive(0, arr.length - 1);
    return swaps;
}
function heapSort(arr) {
    const swaps = [];

    // Helper function to perform the heapify operation
    function heapify(arr, n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }

        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }

        if (largest !== i) {
            swaps.push([i, largest]);
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            heapify(arr, n, largest);
        }
    }

    // Main Heap Sort function
    function heapSortMain(arr) {
        const n = arr.length;

        // Build a max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }

        // Extract elements from the heap one by one
        for (let i = n - 1; i > 0; i--) {
            swaps.push([0, i]);
            [arr[0], arr[i]] = [arr[i], arr[0]]; // Swap root with the last element
            heapify(arr, i, 0); // Call heapify on the reduced heap
        }
    }

    heapSortMain(arr);

    return swaps;
}





//////////speeeeeed issueeeeeeeeeeeee