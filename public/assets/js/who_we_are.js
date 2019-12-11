var who_we_are_Id;
var who_we_are_title;
var who_we_are_picture;
var who_we_are_description;
var form;



$(window).ready(function () {
    
    console.log("who_we_are id: "+URL.id);   
    
    who_we_are_title = $("#about-us");
    who_we_are_description = $("#about-descrizione p");
    who_we_are_picture = $("#about-img img");
    form = $("#form_field");
    
    if(URL.id == "w004"){
        form.show();
        console.log("Form ON");
    }
    else{
        form.hide();
        console.log("Form OFF");
    }
    
    
    $("#side_menu a").on("click", function(){
        console.log("tasto active");
        $(this).addClass("active");
        
    });
    
    
    
    $.ajax({
        method: "GET",
        dataType: "json",
        crossDomain: true,
        url: "/whoweare/"+URL.id,
        
        success: function (response) {
            
            console.log(response);
            
            var who_we_are_id = URL.id;
            
            if(who_we_are_id == null)
                console.log("Nessun id selezionato");
            else{
                
                var who_we_are = response[0];
                
                console.log(who_we_are);
                                    
                who_we_are_title.text(who_we_are.title);
               
                 who_we_are_picture.attr("src", who_we_are.picture); 
                who_we_are_description.html(who_we_are.description);
               
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