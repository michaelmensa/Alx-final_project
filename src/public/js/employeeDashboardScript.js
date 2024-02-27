// to logout of clinicDashboard
document.getElementById('employee-logout').addEventListener('click', function() {
    fetch('/employee/dashboard/logout', {
        method: 'POST',
        credentials: "same-origin",
    })
    .then(res => {
        if (res.ok) {
            alert('Logout Successful');
            window.location.href = '/clinic/dashboard';
        } else {
            alert('Failed to logout, Please try again');
        }
    })
    .catch(err => {
        console.error('Errorr logging out', err);
        alert('Error logging out');
    })
});
