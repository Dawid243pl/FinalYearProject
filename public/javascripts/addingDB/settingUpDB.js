/*This file is used to hold the function definitions that are used to parse the data to make sure that the correct data is input into the database
and then calls the functon in the file databaseAdding.js to add them to the database*/

//Parsing crime data
function getCrime(json_crime){

    //Parsing each crime type and population year 2018-19
    $.each(json_crime.all_wards.records, function(i){

      var bulg = json_crime.all_wards.records[i].record.fields.burglary_number;
      var sex = json_crime.all_wards.records[i].record.fields.violent_sexual_offences_number;
      var all = json_crime.all_wards.records[i].record.fields.all_crimes_number;
      var pop = json_crime.all_wards.records[i].record.fields.latest_mid_year_population_estimates_for_ward;
      var wrd = json_crime.all_wards.records[i].record.fields.ward_name;
      var year = "2018-19";

      addCrimeToDb(wrd,year,bulg,sex,all,pop);
 

    }); 

     //Parsing each crime type and population year 2017-18
    $.each(json_crime.year_17_18.records, function(i){

      var bulg = json_crime.year_17_18.records[i].record.fields.burglary_number;
      var sex = json_crime.year_17_18.records[i].record.fields.violent_sexual_offences_number;
      var all = json_crime.year_17_18.records[i].record.fields.all_crimes_number;
      var pop = json_crime.year_17_18.records[i].record.fields.latest_mid_year_population_estimates_for_ward;
      var wrd = json_crime.year_17_18.records[i].record.fields.ward_name;
      var year = "2017-18";


      addCrimeToDb(wrd,year,bulg,sex,all,pop);
 

    }); 
    
     //Parsing each crime type and population year 2016-17
    $.each(json_crime.year_16_17.records, function(i){

      var bulg = json_crime.year_16_17.records[i].fields.burglary_number;
      var sex = json_crime.year_16_17.records[i].fields.violent_sexual_offences_number;
      var all = json_crime.year_16_17.records[i].fields.all_crimes_number;
      var pop = json_crime.year_16_17.records[i].fields.latest_mid_year_population_estimates_for_ward;
      var wrd = json_crime.year_16_17.records[i].fields.ward_name;
      var year = "2016-17";


      addCrimeToDb(wrd,year,bulg,sex,all,pop);
 

    }); 
  }

 
  //Parsing quallity of life data  data

  function getQuallity(json_quall){

    //Parsing each crime inidcator and its stats
    $.each(json_quall.crimeQ.records, function(i){

      var wrd = json_quall.crimeQ.records[i].record.fields.ward_name;
      var up = json_quall.crimeQ.records[i].record.fields.upper_confidence_limit;
      var indicator = json_quall.crimeQ.records[i].record.fields.indicator;
      var low = json_quall.crimeQ.records[i].record.fields.lower_confidence_limit;
      var theme = json_quall.crimeQ.records[i].record.fields.theme;
      
      //if some of the inidcators do not have a value input 0 to the database
      var total = avgTwoNumb(low,up);  
      if (total == null){
          total = 0;
      }  
      //fix naming convention to be compatabile with database storing   
      var indicator = String(indicator);
      var indicator = indicator.replace('% ','');
      var indicator = indicator.replace('/','');


      addquallityOfLifeToDb(wrd,indicator,theme,total);


    });


    //Parsing each transport inidcator and its stats
    $.each(json_quall.transportQ.records, function(i){

      var wrd = json_quall.transportQ.records[i].record.fields.ward_name;
      var up = json_quall.transportQ.records[i].record.fields.upper_confidence_limit;
      var indicator = json_quall.transportQ.records[i].record.fields.indicator;
      var low = json_quall.transportQ.records[i].record.fields.lower_confidence_limit;
      var theme = json_quall.transportQ.records[i].record.fields.theme;

       //if some of the inidcators do not have a value input 0 to the database
      var total = avgTwoNumb(low,up);  
      if (total == null){
          total = 0;
      }  
     
      //fix naming convention to be compatabile with database storing   
      var indicator = String(indicator);
      var indicator = indicator.replace('% ','');
      var indicator = indicator.replace('/','');


      addquallityOfLifeToDb(wrd,indicator,theme,total);


    });

  };

  //parsing all of the population data from 2012 to 2018 and adding to db
  function getPopulation(json_pop){

    $.each(json_pop.population_18.records, function(i){

      
      var ward = json_pop.population_18.records[i].record.fields["2016_ward_name"];
      var year = json_pop.population_18.records[i].record.fields.mid_year;
      var workingAgeP = json_pop.population_18.records[i].record.fields.working_age;
      var olderPP = json_pop.population_18.records[i].record.fields.older_people;
      var childrenP = json_pop.population_18.records[i].record.fields.children;
      var workingAgeN = json_pop.population_18.records[i].record.fields.working_age_16_64_year_olds;
      var olderPN = json_pop.population_18.records[i].record.fields.older_people_65_years_and_over;
      var childrenN = json_pop.population_18.records[i].record.fields.children_0_15_year_olds;
      var totalPop = json_pop.population_18.records[i].record.fields.total_population_all_ages;

      addPopulationToDb(ward,year,workingAgeP,olderPP,childrenP,workingAgeN,olderPN,childrenN,totalPop);
    });
    $.each(json_pop.population_17.records, function(i){
        
      var ward = json_pop.population_17.records[i].record.fields["2016_ward_name"];
      var year = json_pop.population_17.records[i].record.fields.mid_year;
      var workingAgeP = json_pop.population_17.records[i].record.fields.working_age;
      var olderPP = json_pop.population_17.records[i].record.fields.older_people;
      var childrenP = json_pop.population_17.records[i].record.fields.children;
      var workingAgeN = json_pop.population_17.records[i].record.fields.working_age_16_64_year_olds;
      var olderPN = json_pop.population_17.records[i].record.fields.older_people_65_years_and_over;
      var childrenN = json_pop.population_17.records[i].record.fields.children_0_15_year_olds;
      var totalPop = json_pop.population_17.records[i].record.fields.total_population_all_ages;

      addPopulationToDb(ward,year,workingAgeP,olderPP,childrenP,workingAgeN,olderPN,childrenN,totalPop);
    });

    
    $.each(json_pop.population_16.records, function(i){
        
      var ward = json_pop.population_16.records[i].record.fields["2016_ward_name"];
      var year = json_pop.population_16.records[i].record.fields.mid_year;
      var workingAgeP = json_pop.population_16.records[i].record.fields.working_age;
      var olderPP = json_pop.population_16.records[i].record.fields.older_people;
      var childrenP = json_pop.population_16.records[i].record.fields.children;
      var workingAgeN = json_pop.population_16.records[i].record.fields.working_age_16_64_year_olds;
      var olderPN = json_pop.population_16.records[i].record.fields.older_people_65_years_and_over;
      var childrenN = json_pop.population_16.records[i].record.fields.children_0_15_year_olds;
      var totalPop = json_pop.population_16.records[i].record.fields.total_population_all_ages;

      addPopulationToDb(ward,year,workingAgeP,olderPP,childrenP,workingAgeN,olderPN,childrenN,totalPop);
    });
    $.each(json_pop.population_15.records, function(i){
        
      var ward = json_pop.population_15.records[i].record.fields["2016_ward_name"];
      var year = json_pop.population_15.records[i].record.fields.mid_year;
      var workingAgeP = json_pop.population_15.records[i].record.fields.working_age;
      var olderPP = json_pop.population_15.records[i].record.fields.older_people;
      var childrenP = json_pop.population_15.records[i].record.fields.children;
      var workingAgeN = json_pop.population_15.records[i].record.fields.working_age_16_64_year_olds;
      var olderPN = json_pop.population_15.records[i].record.fields.older_people_65_years_and_over;
      var childrenN = json_pop.population_15.records[i].record.fields.children_0_15_year_olds;
      var totalPop = json_pop.population_15.records[i].record.fields.total_population_all_ages;

      addPopulationToDb(ward,year,workingAgeP,olderPP,childrenP,workingAgeN,olderPN,childrenN,totalPop);
    });

    $.each(json_pop.population_14.records, function(i){
        
      var ward = json_pop.population_14.records[i].record.fields["2016_ward_name"];
      var year = json_pop.population_14.records[i].record.fields.mid_year;
      var workingAgeP = json_pop.population_14.records[i].record.fields.working_age;
      var olderPP = json_pop.population_14.records[i].record.fields.older_people;
      var childrenP = json_pop.population_14.records[i].record.fields.children;
      var workingAgeN = json_pop.population_14.records[i].record.fields.working_age_16_64_year_olds;
      var olderPN = json_pop.population_14.records[i].record.fields.older_people_65_years_and_over;
      var childrenN = json_pop.population_14.records[i].record.fields.children_0_15_year_olds;
      var totalPop = json_pop.population_14.records[i].record.fields.total_population_all_ages;

      addPopulationToDb(ward,year,workingAgeP,olderPP,childrenP,workingAgeN,olderPN,childrenN,totalPop);
    });

    $.each(json_pop.population_13.records, function(i){
        
      var ward = json_pop.population_13.records[i].record.fields["2016_ward_name"];
      var year = json_pop.population_13.records[i].record.fields.mid_year;
      var workingAgeP = json_pop.population_13.records[i].record.fields.working_age;
      var olderPP = json_pop.population_13.records[i].record.fields.older_people;
      var childrenP = json_pop.population_13.records[i].record.fields.children;
      var workingAgeN = json_pop.population_13.records[i].record.fields.working_age_16_64_year_olds;
      var olderPN = json_pop.population_13.records[i].record.fields.older_people_65_years_and_over;
      var childrenN = json_pop.population_13.records[i].record.fields.children_0_15_year_olds;
      var totalPop = json_pop.population_13.records[i].record.fields.total_population_all_ages;

      addPopulationToDb(ward,year,workingAgeP,olderPP,childrenP,workingAgeN,olderPN,childrenN,totalPop);
    });
    $.each(json_pop.population_12.records, function(i){
        
      var ward = json_pop.population_12.records[i].record.fields["2016_ward_name"];
      var year = json_pop.population_12.records[i].record.fields.mid_year;
      var workingAgeP = json_pop.population_12.records[i].record.fields.working_age;
      var olderPP = json_pop.population_12.records[i].record.fields.older_people;
      var childrenP = json_pop.population_12.records[i].record.fields.children;
      var workingAgeN = json_pop.population_12.records[i].record.fields.working_age_16_64_year_olds;
      var olderPN = json_pop.population_12.records[i].record.fields.older_people_65_years_and_over;
      var childrenN = json_pop.population_12.records[i].record.fields.children_0_15_year_olds;
      var totalPop = json_pop.population_12.records[i].record.fields.total_population_all_ages;

      addPopulationToDb(ward,year,workingAgeP,olderPP,childrenP,workingAgeN,olderPN,childrenN,totalPop);
    });



  }

  //get each of the wards and add them to db  
  function getWard(json_wards){

    $.each(json_wards.wards.records, function(i){

      var ward = json_wards.wards.records[i].record.fields.name;

      addWardsToDb(ward);
    });
   
  }