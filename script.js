

const n = 15;
const array = [];
init(); // Initialize the array and display

function init() {
    for (let i = 0; i < n; i++) {
        array[i] = Math.random();
    }
    showbars();
    definition.innerHTML = "";
}

function play() {
    const copy = [...array];
    const moves = bubblesort(copy);
    animate(moves);
    showbars();
    definebubble();
}

function selectplay() {
    const copy = [...array];
    const moves = selectionsort(copy);
    animate(moves);
    showbars();
    defineselect();
}

function insertplay() {
    const copy = [...array];
    const moves = insertionsort(copy);
    animate(moves);
    showbars();
    defineinsert();
}

function mergeplay() {
    const copy = [...array]; // Make a copy of the array to sort
    const moves = mergesort(copy); // Call the merge sort function
    animate(moves); // Animate the sorting process
    showbars(); // Update the bars visually
    definemerge(); // Additional setup for merge visualization, if needed
}

function quickplay() {
    const copy = [...array];
    const moves = quicksort(copy);
    animate(moves);
    showbars();
    definequick();
}

function animate(moves) {
    // Base case: If there are no more moves to perform, stop the animation.
    if (moves.length === 0) {
        showbars();
        return;
    }
    
    const move = moves.shift(); // Get the first move
    const [i, j] = move.indices;
    
    if (move.type === "swap") {
        [array[i], array[j]] = [array[j], array[i]];
    } else if (move.type === "overwrite") {
        array[i] = move.value;
    }
    
    showbars(move); // Update the bars visually based on the current move
    setTimeout(function() {
        animate(moves); // Recursively animate the next move after a delay
    }, 80);
}

function bubblesort(array) {
    const moves = [];
    for (let i = 0; i < array.length - 1; i++) {
        let swapped = 0;
        for (let j = 0; j < array.length - i - 1; j++) {
            moves.push({ indices: [j, j + 1], type: "comp" });
            if (array[j] > array[j + 1]) {
                swapped = 1;
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                moves.push({ indices: [j, j + 1], type: "swap" });
            }
        }
        if (swapped === 0) {
            break;
        }
    }
    return moves;
}

function selectionsort(array) {
    const moves = [];
    for (let i = 0; i < array.length - 1; i++) {
        let min = i;
        for (let j = i + 1; j < array.length; j++) {
            moves.push({ indices: [j, min], type: "comp" });
            if (array[j] < array[min]) {
                min = j;
            }
        }
        if (min !== i) {
            [array[i], array[min]] = [array[min], array[i]];
            moves.push({ indices: [min, i], type: "swap" });
        }
    }
    return moves;
}

function insertionsort(array) {
    const moves = [];
    for (let i = 1; i < array.length; i++) {
        for (let j = i; j > 0; j--) {
            moves.push({ indices: [j, j - 1], type: "comp" });
            if (array[j] < array[j - 1]) {
                [array[j], array[j - 1]] = [array[j - 1], array[j]];
                moves.push({ indices: [j, j - 1], type: "swap" });
            } else {
                break;
            }
        }
    }
    return moves;
}

function mergesort(array) {
    const moves = [];

    function mergeSortHelper(arr, start, end) {
        if (start >= end) return;
        const mid = Math.floor((start + end) / 2);
        mergeSortHelper(arr, start, mid);
        mergeSortHelper(arr, mid + 1, end);
        merge(arr, start, mid, end);
    }

    function merge(arr, start, mid, end) {
        const left = arr.slice(start, mid + 1);
        const right = arr.slice(mid + 1, end + 1);
        let i = 0, j = 0, k = start;

        while (i < left.length && j < right.length) {
            moves.push({ indices: [k, start + i, mid + 1 + j], type: "comp" });
            if (left[i] <= right[j]) {
                arr[k] = left[i];
                i++;
            } else {
                arr[k] = right[j];
                j++;
            }
            moves.push({ indices: [k], type: "overwrite", value: arr[k] });
            k++;
        }

        while (i < left.length) {
            arr[k] = left[i];
            moves.push({ indices: [k], type: "overwrite", value: arr[k] });
            i++;
            k++;
        }

        while (j < right.length) {
            arr[k] = right[j];
            moves.push({ indices: [k], type: "overwrite", value: arr[k] });
            j++;
            k++;
        }
    }

    mergeSortHelper(array, 0, array.length - 1);
    return moves;
}

