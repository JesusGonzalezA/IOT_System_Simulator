
const mimeTypes = {
    html: 'text/html',
    jpeg: 'image/jpeg',
    jpg:  'image/jpeg',
    png:  'image/png',
    css:  'text/css',
    ico:  'image/x-icon'
}

const getMime = ( extension ) => {
    return mimeTypes[extension]
}

//**************************************************************************

module.exports = getMime