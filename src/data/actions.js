
const base_uri = '/action'

const actions = {
    TOGGLE_PERSIANA: `${ base_uri }/persiana`,
    TOGGLE_AC      : `${ base_uri }/ac`,
    SUBMIT_MEDIDAS : `${ base_uri }/submit-medidas`,
    GET_HISTORICO  : `${ base_uri }/get-historico`,
    GET_RESUMEN    : `${ base_uri }/get-resumen`,
    LOGIN          : `${ base_uri }/login`
}

//**************************************************************************

module.exports = actions