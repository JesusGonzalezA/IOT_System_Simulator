import { sendPost } from '../helpers/sendPost.js'

const form         = document.getElementById('form')
const pLuminosity  = document.getElementById('luminosidad')
const pTemperature = document.getElementById('temperatura')
const inputTemperature = document.getElementById('form-temperatura')
const inputLuminosity  = document.getElementById('form-luminosidad')

// Luminosidad
pLuminosity.innerHTML = `${inputLuminosity.value}`
inputLuminosity.oninput = () => {
    pLuminosity.innerHTML = `${inputLuminosity.value}`
}

// Temperatura
pTemperature.innerHTML = `${inputTemperature.value}º`
inputTemperature.oninput = () => {
    pTemperature.innerHTML = `${inputTemperature.value}º`
}

form.onsubmit = ( e ) => {
    e.preventDefault()

    const body = JSON.stringify({
        luminosity  : inputLuminosity.value,
        temperature : inputTemperature.value
    })
    const uri  = 'action/submit-medidas'

    sendPost( uri, body )
}