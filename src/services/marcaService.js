import {axiosInstance} from '../helpers/axios-config';


//http://localhost:4000/marca

const getMarcas = () =>{
    return axiosInstance.get('marca',{
        headers:{
            'Content-type' : 'application/json'
        }
    });
}

//todo crear,actualizar, listar por id

const crearMarcas = (data) =>{
    return axiosInstance.post('marca', data, {
        headers: {
            'Content-type' : 'application/json'
        }
    });
}

const editMarcas = (marcaId, data) =>{
    return axiosInstance.put(`marca/${marcaId}`,data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export{
    getMarcas, crearMarcas, editMarcas
}