
/* Merge Sort Visualization
 * 
 * @author Luis Sanchez
 * @version April 27, 2022
*/

/*===== Globals =====*/
var elements = [];  // Elements array
var size = 100;     // Number of Elements
var interval = 1;   // Milliseconds to next update
var running = false;// Whether the algorithm is running
/*===================*/

function init() {
    // Initialize Canvas
    update();

    // Draw Initial Elements
    draw();
}

function update() {
    if (!running) {
        interval = document.getElementById("delay").value;
        size = document.getElementById("elements").value;
        Canvas.start();
        draw();
    }
}

function shuffle() {
    if (!running) {
        var currentIndex = elements.length
        var randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [elements[currentIndex], elements[randomIndex]] = [elements[randomIndex], elements[currentIndex]];
        }

        // Draw Element Updates
        draw();
    }
}

function start() {
    if (!running) {
        running = true;

        // Start Merge Sort
        mergesort();

        // Draw Final Results
        draw();
    }
}

async function mergesort() {
    var curr_size;

    var left_start;

    for (curr_size = 1; curr_size <= size - 1; curr_size = 2 * curr_size) {

        // Pick starting point of different
        // subarrays of current size
        for (left_start = 0; left_start < size - 1; left_start += 2 * curr_size) {
            // Find ending point of left
            // subarray. mid+1 is starting
            // point of right
            var mid = Math.min(left_start + curr_size - 1, size - 1);

            var right_end = Math.min(left_start + 2 * curr_size - 1, size - 1);

            // Merge Subarrays arr[left_start...mid]
            // & arr[mid+1...right_end]

            var l = left_start;
            var m = mid;
            var r = right_end;

            var i, j, k;
            var n1 = m - l + 1;
            var n2 = r - m;

            /* create temp arrays */
            var L = Array(n1).fill(0);
            var R = Array(n2).fill(0);

            /*
             * Copy data to temp arrays L and R
             */
            for (i = 0; i < n1; i++)
                L[i] = elements[l + i];
            for (j = 0; j < n2; j++)
                R[j] = elements[m + 1 + j];

            /*
             * Merge the temp arrays back into arr[l..r]
             */
            i = 0;
            j = 0;
            k = l;
            while (i < n1 && j < n2) {
                if (L[i].value <= R[j].value) {
                    elements[k] = L[i];
                    elements[k].select();
                    draw();
                    if (interval > 0)
                        await sleep(interval);
                    elements[k].unselect();
                    draw();
                    i++;
                } else {
                    elements[k] = R[j];
                    elements[k].select();
                    draw();
                    if (interval > 0)
                        await sleep(interval);
                    elements[k].unselect();
                    draw();
                    j++;
                }
                k++;
            }

            /*
             * Copy the remaining elements of L, if there are any
             */
            while (i < n1) {
                elements[k] = L[i];
                elements[k].select();
                draw();
                i++;
                k++;
                if (interval > 0)
                    await sleep(interval);
                elements[k - 1].unselect();
                draw();
            }

            /*
             * Copy the remaining elements of R, if there are any
             */
            while (j < n2) {
                elements[k] = R[j];
                elements[k].select();
                j++;
                k++;
                draw();
                if (interval > 0)
                    await sleep(interval);
                elements[k - 1].unselect();
                draw();
            }
            draw();
        }
    }

    running = false;
    update();
}

function draw() {
    Canvas.draw();
}

function sleep (ms) {
    return new Promise(res => setTimeout(res, ms));
};

function swap(array, left, right) {
    [array[left], array[right]] = [array[right], array[left]];
}



var Canvas = {
    canvas: document.getElementById("canvas"),
    width: 0,
    height: 0,
    context: 0,
    xRange: 0,
    text: "merge sort - " + size + " elements  " + interval + "ms delay",
    start: function () {
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.context = this.canvas.getContext("2d");
        this.xRange = this.width - 10;
        this.text = "merge sort O(N * Log N) - " + size + " elements  " + interval + "ms delay";

        var minHeight = 50;
        var yRange = this.height - minHeight - 10;

        elements = [size];

        for (var i = 1; i <= size; i++) {
            elements[i - 1] = new Element(
                i,
                0,
                yRange - ((yRange * (i / size))),
                (this.xRange - size) / size,
                (yRange * (i / size)) + minHeight
            );
        }
    },
    clear: function () {
        this.context.clearRect(0, 0, this.width, this.height);
    },
    draw: function () {
        this.clear();

        var length = elements.length;

        for (var i = 0; i < length; i++) {
            var element = elements[i];

            // Update Position
            element.x = i * (this.xRange / size) + 5;

            // Draw Elements
            element.draw(this.context);
        }

        // Draw Text
        this.context.font = '32px serif';
        this.context.fillStyle = "black";
        this.context.fillText(this.text, 10, 30);
    }
}

function Element(value, x, y, width, height) {
    this.value = value;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = "grey";

    this.draw = function (context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    this.select = function () {
        this.color = "red";
    }

    this.unselect = function () {
        this.color = "grey";
    }
}