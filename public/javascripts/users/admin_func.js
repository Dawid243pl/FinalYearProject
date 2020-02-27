      async function fetchAdminData()  {
    try{
      //let response = await fetch(`crime_create/${ward}/${bulglary}/${sexOffence}/${allCrimes}/${totalPop}/${year}`);


      const api_url_userDetails = `userInfo`;
      const response_userDetails = await fetch(api_url_userDetails);
      const json_userDetails = await response_userDetails.json();

     console.log(json_userDetails);
      var usersPostcode = json_userDetails.User[0].PostCode;
         
         
      if(json_userDetails.length == 0) {
        
        $(".tBodyAdminUsers").append("<p>There are no users</p>");

      }else{
            
        $.each(json_userDetails.Users, function(i){
   
            $(".tBodyAdminUsers").append("<tr><td>"+json_userDetails.Users[i].Email+"</td/><td>"+json_userDetails.Users[i].fName+"</td><td>"+json_userDetails.Users[i].lName+"</td><td>"+json_userDetails.Users[i].Address+"</td><td>"+json_userDetails.Users[i].PostCode+"</td><td>"+json_userDetails.Users[i].City+"</td><td>"+json_userDetails.Users[i].AccountType+"</td></tr>");
           
          });
          $("#totUser").append(json_userDetails.Total[0].Standard);
          $("#totAdmin").append(json_userDetails.Total[0].Admin);
      }


    }catch(err){
      console.error(err);
      // Handle errors here
    }
  }

