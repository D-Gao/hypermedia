var letter;
var list_doctors;
var ul = $("#alfa li");

$(window).ready(function () {
    
    var list_doctors = $("#list-doctors");
    
    
    $.ajax({
        method: "GET",
        dataType: "json",
        crossDomain: true,
        url: "/"+URL.id,
        
        success: function (response) {
            console.log("elenco dottori con lettera: "+URL.id);
            console.log(response);
                                    
            if(URL.id == null)
                console.log("Nessuna lettera selezionata");
            else{
                
                var el ="";
                
                for(var i=0; i<response.length; i++){
                    
                    el += '<div class="row" id="dr"> <div class="col-md-4"> <a href="doctor.html?id='+response[i].doctorId+'"> <img src="'+response[i].picture+'" alt="doctor" class="img-responsive" id="doctor_image"/> </a> </div> <div class="col-md-4" id="name-link"> <a href="doctor.html?id='+response[i].doctorId+'">'+response[i].first_name+' '+response[i].last_name+'</a> </div> </div>';
                    
                }
                  
                list_doctors.html(el);
            }
            
        },
        error: function (request, error) {
            console.log(request + ":" + error);
        }
    });
    
    
    
    
    $("#alfa li").on("click", function(){
        
        ul.attr("class","");
        
        letter = $(this).text();
        $(this).attr("class", "active");
        
        console.log("letter: "+letter);       
        
        
        $.ajax({
        method: "GET",
        dataType: "json",
        crossDomain: true,
        url: "/"+letter,
        
        success: function (response) {
            console.log("elenco dottori con lettera: "+letter);
            console.log(response);
                                    
            if(URL.id == null)
                console.log("Nessuna lettera selezionata");
            else{
                
                var el ="";
                
                for(var i=0; i<response.length; i++){
                    
                    el += '<div class="row" id="dr"> <div class="col-md-4"> <a href="doctor.html?id='+response[i].doctorId+'"> <img src="'+response[i].picture+'" alt="doctor" class="img-responsive" id="doctor_image"/> </a> </div> <div class="col-md-4" id="name-link"> <a href="doctor.html?id='+response[i].doctorId+'">'+response[i].first_name+' '+response[i].last_name+'</a> </div> </div>';
                    
                }
                  
                list_doctors.html(el);
            }
            
        },
        error: function (request, error) {
            console.log(request + ":" + error);
        }
    });
        
        
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