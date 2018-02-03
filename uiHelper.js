'use strict';

document.getElementById('plusButton').addEventListener('click', function () {
    
    let divTopAppend = document.createElement('div')
    divTopAppend.setAttribute('class', 'w3-card');
    divTopAppend.innerText = 'AAAA'
    document.getElementById('listContainer').appendChild(divTopAppend)

})