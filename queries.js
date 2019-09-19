/* Add all the required libraries*/
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database using mongoose - remember to keep your key secret*/
mongoose.connect(config.db.uri);

/* Fill out these functions using Mongoose queries*/
//Check out - https://mongoosejs.com/docs/queries.html

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
   var output = Listing.findOne({'name': 'Library West'}, function(err, listing){
     if (err) throw err;
     if (!listing.coordinates[0]) {
     } else {
       console.log('\nfindLibraryWest()')
      console.log('\ncode:\t\t%s\nname:\t\t%s\ncoordinates:\t(latitude: %d, longitude: %d)\naddress:\t%s', listing.code, listing.name, listing.coordinates[0].latitude, listing.coordinates[0].longitude, listing.address);
     }
    });
};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
  var output = Listing.findOneAndRemove({'code': 'CABL'}, function(err, listing){
    if (err) throw err;
    console.log('\nremoveCable()');
    if (!listing.coordinates[0] && !listing.address) {
      console.log('\ncode:\t\t%s\nname:\t\t%s', listing.code, listing.name);
    } else {
     console.log('\ncode:\t\t%s\nname:\t\t%s\ncoordinates:\t(latitude: %d, longitude: %d)\naddress:\t%s', listing.code, listing.name, listing.coordinates[0].latitude, listing.coordinates[0].longitude, listing.address);
    }
  });
};

var updatePhelpsLab = function() {
  /*
    Phelps Lab address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
    
    Correct Address: 1953 Museum Rd, Gainesville, FL 32603

   */
  var output = Listing.findOneAndUpdate({'name': 'Phelps Laboratory'}, {'address': '1953 Museum Rd, Gainesville, FL 32603'}, function(err,listing){});

  output = Listing.findOne({'name': 'Phelps Laboratory'}, function(err,listing){
    if (err) throw err;
    console.log('\nupdatePhelpsLab()');
    if (!listing.coordinates[0] && !listing.address) {
      console.log('\ncode:\t\t%s\nname:\t\t%s', listing.code, listing.name);
    } else {
     console.log('\ncode:\t\t%s\nname:\t\t%s\ncoordinates:\t(latitude: %d, longitude: %d)\naddress:\t%s', listing.code, listing.name, listing.coordinates[0].latitude, listing.coordinates[0].longitude, listing.address);
    }
  });
};

var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */

  var output = Listing.find(function(err, listing){
    console.log('\nretrieveAllListings()');
    //console.log(JSON.stringify(listing, null, 1));
    listing.forEach(function(listing) {
      if (!listing.coordinates[0] && !listing.address) {
        console.log('\ncode:\t\t%s\nname:\t\t%s', listing.code, listing.name);
      } else {
       console.log('\ncode:\t\t%s\nname:\t\t%s\ncoordinates:\t(latitude: %d, longitude: %d)\naddress:\t%s', listing.code, listing.name, listing.coordinates[0].latitude, listing.coordinates[0].longitude, listing.address);
      }
    });
  });
};

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
