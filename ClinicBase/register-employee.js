// Sample JavaScript functions to demonstrate adding a patient and updating case count.

function addPatient(event) {
  event.preventDefault();

  // Logic to add a new patient
  const patientName = document.getElementById('patientName').value;
  const patientAge = document.getElementById('patientAge').value;
  const patientGender = document.getElementById('patientGender').value;

  // Validate the form fields (you can add more validation logic)
  if (!patientName || !patientAge || !patientGender) {
      alert('Please fill in all fields.');
      return;
  }

  // Create a patient object (you can send this data to the server)
  const newPatient = {
      name: patientName,
      age: patientAge,
      gender: patientGender,
  };

  // Display patient information
  displayPatient(newPatient);

  // Clear the form
  document.getElementById('patientForm').reset();
}

function displayPatient(patient) {
  // Display patient information in the patientDetails div
  const patientDetails = document.getElementById('patientDetails');
  patientDetails.innerHTML = `
      <h3>Patient Information</h3>
      <p><strong>Name:</strong> ${patient.name}</p>
      <p><strong>Age:</strong> ${patient.age}</p>
      <p><strong>Gender:</strong> ${patient.gender}</p>
  `;
}

// Initial case count
let caseCount = 0;

function updateCaseCount() {
  // Logic to update case count
  caseCount++;
  const caseCounter = document.getElementById('caseCounter');
  caseCounter.textContent = `Total Cases: ${caseCount}`;
}

// Sample: Update case count every 5 seconds
setInterval(updateCaseCount, 5000);