function quicksort(array) {
    const moves = [];

    function quickSortHelper(arr, low, high) {
        if (low < high) {
            const pivotIndex = partition(arr, low, high);
            quickSortHelper(arr, low, pivotIndex - 1);
            quickSortHelper(arr, pivotIndex + 1, high);
        }
    }

    function partition(arr, low, high) {
        const pivot = arr[high]; // Choosing the last element as the pivot
        let i = low - 1;

        for (let j = low; j < high; j++) {
            moves.push({ indices: [j, high], type: "comp" }); // Comparison
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
                moves.push({ indices: [i, j], type: "swap" });
            }
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Swap pivot to correct position
        moves.push({ indices: [i + 1, high], type: "swap" });

        return i + 1;
    }

    quickSortHelper(array, 0, array.length - 1);
    return moves;
}
function defineselect(){
    definition.innerHTML="";
    definition.innerHTML="<h2><b>Definition</b> </h2>";

    definition.innerHTML+="<p> The Selection sort algorithm is based on the idea of finding the minimum or maximum element in an unsorted array and then putting it in its correct position in a sorted array.</p>";
    definition.innerHTML+=" <p>The smallest value among the unsorte elements of the array is selected in every iteration and placed in appropriate position .</p>";
    definition.innerHTML+="<img src=\"selection.png\">";
    definition.innerHTML+=" <h2>Time complexity</h2>";
    definition.innerHTML+="<img src=\"images.png\" >";

}
function definebubble(){
    definition.innerHTML="";
    definition.innerHTML=" <h2><b>Definition</b> </h2>";
    definition.innerHTML+=" <p>Bubble sort is based on the idea of repeatedly comparing pairs of adjacent elements and then swapping their positions if they exist in the wrong order.</p>";
    definition.innerHTML+="<img src=\"bubble.png\">";
    definition.innerHTML+=" <h2>Time complexity</h2>";
    definition.innerHTML+="<img src=\"images.png\" >";
}
function defineinsert(){
    definition.innerHTML="";
    definition.innerHTML=" <h2><b>Definition</b> </h2>";
    definition.innerHTML+="  <p>Similar to the way of you sort playing cards in hand. The array is viratually split into a sorted and an unsorted parts. Values from the unsorted part are picked and placed at the correct position in sort part.</p>";
    definition.innerHTML+="<img src=\"insert.png\">";
    definition.innerHTML+=" <h2>Time complexity</h2>";
    definition.innerHTML+="<img src=\"images.png\" >";
}
function definemerge(){
    definition.innerHTML="";
    definition.innerHTML=" <h2><b>Definition</b> </h2>";
    definition.innerHTML+="<p> Merge Sort is a divide-and-conquer sorting algorithm that works by recursively splitting an array into smaller subarrays, sorting those subarrays, and then merging them back together in a sorted manner.</p>";

    definition.innerHTML+="<img src=\"merge.png\">";
   definition.innerHTML+=" <h2>Time complexity</h2>";
    definition.innerHTML+="<img src=\"images.png\" >";

}
function definequick(){
    definition.innerHTML="";
    definition.innerHTML=" <h2><b>Definition</b> </h2>";
    definition.innerHTML+="<p> Quick Sort is an efficient, in-place, divide-and-conquer sorting algorithm that works by selecting a <b>pivot</b> element from the array and partitioning the other elements into two subarrays: those less than the pivot and those greater than the pivot. The algorithm then recursively sorts the subarrays.</p>";
   // definition.innerHTML+=" <p>The smallest value among the unsorte elements of the array is selected in every iteration and placed in appropriate position .</p>";
    definition.innerHTML+="<img src=\"quickSort.jpg>";
    definition.innerHTML+=" <h2>Time complexity</h2>";
    definition.innerHTML+="<img src=\"images.png\" >";

}

/*function showbars(move) {
    container.innerHTML = "";
    for (let i = 0; i < n; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100 + "%";
        bar.classList.add("bar");
        if (move && move.indices.includes(i)) {
            bar.style.backgroundColor = move.type === "swap" ? "red" : "blue";
        }
        container.appendChild(bar);
    }
}*/
function showbars(move) {
    container.innerHTML = "";
    for (let i = 0; i < n; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100 + "%";
        bar.classList.add("bar");

        // Create and style the text element
        const text = document.createElement("span");
        text.textContent = Math.floor(array[i] * 100); // Convert to integer
        text.style.position = "absolute";
        text.style.bottom = "0";
        text.style.left = "50%";
        text.style.transform = "translateX(-50%)";
        text.style.color = "black";
        text.style.fontSize = "14px";
        text.style.fontWeight = "bold";
        
        bar.style.position = "relative"; // Required for text positioning inside the bar
        
        if (move && move.indices.includes(i)) {
            bar.style.backgroundColor = move.type === "swap" ? "red" : "blue";
        }

        bar.appendChild(text); // Add the text element to the bar
        container.appendChild(bar);
    }
}



