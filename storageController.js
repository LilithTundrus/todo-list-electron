'use strict';
// This is where we get and retrieve the local storage for the user's TODO list

function retrieveTodoListItems() {

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

module.exports.initListCount = initListCount;
module.exports.getListCount = getListCount;
module.exports.resetListCount = resetListCount;


module.exports.test = function () {
    console.log('test worked')
}