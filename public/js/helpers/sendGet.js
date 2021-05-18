import { baseURL } from "./baseUrl.js"

export const sendGet = ( uri ) => {
    const url     = `${ baseURL }/${uri}`

    const requestOptions = {
        method: 'GET',
    }

    return fetch( url, requestOptions )
}