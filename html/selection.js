
/* Selection Sort Visualization
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

async function start() {

    if (!running) {
        running = true;
        var min = 0;

        for (var i = 0; i < size; i++) {
            min = i;
            for (var j = i; j < size; j++) {
                var temp = min;
                // Select Current and Minimum Element
                elements[j].select();
                elements[temp].select();

                // Draw Element Updates
                draw();

                // If Current Element is Less Than Minimum, Replace Minimum with Current Element
                if (elements[j].value < elements[min].value)
                    min = j;

                // Wait for Delay
                await sleep(interval);

                // Unselect Current and Minimum Element
                elements[j].unselect();
                elements[temp].unselect();

                // Draw Element Updates
                draw();
            }

            // Swap Current and Minimum Elements
            swap(elements, min, i);
        }

        // Draw Final Results
        draw();
        running = false;
        update();
    }
    
}

function draw() {
    Canvas.draw();
}

function sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
}

function swap(array, left, right) {
    [array[left], array[right]] = [array[right], array[left]];
}

var Canvas = {
    canvas: document.getElementById("canvas"),
    width: 0,
    height: 0,
    context: 0,
    xRange: 0,
    text: "selection sort - " + size + " elements  " + interval + "ms delay",
    start: function () {
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.context = this.canvas.getContext("2d");
        this.xRange = this.width - 10;
        this.text = "selection sort - " + size + " elements  " + interval + "ms delay";

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