const form = $('#form');
const username = $('#username');
const email = $('#email');
const password = $('#password');
const password2 = $('#password2');

// gets the field name with proper capitalization
function getFieldName(input) {
	return input[0].id.charAt(0).toUpperCase() + input[0].id.slice(1);
}

//shows error message on given input field
function showError(input, message) {
	const formControl = input.parent();
	formControl.addClass('error');
	const small = formControl.children('small');
	small[0].innerText = message;
}

//shows success message on given input field
function showSuccess(input) {
	const formControl = input.parent();
	formControl.addClass('success');
}

//checks if email is valid
function checkEmail(email) {
	const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	if (re.test(String(email[0].value))) {
		showSuccess(email);
	} else {
		showError(email, 'Enter valid email address');
	}
}

//checks is the required firlds have been entered
function checkRequired(inputArr) {
	inputArr.forEach(function(item) {
		if (item[0].value == '') {
			showError(item, `${getFieldName(item)} is required`);
		}
	});
}

//checks min and max length of given field
function checkLength(input, min, max) {
	if (input[0].value.length < min) {
		showError(input, `${getFieldName(input)} must be at least ${min} characters long`);
	} else if (input[0].value.length > max) {
		showError(input, `${getFieldName(input)} must be less than ${max} characters`);
	} else {
		showSuccess(input);
	}
}

function checkPasswordsMatch(input1, input2) {
	if (input1[0].value != input2[0].value) showError(input2, 'Passwords do not match');
	else {
		showSuccess(input2);
	}
}
//Event Listners
form.on('submit', function(e) {
	e.preventDefault();

	checkRequired([ username, email, password, password2 ]);
	checkLength(username, 3, 15);
	checkLength(password, 6, 25);
	checkEmail(email);
	checkPasswordsMatch(password, password2);
});
