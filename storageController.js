'use strict';
// This is where we get and retrieve the local storage for the user's TODO list
function retrieveTodoListItems() {
    if (localStorage.listItems) {
        return JSON.parse(localStorage.listItems);
    } else {
        localStorage.setItem('listItems', JSON.stringify(new Array()));
        // return an empty array to prevent the function returning null and causing issues
        return localStorage.listItems;
    }
}

function removeTodoListItemByID(id) {
    // Iterate over the localStorage Array and check for an object match
    console.log(`Searching for id: ${id}`)
    let tempListItemsArray = JSON.parse(localStorage.listItems);
    tempListItemsArray.forEach((entry, index) => {
        if (entry.id == id) {
            console.log('match!!!! Removing...');
            return tempListItemsArray.splice(index, 1);
        }
    })
    // put the new array back into localStorage
    localStorage.listItems = JSON.stringify(tempListItemsArray);
}

function updateTodoListItemCompleteStatusByID(statusBool, id) {
    let tempListItemsArray = JSON.parse(localStorage.listItems);
    console.log(`Updating completed status for for id: ${id}`)
    tempListItemsArray.forEach((entry, index) => {
        if (entry.id == id) {
            console.log('match!!! Updating...');
            return tempListItemsArray[index].completed = statusBool;
        }
    })
    // put the new array back into localStorage
    localStorage.listItems = JSON.stringify(tempListItemsArray);
}

function resetListItems() {
    return localStorage.setItem('listItems', JSON.stringify(new Array()));
}

module.exports.resetListItems = resetListItems;
module.exports.removeTodoListItemByID = removeTodoListItemByID;
module.exports.retrieveTodoListItems = retrieveTodoListItems;
module.exports.updateTodoListItemCompleteStatusByID = updateTodoListItemCompleteStatusByID;