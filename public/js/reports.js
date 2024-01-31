/**
 * Websocket connection to send request
 */

const sensorCardModal = document.getElementById('sensorBodyCard');
// const sensorCard = document.getElementById('sensorCard');
const sensorHeader = document.getElementById('sensorCardHeader')

const socket = new WebSocket('wss://sensorfusionbackend.onrender.com/wss/data/')


socket.onopen = function open(e){
    console.log(true);
    setInterval(() => {
        socket.send(JSON.stringify({action: 'request.data'}))
    }, 3);
    
}

// socket.onmessage = function(event) {
//   let dataString = event.data
//   let dataArray = JSON.parse(dataString)
//    try {

//      if (Array.isArray(dataArray)) {
//         // console.log(dataArray);
//         dataArray.forEach(data =>{
//             console.log(data.id);
//             const sensorCard = document.createElement('div');
//             column = document.createElement('div')
//             column.className = 'col-md-4 mb-4';
//             sensorCard.className = 'card weather-card';
            
//         // Set card header content
//             sensorCard.innerHTML = `
//                 <div class="card-header">
//                     <p><strong>City</strong>: ${data.city_name}</p>
//                 </div>
//                 <div class="card-body">
//                     <p>Temperature: <span>${data.temperature}°C</span></p>
//                     <p>Humidity: <span>${data.humidity}</span></p>
//                     <p>Atmospheric Pressure: <span>${data.atmospheric_pressure} hPa</span></p>
//                     <p>Wind Speed: <span>${data.wind_speed} m/s</span></p>
//                     <p>Rainfall: <span>${data.rainfall} mm</span></p>
//                     <p>Weather ID: <span>${data.weather_id}</span></p>
//                     <p>Main Weather: <span>${data.main_weather}</span></p>
//                     <p>Weather Description: <span>${data.weather_description}</span></p>
//                     <p>Min Temperature: <span>${data.temp_min}°C</span></p>
//                     <p>Max Temperature: <span>${data.temp_max}°C</span></p>
//                     <p>Sea Level Pressure: <span>${data.sea_level_pressure} hPa</span></p>
//                     <p>Ground Level Pressure: <span>${data.ground_level_pressure} hPa</span></p>
//                     <p>Wind Direction Degree: <span>${data.wind_direction_deg}°</span></p>
//                     <p>Wind Gust: <span>${data.wind_gust} m/s</span></p>
//                     <p>Cloudiness Percentage: <span>${data.cloudiness_percentage}%</span></p>
//                     <p>Visibility Distance: <span>${data.visibility_distance} km</span></p>
//                     <p>City ID: <span>${data.city_id}</span></p>
//                     <p>HTTP Response Code: <span>${data.http_response_code}</span></p>
//                     <p>Last updated: <span>${data.updated_at}</span></p>

//                     <p class="sensor-name">Sensor: ${data.sensor_name}</p>
//                 </div>
//             `;

//             // Append the new card to the sensorBodyCard container
//             column.appendChild(sensorCard);
//             sensorCardModal.appendChild(column);
//         })

//      } else {
//         console.log('Error parsing to JSON. Not an array!');
//      }
//    } catch (error) {
//     console.error('Error:', error);
//    }
   
// };

socket.onerror = function(event) {
    console.error(event);
}


