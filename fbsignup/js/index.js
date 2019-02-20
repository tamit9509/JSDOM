
function validatemail(inputtxt) {
    let err = "Enter valid number or email address";
    let phoneno = /^\d{10}$/;
    let email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ((inputtxt.value.match(phoneno))) {
        document.getElementById('mail').style.display = 'none';
        inputtxt.setCustomValidity('');
        inputtxt.blur();
        inputtxt.focus();
    }
    else if ((inputtxt.value.match(email))) {
        document.getElementById('mail').style.display = 'block';
        inputtxt.setCustomValidity('');
        inputtxt.blur();
        inputtxt.focus();
    }
    else {
        inputtxt.setCustomValidity(err);
    }
}
function matchmail(inputtxt) {
    let email = document.getElementById('email').value;
    if (email !== inputtxt.value) {
        inputtxt.setCustomValidity('Email should be matched!');
    }
    else {
        inputtxt.setCustomValidity('');
        inputtxt.blur();
        inputtxt.focus();
    }
}
