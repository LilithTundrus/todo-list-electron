'use strict';
// Display the input modal when the plus button is used
document.getElementById('plusButton').addEventListener('click', function () {
    document.getElementById('inputModal').style.display = 'block';
})

let listItems = controller.retrieveTodoListItems();

// Restore the old todo entries
if (listItems.length > 0) {
    console.log(listItems)
    // Put each element into the DOM
    listItems.forEach((entry, index) => {
        let divToAppend = document.createElement('div');
        divToAppend.setAttribute('class', 'w3-container w3-card');
        divToAppend.setAttribute('id', entry.id);

    })
}

document.getElementById('addTodoButton').addEventListener('click', function () {
    // TODO: retrive the old notes
    // TODO: create a better way of controlling these elements!
    // TODO: remove the reliance on listCount
    let divToAppend = document.createElement('div');
    divToAppend.setAttribute('class', 'w3-container w3-card');
    // Advanced the number of items by one
    localStorage.listCount++;
    let instancedUUID = uuid();
    divToAppend.setAttribute('id', `listItem${instancedUUID}`);
    let todoText = document.getElementById('todoInputText').value;
    let removeButton = document.createElement('button');
    let itemToStore = {
        // We need to store an ID to reference this by in the storage controller function
        id: instancedUUID,
        text: todoText
    }
    listItems.push(itemToStore);
    // Store the todo value in localStorage
    localStorage.listItems = JSON.stringify(listItems);
    console.log(localStorage.listItems)

    // Create  the button to then append
    removeButton.addEventListener('click', function () {
        removeItem(instancedUUID);
    });
    removeButton.setAttribute('class', 'w3-button w3-blue w3-right');
    removeButton.innerText = 'Remove';

    divToAppend.innerText = todoText;
    document.getElementById('listContainer').appendChild(divToAppend);
    document.getElementById(`listItem${instancedUUID}`).appendChild(removeButton);

    // Re-hide the modal
    document.getElementById('inputModal').style.display = 'none';
    //Reset the modal value
    document.getElementById('todoInputText').value = '';

})

function removeItem(id) {
    {
        document.getElementById(`listItem${id}`).style.display = 'none';
        controller.removeTodoListItemByID(id)
        localStorage.listCount--;
    }
}

