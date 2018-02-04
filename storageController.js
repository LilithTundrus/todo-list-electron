'use strict';
// This is where we get and retrieve the local storage for the user's TODO list

function retrieveTodoListItems() {
    if (localStorage.listItems) {
        return JSON.parse(localStorage.listItems);
    } else {
        localStorage.setItem('listItems', JSON.stringify(new Array()));
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

function resetListItems() {
    localStorage.setItem('listItems', JSON.stringify(new Array()));
}

module.exports.resetListItems = resetListItems;
module.exports.removeTodoListItemByID = removeTodoListItemByID;
module.exports.retrieveTodoListItems = retrieveTodoListItems;