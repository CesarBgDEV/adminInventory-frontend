import {axiosInstance} from '../helpers/axios-config';

const getEstadosEquipos = () =>{
    return axiosInstance.get('estado-equipo',{
        headers:{
            'Content-type' : 'aplication/json'
        }
    })
}

//todo crear,actualizar, listar por id
const crearEstadoEquipo = (data) =>{
    return axiosInstance.post('estado-equipo', data, {
        headers : {
            'Content-type':'aplication/json'
        }
    });
    
}

const editEstadoEquipo = (estadoEquipoId , data) =>{
    return axiosInstance.put(`estado-equipo/${estadoEquipoId}`, data, {
        headers : {
            'Content-type':'aplication/json'
        }
    });
    
}

export{
    getEstadosEquipos, crearEstadoEquipo, editEstadoEquipo
}