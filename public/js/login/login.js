import { login } from '../helpers/login.js'

const input        = document.getElementById('name')
const form         = document.getElementById('form')

form.onsubmit = ( event ) => {
    
    if ( input.value === "" ) {
        event.preventDefault()
        
        Swal.fire({
            title: 'Error',
            text: 'Debe introducir su nombre',
            icon: 'error'
        })
    }

    else {
        const body = JSON.stringify({
            name: input.value
        })
    
        login( body )
    }
}
