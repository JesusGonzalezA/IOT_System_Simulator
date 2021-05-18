import { baseURL } from "./baseUrl.js"

export const sendPost = ( uri, body ) => {
    const url     = `${ baseURL }/${ uri }`
    const headers = new Headers()
    headers.append("Content-Type", "application/json")

    const requestOptions = {
        method: 'POST',
        headers,
        body
    }

    fetch( url, requestOptions )
        .then  ( response => {
            if ( response.status === 200 ) {
                response.text()
                    .then( ( text ) => {
                        Swal.fire({
                            title: 'Éxito',
                            text,
                            icon: 'success'
                        })
                    })
            }
            
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error',
                icon: 'error'
            })
        })
        .catch ( () => {
            Swal.fire({
                title: 'Error',
                text: 'No se pudo conectar con el servidor',
                icon: 'error'
            })
        })
}