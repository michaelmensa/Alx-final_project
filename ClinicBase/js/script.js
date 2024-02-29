(async function () { 
	const data = await fetch("data.json"); 
	const res = await data.json(); 

	let employees = res; 
	let selectedEmployeeId = employees[0].id; 
	let selectedEmployee = employees[0]; 

	const employeeList = document.querySelector( 
		".employees__names--list"
	); 
	const employeeInfo = document.querySelector( 
		".employees__single--info"
	); 

	// Add Employee - START 
	const createEmployee = document.querySelector( 
		".createEmployee"
	); 
	const addEmployeeModal = 
		document.querySelector(".addEmployee"); 
	const addEmployeeForm = document.querySelector( 
		".addEmployee_create"
	); 

	createEmployee.addEventListener("click", () => { 
		addEmployeeModal.style.display = "flex"; 
	}); 

	addEmployeeModal.addEventListener("click", (e) => { 
		if (e.target.className === "addEmployee") { 
			addEmployeeModal.style.display = "none"; 
		} 
	}); 

	// Set Employee age to be entered minimum 18 years 
	const dobInput = document.querySelector( 
		".addEmployee_create--dob"
	); 
	dobInput.max = `${ 
		new Date().getFullYear() - 18 
	}-${new Date().toISOString().slice(5, 10)}`; 

	addEmployeeForm.addEventListener("submit", (e) => { 
		e.preventDefault(); 
		const formData = new FormData(addEmployeeForm); 
		const values = [...formData.entries()]; 
		let empData = {}; 
		values.forEach((val) => { 
			empData[val[0]] = val[1]; 
		}); 
		empData.id = employees[employees.length - 1].id + 1; 
		empData.age = 
			new Date().getFullYear() - 
			parseInt(empData.dob.slice(0, 4), 10); 
		empData.imageUrl = 
			empData.imageUrl || 
"gfg.png"; 
		employees.push(empData); 
		renderEmployees(); 
		addEmployeeForm.reset(); 
		addEmployeeModal.style.display = "none"; 
	}); 
	// Add Employee - END 

	// Select Employee Logic - START 
	employeeList.addEventListener("click", (e) => { 
		if ( 
			e.target.tagName === "SPAN" && 
			selectedEmployeeId !== e.target.id 
		) { 
			selectedEmployeeId = e.target.id; 
			renderEmployees(); 
			renderSingleEmployee(); 
		} 
		// Employee Delete Logic - START 
		if (e.target.tagName === "I") { 
			employees = employees.filter( 
				(emp) => 
					String(emp.id) !== 
					e.target.parentNode.id 
			); 
			if ( 
				String(selectedEmployeeId) === 
				e.target.parentNode.id 
			) { 
				selectedEmployeeId = employees[0]?.id || -1; 
				selectedEmployee = employees[0] || {}; 
				renderSingleEmployee(); 
			} 
			renderEmployees(); 
		} 
		// Employee Delete Logic - END 
	}); 
	// Select Employee Logic - END 

	// Render All Employees Logic - START 
	const renderEmployees = () => { 
		employeeList.innerHTML = ""; 
		employees.forEach((emp) => { 
			const employee = document.createElement("span"); 
			employee.classList.add( 
				"employees__names--item"
			); 
			if ( 
				parseInt(selectedEmployeeId, 10) === emp.id 
			) { 
				employee.classList.add("selected"); 
				selectedEmployee = emp; 
			} 
			employee.setAttribute("id", emp.id); 
			employee.innerHTML = `${emp.firstName} ${emp.lastName} 
				<i class="employeeDelete">&#10060;</i>`; 
			employeeList.append(employee); 
		}); 
	}; 
	// Render All Employees Logic - END 

	// Render Single Employee Logic - START 
	const renderSingleEmployee = () => { 
		// Employee Delete Logic - START 
		if (selectedEmployeeId === -1) { 
			employeeInfo.innerHTML = ""; 
			return; 
		} 
		// Employee Delete Logic - END 

		employeeInfo.innerHTML = ` 
		<img src="${selectedEmployee.imageUrl}" /> 
		<span class="employees__single--heading"> 
		${selectedEmployee.firstName} ${selectedEmployee.lastName} 
			(${selectedEmployee.age}) 
		</span> 
		<span>${selectedEmployee.address}</span> 
		<span>${selectedEmployee.email}</span> 
		<span>Mobile - ${selectedEmployee.contactNumber}</span> 
		<span>DOB - ${selectedEmployee.dob}</span> 
	`; 
	}; 
	// Render Single Employee Logic - END 

	renderEmployees(); 
	if (selectedEmployee) renderSingleEmployee(); 
})();

// register.js code starts here
// script.js 

function solve() { 
	let password = 
		document.getElementById('password').value; 
	let repassword = 
		document.getElementById('repassword').value; 
	let mobile = 
		document.getElementById('mobile').value; 
	let mail = 
		document.getElementById('email').value; 
	let flag = 1; 
	let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

	if (!emailRegex.test(mail)) { 
		flag = 0; 
		pass.innerText = 
			'Please enter a valid email address.'; 
		setTimeout(() => { 
			pass.innerText = ""; 
		}, 3000); 
	} 

	if (password !== repassword) { 
		flag = 0; 
		pass.innerText = 
			"Passwords do not match. Please re-enter."; 
		setTimeout(() => { 
			pass.innerText = ""; 
		}, 3000); 
	} 

	let passwordRegex = 
		/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])\S{8,}$/; 

	if (!passwordRegex.test(password)) { 
		flag = 0; 
		pass.innerText = 
			'Password must be at least 8 characters'+ 
			' long and include at least one number,'+ 
			' one alphabet, and one symbol.'; 
		setTimeout(() => { 
			pass.innerText = ""; 
		}, 3000); 
	} 
	if (flag) 
		alert("Form submitted"); 
}
// register.js code ends here