
const token = localStorage.getItem('token');
const companyName = document.getElementById('companyNametext');
const username = document.getElementById('usernametext');
const email = document.getElementById('emailtext')

//input values for updating user fields
const companyNameValue = document.getElementById('companyName');
const usernameValue = document.getElementById('username');
const emailValue = document.getElementById('email');

// Error/success containers
const errorContainer = document.getElementById('errorContainer');
const successContainer = document.getElementById('successContainer');

const getProfile = async () => {
    const url = 'https://sensorfusionbackend.onrender.com/api/profile/';
    // console.log('here works');
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'content-type': 'application/json'
            },
        })

        if (response.status === 401) {
            window.location.href = '../error/http401.html';
        } else if (response.status === 500) {
            window.location.href = '../error/http500.html';
        } else if (response.status === 404) {
            window.location.href = '../error/http404.html';
        } else if(response.ok){
            data = await response.json();
            // console.log(data);
            if(data){
                email.innerHTML = `<strong>Email:</strong> ${data.email}`;
                username.innerHTML = `<strong>Username:</strong> ${data.username}`;
                companyName.innerHTML = `<strong>Company Name:</strong> ${data.company_name}`;

                companyNameValue.value = data.company_name;
                emailValue.value = data.email;
                usernameValue.value = data.username;

            }

       }else {
        
        console.error('Failed to fetch profile:', response.statusText);
        
    }
    } catch (error) {
     
        console.error('Error fetching profile:', error);
    }

}
getProfile();


//  updating the user/profile details 

document.getElementById('updateBtn').addEventListener('click', (e) =>{
    e.preventDefault();
   

    const updateProfile = async () =>{
        const url = 'https://sensorfusionbackend.onrender.com/api/profile/'
        const formData = {
            company_name: document.getElementById('companyName').value,
            email: document.getElementById('email').value,
            username: document.getElementById('username').value
        };
        console.log(formData.company_name);
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers:{
                    'content-type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify(formData)

            });
            let responseData;
            if (response.status === 401) {
                window.location.href = '../error/http401.html';
            } else if (response.status === 500) {
                window.location.href = '../error/http500.html';
            } else if (response.status === 404) {
                window.location.href = '../error/http404.html';
            } else if (response.ok){
                const responseData = await response.json()
                // console.log(data);
                if(responseData && responseData.message){
                    successContainer.innerHTML = responseData.message;
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000);
                    
                }else if(responseData){
                    successContainer.innerHTML = responseData;
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000);
                } 


            }else if(!response.ok){
                errorData = await response.json();
                if(errorData && errorData.message){
                    errorContainer.innerHTML = errorData.message;
                    // reload after the error is received
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    updateProfile();
})

// Request to change password
document.getElementById('changePassword').addEventListener('click', (e) =>{
    e.preventDefault();
    // changePassword();
    oldPassword = document.getElementById('oldPassword').value;
    newPassword = document.getElementById('newPassword').value;
    confirmPassword = document.getElementById('confirmPassword').value;
    if (newPassword === confirmPassword) {
        changePassword();
    } else {
        errorContainer.innerHTML = 'Passwords do not match!';
    }
    
})

const changePassword = async () => {
    const url = 'https://sensorfusionbackend.onrender.com/api/change-password/'
    const formData = {
        old_password: document.getElementById('oldPassword').value,
        new_password: document.getElementById('newPassword').value
    }
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Token ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        let responseData;
            if (response.status === 401) {
                window.location.href = '../error/http401.html';
            } else if (response.status === 500) {
                window.location.href = '../error/http500.html';
            } else if (response.status === 404) {
                window.location.href = '../error/http404.html';
            } else if (response.ok){
                const responseData = await response.json()
                // console.log(data);
                if(responseData && responseData.message){
                    successContainer.innerHTML = responseData.message;
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000);
                    
                }else if(responseData){
                    successContainer.innerHTML = responseData;
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000);
                } 


            }else if(!response.ok){
                errorData = await response.json();
                if(errorData && errorData.message){
                    errorContainer.innerHTML = errorData.message;
                    // reload after the error is received
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                }else{
                    errorContainer.innerHTML = 'Fields must not empty!';
                }
            }



    } catch (error) {
        
    }
}

// Request for Deleting Profile

