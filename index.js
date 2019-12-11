const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sqlDbFactory = require("knex");
const process = require("process");


let sqlDb;

function initSqlDB() {
  /* Locally we should launch the app with TEST=true to use SQLlite:

       > TEST=true node ./index.js

    */
  if (process.env.TEST) {
    sqlDb = sqlDbFactory({
      client: "sqlite3",
      debug: true,
      connection: {
        filename: "./database.sqlite"
      },
        useNullAsDefault: true
    });
  } else {
    sqlDb = sqlDbFactory({
      debug: true,
      client: "pg",
      connection: process.env.DATABASE_URL,
      ssl: true
    });
  }
}


/*initialize the main DataBase*/
function initDb() {
/*create database table of docotors*/    
 sqlDb.schema.hasTable("doctors").then(exists => {
    if (!exists) {
      sqlDb.schema
        .createTable("doctors", table => {
          table.increments();
          table.string("doctorId");
          table.string("first_name");
          table.string("last_name");
          table.text("profile");
          table.string("specialities");
          table.string("picture");
          table.string("ages_treated");

        })
        .then(() => {
          return Promise.all(
            _.map(doctorsList, d => {
              delete d.id;
              return sqlDb("doctors").insert(d);
            })
          );
        });
    } else {

      return true;
    }
  });

/*create database table of locations with different attributes*/
  sqlDb.schema.hasTable("locations").then(exists => {
    if (!exists) {
      sqlDb.schema
        .createTable("locations", table => {
          table.increments();
          table.string("locationId");
          table.string("city");
          table.string("adress");
          table.string("phone_number");
          table.string("e_mail");
          table.string("hour");
          table.string("picture");
        })
        .then(() => {
          return Promise.all(
            _.map(locationsList, l => {
              delete l.id;
              return sqlDb("locations").insert(l);
            })
          );
        });
    } else {
      return true;
    }
  });
/*create database table of services*/ 
 sqlDb.schema.hasTable("services").then(exists => {
    if (!exists) {
      sqlDb.schema
        .createTable("services", table => {
          table.increments();
          table.string("serviceId");
          table.string("name");
          table.text("description");
          table.string("doctor_responsible");
        })
        .then(() => {
          return Promise.all(
            _.map(servicesList, s => {
              delete s.id;
              return sqlDb("services").insert(s);
            })
          );
        });
    } else {    
      return true;
    }
  });
/*create database table of locationdoctor which matches locations with doctors */ 
sqlDb.schema.hasTable("locationdoctor").then(exists => {
    if (!exists) {
      sqlDb.schema
        .createTable("locationdoctor", table => {
          table.increments();
          table.string("locationId");
          table.string("doctorId");
        })
        .then(() => {
          return Promise.all(
            _.map(locationdoctorList, ld => {
              delete ld.id;
              return sqlDb("locationdoctor").insert(ld);
            })
          );
        });
    } else {
      return true;
    }
  });
/*create database table of servicelocation which matches locations with services avalable */  
sqlDb.schema.hasTable("servicelocation").then(exists => {
    if (!exists) {
      sqlDb.schema
        .createTable("servicelocation", table => {
          table.increments();
          table.string("serviceId");
          table.string("locationId");
        })
        .then(() => {
          return Promise.all(
            _.map(servicelocationList, sl => {
              delete sl.id;
              return sqlDb("servicelocation").insert(sl);
            })
          );
        });
    } else {        
      return true;
    }
  });

/*create database table of servicelocation which matches services with doctors  */     
sqlDb.schema.hasTable("servicedoctor").then(exists => {
    if (!exists) {
      sqlDb.schema
        .createTable("servicedoctor", table => {
          table.increments();
          table.string("serviceId");
          table.string("doctorId");
        })
        .then(() => {
          return Promise.all(
            _.map(servicedoctorList, sd => {
              delete sd.id;
              return sqlDb("servicedoctor").insert(sd);
            })
          );
        });
    } else {        
      return true;
    }
  });

/*create database table of news */      
sqlDb.schema.hasTable("whoweare").then(exists => {
    if (!exists) {
      sqlDb.schema
        .createTable("whoweare", table => {
          table.increments();
          table.string("whoweareId")
          table.string("title");
          table.string("picture");
          table.text("description");
          
        })
        .then(() => {
          return Promise.all(
            _.map(whoweareList, w => {
              delete w.id;
              return sqlDb("whoweare").insert(w);
            })
          );
        });
    } else {   
      return true;
    }
  });
/*create database table of form which contains information of web users     */      
/*sqlDb.schema.hasTable("form").then(exists => {
    if (!exists) {
      sqlDb.schema
        .createTable("form", table => {
          table.increments();
          table.string("name");
          table.string("adress");
          table.string("mobile");
          table.string("e_mail");
          table.string("subject");
        })
    } else {
      return true;
    }
  });  */
    
    
}

let doctorsList = require("./other/doctors.json");
let locationsList = require("./other/locations.json");
let servicesList = require("./other/services.json");
let servicelocationList = require("./other/servicelocation.json");
let locationdoctorList = require("./other/locationdoctor.json");
let whoweareList = require("./other/who_we_are.json");
let servicedoctorList = require("./other/servicedoctor.json");


const _ = require("lodash");


let serverPort = process.env.PORT || 5000;

app.use(express.static(__dirname + "/public"));



/*define route of sqlDb*/
app.use(require('./other/sqlDb_routes'));


/*set server on port 5000*/
app.set("port", serverPort);

/*initialize the database*/
initSqlDB();
initDb();
/*wait and listen to the request coming from users*/
app.listen(serverPort, function() {
  console.log(`Your app is ready at port ${serverPort}`);
});
