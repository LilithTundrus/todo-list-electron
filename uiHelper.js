'use strict';

document.getElementById('plusButton').addEventListener('click', function () {

    document.getElementById('inputModal').style.display = 'block';


})

document.getElementById('addTodoButton').addEventListener('click', function () {
    let divTopAppend = document.createElement('div');
    divTopAppend.setAttribute('class', 'w3-container w3-card');
    divTopAppend.setAttribute('id', 'test');
    let todoText = document.getElementById('todoInputText').value;
    let removeButton = document.createElement('button')

    // Create  the button to then append
    removeButton.setAttribute('onclick', "document.getElementById('test').style.display='none'")
    removeButton.setAttribute('class', 'w3-button w3-blue w3-right')
    removeButton.innerText = 'Remove'

    divTopAppend.innerText = todoText;
    document.getElementById('listContainer').appendChild(divTopAppend);
    document.getElementById('test').appendChild(removeButton);

    // Re-hide the modal
    document.getElementById('inputModal').style.display = 'none';
    //Reset the modal value
    document.getElementById('todoInputText').value = '';

})
