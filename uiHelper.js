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
        divToAppend.setAttribute('class', 'w3-card-2 w3-container');
        divToAppend.setAttribute('style', 'width: 100%;');

        divToAppend.setAttribute('id', `listItem${entry.id}`);
        let paragraphDiv = document.createElement('div')
        paragraphDiv.setAttribute('class', 'w3-container');
        let todoParagraph = document.createElement('p');
        let removeButton = document.createElement('button');
        // Create  the button to then append
        removeButton.addEventListener('click', function () {
            removeItem(entry.id);
        });
        removeButton.setAttribute('class', 'w3-button w3-blue w3-right');
        removeButton.innerText = 'Remove';

        todoParagraph.innerText = entry.text;
        paragraphDiv.setAttribute('style', 'width: 100%;');

        paragraphDiv.appendChild(todoParagraph)
        document.getElementById('listContainer').appendChild(divToAppend);
        document.getElementById(`listItem${entry.id}`).appendChild(paragraphDiv);
        document.getElementById(`listItem${entry.id}`).appendChild(removeButton);

    })
}

document.getElementById('addTodoButton').addEventListener('click', function () {
    // TODO: retrive the old notes
    // TODO: create a better way of controlling these elements!
    let divToAppend = document.createElement('div');
    divToAppend.setAttribute('class', 'w3-container w3-card');
    // Advanced the number of items by one
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
    document.getElementById(`listItem${id}`).style.display = 'none';
    controller.removeTodoListItemByID(id);
}

