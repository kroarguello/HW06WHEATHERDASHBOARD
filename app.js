var today = moment().format('LLL');
        console.log(today);
        var divP=$("#cards-days");     
 
// Search Button 
$(document).on("click", "#buttonSearch", searchCity);


//Searching City
function searchCity(){
    var cityL = $("#citySearch").val();
    if (cityL == ""){
       alert("Please type a City");
    }
    else{
        var btn = $("<button>");
        btn.addClass("btn btn-primary cities-btn");
        btn.text(cityL);
        btn.attr("data-city",cityL);
        $("#cities").prepend(btn);

            
    
    weatherCityDisplay(cityL);
    
     
    // clear Text area
    $("#citySearch").val("");
    
      }
    
}

// on click in the cities of the list

$(document).on("click", ".cities-btn", newCityDisplay);


function newCityDisplay(){
    var cityLista = $(this).attr("data-city");
    weatherCityDisplay(cityLista);
}


//shows data for that city
function weatherCityDisplay(city){

    var urlWeather = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=99301d0cd337422b7e967fbf9be0bf70";



$.ajax({         
         url : urlWeather,
         method : "GET"}).
         then(function(response){
    
          //look info
        var nameCity = response.name;
        var tempCity = response.main.temp;
        var feelCity = response.main.feels_like;
        var humidityCity = response.main.humidity;
        var windCity = response.wind.speed;

        var divEl = $("#currentCity"); 
        
        //clear div w where show the city weather 
        divEl.empty();
        divP.empty();

        var nameC = $("<h1>").text(nameCity);
        divEl.append(nameC);

        

        var todayC = $("<div>").text(today);
        todayfC=moment().format('LL');
        divEl.append(todayfC);

        var tempC = $("<div>").text("Temperature : " + tempCity + "F");
        divEl.append(tempC);

        var feelC = $("<div>").text("Feels Like  : " + feelCity + "F");
        divEl.append(feelC);

        var humidityC = $("<div>").text("Humidity  : " + humidityCity +"%");
        divEl.append(humidityC);

        var windC = $("<div>").text("wind : " + windCity + "m/h");
        divEl.append(windC);
         
        
        weatherForecastDisplay(city); 
         });
         


// show Forecast of the city
    function weatherForecastDisplay(city){
             
        var urlForecast = "http://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=imperial&appid=99301d0cd337422b7e967fbf9be0bf70";
   $.ajax({
       url:urlForecast,
       method: "GET"})
       .then(function(response){
       
       
        //getting info of each day
      for(var i=9; i < 42; i=i+8 ) {
         if(i > 33){
             i=39;
         }
      
         var dateWeather1 = response.list[i].dt_txt;
         var tempWeather1 = response.list[i].main.temp_max;
         var tempMWeather1 = response.list[i].main.temp_min;
         var humWeather1 = response.list[i].main.humidity;
         var skyWeather1 = response.list[i].weather[0].main;
         var imgskyWeather1 = response.list[i].weather[0].icon;
         var urlimgsky = "http://openweathermap.org/img/wn/"+imgskyWeather1+"@2x.png";


        //Making Cards
         var divP=$("#cards-days");
    
         var div1 = $("<div>");
             div1.addClass("card text-white bg-info");
         var div2 = $("<div>");
             div2.addClass("card-header");
             dateWeather = moment(dateWeather1).format('ll');
         var div2text=div2.text(dateWeather);    
         var div3 = $("<div>");
             div3.addClass("card-body");
         var p1 = $("<p>");
             p1.addClass("card-text letter-card");
         var p1text = p1.text(" Temp Max :" + tempMWeather1 + " F Temp Min ;"+ tempMWeather1+"F  Humidity : "+humWeather1+"% \n Sky :"+skyWeather1);
         


         divP.append(div1);
         div1.append(div2);
         div2.append(div3);
         div3.append(p1);
         
      }
    });
     
    }     
}