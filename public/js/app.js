//console.log('Client side js code')
let address;
const output1 = document.querySelector('#output1');
const output2 = document.querySelector('#output2');
const weatherForm = document.querySelector('form');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    address = document.querySelector('input').value;
    //console.log(address)
output1.textContent = 'Loading...!';
output2.textContent = '';

fetch(`http://localhost:3000/weather?address=${address}`)
.then(response => {
    return response.json();
})
.then(data => {
    if(data.error){
        //console.log(data.error)
        output1.textContent = data.error;
    }
    else {
    //console.log(data.location);
    //# to be used for id and . to be used for class
    //either can be used
    output1.textContent = data.location;
    //console.log(data.forecast);
    output2.textContent = data.forecast;
    }
})
})
