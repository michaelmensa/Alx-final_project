// function to login clinic
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // make a fetch to the server
    fetch('/login', {
        method: "POST",
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(res => {
        if (res.ok) {
            window.location.href = '/clinic/dashboard';
        } else {
            document.getElementById('errorMessage').style.display = 'block';
            setTimeout(() => {
                document.getElementById('errorMessage').style.display = 'none';
            }, 3000)
        }
    })
    .catch(err => {
        console.error('Error:', err);
    });
}