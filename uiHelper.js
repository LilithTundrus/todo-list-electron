'use strict';
let oldSubjHolder;
let oldTextHolder;
let listItems = controller.retrieveTodoListItems();
// Restore the old todo entries, there's likely a way better way of doing this!

// TODO: Make the headers look prettier
// TODO: Fix the issue where breaks in text are ignored from 
// initial edits but added back on refresh
// TODO: Version 0.1.5: Allow for an element to be clicked to edit
// TODO: Version 0.1.5: Allow for keyboard shortcuts on add/edit modal actions
// TODO: Version 0.2.0: Get the edits to work inline and not require a modal input
// TODO: Version 0.3.0: Allow for the theme to be changed (dark/light) as well as
// the accent colors

if (listItems.length > 0) {
    console.log(listItems);
    // Put each element into the DOM
    listItems.forEach((entry, index) => {
        // Create the main div card to attach the note data to
        let divToAppend = document.createElement('div');
        // Set the attributes and stylings we need
        divToAppend.setAttribute('class', 'w3-card-2 w3-display-container  w3-section w3-hover-shadow');
        divToAppend.setAttribute('style', 'width: 100%;');
        divToAppend.setAttribute('id', entry.id);

        // Create a header to get the todo list item's title
        let headerArea = document.createElement('header');
        headerArea.setAttribute('class', 'w3-container w3-blue');
        headerArea.setAttribute('id', 'todoHeader');
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
        completedCheckBox.setAttribute('class', 'material-icons w3-xlarge w3-display-topleft');
        completedCheckBox.innerText = 'check_box_outline_blank';

        // Check whether or not the list item is completed
        if (entry.completed == true) {
            completedCheckBox.innerText = 'check_box';
        }

        completedCheckBox.addEventListener('click', function () {
            // mark the item as completed in the localSotrage
            if (completedCheckBox.innerText == 'check_box') {
                completedCheckBox.innerText = 'check_box_outline_blank';
                // Update the items status by ID
                toggleCompletedStatus(false, entry.id);
            } else {
                completedCheckBox.innerText = 'check_box';
                toggleCompletedStatus(true, entry.id);
            }
        });

        // Edit button and all the functionality
        let editLink = document.createElement('a');
        editLink.setAttribute('class', 'w3-display-bottomright');
        editLink.setAttribute('href', '#');
        editLink.innerText = 'Edit...';
        editLink.addEventListener('click', function () {
            editItemInit(this);
        })

        // Append all of the elments together
        document.getElementById('listContainer').appendChild(divToAppend);
        document.getElementById(entry.id).appendChild(headerArea);
        document.getElementById(entry.id).appendChild(paragraphDiv);
        document.getElementById(entry.id).appendChild(removeSpan);
        document.getElementById(entry.id).appendChild(editLink);
        document.getElementById(entry.id).appendChild(completedCheckBox);

        // This is where we would have to add an event listener to provide functionality for
        // on-element click edits
        divToAppend.addEventListener('click', function () {
            editItemInit(this);
        })
    })
}

// #region eventListeners
document.getElementById('addTodoButton').addEventListener('click', function () {
    let divToAppend = document.createElement('div');
    divToAppend.setAttribute('class', 'w3-card-2 w3-display-container  w3-section');
    // Create a new UUID for the item
    let instancedUUID = `lisItem${uuid()}`;
    divToAppend.setAttribute('id', instancedUUID);
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
    };
    // Store the todo value in localStorage
    listItems.push(itemToStore);
    localStorage.listItems = JSON.stringify(listItems);
    // debugging
    console.log(localStorage.listItems);

    // Create a header to get the todo list item's title
    let headerArea = document.createElement('header');
    headerArea.setAttribute('class', 'w3-container w3-blue');
    headerArea.setAttribute('id', 'todoHeader');
    let todoHeader = document.createElement('h3');
    todoHeader.innerText = todoTitle;
    headerArea.appendChild(todoHeader);

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

    // Put the checkbox here to mark as done yes/no and have the item turn green
    let completedCheckBox = document.createElement('i');
    completedCheckBox.setAttribute('class', 'material-icons w3-xlarge w3-display-topleft');
    completedCheckBox.innerText = 'check_box_outline_blank';

    completedCheckBox.addEventListener('click', function () {
        // mark the item as completed in the localSotrage
        if (completedCheckBox.innerText == 'check_box') {
            completedCheckBox.innerText = 'check_box_outline_blank';
            // Update the items status by ID
            toggleCompletedStatus(false, instancedUUID);
        } else {
            completedCheckBox.innerText = 'check_box';
            toggleCompletedStatus(true, instancedUUID);
        }
    });

    // Edit button and all the functionality
    let editLink = document.createElement('a');
    editLink.setAttribute('class', 'w3-display-bottomright');
    editLink.setAttribute('href', '#');
    editLink.innerText = 'Edit...';
    editLink.addEventListener('click', function () {
        let oldTtitle = this.parentElement.getElementsByClassName('w3-container w3-blue')[0].innerText;
        document.getElementById('newInputSubject').value = oldTtitle;
        let oldText = this.parentElement.getElementsByClassName('w3-container')[1].innerText;
        document.getElementById('newInputText').value = oldText;
        document.getElementById('editModal').style.display = 'block';
        oldSubjHolder = oldTtitle;
        oldTextHolder = oldText;
    })

    document.getElementById('listContainer').appendChild(divToAppend);
    document.getElementById(instancedUUID).appendChild(headerArea);
    document.getElementById(instancedUUID).appendChild(paragraphDiv);
    document.getElementById(instancedUUID).appendChild(removeSpan);
    document.getElementById(instancedUUID).appendChild(editLink);
    document.getElementById(instancedUUID).appendChild(completedCheckBox);


    // Re-hide the modal
    document.getElementById('inputModal').style.display = 'none';
    // Reset the modal values
    document.getElementById('todoInputText').value = '';
    document.getElementById('todoInputSubject').value = '';
})

