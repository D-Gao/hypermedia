var service_name;
var service_description;
var doctor_responsible;
var service_locations;
var service_doctors;


$(window).ready(function () {  
    
    console.log("Service id: "+URL.id);
    
    service_name = $("#service_name");
    service_description = $("#service_description p");
    service_doctors = $("#doctors_service ul");
    service_locations = $("#service_locations ul");
    
    
    $.ajax({
        method: "GET",
        dataType: "json",
        crossDomain: true,
        url: "/services/"+URL.id,
        
        success: function (response) {
            console.log(response);
            
            var service_id = URL.id;
            
            if(service_id == null)
                console.log("Nessun id selezionato");
            else{
                
                var service = response[0];
                
                console.log(service);
                                    
                service_name.text(service.name);
                service_description.html(service.description);
            
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
        url: "/services/"+URL.id+"/locations",
        
        success: function (response) {
            console.log(response);
            
            var service_id = URL.id;
            
            if(service_id == null)
                console.log("Nessun id selezionato")
            else{
                
                var locations = response;
                
                console.log(locations);
                                    
                var el = "";
                
                for(var i=0; i<locations.length; i++){
                    el += '<li><a href="location.html?id='+locations[i].locationId+'">'+locations[i].city+'</a></li>';
                }
                
                service_locations.html(el);
            
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
        url: "/services/"+URL.id+"/serviceResponsibleBy",
        
        success: function (response) {
            console.log("Doctor Responsable:");
            console.log(response);
            
            var service_id = URL.id;
            
            if(service_id == null)
                console.log("Nessun id selezionato");
            else{
                
                doctor_responsible = response[0];
                
                console.log(doctor_responsible);   
                
                    $.ajax({
        method: "GET",
        dataType: "json",
        crossDomain: true,
        url: "/services/"+URL.id+"/doctors",
        
        success: function (response) {
            console.log("List of doctors:");
            console.log(response);
            
            var service_id = URL.id;
            
            if(service_id == null)
                console.log("Nessun id selezionato");
            else{
                
                var doctors = response;          
                                    
                var el = "";
                
                for(var i=0; i<doctors.length; i++){
                    if(doctors[i].doctorId == doctor_responsible.doctorId){
                        el += '<li><a href="doctor.html?id='+doctors[i].doctorId+'">'+doctors[i].first_name+' '+doctors[i].last_name+': responsible of the service</a></li>';
                        
                    } else{
                        el += '<li><a href="doctor.html?id='+doctors[i].doctorId+'">'+doctors[i].first_name+' '+doctors[i].last_name+'</a></li>';
                    }
                }
                
                service_doctors.html(el);
            
            }
            
        },
        error: function (request, error) {
            console.log(request + ":" + error);
        }
    });
                
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