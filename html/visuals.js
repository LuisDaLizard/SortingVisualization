console.log("Hi");

var canvas = document.getElementById("myCanvas");
console.log(canvas);
var context = canvas.getContext("2d");

// Create gradient
var gradient = context.createLinearGradient(0, 0, 200, 0);
gradient.addColorStop(0, "red");
gradient.addColorStop(1, "white");

// Fill with gradient
context.fillStyle = gradient;
context.fillRect(10, 10, 150, 80);