var location_city;
var location_adress;
var location_phone_number;
var location_e_mail;
var location_image;
var location_hour;
var location_services;


$(window).ready(function () {
    
    console.log("Location id: "+URL.id);
    
    location_city = $("#title");
    location_adress = $("#adress");
    location_phone_number = $("#Phone_Number");
    location_e_mail = $("#E-Mail");
    location_image = $("#centered");
    location_hour = $("#Hour");
    location_services = $("#services_available");
    
    $.ajax({
        method: "GET",
        dataType: "json",
        crossDomain: true,
        url: "/locations/"+URL.id,
        
        success: function (response) {
            console.log(response);
            
            var location_id = URL.id;
            
            if(location_id == null)
                console.log("Nessun id selezionato")
            else{
                
                var location = response[0];
                
                console.log(location);
                                    
                location_city.text(location.city);
                location_adress.html(location.adress);
                location_phone_number.text(location.phone_number);  location_image.attr("src",location.picture); 
                location_e_mail.text(location.e_mail);
                location_hour.text(location.hour);
                location_adress.text(location.adress);
            }
            
        },
        error: function (request, error) {
            console.log(request + ":" + error);
        }
    });
    
    
    
    $.ajax({
        method: "GET",
        dataType: "json",
        crossDomain: true,
        url: "/locations/"+ URL.id +"/services",
        
        success: function (response) {
            console.log("services available:");
            console.log(response);
            
            var location_id = URL.id;
            
            if(location_id == null)
                console.log("Nessun id selezionato")
             else{
                
                var services = response;
                
                console.log(services);
                                    
                var el = "";
                
                for (var i=0; i<services.length; i++){
                    el += '<h1><a href="service.html?id='+services[i].serviceId+'">'+services[i].name+'</a></h1>';
                }
                
                location_services.html(el);
            
            }
            
        },
        error: function (request, error) {
            console.log(request + ":" + error);
        }
    });
    

});









var URL = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
  return query_string;
}();