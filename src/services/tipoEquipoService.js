import {axiosInstance} from '../helpers/axios-config';

const getTiposEquipos = () =>{
    return axiosInstance.get('tipo-equipo',{
        headers:{
            'Content-type' : 'application/json'
        }
    })
}

//todo crear,actualizar, listar por id
const crearTipoEquipo = (data) =>{
    return axiosInstance.post('tipo-equipo', data, {
        headers : {
            'Content-type':'application/json'
        }
    });
    
}

const editTipoEquipo = (tipoEquipoId , data) =>{
    return axiosInstance.put(`tipo-equipo/${tipoEquipoId}`, data, {
        headers : {
            'Content-type':'application/json'
        }
    });
    
}

const getTiposPorId = (tipoEquipoId) =>{
    return axiosInstance.put(`tipo-equipo/${tipoEquipoId}`, {
        headers : {
            'Content-type':'application/json'
        }
    });
}

export{
    getTiposEquipos,crearTipoEquipo, editTipoEquipo, getTiposPorId
}