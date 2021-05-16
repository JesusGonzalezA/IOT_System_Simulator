import { sendPost } from '../helpers/sendPost.js'

const formPersiana = document.getElementById('form-persiana')
const formAC       = document.getElementById('form-ac')

const togglePersiana = () => {
    const body = JSON.stringify({
        value: formPersiana.checked
    })
    const uri  = 'action/persiana'  
    
    sendPost( uri, body )
}

const toggleAC = (e) => {
    const body = JSON.stringify({
        value: formAC.checked
    })
    const uri  = 'action/ac'
    
    sendPost( uri, body )
}


formPersiana.onchange = togglePersiana
formAC.onchange       = toggleAC