document.getElementById('confirmDeleteButton').addEventListener('click',  (e) =>{
    e.preventDefault();
    
    const deleteProfile = async () =>{
       const url = 'https://sensorfusionbackend.onrender.com/api/profile/'
       try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`,
                'content-type': 'application/json'
            }
        })

        if (response.status === 401) {
            window.location.href = '../error/http401.html';
        } else if (response.status === 500) {
            window.location.href = '../error/http500.html';
        } else if (response.status === 404) {
            window.location.href = '../error/http404.html';
        } else if(response.ok){
            // const responseData = await response.json();
            localStorage.removeItem(token)
            setTimeout(() => {
                window.location.href = '../public/signup.html'
            }, 1000);

         }
       } catch (error) {
            console.error('Error:', error);
       } 

    }
    deleteProfile();
})


// Sensor requests    

const registerBtn = document.getElementById('registerBtn');
const updateBtn = document.getElementById('updateSensorBtn');

const sensorName = document.getElementById('sensorName');
const sensorDescription = document.getElementById('description');
const sensorLocation = document.getElementById('location');
const dataFormat = document.getElementById('dataFormat');
const communicationMode = document.getElementById('communicationMode');

// Edit sensor input values
const sensorNameValue = document.getElementById('sensorNameValue')
const sensorDescriptionValue = document.getElementById('sensorDescriptionValue');
const sensorLocationValue = document.getElementById('sensorLocationValue');
const dataFormatValue = document.getElementById('dataFormatValue');
const communicationModeValue = document.getElementById('communicationModeValue');

// function to retrieve status
function getStatusValue() {
    const checkedStatus = document.querySelector('input[name="sensorStatus"]:checked').value;
    return checkedStatus
}

// Fetching all sensors associated to self.request.user or authenticated user

const getSensors = async () =>{
    const url = 'https://sensorfusionbackend.onrender.com/api/sensors/';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'content-type': 'application/json',
                // "Access-Control-Allow-Origin": "*"
                
            },
            // mode: 'no-cors'
        })
        if (response.status === 401) {
            window.location.href = '../error/http401.html';
        } else if (response.status === 500) {
            window.location.href = '../error/http500.html';
        } else if (response.status === 404) {
            window.location.href = '../error/http404.html';
        } else if(response.ok){
            data = await response.json();
            if(data){
                // console.log(data);
                const sensorTableBody = document.getElementById('sensorTableBody');
                
                // Receive the data and loop through the list to access the objects and loop through that to access the details
                data.forEach(sensor => {
                    const newRow = document.createElement('tr');
                    // console.log(sensor.id);
                    
                    newRow.innerHTML = `
                        <td>${sensor.name}</td>
                        <td>
                        <button class="btn btn-primary btn-sm view-sensor" data-toggle="modal" data-target="#viewSensorModal" data-sensor-id=${sensor.id}>View</button>
                        <button class="btn btn-info btn-sm edit-sensor" data-toggle="modal" data-target="#editSensorModal" data-sensor-id=${sensor.id}>Edit</button>
                        <button class="btn btn-danger btn-sm delete-sensor" data-sensor-id=${sensor.id}>Delete</button>
                        </td>
                  `;
                    
                    sensorTableBody.appendChild(newRow);

                  });

                  // attach the event listener to all classes with view sensor to affect all the view sensor button
                // loop through all the classes and attach a listener for the click event, and get the sensor id set in the html button

                  const viewSensorButtons = document.querySelectorAll('.view-sensor');
                  const editSensorButtons = document.querySelectorAll('.edit-sensor');
                  const deleteSensorButtons = document.querySelectorAll('.delete-sensor');

                  // View sensor details
                  viewSensorButtons.forEach(button =>{
                    button.addEventListener('click', async function(e){
                        e.preventDefault();

                        const sensorId = this.getAttribute('data-sensor-id');
                        // console.log(sensorId);  
                
                        const sensorDetails = await fetchSensorById(sensorId);
                        const viewSensorBody = document.getElementById('viewSensorBody');
                        const viewModalTitle = document.getElementById('viewSensorModalLabel');
                        const newDiv = document.createElement('div')
                        viewSensorBody.innerHTML = ''

                        if (sensorDetails) {
                            // console.log(sensorDetails.name);
                            viewModalTitle.innerHTML = sensorDetails.name;
                            newDiv.innerHTML = `
                                <p class='text-capitalize'><strong>Description:</strong> ${sensorDetails.description}</p>
                                <p class='text-capitalize'><strong>Location:</strong> ${sensorDetails.location}</p>
                                <p class='text-capitalize'><strong>Data Format:</strong> ${sensorDetails.data_format}</p>
                                <p class='text-capitalize'><strong>Communication mode:</strong> ${sensorDetails.communication_mode}</p>
                                <p class='text-capitalize'><strong>Status:</strong> ${sensorDetails.status}</p>  
                            `;

                            viewSensorBody.appendChild(newDiv);
                        }
                
                    })
                })
                //Edit sensor details
                editSensorButtons.forEach(button =>{
                    button.addEventListener('click', async function(e){
                        e.preventDefault();

                        const sensorId = this.getAttribute('data-sensor-id');
                    
                        const sensorDetails = await fetchSensorById(sensorId);
                        
                        if (sensorDetails) {
                            // console.log(sensorDetails.name);
                            sensorNameValue.value = sensorDetails.name;
                            sensorDescriptionValue.value = sensorDetails.description;
                            sensorLocationValue.value = sensorDetails.location;
                            communicationModeValue.value = sensorDetails.communication_mode;
                            dataFormatValue.value = sensorDetails.data_format;
                            const radioButtons = document.getElementsByName('statusValue');
                            for (const radioButton of radioButtons) {
                                if (radioButton.value === sensorDetails.status) {
                                    radioButton.checked = true;
                                }
                            }
                        }
                        updateBtn.addEventListener('click', (e) => {
                            e.preventDefault();
                            editSensorById(sensorId);
                        })
                        
                
                    })
                })

                //Edit sensor details

                // editSensorButtons.forEach(button =>{
                   
                //     button.addEventListener('click', async function(e){
                //         e.preventDefault();
                //         const sensorId = this.getAttribute('data-sensor-id');
                //         console.log(sensorId);  
                //         const deleteSensorDetails = await editSensorById(sensorId);
                //     })
                   
                    
                // })

                // Delete sensor details
                deleteSensorButtons.forEach(button =>{
                   
                    button.addEventListener('click', async function(e){
                        e.preventDefault();
                        const sensorId = this.getAttribute('data-sensor-id');
                        console.log(sensorId);  

                        const deleteSensorDetails = await deleteSensorById(sensorId);

                    })
                })
                

                // console.log(viewSensorButtons);

            }
                
        }
    }catch (error) {
        console.error('Error fetching Sensors:', error);
        setTimeout(() => {
            window.location.href = '../error/http404.html'
        }, 2000);
    }
}

getSensors();


                
// Seperate async function running the retrieval of a sensor by id

async function fetchSensorById(sensorId) {
    const url = `https://sensorfusionbackend.onrender.com/api/sensor/${sensorId}/`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'content-type': 'application/json'
            }
        });

        if (response.status === 401) {
            window.location.href = '../error/http401.html';
        } else if (response.status === 500) {
            window.location.href = '../error/http500.html';
        } else if (response.status === 404) {
            window.location.href = '../error/http404.html';
        } else if (response.ok) {
            const sensorData = await response.json();
            return sensorData;
        }
    } catch (error) {
        console.error('Error:', error);
        setTimeout(() => {
            window.location.href = '../errorpages/http404.html'
        }, 2000);
    }
}

