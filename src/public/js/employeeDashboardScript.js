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

// to refresh clinic dashboard and get statistics
document.getElementById('refresh-btn').addEventListener('click', function() {
    // Perform refresh action
    // Example: fetchClinicStatistics();
    fetch('/employee/dashboard/stats', {
      method: 'GET',
      credentials: 'same-origin'
    })
    .then(res => {
      if (res.ok) {
          return res.json();
      } else {
          throw new Error('Could not retrieve daily statistics');
      }
    })
    .then(data => {
      displayClinicStatistics(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    })

    function displayClinicStatistics(data) {
      document.getElementById('total-patients').textContent = data.Patients;
      document.getElementById('total-patients-examined').textContent = data.Examination;
      console.log('Daily Statistics:', data);
    }
  });
