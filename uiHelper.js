'use strict';

let listItems = controller.retrieveTodoListItems();
// Restore the old todo entries
// there's likely a way better way of doing this!
if (listItems.length > 0) {
    console.log(listItems);
    // Put each element into the DOM
    listItems.forEach((entry, index) => {
        // Create the main div card to attach the note data to
        let divToAppend = document.createElement('div');
        // Set the attributes and stylings we need
        divToAppend.setAttribute('class', 'w3-card-2 w3-display-container  w3-section w3-hover-shadow');
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
        todoParagraph.innerText = entry.text;
        paragraphDiv.appendChild(todoParagraph);

        // The button used to remove the item
        let removeSpan = document.createElement('i');
        // Create  the button to then append
        removeSpan.addEventListener('click', function () {
            removeItem(entry.id);
        });
        removeSpan.setAttribute('class', 'material-icons w3-xlarge w3-display-topright w3-blue w3-hover-red');
        removeSpan.innerText = 'close';

        // Put the checkbox here to mark as done yes/no and have the item turn green
        let completedCheckBox = document.createElement('i');
        completedCheckBox.setAttribute('class', 'material-icons w3-xlarge w3-display-topleft')
        completedCheckBox.innerText = 'check_box_outline_blank';

        if (entry.completed == true) {
            completedCheckBox.innerText = 'check_box';
        }

        completedCheckBox.addEventListener('click', function () {
            // mark the item as completed in the localSotrage
            if (completedCheckBox.innerText == 'check_box') {
                completedCheckBox.innerText = 'check_box_outline_blank';
                // Update the items status by ID
                toggleCompletedStatus(false, entry.id)
            } else {
                completedCheckBox.innerText = 'check_box';
                toggleCompletedStatus(true, entry.id)
            }
        });

        // Put the edit button here

        document.getElementById('listContainer').appendChild(divToAppend);
        document.getElementById(`listItem${entry.id}`).appendChild(headerArea);
        document.getElementById(`listItem${entry.id}`).appendChild(paragraphDiv);
        document.getElementById(`listItem${entry.id}`).appendChild(removeSpan);
        document.getElementById(`listItem${entry.id}`).appendChild(completedCheckBox);
    })
}

// #region eventListeners
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
        id: instancedUUID,
        text: todoText,
        title: todoTitle,
        completed: false
    }
    listItems.push(itemToStore);
    localStorage.listItems = JSON.stringify(listItems);

    console.log(localStorage.listItems);

    // Create a header to get the todo list item's title
    let headerArea = document.createElement('header');
    headerArea.setAttribute('class', 'w3-container w3-blue');
    let todoHeader = document.createElement('h3');
    todoHeader.innerText = todoTitle;
    headerArea.appendChild(todoHeader);

    // Store the todo value in localStorage
    // the div where the todolist Item's data will go
    let paragraphDiv = document.createElement('div')
    paragraphDiv.setAttribute('class', 'w3-container');
    let todoParagraph = document.createElement('p');
    todoParagraph.innerText = todoText;
    paragraphDiv.appendChild(todoParagraph);


    // The button used to remove the item
    let removeSpan = document.createElement('i');
    // Create  the button to then append
    removeSpan.addEventListener('click', function () {
        removeItem(instancedUUID);
    });
    removeSpan.setAttribute('class', 'material-icons w3-xlarge w3-display-topright w3-blue w3-hover-red');
    removeSpan.innerText = 'close';

    document.getElementById('listContainer').appendChild(divToAppend);
    document.getElementById(`listItem${instancedUUID}`).appendChild(headerArea);
    document.getElementById(`listItem${instancedUUID}`).appendChild(paragraphDiv);
    document.getElementById(`listItem${instancedUUID}`).appendChild(removeSpan);


    // Re-hide the modal
    document.getElementById('inputModal').style.display = 'none';
    // Reset the modal values
    document.getElementById('todoInputText').value = '';
    document.getElementById('todoInputSubject').value = '';
})

// Display the input modal when the plus button is used
document.getElementById('plusButton').addEventListener('click', function () {
    document.getElementById('inputModal').style.display = 'block';
})

document.getElementById('incompleteFilter').addEventListener('click', function () {
    // get each existing div and check for the innerText of the checkbox
    // <i> element, then if it's checked as  incomplete, hide the item
    let mainDiv = document.getElementById('listContainer');
    Array.prototype.forEach.call(mainDiv.children, child => {
        // check the innerText of all element for a checkbox
        if (child.innerText.includes('closecheck_box') && !child.innerText.includes('closecheck_box_outline_blank')) {
            console.log(child.innerText);
            child.style.display = 'none';
        } else {
            child.style.display = 'block';
        }
    });
})

document.getElementById('completedFilter').addEventListener('click', function () {
    // get each existing div and check for the innerText of the checkbox
    // <i> element, then if it's checked as  completed, hide the item
    let mainDiv = document.getElementById('listContainer');
    Array.prototype.forEach.call(mainDiv.children, child => {
        // check the innerText of all element for a checkbox
        if (child.innerText.includes('closecheck_box_outline_blank')) {
            console.log(child.innerText);
            child.style.display = 'none';
        } else {
            child.style.display = 'block';
        }
    });
})
document.getElementById('resetFilter').addEventListener('click', function () {
    // reset the filters
    let mainDiv = document.getElementById('listContainer');
    Array.prototype.forEach.call(mainDiv.children, child => {
        child.style.display = 'block';
    });
})
// #endregion

function removeItem(id) {
    document.getElementById(`listItem${id}`).style.display = 'none';
    return controller.removeTodoListItemByID(id);
}

function toggleCompletedStatus(statusBool, id) {
    return controller.updateTodoListItemCompleteStatusByID(statusBool, id)
}