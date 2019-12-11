var express = require('express');

var app = express.Router();
const bodyParser = require("body-parser");

const _ = require("lodash");

const sqlDbFactory = require("knex");

var nodemailer = require('nodemailer');

const sqlDb = sqlDbFactory({
  client: "sqlite3",
  debug: true,
  connection: {
    filename: "./database.sqlite"
  },
    useNullAsDefault: true
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/*Route /whoweare */
/*require server to return the content of the page who we are*/
app.get("/whoweare", function(req, res) {
    sqlDb.select("*").from("whoweare").then(result => {
      res.send(JSON.stringify(result));
    });
});

/*Route /doctors */
/*require server to return the list of doctors by alphabetic order */
app.get("/doctors", function(req, res) {
    sqlDb.select("id", "first_name", "last_name", "picture", "doctorId").from("doctors").orderBy('last_name', 'asc').then(result => {
      res.send(JSON.stringify(result));
    });
});

/*Route /services */
/*require server to return the content of the page services (list of services ordered by alphabetic order) */
app.get("/services", function(req, res) {
    sqlDb.select("name", "serviceId").from("services").orderBy('serviceId', 'asc').then(result => {
      res.send(JSON.stringify(result));
    });
});

/*Route /locations */
/*require server to return the content of the page locations*/
app.get("/locations", function(req, res) {
    sqlDb.select("city", "hour", "locationId").from("locations").orderBy('locationId', 'asc').then(result => {
      res.send(JSON.stringify(result));
    });
});

/*Route /whoweare/aboutus */
/*require server to return the content of the page About us which is a parte of page who we are*/
app.get("/whoweare/:whoweareId", function(req, res) {
    let idn = (req.params.whoweareId);
     sqlDb.select("*").from("whoweare").where("whoweareId", idn).then(result => {
        res.send(JSON.stringify(result));
    });
});



/*Route /doctors/:doctorId */
/*require server to return the content of a specific doctor's page with all the information since we do selet("*")*/
app.get("/doctors/:doctorId", function(req, res) {
    let idn = (req.params.doctorId);
    
    sqlDb.select("*").from("doctors").where("doctorId", idn).then(result => {
        res.send(JSON.stringify(result));
    });
});

/*Route /services/:serviceId */
/*require server to return the content of a specific service with all its information*/
app.get("/services/:serviceId", function(req, res) {
    let idn = (req.params.serviceId);
    
    sqlDb.select("*").from("services").where("serviceId", idn).then(result => {
        res.send(JSON.stringify(result));
    });
});

/*Route /locations/:locationId */
/*require server to return the content of a specific location with all its information*/
app.get("/locations/:locationId", function(req, res) {
    let idn = (req.params.locationId);

    sqlDb.select("*").from("locations").where("locationId", idn).then(result => {
        res.send(JSON.stringify(result));
    });
});

/*Route /services/:serviceId/locations */
/*require server to return a list of locations where a specific service is available*/
app.get("/services/:serviceId/locations", function(req, res) {
    let idn = (req.params.serviceId);
    sqlDb.select('*').from('locations').leftJoin('servicelocation', 'locations.locationId', 'servicelocation.locationId').where("servicelocation.serviceId", idn).orderBy('locationId', 'asc').then(result => {
        res.send(JSON.stringify(result));
    });
});

/*Route /locations/:locationId/services */
/*require server to return the list of services which are available in a specific location*/
app.get("/locations/:locationId/services", function(req, res) {
    let idn = (req.params.locationId);
    sqlDb.select('*').from('services').leftJoin('servicelocation', 'services.serviceId', 'servicelocation.serviceId').where("servicelocation.locationId", idn).orderBy('serviceId', 'asc').then(result => {
        res.send(JSON.stringify(result));
    });
/*var subquery = sqlDb.select("serviceId").from("servicelocation").where("locationId", idn);
  sqlDb.select("*").from("services").where("serviceId", "in", subquery).then(result => {
      res.send(JSON.stringify(result));
  });*/
});

/*Route /doctors/:doctorId/serviceResponsible */
/*require server to return services in which a specific doctor is resposible*/
app.get("/doctors/:doctorId/serviceResponsible", function(req, res) {
    let idn = (req.params.doctorId);
    sqlDb.select("*").from("services").where("doctor_responsible", idn).orderBy('serviceId', 'asc').then(result => {
        res.send(JSON.stringify(result));
    });
});

/*Route /services/:serviceId/serviceResponsibleBy */
/*require server to return the information of the doctor responsible of a specific service*/
app.get("/services/:serviceId/serviceResponsibleBy", function(req, res) {
    let idn = (req.params.serviceId);
    
    sqlDb.select('*').from('doctors').leftJoin('services', 'doctors.doctorId', 'services.doctor_responsible').where("services.serviceId", idn).then(result => {
        res.send(JSON.stringify(result));
    });
});

/*Route /services/:serviceId/doctors */
/*require server to return the list of doctors by alphabetic order working a specific service*/
app.get("/services/:serviceId/doctors", function(req, res) {
    let idn = (req.params.serviceId);
    sqlDb.select("first_name", "last_name", "picture", "doctors.doctorId").from('doctors').leftJoin('servicedoctor', 'doctors.doctorId', 'servicedoctor.doctorId').where("servicedoctor.serviceId", idn).orderBy('last_name', 'asc').then(result => {
        res.send(JSON.stringify(result));
    });
});

/*Route /doctors/:doctorId/service */
/*require server to return the content of the services by alphabetic order of a specific doctor*/
app.get("/doctors/:doctorId/service", function(req, res) {
    let idn = (req.params.doctorId);
    sqlDb.select('*').from('services').leftJoin('servicedoctor', 'services.serviceId', 'servicedoctor.serviceId').where("servicedoctor.doctorId", idn).orderBy('serviceId', 'asc').then(result => {
        res.send(JSON.stringify(result));
    });
});

/*Route /locations/:locationId/doctors */
/*require server to return list of doctors in a specific location*/
app.get("/locations/:locationId/doctors", function(req, res) {
    let idn = (req.params.locationId);
    
    sqlDb.select("first_name", "last_name", "picture", "doctors.doctorId").from('doctors').leftJoin('locationdoctor', 'doctors.doctorId', 'locationdoctor.doctorId').where("locationdoctor.locationId", idn).orderBy('last_name', 'asc').then(result => {
        res.send(JSON.stringify(result));
    });
});

/*Route /:string */
/*app.get("/:string", function(req, res) {
    let idn = (req.params.string);
    
    sqlDb.select("first_name", "last_name", "picture", "doctorId").from("doctors").where('first_name', 'like', '%'+idn+'%').orWhere('last_name', 'like', '%'+idn+'%').orderBy('last_name', 'asc').then(result => {
      res.send(JSON.stringify(result));
    });
});*/

/*Route /:string */
/*require server to return name,picture and id of doctors whos name starts with the given string(idn)*/
app.get("/:string", function(req, res) {
    let idn = (req.params.string);
    
    sqlDb.select("first_name", "last_name", "picture", "doctorId").from("doctors").where('last_name', 'like', idn+'%').orderBy('last_name', 'asc').then(result => {
      res.send(JSON.stringify(result));
    });
});

/*registrazione degli utenti attraverso il form*/
app.post("/whoweare/:w004/new_request", function(req, res) {
    
  var formData = {
    name: req.body.name,    
    e_mail: req.body.e_mail,
    subject: req.body.subject
  };   
    
    console.log('body: ' + JSON.stringify(req.body.email));
	res.send(JSON.stringify(req.body.email));

        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'info.hyperclinic@gmail.com',
            pass: 'hyperclinic001'
        }
    });

    var mailOptions = {
        from: 'info.hyperclinic@gmail.com',
        to: req.body.email,
        subject: 'Reply from Hyperclinic',
        text: 'Dear '+ req.body.name +',\n\nWe received your email. Thanks for contacting us.\n\n"'+ req.body.subject + '"'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });  
    
});

app.use(express.static(__dirname + "/public"));

module.exports = app;