//variable declaration for html elements
const form = $("#form");
const fname = $("#fname");
const lname = $("#lname");
const dob = $("#dob");
const nic = $("#nic");
const faculty = $("#faculty");
const email = $("#email");
const email2 = $("#email2");
const contact = $("#contact");

form.on("submit", (e) => {
    e.preventDefault();
    checkInputs();
});

function checkInputs() {
    // trim to remove the whitespaces
    const fName = fname.val().trim();
    const lName = lname.val().trim();
    const DOB = dob.val().trim();
    const NIC = nic.val().trim();
    const Faculty = faculty.val().trim();
    const Email = email.val().trim();
    const Email2 = email2.val().trim();
    const contactNo = contact.val().trim();

    //regular expressions
    nameRegex = /^([a-zA-Z0-9]{2,20})$/;
    dobRegex = /^(((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])(\/)\d{4}$/;
    nicRegex = /^([0-9]{9})(V)/;
    nicRegex2 = /^([0-9]{12})/;
    contactRegex = /^([0-9]{10})/;
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if (fName === '') {
        setErrorFor(fname, 'First Name cannot be blank');
    } else if (!nameRegex.test(fName)) {
        setErrorFor(fname, 'Not a valid name');
    } else {
        setSuccessFor(fname);
    }

    if (lName === '') {
        setErrorFor(lname, 'Last Name cannot be blank');
    } else if (!nameRegex.test(lName)) {
        setErrorFor(lname, 'Not a valid name');
    } else {
        setSuccessFor(lname);
    }

    if (DOB === '') {
        setErrorFor(dob, 'DOB cannot be blank');
    } else if (!dobRegex.test(DOB)) {
        setErrorFor(dob, 'Not a valid DOB');
    } else {
        const cDate = new Date(); //current date
        const age = cDate.getFullYear() - new Date(DOB).getFullYear();

        if (new Date(DOB) > cDate) { //check for future date
            setErrorFor(dob, 'Invalid date. Please check');
        }

        if (age >= 30) {
            setErrorFor(dob, 'You are not eligible for the competition');
        } else if (age <= 20) { //university age is taken as 20
            setErrorFor(dob, 'Please check your DOB');
        } else {
            setSuccessFor(dob);
        }
    }

    if (NIC === '') {
        setErrorFor(nic, 'NIC cannot be blank');
    }
    else if (!nicRegex.test(NIC) && !nicRegex2.test(NIC)) { //checking both nic formats
        setErrorFor(nic, 'Not a valid NIC');
    } else {
        setSuccessFor(nic);
    }

    if (Faculty === '') {
        setErrorFor(faculty, 'Faculty cannot be blank');
    } else {
        setSuccessFor(faculty);
    }

    if (Email === '') {
        setErrorFor(email, 'Email cannot be blank');
    } else if (!emailRegex.test(Email)) {
        setErrorFor(email, 'Not a valid email');
    } else {
        setSuccessFor(email);
    }

    if (Email2 === '') {
        setErrorFor(email2, 'Confirm Email cannot be blank');
    } else if (Email !== Email2) {
        setErrorFor(email2, 'Emails does not match');
    } else {
        setSuccessFor(email2);
    }

    if (contactNo === '') {
        setErrorFor(contact, 'Contact number cannot be blank');
    } else if (!contactRegex.test(contactNo)) {
        setErrorFor(contact, 'Contact number is not valid');
    } else {
        setSuccessFor(contact);
    }

}

function setErrorFor(input, message) {
    const formControl = input.parent();
    const small = formControl.children("small").first();
    formControl.removeClass("col-75 success");
    formControl.addClass("col-75 error");
    small.text(message);
}

function setSuccessFor(input) {
    const formControl = input.parent();
    formControl.removeClass("col-75 error");
    formControl.addClass("col-75 success");
}
