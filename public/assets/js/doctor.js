var doctor_fullname;
var doctor_profile;
var doctor_service;
var doctor_service_responsible;
var doctor_image;
var doctor_ages_treated


$(window).ready(function () {
    
    console.log("Doctor id: "+URL.id);
    
    doctor_fullname = $("#doctor_fullname");
    doctor_profile = $("#profile p");
    doctor_service = $("#speciality a");
    doctor_service_responsible = $("#speciality h3");
    doctor_image = $("#doctor_image");
    doctor_ages_treated = $("#medical_details p");
    
    $.ajax({
        method: "GET",
        dataType: "json",
        crossDomain: true,
        url: "/doctors/"+URL.id,
        
        success: function (response) {
            console.log(response);
            
            var doctor_id = URL.id;
            
            if(doctor_id == null)
                console.log("Nessun id selezionato")
            else{
                
                var doctor = response[0];
                
                console.log(doctor);
                                    
                doctor_fullname.text(doctor.first_name+" "+doctor.last_name);
                doctor_profile.html(doctor.profile);
                doctor_image.attr("src",doctor.picture); 
                doctor_ages_treated.text(doctor.ages_treated);        
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
        url: "/doctors/"+ URL.id +"/service",
        
        success: function (response) {
            console.log(response);
            
            var doctor_id = URL.id;
            
            if(doctor_id == null)
                console.log("Nessun id selezionato")
            else{
                
                var service = response[0];
                
                console.log(service);
                  
                var el='<a href="service.html?id='+ service.serviceId +'">'+service.name + '</a>';
                doctor_service.html(el);
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
        url: "/doctors/"+ URL.id +"/serviceResponsible",
        
        success: function (response) {
            console.log("service responsible:");
            console.log(response);
            
            var doctor_id = URL.id;
            
            if(doctor_id == null)
                console.log("Nessun id selezionato")
            else{
                
                var servResp = response[0];
                
                console.log(servResp);
                
                if(servResp==null)
                    console.log("no service responsability");
                
                else{                    
                    doctor_service_responsible.text("Speciality & Responsable of")
                    
                }
                  
                
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