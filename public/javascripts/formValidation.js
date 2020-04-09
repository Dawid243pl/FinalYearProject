/*This file deals with form validation*/
//Checking if the user is registering with a postcode within Bristol if they are register them otherwise throw an error message
function checkBristolRegister(pCode) {
	var checkPFormat = checkPostCode(pCode);
	if (checkPFormat) {
		$.getJSON('../postCode/' + pCode, function(data) {
			if (data.postcode.result.primary_care_trust == "Bristol") {
				document.getElementById("userForm").submit();
				return true;
			} else {
				alert("Postcode not withing bristol");
				return false;
			}
		});
	} else {
		alert("Wrong postcode format");
		return false;
	}
};
//when adding a user check if their address is within Bristol if they are register them otherwise throw an error message
function checkBristolAdd(pCode) {
	var checkPFormat = checkPostCode(pCode);
	if (checkPFormat) {
		$.getJSON('../postCode/' + pCode, function(data) {
			if (data.postcode.result.primary_care_trust == "Bristol") {
				document.getElementById("addUser").submit();
				return true;
			} else {
				alert("Postcode not withing bristol");
				return false;
			}
		});
	} else {
		alert("Wrong postcode format");
		return false;
	}
};
//admin editing user details check users postcode when their account details have been editied if it
//is within Bristol if they are save their details otherwise throw an error message
function checkBristolEdit(pCode) {
	var checkPFormat = checkPostCode(pCode);

	if (checkPFormat) {
		$.getJSON('../postCode/' + pCode, function(data) {
			if (data.postcode.result.primary_care_trust == "Bristol") {
				document.getElementById("edit").submit();
				return true;
			} else {
				alert("Postcode not withing bristol");
				return false;
			}
		});
	} else {
		alert("Wrong postcode format");
		return false;
	}
};
//user updating their details check users postcode when their account details have been editied if it
//is within Bristol if they are save their details otherwise throw an error message
function checkBristoluserEdit(pCode) {
	var checkPFormat = checkPostCode(pCode);
	if (checkPFormat) {
		$.getJSON('../postCode/' + pCode, function(data) {
			if (data.postcode.result.primary_care_trust == "Bristol") {
				document.getElementById("userDetailsForm").submit();
				return true;
			} else {
				alert("Postcode not withing bristol");
				return false;
			}
		});
	} else {
		alert("Wrong postcode format");
		return false;
	}
};
//get the users postcode value when they try to register and validate it using checkBristolRegister function
function checkPCode() {
	var pCode = $("#inputZip").val();
	if (!pCode) {
		alert("Please enter a valid Postcode")
		return false;
	} else {
		checkBristolRegister(pCode);
		return false;
	}
}
//get the users postcode value when an admin changes their details and validate it using checkBristolAdd function
function checkPCode2() {
	checkuserMail2();
	var pCode = $("#inputZip.Add").val();
	if (!pCode) {
		alert("Please enter a valid Postcode")
		return false;
	} else {
		checkBristolAdd(pCode);
		return false;
	}
}
//get the users postcode value when an admin changes their details and validate it using checkBristolAdd function
function checkPCode3() {
	checkuserMail3();
	var pCode = $("#inputZipEdit.Edit").val();
	if (!pCode) {
		alert("Please enter a valid Postcode")
		return false;
	} else {
		checkBristolEdit(pCode);
		return false;
	}
}
//Check if when editing a users by admin the users email is an email that is already taken
function checkuserMail3() {
	//var oldMail = userMail;
	var newMail = $("#inputEmail4Edit").val();
	var oldMail = $("#mailOld").val();
	$.getJSON('/users/listAllUsers', function(data) {
		for (var i = 0; i < data.allUsers.length; i++) {
			if (newMail == oldMail) {} else {
				if (newMail == data.allUsers[i].Email) {
					alert("User add email address already taken");
				}
			}
		}
	});
}
//Check if when adding a users by admin the users email is an email that is already taken
function checkuserMail2() {
	var newMail = $("#inputEmail4.mailAdd").val();
	$.getJSON('/users/listAllUsers', function(data) {
		for (var i = 0; i < data.allUsers.length; i++) {
			if (newMail == data.allUsers[i].Email) {
				alert("User email address already taken");
			} else {}
		}
	});
}
//Check if when editing the users email if that email is already taken
function checkuserMail() {
	var newMail = $("#inputEmail4.EditUserMail").val();
	$.getJSON('/users/listAllUsers', function(data) {
		var currentMail = data.usersList[0].Email;
		console.log("currentMail", data.usersList[0].Email);
		if (newMail != currentMail) {
			for (var i = 0; i < data.allUsers.length; i++) {
				if (newMail == data.allUsers[i].Email) {
					alert("User email address already taken");
				} else {}
			}
		}
	});
}
//get the users postcode value when they try to change their details and validate it using checkBristolRegister function
function checkPCode4() {
	checkuserMail();
	var pCode = $("#inputZip.EditUser").val();
	if (!pCode) {
		alert("Please enter a valid Postcode")
		return false;
	} else {
		checkBristoluserEdit(pCode);
		return false;
	}
}