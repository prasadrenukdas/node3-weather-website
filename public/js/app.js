console.log('Client side js file is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message1');
const messageTwo = document.getElementById('message2');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    messageOne.textContent = 'loading...'

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            return messageOne.textContent = data.error; 
        }

        console.log(data);
        messageOne.textContent = data.address;
        messageTwo.textContent = data.forecastData;
    })
})

    console.log(location);
})