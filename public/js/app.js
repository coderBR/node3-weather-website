console.log('web server is up')

// fetch('http://localhost:3000/weather?address=%22uberlandia%22').then((response) => {
//     response.json().then((data) => {
//         if (data.error) return console.log(data.error)

//         console.log(data.location)
//         console.log(data.forecast)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading...'
    messagetwo.textContent = ' '

    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messagetwo.textContent = data.forecast.weather_description
            }
        })
    })    
})