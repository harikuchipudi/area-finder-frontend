document.body.style.backgroundImage = "url(https://img.freepik.com/premium-vector/doodle-math-objects-border_1639-25785.jpg?ga=GA1.1.866335579.1742875381&semt=ais_hybrid)";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let points = [];

const base_url = "https://area-calculator-backend.onrender.com";

// Function to draw the Cartesian plane with labels
function drawCartesianPlane() {
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Draw Grid
    ctx.strokeStyle = "#ddd";
    for (let x = 0; x <= width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    for (let y = 0; y <= height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }

    // Draw X and Y axes
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Draw labels for X and Y axes
    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
    for (let x = -width / 2; x <= width / 2; x += 50) {
        if (x !== 0) {
            ctx.fillText(x / 10, (x + width / 2) - 10, height / 2 + 15);
        }
    }
    for (let y = -height / 2; y <= height / 2; y += 50) {
        if (y !== 0) {
            ctx.fillText(-y / 10, width / 2 + 5, (y + height / 2) + 5);
        }
    }
}

// Convert screen coordinates to Cartesian coordinates
function getCartesianCoords(x, y) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    return {
        x: (x - centerX) / 10,
        y: (centerY - y) / 10
    };
}

// Click event to add points and redraw the polygon
canvas.addEventListener("click", function (event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    let cartesianPoint = getCartesianCoords(x, y);

    // Format: Array of Arrays
    points.push([cartesianPoint.x, cartesianPoint.y]);

    drawCartesianPlane();
    drawPoints();
    drawPolygon(); // Draw the polygon each time a new point is added
});

