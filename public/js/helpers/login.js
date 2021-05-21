import { baseURL } from "./baseUrl.js"

export const login = ( body ) => {
    const url     = `${ baseURL }/action/login`
    const headers = new Headers()
    headers.append("Content-Type", "application/json")

    const requestOptions = {
        method: 'POST',
        headers,
        body
    }

    fetch( url, requestOptions )
        .then  ( response => {
            // if ( response.status !== 500 ) {
            //     return;
            // }
            
            // Swal.fire({
            //     title: 'Error',
            //     text: 'Hubo un error',
            //     icon: 'error'
            // })
        })
        .catch ( () => {
            // Swal.fire({
            //     title: 'Error',
            //     text: 'No se pudo conectar con el servidor',
            //     icon: 'error'
            // })
        })
}