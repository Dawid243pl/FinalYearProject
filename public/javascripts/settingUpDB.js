function getCrime(json_crime){
    $.each(json_crime.all_wards.records, function(i){

      
      //console.log("all json",json_crime.all_wards.records);
      //console.log("k",json_crime.all_wards.records[i]);

      //console.log(json_crime.all_wards.records[i].record.fields.burglary_number);


      var bulg = json_crime.all_wards.records[i].record.fields.burglary_number;
      var sex = json_crime.all_wards.records[i].record.fields.violent_sexual_offences_number;
      var all = json_crime.all_wards.records[i].record.fields.all_crimes_number;
      var pop = json_crime.all_wards.records[i].record.fields.latest_mid_year_population_estimates_for_ward;
      var wrd = json_crime.all_wards.records[i].record.fields.ward_name;


      addCrimeToDb(wrd,bulg,sex,all,pop);
 

    }); 
    
   
  }

  function getEdu(json_edu){
    
    $.each(json_edu.Current_ward.records, function(k, v){
     
      if (v.fields.time_period === "2018/2019"){
        console.log("good devo",v.fields.achieving_a_good_level_of_development);
     
        var devo = v.fields.achieving_a_good_level_of_development;
  
       
      }


    }); 
  

  };

  function getQuallity(json_quall){
    $.each(json_quall.crimeQ.records, function(i){

      var wrd = json_quall.crimeQ.records[i].record.fields.ward_name;
      var up = json_quall.crimeQ.records[i].record.fields.upper_confidence_limit;
      var indicator = json_quall.crimeQ.records[i].record.fields.indicator;
      var low = json_quall.crimeQ.records[i].record.fields.lower_confidence_limit;
      var theme = json_quall.crimeQ.records[i].record.fields.theme;

      var total = avgTwoNumb(low,up);  
      if (total == null){
          total = 0;
      }  
        
      var indicator = String(indicator);
      var indicator = indicator.replace('% ','');
      var indicator = indicator.replace('/','');


      addquallityOfLifeToDb(wrd,indicator,theme,total);


    });

    /*
    $.each(json_quall.all_wards.records, function(i){
     
      console.log("INDI",ward,indicator);

      //console.log("all json",json_crime.all_wards.records);
      //console.log("k",json_quall.all_wards);
      var wrd = json_quall.all_wards.records[i].record.fields.ward_name;
      var up = json_quall.all_wards.records[i].record.fields.upper_confidence_limit;
      var indicator = json_quall.all_wards.records[i].record.fields.indicator;
      var low = json_quall.all_wards.records[i].record.fields.lower_confidence_limit;
      var theme = json_quall.all_wards.records[i].record.fields.theme;
      
      var total = avgTwoNumb(low,up);  
      if (total == null){
          total = 0;
      }  
        
      var indicator = String(indicator);
      var indicator = indicator.replace('% ','');
      var indicator = indicator.replace('/','');
      
 //prints: 123
      console.log(wrd,indicator,theme,total);
      addquallityOfLifeToDb(wrd,indicator,theme,total);
      
    }); 
 */

  };
