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
    let newListArray
    tempListItemsArray.forEach((entry, index) => {
        if (entry.listItemNumber == id) {
            newListArray = tempListItemsArray.splice(index, 1)
        }
    })
    // put the new array back into localStorage
    localStorage.listItems = JSON.stringify(newListArray);
}

function initListCount() {
    // Return the number of items in the todo list
    if (localStorage.listCount) {
        console.log(localStorage.listCount)
        return localStorage.listCount;
    } else {
        localStorage.setItem('listCount', 0);
        console.log(localStorage.listCount)
    }
}

function getListCount() {
    return localStorage.listCount;
}

function resetListCount() {
    localStorage.setItem('listCount', 0);
}

function resetListItems() {
    localStorage.setItem('listItems', JSON.stringify(new Array()));
}

module.exports.initListCount = initListCount;
module.exports.getListCount = getListCount;
module.exports.resetListCount = resetListCount;
module.exports.resetListItems = resetListItems;
module.exports.removeTodoListItemByID = removeTodoListItemByID;

module.exports.retrieveTodoListItems = retrieveTodoListItems;


module.exports.test = function () {
    console.log('test worked')
}