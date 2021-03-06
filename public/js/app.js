const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading...'
    messagetwo.textContent = ' '

    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messagetwo.textContent = 'The weather now is ' + data.forecast.weather_description +
                                         ', temperature is ' + data.forecast.temperature +
                                         ', feels like ' + data.forecast.feelsLike +
                                         ' and the humidity is ' + data.forecast.humidity + '.'  
            }
        })
    })    
})