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
        let headerArea = document.createElement('header');
        headerArea.setAttribute('class', 'w3-container w3-blue');
        let todoHeader = document.createElement('h3');
        todoHeader.innerText = entry.title;
        headerArea.appendChild(todoHeader);

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
        paragraphDiv.appendChild(todoParagraph);
        document.getElementById('listContainer').appendChild(divToAppend);
        document.getElementById(`listItem${entry.id}`).appendChild(headerArea);
        document.getElementById(`listItem${entry.id}`).appendChild(paragraphDiv);
        document.getElementById(`listItem${entry.id}`).appendChild(removeSpan);

    })
}

document.getElementById('addTodoButton').addEventListener('click', function () {
    let divToAppend = document.createElement('div');
    divToAppend.setAttribute('class', 'w3-card-2 w3-display-container  w3-section');
    // Create a new UUID for the item
    let instancedUUID = uuid();
    divToAppend.setAttribute('id', `listItem${instancedUUID}`);
    let todoText = document.getElementById('todoInputText').value;
    let todoTitle;
    if (document.getElementById('todoInputSubject').value.length > 0) {
        todoTitle = document.getElementById('todoInputSubject').value;
    } else {
        todoTitle = 'No Subject';
    }
    let itemToStore = {
        // We need to store an ID to reference this by in the storage controller function
        id: instancedUUID,
        text: todoText,
        title: todoTitle
    }
    // Create a header to get the todo list item's title
    let headerArea = document.createElement('header');
    headerArea.setAttribute('class', 'w3-container w3-blue');
    let todoHeader = document.createElement('h3');
    todoHeader.innerText = todoTitle;
    headerArea.appendChild(todoHeader);

    listItems.push(itemToStore);
    // Store the todo value in localStorage
    localStorage.listItems = JSON.stringify(listItems);
    console.log(localStorage.listItems);

    // the div where the todolist Item's data will go
    let paragraphDiv = document.createElement('div')
    paragraphDiv.setAttribute('class', 'w3-container');
    let todoParagraph = document.createElement('p');
    todoParagraph.innerText = todoText;
    // The button used to remove the item
    let removeSpan = document.createElement('i');
    // Create  the button to then append
    removeSpan.addEventListener('click', function () {
        removeItem(instancedUUID);
    });
    removeSpan.setAttribute('class', 'material-icons w3-xlarge w3-display-topright w3-blue');
    removeSpan.innerText = 'close';
    paragraphDiv.appendChild(todoParagraph);
    divToAppend.appendChild(paragraphDiv);
    document.getElementById('listContainer').appendChild(divToAppend);
    document.getElementById(`listItem${instancedUUID}`).appendChild(headerArea);
    document.getElementById(`listItem${instancedUUID}`).appendChild(removeSpan);


    // Re-hide the modal
    document.getElementById('inputModal').style.display = 'none';
    // Reset the modal values
    document.getElementById('todoInputText').value = '';
    document.getElementById('todoInputSubject').value = '';
})

function removeItem(id) {
    document.getElementById(`listItem${id}`).style.display = 'none';
    return controller.removeTodoListItemByID(id);
}