socket.onmessage = function(event) {
    let dataString = event.data;
    let dataArray = JSON.parse(dataString);
    // console.log(dataArray);
    try {
        if (Array.isArray(dataArray)) {
            // Clear existing cards
            sensorCardModal.innerHTML = '';

            dataArray.forEach(data => {
                // console.log(data.id);

                // Check if a card with the same ID already exists
                const existingCard = document.getElementById(`sensorCard_${data.id}`);
                if (existingCard) {
                    // Update existing card content
                    existingCard.innerHTML = `
                        <div class="card-header">
                            <p><strong>City</strong>: ${data.city_name}</p>
                        </div>
                        <div class="card-body">
                        <p class="card-text">
                        Weather in <b class="text-primary">${data.city_name}</b> tomorrow is forecasted to be
                      <strong class="text-primary">${data.main_weather}</strong>. It will be
                      <strong class="text-primary">${data.weather_description}</strong>. The daytime temperature will be around
                      <strong class="text-primary">${data.temperature}°C</strong>, and the temperature is expected to dip to
                      <strong class="text-primary">${data.temp_min}°C</strong> at night. The humidity will be
                      <strong class="text-primary">${data.humidity}%</strong>. Other details include:
                      </p>
                      <ul class="list-group">
                          <li class="list-group-item">
                              <strong class="text-primary">Atmospheric Pressure:</strong> ${data.atmospheric_pressure} hPa
                          </li>
                          <li class="list-group-item">
                              <strong class="text-primary">Wind Speed:</strong> ${data.wind_speed} m/s
                          </li>
                          <li class="list-group-item">
                              <strong class="text-primary">Wind Direction:</strong> ${data.wind_direction}
                          </li>
                          <li class="list-group-item">
                              <strong class="text-primary">Wind Direction Degree:</strong> ${data.wind_direction_deg}
                          </li>
                          <li class="list-group-item">
                              <strong class="text-primary">Wind Gust:</strong> ${data.wind_gust} m/s
                          </li>
                          <li class="list-group-item">
                              <strong class="text-primary">Rainfall:</strong> ${data.rainfall}
                          </li>
                          <li class="list-group-item">
                              <strong class="text-primary">Maximum temp:</strong> ${data.temp_max}°C
                          </li>
                          <li class="list-group-item">
                              <strong class="text-primary">Sea Level Pressure:</strong> ${data.sea_level_pressure} hPa
                          </li>
                          <li class="list-group-item">
                              <strong class="text-primary">Ground Level Pressure:</strong> ${data.ground_level_pressure} hPa
                          </li>
                          
                          <li class="list-group-item">
                              <strong class="text-primary">Cloudiness Percentage:</strong> ${data.cloudiness_percentage / 100}%
                          </li>
                          <li class="list-group-item">
                              <strong class="text-primary">Visibility Distance:</strong> ${data.visibility_distance} km
                          </li>
                          <li class="list-group-item">
                              <strong class="text-primary">City ID:</strong> ${data.city_id}
                          </li>
                          <li class="list-group-item">
                              <strong class="text-primary">HTTP Response Code:</strong> ${data.http_response_code}
                          </li>
                      
                      </ul>
                      
                      <span class="sensor-name">Last updated: ${data.updated_at}</span>
                      <p class="sensor-name">Sensor: ${data.sensor_name}</p>
                     
                        </div>
                    `;
                } else {
                    // Create a new card
                    const sensorCard = document.createElement('div');
                    column = document.createElement('div');
                    column.className = 'col-md-4 mb-4';
                    sensorCard.className = 'card weather-card';
                    sensorCard.id = `sensorCard_${data.id}`;

                    // Set card content
                    sensorCard.innerHTML = `
                        <div class="card-header">
                            <p class="text-primary"><strong>City</strong>: ${data.city_name}</p>
                        </div>
                        <div class="card-body">
                            <p class="card-text">
                              Weather in <b class="text-primary">${data.city_name}</b> tomorrow is forecasted to be
                            <strong class="text-primary">${data.main_weather}</strong>. It will be
                            <strong class="text-primary">${data.weather_description}</strong>. The daytime temperature will be around
                            <strong class="text-primary">${data.temperature}°C</strong>, and the temperature is expected to dip to
                            <strong class="text-primary">${data.temp_min}°C</strong> at night. The humidity will be
                            <strong class="text-primary">${data.humidity }%</strong>. Other details include:
                            </p>
                            <ul class="list-group">
                                <li class="list-group-item">
                                    <strong class="text-primary">Atmospheric Pressure:</strong> ${data.atmospheric_pressure} hPa
                                </li>
                                <li class="list-group-item">
                                    <strong class="text-primary">Wind Speed:</strong> ${data.wind_speed} m/s
                                </li>
                                <li class="list-group-item">
                                    <strong class="text-primary">Wind Direction:</strong> ${data.wind_direction}                                </li>
                                <li class="list-group-item">
                                    <strong class="text-primary">Wind Direction Degree:</strong> ${data.wind_direction_deg}
                                </li>
                                <li class="list-group-item">
                                    <strong class="text-primary">Wind Gust:</strong> ${data.wind_gust} m/s
                                </li>
                                <li class="list-group-item">
                                    <strong class="text-primary">Rainfall:</strong> ${data.rainfall}
                                </li>
                                <li class="list-group-item">
                                    <strong class="text-primary">Maximum temp:</strong> ${data.temp_max}°C
                                </li>
                                <li class="list-group-item">
                                    <strong class="text-primary">Sea Level Pressure:</strong> ${data.sea_level_pressure} hPa
                                </li>
                                <li class="list-group-item">
                                    <strong class="text-primary">Ground Level Pressure:</strong> ${data.ground_level_pressure} hPa
                                </li>
                                
                                <li class="list-group-item">
                                    <strong class="text-primary">Cloudiness Percentage:</strong> ${data.cloudiness_percentage / 100}%
                                </li>
                                <li class="list-group-item">
                                    <strong class="text-primary">Visibility Distance:</strong> ${data.visibility_distance} km
                                </li>
                                <li class="list-group-item">
                                    <strong class="text-primary">City ID:</strong> ${data.city_id}
                                </li>
                                <li class="list-group-item">
                                    <strong class="text-primary">HTTP Response Code:</strong> ${data.http_response_code}
                                </li>
                            
                            </ul>
                            
                            <span class="sensor-name">Last updated: ${data.updated_at}</span>
                            <p class="sensor-name">Sensor: ${data.sensor_name}</p>
                            
                            
                        </div>
                    `;

                    // Append the new card to the sensorBodyCard container
                    column.appendChild(sensorCard);
                    sensorCardModal.appendChild(column);
                }
            });
        } else {
            console.log('Error parsing to JSON. Not an array!');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
