// to logout of clinicDashboard
document.getElementById('clinic-logout').addEventListener('click', function() {
    fetch('/clinic/dashboard/logout', {
        method: 'POST',
        credentials: "same-origin",
    })
    .then(res => {
        if (res.ok) {
            alert('Logout Successful');
            window.location.href = '/';
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
    fetch('/clinic/dashboard/stats', {
      method: 'GET',
      credentials: 'same-origin'
    })
    .then(res => {
      if (res.ok) {
          return res.json();
      } else {
          throw new Error('Could not retrieve clinic statistics');
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
      document.getElementById('total-employees').textContent = data.Employees;
      console.log('Clinic Statistics:', data);
    }
  });
