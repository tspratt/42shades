/**
 * this file does the work of communicating with the Mongo database.
 */
'use strict';

var StatusResponse = require('./lib/statusResponse').StatusResponse;
var winston = require('winston');
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({'timestamp': true, level: 'info'})
    ]
});

var async = require('async');
var Server = require('mongodb').Server
var server = new Server('localhost',27017);
var mongoDb = require('mongodb').Db;
var db = new mongoDb('shades', server, {safe: true});

function initDb(callback) {
    logger.info('model.initDb');
    var statusResponse;

    db.open(function (err, db) {
        if (!err) {
            callback(err, {modelName: 'model', dbName: 'shades'});
        }
        else {
            statusResponse = new StatusResponse('error', "System Error, please try again", '', null, err);
            logger.error(JSON.stringify(statusResponse));
            callback(err, {modelName: 'mgoModel', dbName: 'shades'});
        }
    });

}//

function listAllMembers(callback){
    var oMember;
    db.collection('members', {safe: true},
      function(err, collection){
          var aMembers = collection.find({}).toArray(function (err, data) {
              if (err) {
                  callback(err, null);
              } else {
                  callback(null, data);
              }
          });
      });

}

/**
 * run only once!
 */
function insertMembers(){
    var oMember;
    db.collection('members', {safe: true},
      function(err, collection){
          collection.insert(members, function (err, data) {
              if (err) {
                  callback(err, null);
              } else {
                  callback(null, data);
              }
          });
      });

}


