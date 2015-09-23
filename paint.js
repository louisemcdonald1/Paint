var canvas;
var context;

window.onload = function () {
	//get the canvas and the drawing context
	canvas = document.getElementById("drawingCanvas");
	context = canvas.getContext("2d");
	//give the canvas a white background, so that erasing works
	context.fillStyle = "white";
	context.fillRect(0, 0, canvas.width, canvas.height);
	//set a default stroke and fill style
	context.strokeStyle = "black";
	context.fillStyle = "black";
	
	//attach the events needed to start drawing
	canvas.onmousedown = startDrawing;
	canvas.onmouseup = stopDrawing;
	canvas.onmouseout = stopDrawing;
	canvas.onmousemove = draw;
};	

//keep track of the previous clicked <img> element for colour
var previousColorElement;

function changeColor(color, imgElement) {
	//change the current drawing color
	context.strokeStyle = color;
	context.fillStyle = color;
	
	//give the newly clicked <img> element a new style
	imgElement.className = "Selected";
	
	//return the previously clicked <img> element to its normal state
	if (previousColorElement != null) 
	{
		previousColorElement.className = "";
	}
	previousColorElement = imgElement;
}

//keep track of the previous clicked <img> element for thickness
var previousThicknessElement;

function changeThickness(thickness, imgElement) {
	//change the current drawing Thickness
	context.lineWidth = thickness;
	
	//give the newly clicked <img> element a new style
	imgElement.className = "Selected";
	
	//return the previously clicked <img> element to its normal state
	if (previousThicknessElement != null) 
	{
		previousThicknessElement.className = "";
	}
	previousThicknessElement = imgElement;
}
//keep track of the previous clicked <img> element for thickness of erase
var previousEraseElement;

function erase(thickness, imgElement) {
	
	context.strokeStyle = "white";
	context.lineWidth = thickness;
	
	//give the newly clicked <img> element a new style
	imgElement.className = "Selected";
	
	//return the previously clicked <img> element to its normal state
	if (previousEraseElement != null) 
	{
		previousEraseElement.className = "";
	}
	previousEraseElement = imgElement;
}

//drawing
var isDrawing = false;
var shape = "line";
var shapeStartX = 0;
var shapeStartY = 0;
var circleCentreX = 0;
var circleCentreY = 0;
var radius = 0;
var circleStartingAngle = 0;
var circleEndingAngle = 2 * Math.PI;

function setShape(shapeSetting){
	if (shapeSetting == "rectangle")
	{
		shape = "rectangle";
		//alert("rectangle");
	}
	if (shapeSetting == "circle")
	{
		shape = "circle";
		//alert("circle");
	}
}

function startDrawing(e) {
	//start drawing
	isDrawing = true;
	
	//create a new path (with current stroke color and thickness)
	context.beginPath();
	
	//put the pen down where the mouse is positioned
	context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
	shapeStartX = e.pageX - canvas.offsetLeft;
	shapeStartY = e.pageY - canvas.offsetTop;
	
}

function draw(e){
	if (isDrawing == true)
	{
		//find the new position of the mouse
		var x = e.pageX - canvas.offsetLeft;
		var y = e.pageY - canvas.offsetTop;
		
		if(shape == "line")
		{
			//draw a line to the new position
			context.lineTo(x,y);
			context.stroke();
		}
		if(shape == "rectangle")
		{
			//alert(shape);
			//draw a rectangle to the new position
			context.fillRect(shapeStartX, shapeStartY, x - shapeStartX, y - shapeStartY);	
		}
		if(shape == "circle")
		{
			//alert("into circle drawing code");
			//draw a circle to the new position
			circleCentreX = (shapeStartX + x)/2;
			circleCentreY = (shapeStartY + y)/2;
			radius = circleCentreX/2;
			clearCanvas();
			context.arc(circleCentreX, circleCentreY, radius, circleStartingAngle, circleEndingAngle);
			context.stroke();
		}
		
	}
}


function stopDrawing(e) {
	isDrawing = false;
	shape = "line";
}

function clearCanvas() {
	//context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "white";
	context.fillRect(0, 0, canvas.width, canvas.height);
}

//var url = canvas.toDataURL("image/jpeg");

function saveCanvas() {
	//find the <img> element
	var imageCopy = document.getElementById("savedImageCopy");
	
	//show the canvas data in the image 
	imageCopy.src = canvas.toDataURL();
	
	//unhide the <div> that holds the <img>, so the picture is now visible
	var imageContainer = document.getElementById("savedCopyContainer");
	imageContainer.style.display = "block";
}
