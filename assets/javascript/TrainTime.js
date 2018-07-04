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

    console.log(database)
//////////////////////////////////////////////////////////////////////////////////////
    function update(){ 

        
        console.log("Update here")
        
        database.ref().on("child_added", function(childSnapshot) {
      
            //Log everything that's coming out of snapshot
            console.log("Print childSnapshot here?")
            console.log("name: "+childSnapshot.val().name);
            console.log("destination: "+childSnapshot.val().destination);
            console.log("first: "+childSnapshot.val().first);
            console.log("frequency: "+childSnapshot.val().frequency);
            console.log("dateAdded: "+childSnapshot.val().dateAdded);
            
            

            $("#entry").append("<tr><td id='name'> " + childSnapshot.val().name +
        " </td><td id='destination'> " + childSnapshot.val().destination +
          " </td><td id='first'> " + childSnapshot.val().first + "<td></td>" +
            " </td><td id='frequency'> " + childSnapshot.val().frequency + " </td></tr>");

        })

        //Write data to fields

        
        
      
    
        
        //clear form and 

        //push data from form to table
        

    }
/////////////////////////////////////////////////////////////////////////////////////
   function backup(){
    if( Name!=='' && Destination!=='' && First!=='' && Frequency!=='' ){
        console.log("Name "+ name)
        console.log("Going to "+destination)
        console.log("First train was at "+first)
        console.log("Frequency of this train is "+frequency)
 
        database.ref().push({
         name: name,
         destination: destination,
         first: first,
         frequency: frequency,
         dateAdded: firebase.database.ServerValue.TIMESTAMP
 
         ///////
         
 
         });
         $("#entry").html("")
         
         update();
         /////////////////
 
        //  database.ref().on("child_added", function(childSnapshot) {
        //      $("#myData").append("<tr><td id='myEmployee'> " + childSnapshot.val().employee +
        //  " </td><td id='myRole'> " + childSnapshot.val().role +
        //    " </td><td id='myDate'> " + childSnapshot.val().date + "<td></td>" +
        //      " </td><td id='myRate'> " + childSnapshot.val().rate + " </td></tr>");
 
 
 
         /////
         // dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
         //     // Change the HTML to reflect
         //     $("#myEmployee").text(snapshot.val().employee);
         //     $("#myRole").text(snapshot.val().role);
         //     $("#myDate").text(snapshot.val().date);
         //     $("#myRate").text(snapshot.val().rate);
         //   });
 
 
     //     // var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
     //     // starCountRef.on('value', function(snapshot) {
     //     //  updateStarCount(postElement, snapshot.val());
     //     // });
 
 
 
 
     } //end database backup
 
     console.log(name+destination+first+frequency)
 
 
 
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

    //Calcultions for next arival and minutes to next train
    // difference= currenttime - first
    // modules= (currenttime-first) % frequency
    // next= difference - modulus + frequnecy
    //mins= next - current

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

