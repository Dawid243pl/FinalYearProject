/*This file is used for managing Admin accounts*/
//function to check if the user was selected to delete
function validateDel() {
	if ($('input[name="userz"]:checked').val() == null) {
		alert("please select a user to Delete");
		return false;
	} else {
		var selectedUser = $('input[name="userz"]:checked').val();
		$("#editUserMail").val(selectedUser);
		return true;
	}
}
//function to conver the data to be - rather than / 
function convertDate(dateString) {
	var p = dateString.split(/\D/g)
	return [p[2], p[1], p[0]].join("-")
}
//function to see how many times an object appears in the array
function getOccurrence(array, value) {
	var count = 0;
	array.forEach((v) => (v === value && count++));
	return count;
}
/*Admin functionallity*/
async function fetchAdminData() {
	try {
		var stampUserHolder = [];
		var stampUserTimeArr = [];
		var stampUserMailArr = [];
		var stampCounted = [];
		var timeSeparate = [];
		var labelSeparate = [];
		/* Calling the user info and the list of wards */
		const api_url_userDetails = `userInfo`;
		const response_userDetails = await fetch(api_url_userDetails);
		const json_userDetails = await response_userDetails.json();
		const api_url_ward = `../listWards`;
		const response_ward = await fetch(api_url_ward);
		const json_ward = await response_ward.json();
		/*split each date and email for data ready to create the visual*/
		$.each(json_userDetails.Users, function(i) {
			var stampTime = json_userDetails.Users[i].TimeStamp;
			var stampMail = json_userDetails.Users[i].Email;
			var d = new Date(stampTime);
			var d = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
			stampUserTimeArr.push(d);
			stampUserMailArr.push(stampMail);
    });
	
		//sort date array
		stampUserTimeArr.sort(function (a, b) {
			if (a > b) return 1;
			if (a < b) return -1;
			return 0;
		  });
	  
		//save second array so that its occurance can still be counted in the stampUserTimeArr
		let unique = [...new Set(stampUserTimeArr)];

		var unique2 =[...new Set(stampUserTimeArr)];
   
	//change date format yo be dd/mm/yyyy
	
	for (var p = 0; p < unique.length; p++) {
		
		unique[p] = formatDate (unique[p]);
	
	}


	
		//count each uniqe time stamp. Count the second array as this has the orginal yyyy/mm/dd format but display the first array which is dd/mm/yyyy
		for (var zi = 0; zi < unique.length; zi++) {
			var count = getOccurrence(stampUserTimeArr, unique2[zi]);
			var stampObj = new Object();
			stampObj.x = unique[zi];
			stampObj.y = count;
			stampCounted.push(stampObj);
    }
	
		//create visual with users time stamps
		timeChart("userStamp", unique, stampCounted);
		//if there are no users say there are no users othewise count them and display the visual
		if (json_userDetails.length == 0) {
			$(".tBodyAdminUsers").append("<p>There are no users</p>");
		} else {
			$("#totUser").append(json_userDetails.Total[0].Standard);
			$("#totAdmin").append(json_userDetails.Total[0].Admin);
			$("#totWard").append(json_ward.wards.total_count);
			//display a list of users to the admin
			$.each(json_userDetails.Users, function(i) {
				$(".tBodyAdminUsers").append("<tr scope='row' class='user'><td class='uMail'>" + json_userDetails.Users[i].Email + "</td/><td  scope='row' class='uFname'td>" + json_userDetails.Users[i].fName + "</td><td  scope='row' class='uLname'>" + json_userDetails.Users[i].lName + "</td><td  scope='row' class='uAddress'>" + json_userDetails.Users[i].Address + "</td><td  scope='row' class='uPostCode'td>" + json_userDetails.Users[i].PostCode + "</td><td  scope='row' class='uCity'>" + json_userDetails.Users[i].City + "</td><td  scope='row'>" + json_userDetails.Users[i].AccountType + "</td><td  scope='row'><input type='radio' class='uzerz' name='userz' value='" + json_userDetails.Users[i].Email + "'></td></tr>");
			});
		}
		//when clicking the edit user get the users information and put it in the pop up if no user was selected show an error 
		$("#openEdit").click(function() {
			if ($('input[name="userz"]:checked').val() == null) {
				alert("please select a user to edit");
			} else {
				$("#myModalz").toggle("slow");
				$.each(json_userDetails.Users, function(i) {
					if (json_userDetails.Users[i].Email == $('input[name="userz"]:checked').val()) {
						$("input#validationDefault01Edit").val(json_userDetails.Users[i].fName);
						$("input#validationDefault02Edit").val(json_userDetails.Users[i].lName);
						$("input#inputEmail4Edit").val(json_userDetails.Users[i].Email);
						$("input#mailOld").val(json_userDetails.Users[i].Email);
						$("input#inputZipEdit").val(json_userDetails.Users[i].PostCode);
						$("input#inputAddressEdit").val(json_userDetails.Users[i].Address);
						$("input#inputCityEdit").val(json_userDetails.Users[i].City);
					}
				});
			}
		});
		//show slowsly the pop up when adding a user
		$("#openAddUser").click(function() {
			$("#myModalzAdd").toggle("slow");
		});
	} catch (err) {
		console.error(err);
		// Handle errors here
	}
}