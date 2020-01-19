  
  //Add crime to db
  async function addCrimeToDb(ward,bulglary,sexOffence,allCrimes,totalPop)  {
    try{
      let response = await fetch(`crime_create/${ward}/${bulglary}/${sexOffence}/${allCrimes}/${totalPop}`);
      //return await response.json();
    }catch(err){
      console.error(err);
      // Handle errors here
    }
  }

    //Add crime to db
    async function addquallityOfLifeToDb(ward,indicator,theme,total)  {
      console.log("see this",ward,indicator,theme,total);
     
        try{
          let response = await fetch(`quallity_create/${ward}/${indicator}/${theme}/${total}`);
          
          //return await response.json();
        }catch(err){
          console.error(err);
          // Handle errors here
        }
      }