      //Add crime to db
  async function fetchUserData()  {
    try{
      //let response = await fetch(`crime_create/${ward}/${bulglary}/${sexOffence}/${allCrimes}/${totalPop}/${year}`);

      const api_url_rating = `accountRating`;
      const response_rating = await fetch(api_url_rating);
      const json_rating = await response_rating.json();

      const api_url_userDetails = `userInfo`;
      const response_userDetails = await fetch(api_url_userDetails);
      const json_userDetails = await response_userDetails.json();

      console.log(json_rating);
      console.log(json_userDetails);


      //return await response.json();
    }catch(err){
      console.error(err);
      // Handle errors here
    }
  }

