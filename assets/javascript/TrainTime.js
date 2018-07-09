// Initialize Firebase
var config = {
    apiKey: "AIzaSyBFPKMh2VYLmmgz2zz9wv0Zq6KahgCN6ws",
    authDomain: "abbassampleproject.firebaseapp.com",
    databaseURL: "https://abbassampleproject.firebaseio.com",
    projectId: "abbassampleproject",
    storageBucket: "abbassampleproject.appspot.com",
    messagingSenderId: "214042907690"
};
  firebase.initializeApp(config);
    var database= firebase.database();
    var name=""
    var destination=""
    var first =""
    var frequency=""
    var mins=""
    var next=""

    console.log(database)
///////////////////////////



database.ref().on("child_added", function(childSnapshot) {
      
    //Log everything that's coming out of snapshot
    console.log("Print childSnapshot here?")
    console.log("name: "+childSnapshot.val().name);
    console.log("destination: "+childSnapshot.val().destination);
    console.log("first: "+childSnapshot.val().first);
    console.log("frequency: "+childSnapshot.val().frequency);
    console.log("minutes: "+childSnapshot.val().mins);
    console.log("next: "+childSnapshot.val().next);
    console.log("dateAdded: "+childSnapshot.val().dateAdded);
    
    

    $("#entry").append("<tr><td id='name'> " + childSnapshot.val().name 
    +" </td><td id='destination'> " + childSnapshot.val().destination +
  " </td><td id='frequency'> " + childSnapshot.val().frequency + "</td>" 
  +" <td id='next'> " + childSnapshot.val().next +
   " </td><td id='mins'> " + childSnapshot.val().mins + "</td>" 
  +" </td>"+
  "</tr>");

})











//////////////////////////////////////////////////////////////////////////////////////
    function update(){ 

        
        console.log("Update here")
        
        database.ref().on("child_added", function(childSnapshot) {
      
            //Log everything that's coming out of snapshot
            console.log("Print childSnapshot here?")
            console.log("name in database: "+childSnapshot.val().name);
            console.log("destination in database: "+childSnapshot.val().destination);
            console.log("first in database : "+childSnapshot.val().first);
            console.log("frequency in database: "+childSnapshot.val().frequency);
            console.log("dateAdded in database: "+childSnapshot.val().dateAdded);
            
            

            $("#entry").append("<tr><td id='name'> " + childSnapshot.val().name 
    +" </td><td id='destination'> " + childSnapshot.val().destination +
  " </td><td id='frequency'> " + childSnapshot.val().frequency + "</td>" 
  +" <td id='next'> " + childSnapshot.val().next +
   " </td><td id='mins'> " + childSnapshot.val().mins + "</td>" 
  +" </td>"+
  "</tr>");

        })

        
        

    }
/////////////////////////////////////////////////////////////////////////////////////
   function backup(){
    if( name!=='' && destination!=='' && first!=='' && frequency!=='' ){
        console.log("Name "+ name)
        console.log("Going to "+destination)
        console.log("First train was at "+first)
        console.log("Frequency of this train is "+frequency)
 
        

 
         $("#entry").html("")
         update();
        
        } //end database backup
  
 
 
 
    } // end check for null fields
   
    // END BACKUP
   /////////////////////////////////////////////////////////////////////////////////



$("#send").on("click", function(){
    event.preventDefault();

    // read all values
    name=$("#Name").val().trim()
    destination=$("#Destination").val().trim()
    first=$("#First").val().trim()
    frequency=$("#Frequency").val().trim()

     var timeNow=moment().format('HH:mm')
     console.log('The time Now: '+timeNow); ///////// moment.js experiment
     

    var difference = moment
        .duration(moment(timeNow, 'HH:mm')
        .diff(moment(first, 'HH:mm'))
        ).asMinutes();
        console.log(difference +" minutes difference"); // 
     
        //Calcultions for next arival and minutes to next train
    
    
    
    var div= difference / frequency; 
    console.log("div: "+div)  

    var remainder= (difference) % frequency; 
    console.log("Remainder is " + remainder);
    
    var mins = frequency-remainder;
    console.log("Time to next train is " + mins);
    
    var next = moment().add(mins, 'minutes').format('HH:mm')
    console.log("next is " + next);

    database.ref().push({
        name: name,
        destination: destination,
        first: first,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
        mins:mins,
        next:next 
    });
    
    
    
   //remove all values from fields
    $("#Name").val(null)
    $("#Destination").val(null)
    $("#First").val(null)
    $("#Frequency").val(null)


    

    backup();
   


   }) //end send click function
 

   // Clear Button

   $("#clear").on("click", function(){ 
       $("#entry").html("")
       database.ref().remove()
   })


// moment("20111031", "YYYYMMDD").fromNow(); // 7 years ago
// moment("20120620", "YYYYMMDD").fromNow(); // 6 years ago
// moment().startOf('day').fromNow();        // 20 hours ago
// moment().endOf('day').fromNow();          // in 4 hours
// moment().startOf('hour').fromNow();      

