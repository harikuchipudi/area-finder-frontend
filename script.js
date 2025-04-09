// document.body.style.backgroundImage = "url('Designer (1).jpeg')";
// document.body.style.backgroundImage = "url(https://tse4.mm.bing.net/th/id/OIP.eJk6t-7jy5K7qtGDZlmi2gHaHZ?rs=1&pid=ImgDetMain)"
document.body.style.backgroundImage = "url(https://img.freepik.com/free-vector/scientific-formulas-chalkboard_23-2148494010.jpg?ga=GA1.1.866335579.1742875381&semt=ais_hybrid)";
document.body.style.backgroundImage = "url(https://img.freepik.com/premium-vector/doodle-math-objects-border_1639-25785.jpg?ga=GA1.1.866335579.1742875381&semt=ais_hybrid)";
document.body.style.backgroundImage = "url(https://img.freepik.com/free-vector/back-school-background-hand-drawn-design_23-2148613801.jpg?ga=GA1.1.866335579.1742875381&semt=ais_hybrid)";


var polyType_ref = 0;
document.getElementById('poly-type').addEventListener('change', function() {
    const polyType = this.value;
    polyType_ref = this.value;
    
    // Hide all input containers initially
    document.getElementById('triangle-inputs').style.display = 'none';
    document.getElementById('square-inputs').style.display = 'none';
    document.getElementById('rectangle-inputs').style.display = 'none';
    document.getElementById('trapezoid-inputs').style.display = 'none';
    document.getElementById('circle-inputs').style.display = 'none';
    
    // Show the relevant input container based on the selected polygon
    if (polyType === 'Triangle') {
        document.getElementById('triangle-inputs').style.display = 'block';
        document.getElementById('triangle-card').style.display = 'block';
    } else if (polyType === 'Square') {
        document.getElementById('square-inputs').style.display = 'block';
    } else if (polyType === 'Rectangle') {
        document.getElementById('rectangle-inputs').style.display = 'block';
    } else if (polyType === 'Trapezoid') {
        document.getElementById('trapezoid-inputs').style.display = 'block';
    } else if (polyType === 'Circle') {
        document.getElementById('circle-inputs').style.display = 'block';
    }
});