//Seperate edit sensor function
async function editSensorById(sensorId) {
    const url = `https://sensorfusionbackend.onrender.com/api/sensors/edit/${sensorId}/`;
    
  
        const formData = {
            name: sensorNameValue.value,
            description:sensorDescriptionValue.value,
            data_format: dataFormatValue.value,
            location: sensorLocationValue.value,
            communication_mode: communicationModeValue.value 
        }
        // console.log(formData.description);
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Token ${token}`,
                    'content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if (response.status === 401) {
                window.location.href = '../error/http401.html';
            } else if (response.status === 500) {
                window.location.href = '../error/http500.html';
            } else if (response.status === 404) {
                window.location.href = '../error/http404.html';
            } else if (response.ok){
                const responseData = await response.json()
                // console.log(data);
                if(responseData && responseData.message){
                    successContainer.innerHTML = responseData.message;
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                    
                }else if(responseData){
                    successContainer.innerHTML = responseData;
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000);
                }else{
                    successContainer.innerHTML = 'Sensor successfully updated!';
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }


            }else if(!response.ok){
                errorData = await response.json();
                if(errorData && errorData.message){
                    errorContainer.innerHTML = errorData.message;
                    // reload after the error is received
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                }else{
                    errorContainer.innerHTML = 'An error occurred. Please try again later!';
                }
            }
        } catch (error) {
            console.error('Error', error);
        }

    
    // updateSensor();
}


// Seperate delete sensor function
async function deleteSensorById(sensorId) {
    const url = `https://sensorfusionbackend.onrender.com/api/sensors/delete/${sensorId}/`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 401) {
            window.location.href = '../error/http401.html';
        } else if (response.status === 500) {
            window.location.href = '../error/http500.html';
        } else if (response.status === 404) {
            window.location.href = '../error/http404.html';
        } else if (response.ok) {
            successContainer.innerHTML = 'Successfully deleted sensor!'
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } else {
            errorContainer.innerHTML = 'An error occurred. Please try again later!'
            console.error('Error deleting sensor:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
        setTimeout(() => {
            window.location.href = '../errorpages/http404.html'
        }, 2000);
    }
}




// Add Sensor requests

registerBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    const sensorStatus = getStatusValue();
    
    const registerSensor = async () =>{
        const url = 'https://sensorfusionbackend.onrender.com/api/register/sensor/';
        const formData = {
            name: sensorName.value,
            description: sensorDescription.value,
            location: sensorLocation.value,
            data_format: dataFormat.value,
            communication_mode: communicationMode.value,
            status: sensorStatus
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(formData)
        })
         let responseData;
        //  console.log(data);
        if (response.status === 401) {
            window.location.href = '../error/http401.html';
        } else if (response.status === 500) {
            window.location.href = '../error/http500.html';
        } else if (response.status === 404) {
            window.location.href = '../error/http404.html';
        } else if(response.ok){
             responseData = await response.json();
            if (responseData && responseData.message) {
                successContainer.innerHTML = responseData.message;
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            }else if (responseData) {
                successContainer.innerHTML = responseData;
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            }else{
                successContainer.innerHTML = 'Sensor successfully registered!';
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            }
         }else if (!response.ok) {
           const errorData = await response.json();
           if (errorData && errorData.message) {
            errorData.innerHTML = errorData.message;
            setTimeout(() => {
                window.location.reload()
            }, 2000);
           }else if (errorData && errorData.non_field_errors) {
            errorContainer.innerHTML = errorData.non_field_errors;
            setTimeout(() => {
                window.location.reload()
            }, 2000);
           }else{
            errorContainer.innerHTML = 'An error occurred. Please try again later!';
           }
         }
    }
    registerSensor();
})


// Update/Edit Sensor Information

// updateBtn.addEventListener('click', (e) =>{
//     e.preventDefault();
//     console.log('here');
    // const updateSensor = async () => {
    //     const url = 'http://localhost:8000/api/sensor/edit/';
    //     const formData = {
    //         name: sensorNameValue.value,
    //         description:sensorDescriptionValue.value,
    //         data_format: dataFormatValue.value,
    //         location: sensorLocationValue.value,
    //         communication_mode: communicationModeValue.value 
    //     }

    //     try {
    //         const response = await fetch(url, {
    //             method: 'PUT',
    //             headers: {
    //                 'Authorization': `Token ${token}`,
    //                 'content-type': 'application/json'
    //             },
    //             body: JSON.stringify(formData)
    //         })
    //         if (response.ok){
    //             const responseData = await response.json()
    //             // console.log(data);
    //             if(responseData && responseData.message){
    //                 successContainer.innerHTML = responseData.message;
    //                 setTimeout(() => {
    //                     window.location.reload()
    //                 }, 2000);
                    
    //             }else if(responseData){
    //                 successContainer.innerHTML = responseData;
    //                 setTimeout(() => {
    //                     window.location.reload()
    //                 }, 2000);
    //             }else{
    //                 successContainer.innerHTML = 'Sensor successfully updated!';
    //                 setTimeout(() => {
    //                     window.location.reload()
    //                 }, 2000);
    //             }


    //         }else if(!response.ok){
    //             errorData = await response.json();
    //             if(errorData && errorData.message){
    //                 errorContainer.innerHTML = errorData.message;
    //                 // reload after the error is received
    //                 setTimeout(() => {
    //                     window.location.reload();
    //                 }, 3000);
    //             }else{
    //                 errorContainer.innerHTML = 'An error occurred. Please try again later!';
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Error', error);
    //     }

    // }
    // updateSensor();
// })


// Logout request

async function logoutUser() {
    const url = 'https://sensorfusionbackend.onrender.com/api/logout/';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers:{
                'Authorization': `Token ${token}`,
                'content-type': 'application/json'
            }
        })
        if(response.ok){
            const responseData = await response.json();
            if (responseData && responseData.message){
                successContainer.innerHTML = responseData.message
                localStorage.removeItem('token');

                setTimeout(() => {
                    window.location.href = '../public/login.html'
                }, 2000);
            }else if (responseData) {
                successContainer.innerHTML = responseData
                localStorage.removeItem(token)

                setTimeout(() => {
                    window.location.href = '../public/login.html'
                }, 2000);
            }else{
                successContainer.innerHTML = 'Successfully logged out!'
                localStorage.removeItem(token)
                
                setTimeout(() => {
                    window.location.href = '../public/login.html'
                }, 2000);
            }
        }else{
            const errorData = await response.json();
            if (errorData && errorData.message) {
                errorContainer.innerHTML = errorData.message;
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }else if(errorData){
                errorContainer.innerHTML = errorData;
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }else{
                errorContainer.innerHTML = 'An error occurred. Please try again!';
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        }

    } catch (error) {
        console.log('Error', error);
    }
}


document.getElementById('logout').addEventListener('click', (e) =>{
    e.preventDefault();
    logoutUser();
})