// Draw selected points
function drawPoints() {
    points.forEach(point => {
        let screenX = (point[0] * 10) + canvas.width / 2;
        let screenY = canvas.height / 2 - (point[1] * 10);

        ctx.beginPath();
        ctx.arc(screenX, screenY, 5, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
    });
}

// Connect the vertices and draw the polygon
function drawPolygon() {
    if (points.length < 3) return; // Need at least 3 points to draw a polygon

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.beginPath();

    // Move to the first point
    let startX = (points[0][0] * 10) + canvas.width / 2;
    let startY = canvas.height / 2 - (points[0][1] * 10);
    ctx.moveTo(startX, startY);

    // Draw lines between all points
    for (let i = 1; i < points.length; i++) {
        let screenX = (points[i][0] * 10) + canvas.width / 2;
        let screenY = canvas.height / 2 - (points[i][1] * 10);
        ctx.lineTo(screenX, screenY);
    }

    // Close the polygon by connecting the last point to the first point
    ctx.lineTo(startX, startY);

    ctx.stroke();
}

// Log selected points
function logVertices() {
    console.log("Selected Vertices:", points);
    alert("Check the console for the selected vertices.");
}

console.log(points);

async function findAreaOfUnKnownPolygon(points) {
    try {
        // Make the fetch call to the API
        const response = await fetch(`${base_url}/api/shapes/polygon`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(points)
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log("Area from API response:", responseData.area);
            // alert(`The area of the polygon is: ${responseData.area}`);
            document.getElementById("result-text").value = `The are of the selected polygon is: ${responseData.area} Square CM`;
        } else {
            console.error("Error:", response.status, response.statusText);
        }
    } catch (error) {
        console.error("Fetch error:", error);
        alert("An error occurred while fetching the area of the polygon.");
    }
}

document.getElementById("submit-btn").addEventListener("click", () => findAreaOfUnKnownPolygon(points));

// Reset the canvas
function resetCanvas() {
    points = [];
    drawCartesianPlane();
}

drawCartesianPlane();

// const canvas = document.getElementById("canvas");
//         const ctx = canvas.getContext("2d");
//         let points = [];
 
//         // Function to draw the Cartesian plane
//         function drawCartesianPlane() {
//             const width = canvas.width;
//             const height = canvas.height;
//             ctx.clearRect(0, 0, width, height);
 
//             // Draw Grid
//             ctx.strokeStyle = "#ddd";
//             for (let x = 0; x <= width; x += 50) {
//                 ctx.beginPath();
//                 ctx.moveTo(x, 0);
//                 ctx.lineTo(x, height);
//                 ctx.stroke();
//             }
//             for (let y = 0; y <= height; y += 50) {
//                 ctx.beginPath();
//                 ctx.moveTo(0, y);
//                 ctx.lineTo(width, y);
//                 ctx.stroke();
//             }
 
//             // Draw X and Y axes
//             ctx.strokeStyle = "black";
//             ctx.lineWidth = 2;
//             ctx.beginPath();
//             ctx.moveTo(width / 2, 0);
//             ctx.lineTo(width / 2, height);
//             ctx.stroke();
 
//             ctx.beginPath();
//             ctx.moveTo(0, height / 2);
//             ctx.lineTo(width, height / 2);
//             ctx.stroke();
//         }
 
//         // Convert screen coordinates to Cartesian coordinates
//         function getCartesianCoords(x, y) {
//             const centerX = canvas.width / 2;
//             const centerY = canvas.height / 2;
//             return {
//                 x: (x - centerX) / 10,
//                 y: (centerY - y) / 10
//             };
//         }
 
//         // Click event to add points and redraw the polygon
//         // canvas.addEventListener("click", function(event) {
//         //     let rect = canvas.getBoundingClientRect();
//         //     let x = event.clientX - rect.left;
//         //     let y = event.clientY - rect.top;
 
//         //     let cartesianPoint = getCartesianCoords(x, y);
//         //     console.log(cartesianPoint);
//         //     points.push(cartesianPoint);
 
//         //     drawCartesianPlane();
//         //     drawPoints();
//         //     drawPolygon(); // Draw the polygon each time a new point is added
//         // });

//         // Click event to add points and redraw the polygon
//         canvas.addEventListener("click", function (event) {
//             let rect = canvas.getBoundingClientRect();
//             let x = event.clientX - rect.left;
//             let y = event.clientY - rect.top;

//             let cartesianPoint = getCartesianCoords(x, y);

//             // Change points format: add as array or object
//             // Uncomment one of the formats below based on your requirements

//             // Format 1: Array of Arrays
//             points.push([cartesianPoint.x, cartesianPoint.y]);

//             // Format 2: Array of Objects
//             // points.push({ x: cartesianPoint.x, y: cartesianPoint.y })

//             drawCartesianPlane();
//             drawPoints();
//             drawPolygon(); // Draw the polygon each time a new point is added
//         });

 
//         // Draw selected points
//         function drawPoints() {
//             points.forEach(point => {
//                 let screenX = (point.x * 10) + canvas.width / 2;
//                 let screenY = canvas.height / 2 - (point.y * 10);
 
//                 ctx.beginPath();
//                 ctx.arc(screenX, screenY, 5, 0, Math.PI * 2);
//                 ctx.fillStyle = "red";
//                 ctx.fill();
//             });
//         }
 
//         // Connect the vertices and draw the polygon
//         function drawPolygon() {
//             if (points.length < 2) return; // Need at least 2 points to draw lines

//             ctx.strokeStyle = "blue";
//             ctx.lineWidth = 2;
//             ctx.beginPath();

//             // Move to the first point
//             let startX = (points[0].x * 10) + canvas.width / 2;
//             let startY = canvas.height / 2 - (points[0].y * 10);
//             ctx.moveTo(startX, startY);

//             // Draw lines between all points
//             for (let i = 1; i < points.length; i++) {
//                 let screenX = (points[i].x * 10) + canvas.width / 2;
//                 let screenY = canvas.height / 2 - (points[i].y * 10);
//                 ctx.lineTo(screenX, screenY);
//             }

//             // Close the polygon by connecting the last point to the first point
//             ctx.lineTo(startX, startY);

//             ctx.stroke();
//         }
 
//         // Log selected points
//         function logVertices() {
//             console.log("Selected Vertices:", points);
//             alert("Check the console for the selected vertices.");
//         }

//         console.log(points);

        

//         async function findAreaOfUnKnownPolygon() {
//             try {
//                 // Make the fetch call to the API
//                 const response = await fetch("http://localhost:8084/api/shapes/polygon", {
//                     method: "POST", 
//                     headers: {
//                         "Content-Type": "application/json" 
//                     },
//                     body: JSON.stringify(points)
//                 });

                
//                 if (response.ok) {
//                     const responseData = await response.json();
//                     console.log("Area from API response:", responseData.area);
//                     alert(`The area of the polygon is: ${responseData.area}`);

//                 } else {
//                     console.error("Error:", response.status, response.statusText);
//                 }
//             } catch (error) {
//                 console.error("Fetch error:", error);
//                 alert("An error occurred while fetching the area of the polygon.");
//             }
//         }

//         document.getElementById("submit-btn").addEventListener("click", findAreaOfUnKnownPolygon);

 
//         // Reset the canvas
//         function resetCanvas() {
//             points = [];
//             drawCartesianPlane();
//         }
 
//         drawCartesianPlane();