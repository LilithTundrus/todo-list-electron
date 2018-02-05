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
        // Create the main div card to attach the note data to
        let divToAppend = document.createElement('div');
        // Set the attributes and stylings we need
        divToAppend.setAttribute('class', 'w3-card-2 w3-display-container  w3-section');
        divToAppend.setAttribute('style', 'width: 100%;');
        divToAppend.setAttribute('id', `listItem${entry.id}`);

        // Create a header to get the todo list item's title
        let headerDiv = document.createElement('header');
        headerDiv.setAttribute('style', 'width: 100%;');

        headerDiv.setAttribute('class', 'w3-container w3-blue');
        let todoHeader = document.createElement('h3');
        todoHeader.innerText = entry.title;
        headerDiv.appendChild(todoHeader)

        // the div where the todolist Item's data will go
        let paragraphDiv = document.createElement('div')
        paragraphDiv.setAttribute('class', 'w3-container');
        let todoParagraph = document.createElement('p');

        // The button used to remove the item
        let removeSpan = document.createElement('i');
        // Create  the button to then append
        removeSpan.addEventListener('click', function () {
            removeItem(entry.id);
        });
        removeSpan.setAttribute('class', 'material-icons w3-xlarge w3-display-topright w3-blue');
        removeSpan.innerText = 'close';

        todoParagraph.innerText = entry.text;
        paragraphDiv.setAttribute('style', 'width: 100%;');
        paragraphDiv.appendChild(todoParagraph);
        document.getElementById('listContainer').appendChild(divToAppend);
        document.getElementById(`listItem${entry.id}`).appendChild(headerDiv);
        document.getElementById(`listItem${entry.id}`).appendChild(paragraphDiv);
        document.getElementById(`listItem${entry.id}`).appendChild(removeSpan);

    })
}

document.getElementById('addTodoButton').addEventListener('click', function () {
    let divToAppend = document.createElement('div');
    divToAppend.setAttribute('class', 'w3-container w3-card');
    // Advanced the number of items by one
    let instancedUUID = uuid();
    divToAppend.setAttribute('id', `listItem${instancedUUID}`);
    let todoText = document.getElementById('todoInputText').value;
    let todoTitle;
    if (document.getElementById('todoInputSubject').value.length > 0) {
        todoTitle = document.getElementById('todoInputSubject').value;
    } else {
        todoTitle = 'No Subject';
    }
    let removeSpan = document.createElement('button');
    let itemToStore = {
        // We need to store an ID to reference this by in the storage controller function
        id: instancedUUID,
        text: todoText,
        title: todoTitle
    }
    listItems.push(itemToStore);
    // Store the todo value in localStorage
    localStorage.listItems = JSON.stringify(listItems);
    console.log(localStorage.listItems);

    // Create a header to get the todo list item's title

    // the div where the todolist Item's data will go
    let paragraphDiv = document.createElement('div')
    paragraphDiv.setAttribute('class', 'w3-container');
    let todoParagraph = document.createElement('p');
    todoParagraph.innerText = todoText;
    paragraphDiv.setAttribute('style', 'width: 100%;');
    // Create the button to then append
    removeSpan.addEventListener('click', function () {
        removeItem(instancedUUID);
    });
    removeSpan.setAttribute('class', 'w3-button w3-blue w3-right');
    removeSpan.innerText = 'Remove';

    paragraphDiv.appendChild(todoParagraph);
    divToAppend.appendChild(paragraphDiv)
    document.getElementById('listContainer').appendChild(divToAppend);
    document.getElementById(`listItem${instancedUUID}`).appendChild(removeSpan);
    // Re-hide the modal
    document.getElementById('inputModal').style.display = 'none';
    //Reset the modal value
    document.getElementById('todoInputText').value = '';

})

function removeItem(id) {
    document.getElementById(`listItem${id}`).style.display = 'none';
    controller.removeTodoListItemByID(id);
}

