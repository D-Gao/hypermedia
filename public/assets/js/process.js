// process.js
$(document).ready(function() {

    // process the form
    $('form').submit(function(event) {
        
        $('.form-group').removeClass('has-error'); // remove the error class
        $('.help-block').remove(); // remove the error text
        $('.alert').remove(); //remove the alert 

        // get the form data
        // there are many ways to get this data using jQuery (you can use the class or id also)
        var formData = {
            'name'              : $('input[name=name]').val(),
            'email'             : $('input[name=email]').val(),
            'subject'           : $('textarea[name=subject]').val()
        };
        
        console.log(formData);
        
        // controls for errors
        if(formData.name == ""){
            $('#name-group').addClass('has-error'); // add the error class to show red input
            $('#name-group').append('<div class="help-block">You must fill this field!</div>'); // add the actual error message under our input
                    
        }
        else if(formData.email == ""){
                $('#email-group').addClass('has-error'); // add the error class to show red input
                $('#email-group').append('<div class="help-block">You must fill this field!</div>'); // add the actual error message under our input
        }
        else if(formData.subject == ""){
            $('#subject-group').addClass('has-error'); // add the error class to show red input
            $('#subject-group').append('<div class="help-block">You must fill this field!</div>'); // add the actual error message under our input
        }
        else{       
        

            // process the form
            $.ajax({
                method      : 'POST', // define the type of HTTP verb we want to use (POST for our form)
                url         : "/whoweare/w004/new_request", // the url where we want to POST
                data        : formData, // our data object
                dataType    : 'json', // what type of data do we expect back from the server
                crossDomain : true,
                
            })
            // using the done promise callback
            .done(function(data) {

                // log data to the console so we can see
                console.log(data); 

                // ALL GOOD! just show the success message!
                $('form').append('<div class="alert alert-success">Message sent succsessfuly!</div>');

                // usually after form submission, you'll want to redirect
                // window.location = '/thank-you'; // redirect a user to another page
               // alert('success'); // for now we'll just alert the user
                
            })
        
            // using the fail promise callback
            .fail(function(data) {

                // show any errors
                $('form').append('<div class="alert alert-danger">Error!</div>');
                // best to remove for production
                console.log("Fail!")    
                console.log(data);
            });
        
        }

        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });

});