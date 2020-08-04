//variable declaration for html elements
const form = document.getElementById('form');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const dob = document.getElementById('dob');
const nic = document.getElementById('nic');
const faculty = document.getElementById('faculty');
const email = document.getElementById('email');
const email2 = document.getElementById('email2');
const contact = document.getElementById('contact');

form.addEventListener('submit', e => {
	e.preventDefault();
	checkInputs();
});

function checkInputs() {
	// trim to remove the whitespaces
	const fName = fname.value.trim();
	const lName = lname.value.trim();
	const DOB = dob.value.trim();
	const NIC = nic.value.trim();
	const Faculty = faculty.value.trim();
	const Email = email.value.trim();
	const Email2 = email2.value.trim();
	const contactNo = contact.value.trim();

	//regular expressions
	nameRegex = /^([a-zA-Z0-9]{2,20})$/;
	dobRegex = /^(((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])(\/)\d{4}$/;
	nicRegex = /^([0-9]{9})(V)/;
	nicRegex2 = /^([0-9]{12})/;
	contactRegex = /^([0-9]{10})/;
	emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


	if(fName === '') {
		setErrorFor(fname, 'First Name cannot be blank');
	} else if (!nameRegex.test(fName)) {
		setErrorFor(fname, 'Not a valid name');
	} else {
		setSuccessFor(fname);
	}

	if(lName === '') {
		setErrorFor(lname, 'Last Name cannot be blank');
	} else if (!nameRegex.test(lName)) {
		setErrorFor(lname, 'Not a valid name');
	} else {
		setSuccessFor(lname);
	}

	if(DOB === '') {
		setErrorFor(dob, 'DOB cannot be blank');
	} else if (!dobRegex.test(DOB)) {
		setErrorFor(dob, 'Not a valid DOB');
	} else {
		const cDate = new Date(); //current date
		const age = cDate.getFullYear() - new Date(DOB).getFullYear();

		if(new Date(DOB)>cDate){ //check for future date
			setErrorFor(dob, 'Invalid date. Please check');
		}

    	if (age >= 30) {
			setErrorFor(dob, 'You are not eligible for the competition');
        } else if (age <= 20) { //university age is taken as 20
			setErrorFor(dob, 'Please check your DOB');
		} else{
			setSuccessFor(dob);
		}
	}

	if(NIC === '') {
		setErrorFor(nic, 'NIC cannot be blank');
	}
	else if (!nicRegex.test(NIC) && !nicRegex2.test(NIC)) { //checking both nic formats
		setErrorFor(nic, 'Not a valid NIC');
	} else {
		setSuccessFor(nic);
	}

	if(Faculty === '') {
		setErrorFor(faculty, 'Faculty cannot be blank');
	} else {
		setSuccessFor(faculty);
	}

	if(Email === '') {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!emailRegex.test(Email)) {
		setErrorFor(email, 'Not a valid email');
	} else {
		setSuccessFor(email);
	}

	if(Email2 === '') {
		setErrorFor(email2, 'Confirm Email cannot be blank');
	} else if(Email !== Email2) {
		setErrorFor(email2, 'Emails does not match');
	} else{
		setSuccessFor(email2);
	}

	if(contactNo === '') {
		setErrorFor(contact, 'Contact number cannot be blank');
	} else if (!contactRegex.test(contactNo)) {
		setErrorFor(contact, 'Contact number is not valid');
	} else {
		setSuccessFor(contact);
	}

}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'col-75 error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'col-75 success';
}
