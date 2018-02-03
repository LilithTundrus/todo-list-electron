'use strict';

document.getElementById('plusButton').addEventListener('click', function () {
    
    document.getElementById('inputModal').style.display = 'block';
    let divTopAppend = document.createElement('div')
    divTopAppend.setAttribute('class', 'w3-card');
    divTopAppend.innerText = 'AAAA';
    document.getElementById('listContainer').appendChild(divTopAppend);

})