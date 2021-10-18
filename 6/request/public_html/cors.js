'use strict';

window.addEventListener('load', () => {
    document.getElementById('button1').addEventListener('click', (event) => {
        event.preventDefault();
        let form1 = document.getElementById('form1');
        let fd = new FormData(form1);
        let xhr = new XMLHttpRequest();

        xhr.open("POST", "http://localhost:8080/test1");

        xhr.addEventListener('load', (event) => {
            console.log('** xhr: load');
            let response = JSON.parse(xhr.responseText);
            console.log(response);
        });
        xhr.addEventListener('error', (event) => {
            console.log('** xhr: error');
        });

        xhr.send(fd);
    });

});