// this is so damn janky
document.getElementById('changeTodoButton').addEventListener('click', function () {
    editButtonClickHandler();
})



// Display the input modal when the plus button is used
document.getElementById('plusButton').addEventListener('click', function () {
    document.getElementById('inputModal').style.display = 'block';
})

document.getElementById('incompleteFilter').addEventListener('click', function () {
    // get each existing div and check for the innerText of the checkbox
    // <i> element, then if it's checked as  incomplete, hide the item
    let mainDiv = document.getElementById('listContainer');
    this.setAttribute('class', 'w3-text-blue');
    document.getElementById('completedFilter').setAttribute('class', 'w3-text-black');
    Array.prototype.forEach.call(mainDiv.children, child => {
        // check the innerText of all element for a checkbox
        console.log(child.innerText)
        if (child.innerText.includes('closeEdit...check_box') && !child.innerText.includes('closeEdit...check_box_outline_blank')) {
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
    this.setAttribute('class', 'w3-text-blue');
    document.getElementById('incompleteFilter').setAttribute('class', 'w3-text-black');
    Array.prototype.forEach.call(mainDiv.children, child => {
        // check the innerText of all element for a checkbox
        if (child.innerText.includes('closeEdit...check_box_outline_blank')) {
            child.style.display = 'none';
        } else {
            child.style.display = 'block';
        }
    });
})

document.getElementById('resetFilter').addEventListener('click', function () {
    // reset the filters
    let mainDiv = document.getElementById('listContainer');
    document.getElementById('incompleteFilter').setAttribute('class', 'w3-text-black');
    document.getElementById('completedFilter').setAttribute('class', 'w3-text-black');
    Array.prototype.forEach.call(mainDiv.children, child => {
        child.style.display = 'block';
    });
})
// #endregion

/**
 * Remove an item from the HTML DOM AND local storage
 * @param {String} id 
 * @returns {function & void}
 */
function removeItem(id) {
    document.getElementById(id).remove();
    return controller.removeTodoListItemByID(id);
}

/**
 * Change the completed/incomplete status checkbox for an item in localStorage
 * @param {Boolean} statusBool 
 * @param {String} id 
 * @returns {function & void}
 */
function toggleCompletedStatus(statusBool, id) {
    return controller.updateTodoListItemCompleteStatusByID(statusBool, id);
}

function editButtonClickHandler() {
    document.getElementById('editModal').style.display = 'none';
    // display the edit modalm on change, update the listItem and push to localStorage
    let newSubject = document.getElementById('newInputSubject').value;
    let newText = document.getElementById('newInputText').value;
    let mainDiv = document.getElementById('listContainer');
    // Iterate through each todo item
    Array.prototype.forEach.call(mainDiv.children, child => {
        // check if the item has the property we're looking for before defining it
        if (child.getElementsByClassName('w3-container w3-blue').length > 0) {
            // define the element to work with
            let workingSubjElem = child.getElementsByClassName('w3-container w3-blue')[0];
            // See if the global var matches with this local var
            if (oldSubjHolder == workingSubjElem.innerText) {
                // resolve for the item's text box as well 
                console.log('Found match to edit');
                workingSubjElem.innerHTML = `<h3>${newSubject}</h3>`;
                // no need to check for the second item!
                if (child.getElementsByClassName('w3-container')) {
                    let workingTextElem = child.getElementsByClassName('w3-container')[1];
                    workingTextElem.innerHTML = `<p>${newText}</p>`;
                    let completetionBool;
                    if (child.innerText.includes('closeEdit...check_box_outline_blank')) {
                        completetionBool = false;
                    } else {
                        completetionBool = true;
                    }
                    let updatedTodoObj = {
                        id: child.id,
                        text: newText,
                        title: newSubject,
                        completed: completetionBool
                    };
                    // rebuild the localStorage data
                    controller.updateItemDataByID(child.id, updatedTodoObj);
                }
            }
        }
    });
}

function editItemInit(thisArg) {
    let oldTtitle = thisArg.parentElement.getElementsByClassName('w3-container w3-blue')[0].innerText;
    document.getElementById('newInputSubject').value = oldTtitle;
    let oldText = thisArg.parentElement.getElementsByClassName('w3-container')[1].innerText;
    document.getElementById('newInputText').value = oldText;
    document.getElementById('editModal').style.display = 'block';
    // Store the item temporarily as a global, This may eventually cause issues
    oldSubjHolder = oldTtitle;
    oldTextHolder = oldText;
}