
const baseURL      = window.location.origin

export const sendPost = ( uri, body ) => {
    const url     = `${baseURL}/${uri}`
    const headers = new Headers()
    headers.append("Content-Type", "application/json")

    const requestOptions = {
        method: 'POST',
        headers,
        body
    }

    fetch( url, requestOptions )
        .then  ( response => response.text() )
        .then  ( result   => {
            Swal.fire({
                title: 'Éxito',
                text: result,
                icon: 'success'
            })
        })
        .catch ( error    => {
            Swal.fire({
                title: 'Error',
                text: error,
                icon: 'error'
            })
        })
}