var members =
  [
      {
          "address": "P.O. Box 197, 7318 Nascetur St.",
          "city": "Fresno",
          "email": "fermentum.convallis.ligula@Donecdignissim.ca",
          "first_name": "Maryam",
          "join_date": "06/20/2015",
          "last_name": "Graham",
          "phone": "1-872-750-1127",
          "state": "CA",
          "zip": "94787"
      },
      {
          "address": "721-931 Et Av.",
          "city": "Essex",
          "email": "lacus@imperdieteratnonummy.ca",
          "first_name": "Paloma",
          "join_date": "04/06/2015",
          "last_name": "Weeks",
          "phone": "1-746-482-4391",
          "state": "VT",
          "zip": "11235"
      },
      {
          "address": "5511 Mus. Rd.",
          "city": "Sacramento",
          "email": "eros@euismod.org",
          "first_name": "Stacy",
          "join_date": "12/21/2013",
          "last_name": "Guerrero",
          "phone": "1-455-159-1000",
          "state": "CA",
          "zip": "92304"
      },
      {
          "address": "345-9646 Adipiscing, Rd.",
          "city": "Reading",
          "email": "lacus.Ut@vulputateullamcorpermagna.edu",
          "first_name": "Lacey",
          "join_date": "11/18/2014",
          "last_name": "Collier",
          "phone": "1-819-948-1563",
          "state": "PA",
          "zip": "79117"
      },
      {
          "address": "P.O. Box 472, 5599 Sed Road",
          "city": "Hillsboro",
          "email": "per.inceptos.hymenaeos@nectempusscelerisque.edu",
          "first_name": "Amir",
          "join_date": "02/06/2015",
          "last_name": "Farley",
          "phone": "1-866-238-2612",
          "state": "OR",
          "zip": "75164"
      },
      {
          "address": "3751 Ornare, Rd.",
          "city": "Tulsa",
          "email": "eu@Cras.edu",
          "first_name": "Katelyn",
          "join_date": "04/12/2015",
          "last_name": "Wall",
          "phone": "1-987-400-6222",
          "state": "OK",
          "zip": "88630"
      },
      {
          "address": "P.O. Box 186, 3349 Curabitur Av.",
          "city": "Missoula",
          "email": "Ut.nec.urna@ultricesposuerecubilia.edu",
          "first_name": "Jorden",
          "join_date": "01/10/2014",
          "last_name": "Blevins",
          "phone": "1-609-780-1126",
          "state": "MT",
          "zip": "37272"
      },
      {
          "address": "P.O. Box 697, 9298 Aliquam Ave",
          "city": "Jackson",
          "email": "consequat.lectus.sit@aodiosemper.co.uk",
          "first_name": "Quamar",
          "join_date": "01/26/2015",
          "last_name": "Beck",
          "phone": "1-791-343-2967",
          "state": "MS",
          "zip": "30623"
      },
      {
          "address": "P.O. Box 583, 7122 Eu Rd.",
          "city": "Augusta",
          "email": "dolor.dolor.tempus@Nam.org",
          "first_name": "Iola",
          "join_date": "07/15/2014",
          "last_name": "Duke",
          "phone": "1-577-130-7072",
          "state": "ME",
          "zip": "61170"
      },
      {
          "address": "1210 In, Road",
          "city": "Los Angeles",
          "email": "quam.quis.diam@sociis.org",
          "first_name": "Uriah",
          "join_date": "07/09/2014",
          "last_name": "Acevedo",
          "phone": "1-236-106-1076",
          "state": "CA",
          "zip": "94683"
      },
      {
          "address": "4924 Nec, Road",
          "city": "Wilmington",
          "email": "orci@dolor.net",
          "first_name": "Kyle",
          "join_date": "03/02/2014",
          "last_name": "Delaney",
          "phone": "1-947-390-8455",
          "state": "DE",
          "zip": "56120"
      },
      {
          "address": "4578 Ultrices St.",
          "city": "Fort Smith",
          "email": "convallis.in.cursus@tellusNunclectus.net",
          "first_name": "Quynn",
          "join_date": "01/05/2014",
          "last_name": "Richmond",
          "phone": "1-138-203-4611",
          "state": "AR",
          "zip": "71000"
      },
      {
          "address": "Ap #653-5014 Aptent Ave",
          "city": "Savannah",
          "email": "neque@lectusNullam.com",
          "first_name": "Abel",
          "join_date": "03/13/2014",
          "last_name": "Mullen",
          "phone": "1-360-474-5833",
          "state": "GA",
          "zip": "23414"
      },
      {
          "address": "9043 Proin Av.",
          "city": "Richmond",
          "email": "lobortis@ullamcorpereueuismod.co.uk",
          "first_name": "Hanae",
          "join_date": "02/09/2014",
          "last_name": "Boone",
          "phone": "1-506-575-9939",
          "state": "VA",
          "zip": "71529"
      },
      {
          "address": "5272 Iaculis Rd.",
          "city": "Denver",
          "email": "quis.lectus.Nullam@enimnec.edu",
          "first_name": "Emma",
          "join_date": "01/07/2015",
          "last_name": "Ware",
          "phone": "1-795-748-5915",
          "state": "CO",
          "zip": "86377"
      },
      {
          "address": "Ap #548-5034 Velit. Ave",
          "city": "Orlando",
          "email": "venenatis@lacusNulla.org",
          "first_name": "Willa",
          "join_date": "09/03/2014",
          "last_name": "Perry",
          "phone": "1-693-623-0671",
          "state": "FL",
          "zip": "46948"
      },
      {
          "address": "Ap #177-1621 Mollis Rd.",
          "city": "Norman",
          "email": "orci.lobortis.augue@montesnascetur.com",
          "first_name": "Macy",
          "join_date": "04/10/2015",
          "last_name": "Savage",
          "phone": "1-454-675-0457",
          "state": "OK",
          "zip": "71755"
      },
      {
          "address": "3082 Eu Rd.",
          "city": "Jacksonville",
          "email": "erat@leo.co.uk",
          "first_name": "Brady",
          "join_date": "01/10/2014",
          "last_name": "Good",
          "phone": "1-302-983-9143",
          "state": "FL",
          "zip": "29519"
      },
      {
          "address": "878-5941 Consequat Ave",
          "city": "Fairbanks",
          "email": "eu@duiCraspellentesque.net",
          "first_name": "Regan",
          "join_date": "04/11/2014",
          "last_name": "Park",
          "phone": "1-692-510-7344",
          "state": "AK",
          "zip": "99671"
      },
      {
          "address": "Ap #982-4309 Vulputate, St.",
          "city": "Carson City",
          "email": "non@duiaugueeu.org",
          "first_name": "Jena",
          "join_date": "11/16/2014",
          "last_name": "Glover",
          "phone": "1-298-885-6036",
          "state": "NV",
          "zip": "16462"
      },
      {
          "address": "8988 Mauris St.",
          "city": "Bridgeport",
          "email": "hendrerit.neque.In@ornare.ca",
          "first_name": "Rebekah",
          "join_date": "03/20/2015",
          "last_name": "Gamble",
          "phone": "1-113-188-1451",
          "state": "CT",
          "zip": "44711"
      },
      {
          "address": "P.O. Box 171, 4571 Mauris St.",
          "city": "Bloomington",
          "email": "tristique@Nullamsuscipitest.co.uk",
          "first_name": "Wylie",
          "join_date": "04/18/2014",
          "last_name": "Allen",
          "phone": "1-143-878-0269",
          "state": "MN",
          "zip": "42649"
      },
      {
          "address": "284-6937 A, St.",
          "city": "South Portland",
          "email": "eu.augue.porttitor@lacusvestibulumlorem.com",
          "first_name": "Kelsie",
          "join_date": "06/22/2014",
          "last_name": "Moore",
          "phone": "1-435-345-0344",
          "state": "ME",
          "zip": "13587"
      },
      {
          "address": "4860 Nec Rd.",
          "city": "Akron",
          "email": "est@ac.ca",
          "first_name": "Abigail",
          "join_date": "08/23/2014",
          "last_name": "Pollard",
          "phone": "1-883-263-6215",
          "state": "OH",
          "zip": "67699"
      },
      {
          "address": "P.O. Box 752, 3232 Urna, Rd.",
          "city": "St. Petersburg",
          "email": "magna.Duis.dignissim@Nunccommodoauctor.com",
          "first_name": "Skyler",
          "join_date": "01/01/2014",
          "last_name": "Wade",
          "phone": "1-141-635-0615",
          "state": "FL",
          "zip": "48256"
      },
      {
          "address": "281-4979 Nascetur Ave",
          "city": "Provo",
          "email": "Suspendisse.dui@variusorci.edu",
          "first_name": "Phelan",
          "join_date": "05/13/2014",
          "last_name": "Mosley",
          "phone": "1-101-843-5339",
          "state": "UT",
          "zip": "20557"
      },
      {
          "address": "Ap #756-4169 Luctus Ave",
          "city": "Athens",
          "email": "in.consequat.enim@magnaet.ca",
          "first_name": "Amela",
          "join_date": "12/21/2013",
          "last_name": "Tillman",
          "phone": "1-207-481-4726",
          "state": "GA",
          "zip": "22108"
      },
      {
          "address": "Ap #340-4075 Laoreet, Ave",
          "city": "Hilo",
          "email": "Sed.id@ac.com",
          "first_name": "Dante",
          "join_date": "03/29/2015",
          "last_name": "Weber",
          "phone": "1-464-279-7017",
          "state": "HI",
          "zip": "24793"
      },
      {
          "address": "5041 Cursus Avenue",
          "city": "Wichita",
          "email": "sagittis.Nullam@lorem.net",
          "first_name": "Teegan",
          "join_date": "10/07/2015",
          "last_name": "Harris",
          "phone": "1-305-771-4642",
          "state": "KS",
          "zip": "44574"
      },
      {
          "address": "235-9267 Donec St.",
          "city": "Atlanta",
          "email": "eu@NullafacilisisSuspendisse.co.uk",
          "first_name": "Forrest",
          "join_date": "01/09/2015",
          "last_name": "Orr",
          "phone": "1-888-724-0925",
          "state": "GA",
          "zip": "83926"
      },
      {
          "address": "P.O. Box 290, 2261 Donec St.",
          "city": "Huntsville",
          "email": "vitae.erat@adipiscing.com",
          "first_name": "Jesse",
          "join_date": "01/25/2015",
          "last_name": "Guzman",
          "phone": "1-902-459-7572",
          "state": "AL",
          "zip": "36933"
      },
      {
          "address": "393 Et, Rd.",
          "city": "Sterling Heights",
          "email": "Cum@lectusantedictum.co.uk",
          "first_name": "Phelan",
          "join_date": "01/13/2015",
          "last_name": "Chambers",
          "phone": "1-476-977-0570",
          "state": "MI",
          "zip": "45832"
      },
      {
          "address": "2147 Feugiat Avenue",
          "city": "Des Moines",
          "email": "ac@dolor.com",
          "first_name": "Hayden",
          "join_date": "09/14/2015",
          "last_name": "Dunlap",
          "phone": "1-319-142-2800",
          "state": "IA",
          "zip": "22416"
      },
      {
          "address": "Ap #671-3752 Blandit. Ave",
          "city": "Sandy",
          "email": "ac.sem.ut@Sedetlibero.com",
          "first_name": "Nayda",
          "join_date": "01/22/2015",
          "last_name": "Marks",
          "phone": "1-807-968-4150",
          "state": "UT",
          "zip": "18023"
      },
      {
          "address": "Ap #743-3350 Mus. Rd.",
          "city": "Juneau",
          "email": "netus.et@vulputate.com",
          "first_name": "Lewis",
          "join_date": "09/11/2015",
          "last_name": "Brennan",
          "phone": "1-472-846-2147",
          "state": "AK",
          "zip": "99856"
      },
      {
          "address": "P.O. Box 623, 286 Vitae Road",
          "city": "Chandler",
          "email": "lacus@nonarcuVivamus.net",
          "first_name": "Kaitlin",
          "join_date": "12/30/2014",
          "last_name": "Cabrera",
          "phone": "1-308-376-7433",
          "state": "AZ",
          "zip": "86414"
      },
      {
          "address": "Ap #845-212 Diam. Av.",
          "city": "Bangor",
          "email": "sem@egestasAliquam.co.uk",
          "first_name": "Mira",
          "join_date": "09/26/2015",
          "last_name": "Moss",
          "phone": "1-258-325-2095",
          "state": "ME",
          "zip": "98427"
      },
      {
          "address": "977-9623 Tempus St.",
          "city": "Olympia",
          "email": "sit@dapibusligula.edu",
          "first_name": "Zahir",
          "join_date": "12/09/2014",
          "last_name": "Mcneil",
          "phone": "1-330-214-5287",
          "state": "WA",
          "zip": "43105"
      },
      {
          "address": "Ap #927-9017 Erat Avenue",
          "city": "Hartford",
          "email": "dis@elitelit.edu",
          "first_name": "Barclay",
          "join_date": "10/26/2015",
          "last_name": "Stuart",
          "phone": "1-411-613-9736",
          "state": "CT",
          "zip": "43782"
      },
      {
          "address": "P.O. Box 402, 240 Aenean Avenue",
          "city": "Toledo",
          "email": "pede@Donecnibhenim.ca",
          "first_name": "Herman",
          "join_date": "06/20/2014",
          "last_name": "Dawson",
          "phone": "1-150-115-9008",
          "state": "OH",
          "zip": "24416"
      },
      {
          "address": "298-6058 Nullam Rd.",
          "city": "Hattiesburg",
          "email": "Ut@sitamet.ca",
          "first_name": "Flynn",
          "join_date": "05/01/2014",
          "last_name": "Rich",
          "phone": "1-690-958-4986",
          "state": "MS",
          "zip": "17118"
      },
      {
          "address": "Ap #681-4277 In Ave",
          "city": "Virginia Beach",
          "email": "egestas@In.com",
          "first_name": "Ethan",
          "join_date": "04/06/2014",
          "last_name": "Mullins",
          "phone": "1-508-618-5800",
          "state": "VA",
          "zip": "54065"
      },
      {
          "address": "177-6114 Curabitur Street",
          "city": "Flint",
          "email": "Cras.eu.tellus@nostra.ca",
          "first_name": "Iona",
          "join_date": "01/21/2014",
          "last_name": "Dawson",
          "phone": "1-903-212-9355",
          "state": "MI",
          "zip": "88527"
      },
      {
          "address": "7568 A, Ave",
          "city": "Green Bay",
          "email": "in@nulla.com",
          "first_name": "Fatima",
          "join_date": "02/21/2014",
          "last_name": "Rosario",
          "phone": "1-107-622-2023",
          "state": "WI",
          "zip": "28637"
      },
      {
          "address": "Ap #993-3823 Libero. Avenue",
          "city": "St. Petersburg",
          "email": "orci.luctus@sagittisfelis.com",
          "first_name": "Fuller",
          "join_date": "07/06/2015",
          "last_name": "Townsend",
          "phone": "1-702-806-7935",
          "state": "FL",
          "zip": "76927"
      },
      {
          "address": "Ap #860-9200 Vitae, St.",
          "city": "Salem",
          "email": "eu.odio@laoreetlibero.edu",
          "first_name": "Russell",
          "join_date": "11/20/2015",
          "last_name": "Mathews",
          "phone": "1-905-150-5631",
          "state": "OR",
          "zip": "21605"
      },
      {
          "address": "P.O. Box 420, 6557 Nascetur St.",
          "city": "Waterbury",
          "email": "ac@non.co.uk",
          "first_name": "Noel",
          "join_date": "10/03/2014",
          "last_name": "Livingston",
          "phone": "1-887-511-1933",
          "state": "CT",
          "zip": "24328"
      },
      {
          "address": "P.O. Box 304, 7636 Libero Road",
          "city": "Tacoma",
          "email": "penatibus.et@netusetmalesuada.org",
          "first_name": "Karleigh",
          "join_date": "02/11/2014",
          "last_name": "Klein",
          "phone": "1-800-566-8635",
          "state": "WA",
          "zip": "21956"
      },
      {
          "address": "284-5998 Enim Ave",
          "city": "Pittsburgh",
          "email": "Sed.diam@nequesed.com",
          "first_name": "Kirsten",
          "join_date": "09/10/2015",
          "last_name": "Curry",
          "phone": "1-362-145-7542",
          "state": "PA",
          "zip": "78298"
      },
      {
          "address": "Ap #661-6512 Placerat Street",
          "city": "Rochester",
          "email": "pharetra.ut@dictumProineget.edu",
          "first_name": "Brynne",
          "join_date": "09/10/2015",
          "last_name": "Glenn",
          "phone": "1-938-331-8612",
          "state": "MN",
          "zip": "16721"
      },
      {
          "address": "242-7362 Enim. Road",
          "city": "Bangor",
          "email": "magna.Lorem.ipsum@egetvenenatisa.edu",
          "first_name": "Dane",
          "join_date": "07/15/2014",
          "last_name": "Knapp",
          "phone": "1-930-906-9908",
          "state": "ME",
          "zip": "42718"
      },
      {
          "address": "Ap #658-3874 Luctus Avenue",
          "city": "Norfolk",
          "email": "Mauris.ut@vitaerisus.edu",
          "first_name": "Venus",
          "join_date": "08/29/2014",
          "last_name": "Meyer",
          "phone": "1-928-287-2932",
          "state": "VA",
          "zip": "85126"
      },
      {
          "address": "P.O. Box 522, 9384 A, Rd.",
          "city": "Tallahassee",
          "email": "Proin.dolor@augue.co.uk",
          "first_name": "Otto",
          "join_date": "11/01/2014",
          "last_name": "Alvarado",
          "phone": "1-162-983-7839",
          "state": "FL",
          "zip": "12309"
      },
      {
          "address": "P.O. Box 230, 2600 Laoreet Rd.",
          "city": "Louisville",
          "email": "euismod@aliquetliberoInteger.edu",
          "first_name": "Bertha",
          "join_date": "05/07/2015",
          "last_name": "Powell",
          "phone": "1-779-702-4718",
          "state": "KY",
          "zip": "10916"
      },
      {
          "address": "524-3230 Commodo Rd.",
          "city": "Kearney",
          "email": "interdum.Nunc@vitaepurus.edu",
          "first_name": "Uma",
          "join_date": "07/26/2014",
          "last_name": "Browning",
          "phone": "1-749-768-0658",
          "state": "NE",
          "zip": "99002"
      },
      {
          "address": "P.O. Box 341, 8798 Neque St.",
          "city": "Salt Lake City",
          "email": "lorem.sit@gravidasit.org",
          "first_name": "Halla",
          "join_date": "05/16/2015",
          "last_name": "Pope",
          "phone": "1-453-790-4767",
          "state": "UT",
          "zip": "27479"
      },
      {
          "address": "162 Maecenas Street",
          "city": "Cambridge",
          "email": "Lorem@turpisNulla.ca",
          "first_name": "Mariko",
          "join_date": "10/16/2014",
          "last_name": "Kramer",
          "phone": "1-936-843-8160",
          "state": "MA",
          "zip": "58632"
      },
      {
          "address": "882 Cursus. Av.",
          "city": "Chattanooga",
          "email": "Duis.cursus.diam@velit.co.uk",
          "first_name": "George",
          "join_date": "02/10/2014",
          "last_name": "Prince",
          "phone": "1-221-713-3194",
          "state": "TN",
          "zip": "15164"
      },
      {
          "address": "587-4044 Enim Ave",
          "city": "Bellevue",
          "email": "aliquam.enim@cubiliaCurae.net",
          "first_name": "Lee",
          "join_date": "01/05/2015",
          "last_name": "Stark",
          "phone": "1-404-234-4690",
          "state": "NE",
          "zip": "58358"
      },
      {
          "address": "P.O. Box 997, 6890 Enim. St.",
          "city": "Bear",
          "email": "metus.urna.convallis@Ut.edu",
          "first_name": "Darrel",
          "join_date": "08/15/2014",
          "last_name": "Rice",
          "phone": "1-214-365-1958",
          "state": "DE",
          "zip": "91345"
      },
      {
          "address": "Ap #469-4046 A Road",
          "city": "Rock Springs",
          "email": "sit.amet.ante@sed.com",
          "first_name": "Abigail",
          "join_date": "08/12/2014",
          "last_name": "Mccoy",
          "phone": "1-864-732-2467",
          "state": "WY",
          "zip": "53249"
      },
      {
          "address": "Ap #150-6189 Eleifend Ave",
          "city": "Wichita",
          "email": "Duis.mi.enim@euaugue.org",
          "first_name": "August",
          "join_date": "07/24/2015",
          "last_name": "Garrison",
          "phone": "1-635-594-4770",
          "state": "KS",
          "zip": "91313"
      },
      {
          "address": "8621 Cum Rd.",
          "city": "West Jordan",
          "email": "egestas@utpharetrased.org",
          "first_name": "Brendan",
          "join_date": "02/06/2015",
          "last_name": "Goodman",
          "phone": "1-366-460-4085",
          "state": "UT",
          "zip": "79832"
      },
      {
          "address": "4595 Nam Ave",
          "city": "Houston",
          "email": "libero.Proin.sed@odioEtiam.net",
          "first_name": "Iris",
          "join_date": "03/14/2015",
          "last_name": "Reed",
          "phone": "1-235-212-3201",
          "state": "TX",
          "zip": "20428"
      },
      {
          "address": "919-6551 Sed Avenue",
          "city": "Savannah",
          "email": "ullamcorper.viverra.Maecenas@eu.net",
          "first_name": "Sharon",
          "join_date": "11/30/2013",
          "last_name": "Ortiz",
          "phone": "1-365-712-7857",
          "state": "GA",
          "zip": "24519"
      },
      {
          "address": "P.O. Box 445, 4681 Et Av.",
          "city": "Jacksonville",
          "email": "scelerisque.neque@diamat.edu",
          "first_name": "Theodore",
          "join_date": "04/20/2014",
          "last_name": "Burt",
          "phone": "1-520-656-5432",
          "state": "FL",
          "zip": "34501"
      },
      {
          "address": "681-9602 Eget, Av.",
          "city": "Tacoma",
          "email": "et@ullamcorper.ca",
          "first_name": "Shoshana",
          "join_date": "11/22/2015",
          "last_name": "Bray",
          "phone": "1-659-478-5023",
          "state": "WA",
          "zip": "97963"
      },
      {
          "address": "1123 Eu Road",
          "city": "Broken Arrow",
          "email": "Sed@posuere.edu",
          "first_name": "Jana",
          "join_date": "04/30/2015",
          "last_name": "Vaughan",
          "phone": "1-666-961-0854",
          "state": "OK",
          "zip": "33109"
      },
      {
          "address": "510-5242 Amet Rd.",
          "city": "Wyoming",
          "email": "vulputate@eueuismod.ca",
          "first_name": "Caesar",
          "join_date": "01/08/2014",
          "last_name": "Nichols",
          "phone": "1-866-786-3194",
          "state": "WY",
          "zip": "50838"
      },
      {
          "address": "328-2908 Proin Avenue",
          "city": "Bear",
          "email": "scelerisque.sed@uteros.edu",
          "first_name": "Velma",
          "join_date": "04/07/2014",
          "last_name": "Salas",
          "phone": "1-237-558-2967",
          "state": "DE",
          "zip": "26876"
      },
      {
          "address": "Ap #677-6629 Ligula Road",
          "city": "Athens",
          "email": "tincidunt.adipiscing@atfringilla.co.uk",
          "first_name": "Bernard",
          "join_date": "11/23/2014",
          "last_name": "Carlson",
          "phone": "1-506-936-6055",
          "state": "GA",
          "zip": "77160"
      },
      {
          "address": "Ap #811-1906 Tempus Rd.",
          "city": "Athens",
          "email": "non@magnaSuspendissetristique.ca",
          "first_name": "Germane",
          "join_date": "07/06/2015",
          "last_name": "Mejia",
          "phone": "1-140-524-1439",
          "state": "GA",
          "zip": "27811"
      },
      {
          "address": "P.O. Box 712, 2438 Pharetra Street",
          "city": "Juneau",
          "email": "In@nonegestas.edu",
          "first_name": "Jacob",
          "join_date": "10/21/2014",
          "last_name": "Harrington",
          "phone": "1-408-765-8913",
          "state": "AK",
          "zip": "99983"
      },
      {
          "address": "859-8248 Tempor St.",
          "city": "Naperville",
          "email": "eleifend.Cras@Crasdolordolor.com",
          "first_name": "Arden",
          "join_date": "08/17/2015",
          "last_name": "Morton",
          "phone": "1-164-111-2368",
          "state": "IL",
          "zip": "74224"
      },
      {
          "address": "7250 Non Avenue",
          "city": "Columbia",
          "email": "eu.neque.pellentesque@libero.org",
          "first_name": "Nomlanga",
          "join_date": "03/24/2015",
          "last_name": "Bridges",
          "phone": "1-192-151-0337",
          "state": "MD",
          "zip": "88533"
      },
      {
          "address": "P.O. Box 513, 5966 Arcu. Ave",
          "city": "Harrisburg",
          "email": "ridiculus@porttitor.edu",
          "first_name": "Wendy",
          "join_date": "12/03/2013",
          "last_name": "Nunez",
          "phone": "1-580-703-2669",
          "state": "PA",
          "zip": "88299"
      },
      {
          "address": "Ap #848-9988 Massa. Rd.",
          "city": "Minneapolis",
          "email": "dapibus@facilisisvitaeorci.co.uk",
          "first_name": "Hollee",
          "join_date": "07/10/2015",
          "last_name": "Perez",
          "phone": "1-825-936-3274",
          "state": "MN",
          "zip": "29898"
      },
      {
          "address": "Ap #899-6924 Enim. Rd.",
          "city": "Memphis",
          "email": "Mauris.eu@justoProin.org",
          "first_name": "Alec",
          "join_date": "09/27/2014",
          "last_name": "Marks",
          "phone": "1-200-721-8454",
          "state": "TN",
          "zip": "64300"
      },
      {
          "address": "P.O. Box 872, 2664 Arcu. St.",
          "city": "Augusta",
          "email": "Cras.dolor.dolor@amalesuadaid.com",
          "first_name": "Brennan",
          "join_date": "05/07/2014",
          "last_name": "Kidd",
          "phone": "1-231-430-9751",
          "state": "ME",
          "zip": "95430"
      },
      {
          "address": "2005 Id Ave",
          "city": "Biloxi",
          "email": "tincidunt.adipiscing.Mauris@ultricesmaurisipsum.ca",
          "first_name": "Curran",
          "join_date": "05/29/2015",
          "last_name": "Clemons",
          "phone": "1-184-388-4764",
          "state": "MS",
          "zip": "17775"
      },
      {
          "address": "5751 Purus. Ave",
          "city": "Dover",
          "email": "dolor.elit.pellentesque@habitantmorbi.edu",
          "first_name": "Deanna",
          "join_date": "06/28/2014",
          "last_name": "Morse",
          "phone": "1-630-165-7492",
          "state": "DE",
          "zip": "82209"
      },
      {
          "address": "P.O. Box 462, 8737 Tellus. St.",
          "city": "Pike Creek",
          "email": "Quisque.tincidunt@velconvallisin.net",
          "first_name": "Joan",
          "join_date": "09/10/2015",
          "last_name": "Perez",
          "phone": "1-100-930-3667",
          "state": "DE",
          "zip": "21081"
      },
      {
          "address": "Ap #333-3056 Tellus. Rd.",
          "city": "Juneau",
          "email": "malesuada.Integer@Sednunc.net",
          "first_name": "Hayes",
          "join_date": "12/03/2013",
          "last_name": "Tyler",
          "phone": "1-263-820-6390",
          "state": "AK",
          "zip": "99798"
      },
      {
          "address": "P.O. Box 420, 9414 Eget Street",
          "city": "Racine",
          "email": "vel@et.org",
          "first_name": "Harding",
          "join_date": "03/01/2014",
          "last_name": "Osborn",
          "phone": "1-235-868-6326",
          "state": "WI",
          "zip": "28148"
      },
      {
          "address": "120-154 Quisque Street",
          "city": "Covington",
          "email": "nibh@quisarcu.co.uk",
          "first_name": "Lynn",
          "join_date": "07/02/2015",
          "last_name": "Ingram",
          "phone": "1-909-490-3063",
          "state": "KY",
          "zip": "83368"
      },
      {
          "address": "Ap #504-6447 Etiam Rd.",
          "city": "Fort Worth",
          "email": "in.aliquet@mitempor.co.uk",
          "first_name": "Bianca",
          "join_date": "04/07/2015",
          "last_name": "Harrington",
          "phone": "1-249-229-2145",
          "state": "TX",
          "zip": "98171"
      },
      {
          "address": "P.O. Box 743, 4141 Nec Rd.",
          "city": "Vancouver",
          "email": "faucibus.Morbi@urna.org",
          "first_name": "Colton",
          "join_date": "09/23/2014",
          "last_name": "Shepard",
          "phone": "1-945-305-1472",
          "state": "WA",
          "zip": "67316"
      },
      {
          "address": "Ap #565-9505 Tristique Avenue",
          "city": "Pittsburgh",
          "email": "pulvinar.arcu.et@fringillaeuismodenim.co.uk",
          "first_name": "Dalton",
          "join_date": "08/31/2015",
          "last_name": "Underwood",
          "phone": "1-405-167-5714",
          "state": "PA",
          "zip": "73276"
      },
      {
          "address": "Ap #822-3075 Amet Rd.",
          "city": "Southaven",
          "email": "a@iaculisenim.edu",
          "first_name": "Duncan",
          "join_date": "10/18/2015",
          "last_name": "Whitney",
          "phone": "1-575-360-3085",
          "state": "MS",
          "zip": "38093"
      },
      {
          "address": "Ap #342-6232 Vehicula Rd.",
          "city": "Paradise",
          "email": "nostra.per.inceptos@facilisisvitaeorci.edu",
          "first_name": "Halla",
          "join_date": "11/21/2014",
          "last_name": "Richard",
          "phone": "1-599-959-7818",
          "state": "NV",
          "zip": "39761"
      },
      {
          "address": "P.O. Box 764, 1625 A Street",
          "city": "Harrisburg",
          "email": "id@velitSed.co.uk",
          "first_name": "Seth",
          "join_date": "02/19/2015",
          "last_name": "Simmons",
          "phone": "1-274-250-9207",
          "state": "PA",
          "zip": "38979"
      },
      {
          "address": "Ap #293-4776 Vulputate, Road",
          "city": "Hilo",
          "email": "at.iaculis@sagittissemper.com",
          "first_name": "Kibo",
          "join_date": "11/11/2014",
          "last_name": "Foster",
          "phone": "1-247-916-2991",
          "state": "HI",
          "zip": "45165"
      },
      {
          "address": "Ap #560-9192 Nisl Rd.",
          "city": "Frederick",
          "email": "eu.tellus@acturpis.ca",
          "first_name": "Xaviera",
          "join_date": "02/12/2015",
          "last_name": "Mcintyre",
          "phone": "1-888-829-3663",
          "state": "MD",
          "zip": "42783"
      },
      {
          "address": "7957 Nulla. Road",
          "city": "Virginia Beach",
          "email": "ante.iaculis.nec@congueIn.org",
          "first_name": "Samson",
          "join_date": "10/15/2015",
          "last_name": "Stafford",
          "phone": "1-969-230-4070",
          "state": "VA",
          "zip": "22628"
      },
      {
          "address": "Ap #512-2946 At Rd.",
          "city": "Reno",
          "email": "mattis@sitamet.net",
          "first_name": "Clark",
          "join_date": "01/06/2015",
          "last_name": "Manning",
          "phone": "1-477-604-4378",
          "state": "NV",
          "zip": "12044"
      },
      {
          "address": "Ap #888-7948 Proin Av.",
          "city": "Georgia",
          "email": "dignissim@etipsumcursus.co.uk",
          "first_name": "Jordan",
          "join_date": "10/28/2015",
          "last_name": "Stanley",
          "phone": "1-985-958-7426",
          "state": "GA",
          "zip": "98675"
      },
      {
          "address": "580-4444 Sed, Av.",
          "city": "San Antonio",
          "email": "laoreet.posuere@Praesenteunulla.edu",
          "first_name": "Levi",
          "join_date": "04/21/2014",
          "last_name": "Moore",
          "phone": "1-957-631-3570",
          "state": "TX",
          "zip": "91048"
      },
      {
          "address": "5901 Nunc. St.",
          "city": "Vancouver",
          "email": "Etiam.bibendum@sapienmolestieorci.co.uk",
          "first_name": "Macey",
          "join_date": "11/23/2015",
          "last_name": "Cherry",
          "phone": "1-491-465-9804",
          "state": "WA",
          "zip": "47567"
      },
      {
          "address": "P.O. Box 603, 7357 Ac St.",
          "city": "Toledo",
          "email": "elementum.at@Loremipsum.com",
          "first_name": "Noah",
          "join_date": "03/05/2015",
          "last_name": "Byers",
          "phone": "1-605-808-3462",
          "state": "OH",
          "zip": "59195"
      },
      {
          "address": "Ap #128-5962 Sollicitudin Avenue",
          "city": "Portland",
          "email": "pellentesque@mauriselit.ca",
          "first_name": "Wayne",
          "join_date": "11/19/2014",
          "last_name": "Conrad",
          "phone": "1-144-125-4740",
          "state": "OR",
          "zip": "99459"
      }
  ]

exports.listAllMembers = listAllMembers;
exports.db = db;
exports.initDb = initDb;
exports.insertMembers = insertMembers;


