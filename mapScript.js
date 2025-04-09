document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([13.0827, 80.2707], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const pointsList = document.getElementById('pointsList');
    const logDistancesBtn = document.getElementById('logDistancesBtn');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const sidebar = document.getElementById('sidebar');
    const areaDisplay = document.getElementById('areaDisplay');
    let markers = [];
    let coordinatesData = []; 

    
    sidebar.style.display = 'none';
    logDistancesBtn.style.display = 'none';
    areaDisplay.textContent = 'Area: ';

    hamburgerMenu.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        
        if (sidebar.classList.contains('open')) {
            sidebar.style.display = 'block';
            if (markers.length > 0) {
                logDistancesBtn.style.display = 'block';
                areaDisplay.style.display = 'block';
                
            }
        } else {
            sidebar.style.display = 'none';
            logDistancesBtn.style.display = 'none';
            areaDisplay.style.display = 'none';
            
        }
    });

    map.on('click', (e) => {
        const newMarker = L.marker(e.latlng).addTo(map);
        markers.push(newMarker);
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        console.log(lat);
        console.log(lng);
        // coordinatesData.push({ latitude: lat, longitude: lng });
        coordinatesData.push([lat, lng]);
        addPointToList({ latitude: lat, longitude: lng }, markers.length - 1);
        
        logDistancesBtn.style.display = 'block';
        areaDisplay.style.display = 'block';
    });

    function addPointToList(coord, index) {
        const listItem = document.createElement('li');
        listItem.textContent = `Point ${index + 1}: Lat: ${coord.latitude.toFixed(4)}, Lng: ${coord.longitude.toFixed(4)}`;
        pointsList.appendChild(listItem);
    }

    // Function to calculate the distance between two coordinates using Haversine formula (in meters)
    function haversineDistance(lat1, lon1, lat2, lon2) {
        const R = 6371e3; // metres
        const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                  Math.cos(φ1) * Math.cos(φ2) *
                  Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const d = R * c; // in metres
        return d;
    }

    function calculatePerimeter() {
        let perimeter = 0;
        if (markers.length < 2) return perimeter.toFixed(2);
        for (let i = 0; i < markers.length; i++) {
            const currentPoint = markers[i].getLatLng();
            const nextIndex = (i + 1) % markers.length;
            const nextPoint = markers[nextIndex].getLatLng();
            perimeter += haversineDistance(currentPoint.lat, currentPoint.lng, nextPoint.lat, nextPoint.lng);
        }
        return perimeter.toFixed(2);
    }

    function calculateArea() {
        if (markers.length < 3) return 'N/A'; // Need at least 3 points for an area
        let area = 0;
        const R = 6371e3; // Earth radius in meters
        const toRad = Math.PI / 180;

        for (let i = 0; i < markers.length; i++) {
            const p1 = markers[i].getLatLng();
            const p2 = markers[(i + 1) % markers.length].getLatLng();
            area += (p2.lng - p1.lng) * toRad * (2 + Math.sin(p1.lat * toRad) + Math.sin(p2.lat * toRad));
        }
        area = area * R * R / 2.0;
        return Math.abs(area).toFixed(2); // Absolute value for correct orientation
    }

    function convertToSquareMetres(result){
      return result*1000*1000;
    }

    function convertToAcres(result){
      const conversionFactor = 0.000247105; // Conversion factor from square meters to acres

      const areaAcres = result * conversionFactor;
      return areaAcres;
    }


    async function findPlotArea() {
        try {
            console.log(coordinatesData);
          const response = await fetch("http://localhost:8084/api/shapes/mapArea", {
            method: "POST", // HTTP POST method
            headers: {
              "Content-Type": "application/json" // Specify JSON content type
            },
            body: JSON.stringify(coordinatesData) // Convert coordinates to JSON string
          });
      
          if (response.ok) {
            const responseData = await response.json(); // Parse JSON response
            console.log("Area from API response:", responseData.area);
            const result_data = convertToSquareMetres(responseData.area);
            const result_acres = convertToAcres(result_data);
            document.getElementById("areaDisplay").innerText = `Area : ${responseData.area} Square Km`; 
            document.getElementById("areaSqM").innerText = `Area : ${result_data} Square Metres`;
            document.getElementById("areaAcres").innerText = `Area: ${result_acres} Acres!!!!`;
          } else {
            console.error("Error:", response.status, response.statusText);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      }

logDistancesBtn.addEventListener("click", findPlotArea);

//     logDistancesBtn.addEventListener('click', () => {
//         if (markers.length < 2) {
//             console.log("Please add at least two points to calculate distances.");
//             areaDisplay.textContent = 'Area: N/A';
//             perimeterDisplay.textContent = 'Perimeter: Add at least 2 points';
//             alert("How the hello can we find area with two points");
//             return;
//         }

//         areaDisplay.textContent = `Area: ${area} sq meters`;
//         perimeterDisplay.textContent = `Perimeter: ${perimeter} meters`;

//         // const distances = [];
//         // for (let i = 0; i < markers.length; i++) {
//         //     const currentPoint = markers[i].getLatLng();
//         //     const nextIndex = (i + 1) % markers.length;
//         //     const nextPoint = markers[nextIndex].getLatLng();
//         //     const distance = haversineDistance(currentPoint.lat, currentPoint.lng, nextPoint.lat, nextPoint.lng).toFixed(2);
//         //     distances.push(parseFloat(distance));
//         //     console.log(`Point ${i + 1} to Point ${nextIndex + 1}: ${distance} meters`);
//         // }

//         const mapDimensions = {
//             width: map.getSize().x,
//             height: map.getSize().y
//         };

//         const jsonData = {
//             coordinates: coordinatesData,
//             distances: distances,
//             perimeter: parseFloat(perimeter),
//             area: area === 'N/A' ? null : parseFloat(area),
//             mapDimensions: mapDimensions
//         };

//         co

//         // console.log("JSON Data for Backend (including area and perimeter):");
//         // console.log(JSON.stringify(jsonData));

        
//         /*
//         fetch('/api/process-map-data', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(jsonData)
//         })
//         .then(response => {
//             if (!response.ok) {
//                 return response.text().then(text => {
//                     throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
//                 });
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Success:', data);
//             // Handle the response from your backend
//         })
//         .catch((error) => {
//             console.error('Error sending data to backend:', error);
//             // Optionally display an error message to the user
//         });
//         */
//     });
});