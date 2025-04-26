//TODO: Fetch data from the PostgreSQL database (to be implemented later)
function fetchGradeData() {
    // This function will query the PostgreSQL database and return the grade data
    console.log("Fetching grade data...");
}

// TODO: Populate the table with grade data
function populateGradebook(data) {
    // This function will populate the table with the fetched grade data and populate the table
    console.log("Populating gradebook with data:", data);
}
// TODO REMOVE THIS
// Call the stubs to demonstrate the workflow
const gradeData = fetchGradeData();
populateGradebook(gradeData);
// END REMOVE
function fetchGradeData() {
    // This function will query the PostgreSQL database and return the grade data
    console.log("Fetching grade data...");
    // create a new request for HTTP data
    let xhr = new XMLHttpRequest();
    // This is the adress on the machine we're asking for data 
    let apiRoute = "/api/grades";
    // When the request changes status, we run this anonymous function
    xhr.onreadystatechange = function() {
        let results;
        // Check if we're done 
        if (xhr.readyState === xhr.DONE){
            // Check if we're successful 
            if (xhr.status === 200) {
                console.log(`Status: ${xhr.status}`);
            }
            // And then call the funtion to update the html with out data
            populateGradebook(JSON.parse(xhr.responseText));
        }
    }. bind (this);
    xhr.open("GET", apiRoute, true);
    xhr.send();
}
function populateGradebook(data) {
    // This function will populate the table with the fetched grade data and populate the table
    console.log("Populating gradebook with data:", data);
    if (data === undefined) {
        // If we don't have any data, just return and do nothing
        console.log("No data to populate the gradebook.");
        return;
    }
    let tableElm = document.getElementById("gradebook"); // Get the gradebook table element
    data.forEach(function(assignment) { // For each row of data we're passed in
        let row = document.createElement("tr"); // Create a new table row
        let columns = []; // Handy place to stick the columns of information
        columns.name = document.createElement("td"); // The first column's table data will be the name
        columns.name.appendChild(
            //Concatenate the full name: "last_name, first_name"
            document.createTextNode(assignment.last_name + ", " + assignment.first_name)
        );
        columns.grade = document.createElement("td"); // second column will be the grade
        columns.grade.appendChild(
            // Just put the name in text, you could be fancy and figure out the letter grade here
            // with either a bunch of conditions, or a Javascript "switch" statement
            document.createTextNode(assignment.total_grade)
        );
        // Add the table data columns to the table row
        row.appendChild(columns.name);
        row.appendChild(columns.grade);
        // Add the row to the table itself to make the table visible
        tableElm.appendChild(row);
    });
}
