import { 
    fillTableAC,
    fillTablePersiana,
    fillTableSensores
} from './tables.js'
import { getName } from '../helpers/getName.js'
import { sendGet } from '../helpers/sendGet.js'

//--------------------------------------------------------------------------

const name             = document.getElementById('name')
name.innerText = 'Casa de ' + getName()

//--------------------------------------------------------------------------

const response = await sendGet( 'action/get-historico' )

if ( response.status !== 200) {
    Swal.file({
        title: 'Error',
        text: 'Hubo un error',
        icon: 'error'
    })
} else {
    const { sensores, ac, persiana } = await response.json()

    fillTableAC( ac )
    fillTablePersiana( persiana )
    fillTableSensores( sensores )
}
//--------------------------------------------------------------------------



