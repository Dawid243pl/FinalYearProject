  $(function(){


  
  $("#delUSer").click(function () {
  
    var selectedUser = $('input[name="userz"]:checked').val();
    $("#editUserMail").val(selectedUser);


  });

  });

  function convertDate(dateString){
    var p = dateString.split(/\D/g)
    return [p[2],p[1],p[0] ].join("-")
  }
  
  function getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}
  
  async function fetchAdminData()  {
    try{
      
      var stampUserHolder =[];
      var stampUserTimeArr=[];
      var stampUserMailArr=[];
      var stampCounted =[];
      var timeSeparate =[];
      var labelSeparate=[];

      const api_url_userDetails = `userInfo`;
      const response_userDetails = await fetch(api_url_userDetails);
      const json_userDetails = await response_userDetails.json();

      const api_url_ward = `../listWards`;
      const response_ward = await fetch(api_url_ward);
      const json_ward = await response_ward.json();



      $.each(json_userDetails.Users, function(i){
   
        var stampTime =json_userDetails.Users[i].TimeStamp;
        var stampMail =json_userDetails.Users[i].Email;

        var d = new Date(stampTime);
      
        var d = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
   
        stampUserTimeArr.push(d);
        stampUserMailArr.push(stampMail);
  
      });
      
      
    let unique = [...new Set(stampUserTimeArr)]; 
    
    
    unique.sort(function (a, b) {
      // '01/03/2014'.split('/')
      // gives ["01", "03", "2014"]
      // gives ["2014","03","01"]
      a = a.split('-');
      b = b.split('-');
   
      return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];            
  });



    for (var zi =0;zi < unique.length;zi++){
      
      var count = getOccurrence(stampUserTimeArr, unique[zi])
      
      var stampObj = new Object();
      stampObj.x = unique[zi];
      stampObj.y =count;
      
      stampCounted.push(stampObj);
      
    }
    



    console.log(unique);
    timeChart("userStamp",unique,stampCounted); 


      console.log(json_ward.wards.total_count);
      if(json_userDetails.length == 0) {
        
        $(".tBodyAdminUsers").append("<p>There are no users</p>");

      }else{
        $("#totUser").append(json_userDetails.Total[0].Standard);
        $("#totAdmin").append(json_userDetails.Total[0].Admin);
        $("#totWard").append(json_ward.wards.total_count);
            
        $.each(json_userDetails.Users, function(i){
   
            $(".tBodyAdminUsers").append("<tr scope='row' class='user'><td class='uMail'>"+json_userDetails.Users[i].Email+"</td/><td  scope='row' class='uFname'td>"+json_userDetails.Users[i].fName+"</td><td  scope='row' class='uLname'>"+json_userDetails.Users[i].lName+"</td><td  scope='row' class='uAddress'>"+json_userDetails.Users[i].Address+"</td><td  scope='row' class='uPostCode'td>"+json_userDetails.Users[i].PostCode+"</td><td  scope='row' class='uCity'>"+json_userDetails.Users[i].City+"</td><td  scope='row'>"+json_userDetails.Users[i].AccountType+"</td><td  scope='row'><input type='radio' class='uzerz' name='userz' value='"+json_userDetails.Users[i].Email+"'></td></tr>");
           
          });
       
      }


      $("#openEdit").click(function () {
      
        console.log($('input[name="userz"]:checked').val());
      
        //console.log($('input[name="userz"]:checked').val());

        if($('input[name="userz"]:checked').val() == null){

          alert("please select a user to edit");

        }else{

        $("#myModalz").toggle("slow");
        $.each(json_userDetails.Users, function(i){
   
          if(json_userDetails.Users[i].Email == $('input[name="userz"]:checked').val()){

            $("input#validationDefault01").val(json_userDetails.Users[i].fName);
            $("input#validationDefault02").val(json_userDetails.Users[i].lName);
            $("input#inputEmail4").val(json_userDetails.Users[i].Email);
            $("input#mailOld").val(json_userDetails.Users[i].Email);
            $("input#inputZip").val( json_userDetails.Users[i].PostCode);
            $("input#inputAddress").val(json_userDetails.Users[i].Address);
            $("input#inputCity").val(json_userDetails.Users[i].City);
          }
                    
        });
      }
        

      });
      $("#openAddUser").click(function () {
      
        
        $("#myModalzAdd").toggle("slow");
        

      });
          
    

    }catch(err){
      console.error(err);
      // Handle errors here
    }
  }