document.getElementById("area-btn").addEventListener('click', async function () {

    const polygonType = document.getElementById("poly-type").value;
    

    console.log(polygonType);

    if(polygonType == "Triangle"){
        const base = document.getElementById("triangle-base").value;
        const height = document.getElementById("triangle-height").value;
        try {
            const response = await fetch("http://localhost:8084/api/shapes/triangle", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    base: base,
                    height: height,
                }),
            });

            if (response.ok) {
                const area = await response.json(); // Parse response as JSON
                console.log("Area received:", area);
                const from = area.from;
                // if(from === 1){
                //     document.getElementById("result-from").value = "This is not calculated, but fetched from the DB";
                // }
                // else{
                //     document.getElementById("result-from").value = "This is calculated!!!";
                // }
                document.getElementById("area-result").value = `The area of the triangle = ${area.area}`; // Update the result input field
            } else {
                console.error("Error in response:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }else if(polygonType == "Square"){
        const side = document.getElementById("square-side").value;
        try {
            // setInterval(animateSquare, 500); 
            const response = await fetch("http://localhost:8084/api/shapes/square", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    side: side,
                }),
            });

            if (response.ok) {
                const area = await response.json(); // Parse response as JSON
                console.log("Area received:", area);
                document.getElementById("area-result").value = `The are of the square is ${area.area}`; // Update the result input field
            } else {
                console.error("Error in response:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }
    else if(polygonType == "Rectangle"){
        const length = document.getElementById("rectangle-length").value;
        const width = document.getElementById("rectangle-breadth").value;
        try {
            const response = await fetch("http://localhost:8084/api/shapes/rectangle", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    length: length,
                    width: width,
                }),
            });

            if (response.ok) {
                const area = await response.json(); // Parse response as JSON
                console.log("Area received:", area);
                document.getElementById("area-result").value = `The area of the rectangle is ${area.area}`; // Update the result input field
            } else {
                console.error("Error in response:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }
    else if(polygonType == "Trapezoid"){
        const trapezoid_base1 = document.getElementById("trapezoid-base1").value;
        const trapezoid_base2 = document.getElementById("trapezoid-base2").value;
        const trapezoid_height = document.getElementById("trapezoid-height").value;
        try {
            const response = await fetch("http://localhost:8084/api/shapes/trapezoid", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    base1: trapezoid_base1,
                    base2: trapezoid_base2,
                    height: trapezoid_height
                }),
            });

            if (response.ok) {
                const area = await response.json(); // Parse response as JSON
                console.log("Area received:", area);
                document.getElementById("area-result").value = `The area of the trapezoid is ${area.area}`; // Update the result input field
            } else {
                console.error("Error in response:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }
    else if(polygonType == "Circle"){
        const radius = document.getElementById("circle-radius").value;
        try {
            const response = await fetch("http://localhost:8084/api/shapes/circle", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    radius: radius,
                }),
            });

            if (response.ok) {
                const area = await response.json(); // Parse response as JSON
                console.log("Area received:", area);
                document.getElementById("area-result").value = area.area; // Update the result input field
            } else {
                console.error("Error in response:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

});

const animationContainer = document.body;

function animateSquare(){
    const squareElement = document.createElement("div");
    squareElement.style.backgroundColor = "black";
    squareElement.style.boxShadow = "10px 10px 5px 5px grey";

    squareElement.style.left = 100 * Math.random() + "vw";

    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 5; 

    squareElement.style.animationDuration = `${duration}s`;
    squareElement.style.animationDelay = `${delay}s`;
    squareElement.style.animationName = "slideDown";
    squareElement.style.width = "50px";
    squareElement.style.height = "50px";
    squareElement.style.position = "absolute";

    animationContainer.appendChild(squareElement);

    setTimeout(() => {
        squareElement.remove();
    }, (duration + delay) * 1000);
}

// CSS for animation
const style = document.createElement("style");
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translateY(-100%);
            opacity: 1;
        }
        to {
            transform: translateY(100vh);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Call the function repeatedly to animate squares
// setInterval(animateSquare, 500); 


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let points = []

canvas.addEventListener("click", function(event){
    let rect = canvas.getBoundingClientRect();

    let x = event.clientX -event.left;
    let y = event.clientY - event.top;

    points.push({x, y});
    drawPolygon();
})

function drawPolygon(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    points.forEach((point, index)=> {
        if(index==0){
            ctx.movetTo(point.x, point.y);
        }
        else{
            ctx.lineTo(point.x, point.y);
        }
    });

    if(points.length > 2){
        ctx.lineTo(points[0].x, points[0].y);
    }

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.stroke();

    points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, Math.PI*2);
        ctx.fillStyle = "red";
        ctx.fill();
    });

    function resetCanvas(){
        points =[];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}



// document.getElementById("area-btn").addEventListener('click', function(){
//     const polygon_type = document.getElementById("polyType").value;
//     const base = document.getElementById("traingle-base").value;
//     const height = document.getElementById("triangle-height").value;

//     const response = fetch("http://localhost:8083/api/shapes/traingle",{
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: new URLSearchParams({
//             base: 10,
//             height: 20,
//         }),
//     });

//     document.getElementById("area-result").value = response;
// })

// Triangle inputs
// document.getElementById('triangle-base').addEventListener('input', function() {
//     const base = this.value;
//     console.log('Triangle Base:', base);
//     // Use this value in your external Java code for calculations
// });

// document.getElementById('triangle-height').addEventListener('input', function() {
//     const height = this.value;
//     console.log('Triangle Height:', height);
//     // Use this value in your external Java code for calculations
// });






// // Rectangle inputs
// document.getElementById('rectangle-length').addEventListener('input', function() {
//     const length = this.value;
//     console.log('Rectangle Length:', length);
//     // Use this value in your external Java code for calculations
// });

// document.getElementById('rectangle-breadth').addEventListener('input', function() {
//     const breadth = this.value;
//     console.log('Rectangle Breadth:', breadth);
//     // Use this value in your external Java code for calculations
// });

// // Trapezoid inputs
// document.getElementById('trapezoid-base1').addEventListener('input', function() {
//     const base1 = this.value;
//     console.log('Trapezoid Base 1:', base1);
//     // Use this value in your external Java code for calculations
// });

// document.getElementById('trapezoid-base2').addEventListener('input', function() {
//     const base2 = this.value;
//     console.log('Trapezoid Base 2:', base2);
//     // Use this value in your external Java code for calculations
// });

// document.getElementById('trapezoid-height').addEventListener('input', function() {
//     const height = this.value;
//     console.log('Trapezoid Height:', height);
//     // Use this value in your external Java code for calculations
// });

// // Circle input
// document.getElementById('circle-radius').addEventListener('input', function() {
//     const radius = this.value;
//     console.log('Circle Radius:', radius);
//     // Use this value in your external Java code for calculations
// });
