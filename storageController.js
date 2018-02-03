// This is where we get and retrieve the local storage for the user's TODO list

// Check browser support


// Expose an API here for using non-standard Web calls from index.html
/* if (typeof (Storage) !== "undefined") {
    // Store
    localStorage.setItem("lastname", "Smith");
    // Retrieve
    document.getElementById("result").innerHTML = localStorage.getItem("lastname");
} else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
} */
function retrieveTodoListItems() {

}

function getListCount() {
    // Return the number of items in the todo list
    if (localStorage.listCount) {
        return localStorage.listCount;
    } else {
        localStorage.setItem('listCount', 0);
    }
}

module.exports.getListCount = getListCount;
