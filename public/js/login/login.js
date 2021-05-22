import { login } from '../helpers/login.js'

const input        = document.getElementById('name')
const button       = document.getElementById('submit-button')

button.onclick = ( event ) => {
    
    event.preventDefault()
    
    if ( input.value === "" ) {
        
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
