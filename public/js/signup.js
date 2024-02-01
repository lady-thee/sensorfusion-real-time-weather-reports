// Async application


const form = document.getElementById('registrationForm');
const btn = document.getElementById('submitBtn');
const companyName = document.getElementById('companyName');
const userName = document.getElementById('username');
const emailValue = document.getElementById('email');
const passWord = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

const errorContainer = document.getElementById('errorContainer');
const successContainer = document.getElementById('successContainer');

btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (passWord.value === confirmPassword.value) {
        // console.log(passWord.value, confirmPassword.value);
        submitForm();
    
    } else {
        errorContainer.innerHTML = 'Paswords do not match';
    }
    
    // console.log(form);
})

const submitForm = async () => {
    const url = 'https://sensorfusionbackend.onrender.com/api/register/';
    
    const formData = {
        company_name: companyName.value,
        username: userName.value,
        email: emailValue.value,
        password: confirmPassword.value
    }
   
    
    try {
        const response = await fetch(url,  {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        // console.log(response);
        let responseData;
        

        if (response.status === 401) {
            window.location.href = '../error/http401.html';
        } else if (response.status === 500) {
            window.location.href = '../error/http500.html';
        } else if (response.status === 404) {
            window.location.href = '../error/http404.html';
        } else if(!response.ok){
            errorData = await response.json();

            if(errorData && errorData.email){
                errorContainer.innerHTML = errorData.email;
                // reload after the error is received
                setTimeout(() => {
                    window.location.reload()
                }, 3000);
            }else if(errorData && errorData.non_field_errors){
                errorContainer.innerHTML = errorData.non_field_errors;
            }else if(errorData && errorData.message){
                errorContainer.innerHTML = errorData.message
            } else if(errorData){
                errorContainer.innerHTML = errorData = 'Fields cannot be empty!';
                setTimeout(() => {
                    window.location.reload()
                }, 3000);
            }
        }
        else{
            responseData = await response.json();

            if (responseData && responseData.message){
                successContainer.innerHTML = responseData.message;
                redirect();
            }else if(responseData){
                successContainer.innerHTML = responseData;
                redirect();
            }
        }
    } catch (error) {
        console.error('Error:', error);

        if (error.message) {
            errorContainer.innerHTML = error.message; // Display the error message
        } else {
            errorContainer.innerHTML = 'An error occurred. Please try again.'; // Fallback message
        }
    }
}

function redirect(params) {
    setTimeout(() => {
        window.location.href = 'login.html'
    }, 2000);
}





/*document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const url = 'http://localhost:8000/api/register/';
    const errorContainer = document.getElementById('errorContainer');

    const formData = new FormData(document.getElementById('registrationForm'));
    formData.append('company_name', document.getElementById('companyName').value);
    formData.append('username', document.getElementById('username').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('password', document.getElementById('password').value);
    console.log(formData);    

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        let responseData;

        if (!response.ok) {
            // Handle non-ok response status here without throwing an error
            const errorData = await response.json(); // Assuming error data is in JSON format

            if (errorData && errorData.message) {
                errorContainer.innerHTML = errorData.message; // Display the error message
            } else if(errorData){
                errorContainer.innerHTML = errorData; // Display the error message
            }else {
                errorContainer.innerHTML = 'An error occurred. Please try again.'; // Fallback error message
            }

            // Perform additional actions based on the error response if needed
        } else {
            responseData = await response.json(); // Assuming response data is in JSON format

            // Handle the successful response data here
            if (responseData && responseData.message) {
                const successContainer = document.getElementById('successContainer');
                successContainer.innerHTML = responseData.message; // Display success message
            }

            // Perform additional actions based on the successful response data if needed
        }

        if (responseData) {
            console.log(responseData); // Logs the retrieved data in the console
            // Do something with the successful response data if needed
        }

    } catch (error) {
        console.error('Error:', error);

        if (error.message) {
            errorContainer.innerHTML = error.message; // Display the error message
        } else {
            errorContainer.innerHTML = 'An error occurred. Please try again.'; // Fallback message
        }
    }
});



// document.getElementById('registrationForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent default form submission

//     let url = 'http://localhost:8000/api/register/'
//     const errorField = document.getElementById('error')
//     const formData = {
//         companyName: document.getElementById('companyName').value,
//         username: document.getElementById('username').value,
//         email: document.getElementById('email').value,
//         password: document.getElementById('password').value,
//     };


//     fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'X-Requested-With': 'XMLHttpRequest',
//         },
//         body: JSON.stringify(formData),
//     })
//     .then(response => {
//         console.log(response);
//         if (!response.ok) {
//             throw new Error(response.error);
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log(data); //logs the retrieved data in the console
//         if (data && data.message) {
//             const errorContainer = document.getElementById('errorContainer');
//             errorContainer.innerHTML = data.message; 
//         } else {
            
//             console.log('Received data:', data);
            
//         }
//     })
//     .catch(error => {
//         // Handle fetch errors or network errors
//         console.error('Error:', error);
//         const errorContainer = document.getElementById('errorContainer');
//         errorContainer.innerHTML = 'An error occurred. Please try again.'; // Fallback error message
//     });
    
// });

*/



        // if (errorData) {
        //     let errorMessages = '';
        //     for (const key in errorData) {
        //         if (errorData.hasOwnProperty(key)) {
        //             errorData[key] = ''
        //             // errorData[key].forEach(errorMessage => {
        //             //     errorMessages += `${key}: ${errorMessage}<br>`;
        //             // });
        //         }
        //     }

        //     errorContainer.innerHTML = errorMessages;
    
        //         // Reload the page after displaying the error message(s)
        //         setTimeout(() => {
        //             window.location.reload();
        //         }, 5000);
        //     }

                // setTimeout(() => {
                //     window.location.reload()
                // }, 1000);
            // if error data is in a json format
            // if(errorData && errorData.message){
            //     errorContainer.innerHTML = errorData.message;
            //     console.log(errorData);
            //     setTimeout(() => {
            //         window.location.reload()
            //     }, 1000);
            // }else if(errorData){ //if error data is not in a json format
            //     errorContainer.innerHTML = errorData;
            //     // setTimeout(() => {
            //     //     window.location.reload()
            //     // }, 1000);
            // }