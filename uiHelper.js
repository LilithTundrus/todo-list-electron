'use strict';
// Display the input modal when the plus button is used
document.getElementById('plusButton').addEventListener('click', function () {
    document.getElementById('inputModal').style.display = 'block';
})

let listItems = controller.retrieveTodoListItems();

if (listItems.length > 0) {
    console.log(listItems)
}

document.getElementById('addTodoButton').addEventListener('click', function () {
    // TODO: Create some padding for elements
    // TODO: retrive the old notes
    // TODO: create a better way of controlling these elements!
    let divTopAppend = document.createElement('div');
    divTopAppend.setAttribute('class', 'w3-container w3-card');
    // Advanced the number of items by one
    localStorage.listCount++;
    divTopAppend.setAttribute('id', `listItem${controller.getListCount()}`);
    let todoText = document.getElementById('todoInputText').value;
    let removeButton = document.createElement('button');
    let itemToStore = {
        // We need to store an ID to reference this by in the storage controller function
        listItemNumber: controller.getListCount(),
        text: todoText
    }
    listItems.push(itemToStore);
    // Store the todo value in localStorage
    localStorage.listItems = JSON.stringify(listItems);
    console.log(localStorage.listItems)

    // Create  the button to then append
    removeButton.setAttribute('onclick', 'removeItem()');
    removeButton.setAttribute('class', 'w3-button w3-blue w3-right');
    removeButton.innerText = 'Remove';

    divTopAppend.innerText = todoText;
    document.getElementById('listContainer').appendChild(divTopAppend);
    document.getElementById(`listItem${controller.getListCount()}`).appendChild(removeButton);

    // Re-hide the modal
    document.getElementById('inputModal').style.display = 'none';
    //Reset the modal value
    document.getElementById('todoInputText').value = '';

})

function removeItem() {
    {
        document.getElementById(`listItem${controller.getListCount()}`).style.display = 'none';
        controller.removeTodoListItemByID(controller.getListCount())
        localStorage.listCount--;
    }
}

// Restore the old todo entries
