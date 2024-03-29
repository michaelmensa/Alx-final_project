  document.getElementById('search-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const queryString = document.getElementById('search-string').value;
    const queryOption = document.querySelector('input[name="search-options"]:checked').value;

    try {
        const response = await fetch(`/patients?${queryOption}=${queryString}`);
        if (!response.ok) {
            throw new Error('Could not fetch from api');
        }
        const patients = await response.json();
        // Display search results
        const searchResultsDiv = document.getElementById('search-results');
        searchResultsDiv.innerHTML = ''; // Clear previous results

        if (patients.length === 0) {
            const noResultsMessage = document.createElement('p');
            noResultsMessage.textContent = 'No patients found.';
            searchResultsDiv.appendChild(noResultsMessage);
        }
        patients.forEach(patient => {
        const patientInfo = document.createElement('div');

        const patientText = document.createElement('p');
        patientText.textContent = `Patient ID: ${patient.patientID}, Name: ${patient.firstName} ${patient.lastName}`;
        patientInfo.appendChild(patientText);

        const examButton = document.createElement('button');
        examButton.textContent = 'Exam Form';
        examButton.addEventListener('click', () => {
            // Redirect to a new page with patient information in query parameters
            const patientInfoUrl = `/patients/${patient._id}`;
            window.location.href = patientInfoUrl;
        });
            

        // update patient record button
        const updateRecordButton = document.createElement('button');
        updateRecordButton.textContent = 'Update Records';
        updateRecordButton.addEventListener('click', () => {
        // Handle update logic here
        console.log(`Updating patient ${patient.patientID}`)
        });

        // viewPatientrecords button
        const viewPatientrecordsButton = document.createElement('button');
        viewPatientrecordsButton.textContent = 'View Records';
        viewPatientrecordsButton.addEventListener('click', () => {
        // Handle update logic here
        console.log(`Viewing records of patient ${patient.patientID}`)
        });

        patientInfo.appendChild(examButton);
        patientInfo.appendChild(updateRecordButton);
        patientInfo.appendChild(viewPatientrecordsButton);

        searchResultsDiv.appendChild(patientInfo);
        });
    } catch (err) {
        console.error('Could not display results');
    }
  });