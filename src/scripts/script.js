 // Add event listeners to buttons
 document.getElementById('logout-btn').addEventListener('click', function() {
    // Perform logout action
    // Perform logout action
    fetch('/clinic/dashboard/logout', {
      method: 'POST',
      credentials: 'same-origin' // Include cookies in the request
  })
  .then(response => {
      if (response.ok) {
          // Redirect to the login page or perform any other actions
          alert('Logout successful');
          window.location.href = '/login';
      } else {
          // Handle error response
          alert('Failed to logout. Please try again.');
      }
  })
  .catch(error => {
      console.error('Error logging out:', error);
      alert('An error occurred while logging out. Please try again later.');
  })
});

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

  document.getElementById('login-employee-btn').addEventListener('click', function() {
    // Show employee login form
    // Example: showEmployeeLoginForm();
    document.getElementById('login-employee-form').style.display = 'block';
  });

  document.getElementById('login-btn').addEventListener('click', function() {
   alert('Employee sucessfully logged in!');
    // Hide the register employee form
    document.getElementById('login-employee-form').style.display = 'none';
  });

  document.getElementById('register-employee-btn').addEventListener('click', function() {
    // Show register employee form
    // Show register employee form
    document.getElementById('register-employee-form').style.display = 'block';
  });

  document.getElementById('save-employee-btn').addEventListener('click', function() {
   alert('Employee sucessfully registered!');
    // Hide the register employee form
    document.getElementById('register-employee-form').style.display = 'none';
  });

  document.getElementById('search-btn').addEventListener('click', function() {
    // Perform search action
    const query = document.getElementById('employee-search').value;
    // Example: searchEmployees(query);
    alert('Search clicked with query: ' + query);
  });