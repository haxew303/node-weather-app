console.log('Client side js loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const mapImg = document.querySelector('#mapImg')

const getWeather = (location) => {
    message1.textContent = 'Loading...';
    message2.textContent = ''
    mapImg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";
    url = '/weather?address=' + location
    fetch(url).then((res) => {
        res.json().then((data) => {
            if (data.error) return message1.textContent = data.error;
            message1.textContent = data.location;
            message2.textContent = data.weather;
            mapImg.src = data.map;
        });
    });
};

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    getWeather(location);
});