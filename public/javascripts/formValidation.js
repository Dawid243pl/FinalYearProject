function checkBristolRegister(pCode){
    var checkPFormat = checkPostCode(pCode);
    alert(checkPFormat);
    if(checkPFormat){
      $.getJSON('../postCode/'+pCode, function(data) {
        
  
        if (data.postcode.result.primary_care_trust == "Bristol"){
          document.getElementById("userForm").submit();
          return true;
    
        }else{
          alert("Postcode not withing bristol");
          return false;
        }
    });
    }else{
      alert("Wrong postcode format");
      return false;
    }
    
  };


  function checkBristolAdd(pCode){
    var checkPFormat = checkPostCode(pCode);
    alert(checkPFormat);
    if(checkPFormat){
      $.getJSON('../postCode/'+pCode, function(data) {
        
       
  
        if (data.postcode.result.primary_care_trust == "Bristol"){
          document.getElementById("addUser").submit();
          return true;
    
        }else{
          alert("Postcode not withing bristol");
          return false;
        }
    });
    }else{
      alert("Wrong postcode format");
      return false;
    }
    
  };

  
  function checkBristolEdit(pCode){
    var checkPFormat = checkPostCode(pCode);
    alert(checkPFormat);
    if(checkPFormat){
      $.getJSON('../postCode/'+pCode, function(data) {
        
        if (data.postcode.result.primary_care_trust == "Bristol"){
          document.getElementById("edit").submit();
          return true;
    
        }else{
          alert("Postcode not withing bristol");
          return false;
        }
    });
    }else{
      alert("Wrong postcode format");
      return false;
    }
    
  };


  function checkBristoluserEdit(pCode){
    var checkPFormat = checkPostCode(pCode);
  
    if(checkPFormat){
      $.getJSON('../postCode/'+pCode, function(data) {
        
  
        if (data.postcode.result.primary_care_trust == "Bristol"){
          document.getElementById("userDetailsForm").submit();
      
          return true;
    
        }else{
          alert("Postcode not withing bristol");
          return false;
        }
    });
    }else{
      alert("Wrong postcode format");
      return false;
    }
    
  };













  
function checkPCode(){

    var pCode = $("#inputZip").val();
  
    if(!pCode){
       alert("Please enter a valid Postcode")
        return false;
    }
    else{
      checkBristolRegister(pCode);
   
       return false;
    }
    
  
  
  }
  
  
  
  function checkPCode2(){
  
    var pCode = $("#inputZip.Add").val();
  
   
    if(!pCode){
       alert("Please enter a valid Postcode")
        return false;
    }
    else{
      checkBristolAdd(pCode);
   
       return false;
    }
  
     
  
  }
  
  
  function checkPCode3(){
  
    var pCode = $("#inputZipEdit.Edit").val();
  
   
    if(!pCode){
       alert("Please enter a valid Postcode")
        return false;
    }
    else{
      checkBristolEdit(pCode);
   
       return false;
    }
    
  }
  
  function checkuserMail(){
 
    var newMail = $("#inputEmail4.EditUserMail").val();
    $.getJSON('/users/listAllUsers', function(data) {
  
      var currentMail = data.usersList[0].Email;
      console.log("currentMail",data.usersList[0].Email);
   
      if (newMail != currentMail){
      
        for (var i =0;i < data.allUsers.length;i++){
  
          if (newMail == data.allUsers[i].Email){
            alert("User email address already taken");
            
          }else{
           
          }
  
        }    
      }
      
    });
  
  }
  function checkPCode4(){
    
    checkuserMail();

    var pCode = $("#inputZip.EditUser").val();
  
   
    if(!pCode){
       alert("Please enter a valid Postcode")
        return false;
    }
    else{
      checkBristoluserEdit(pCode);
   
       return false;
    }
    
  }