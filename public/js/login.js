// JavaScript Login Connection

const submit = document.getElementById('submitBtn')

submit.addEventListener('click', (e) =>{
    e.preventDefault();
    login();
})


const login = async () =>{
    const url = 'https://sensorfusionbackend.onrender.com/api/login/';
    const errorContainer = document.getElementById('errorContainer');
    const successContainer = document.getElementById('successContainer');

    const formData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    }

    // console.log('works');
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        let responseData;

        if (response.status === 401) {
            window.location.href = 'error/http401.html';
        } else if (response.status === 500) {
            window.location.href = 'error/http500.html';
        } else if (response.status === 404) {
            window.location.href = 'error/http404.html';
        } else if(!response.ok){
            errorData = await response.json();

            if(errorData && errorData.non_field_errors){
                errorContainer.innerHTML = errorData.non_field_errors;
                // reload after the error is received
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }else if(errorData){
                errorContainer.innerHTML = errorData = 'Fields cannot be empty!';
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        }else{
            responseData = await response.json();
            
            if(responseData && responseData.message){
                if(responseData.token){
                    console.log(responseData.token);
                    localStorage.setItem('token', responseData.token);
                    successContainer.innerHTML = responseData.message;
                    redirect('dashboard.html');
                }
                
            }else if(responseData){
                successContainer.innerHTML = responseData;
                redirect('dashboard.html');
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

function redirect(location) {
    setTimeout(() => {
        window.location.href = location
    }, 2000);
}