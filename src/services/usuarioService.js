import {axiosInstance} from '../helpers/axios-config';

const getUsuarios = () =>{
    return axiosInstance.get('usuario',{
        headers:{
            'Content-type' : 'aplication/json'
        }
    });
}

//todo crear,actualizar, listar por id

const crearUsuario = (data) =>{
    return axiosInstance.post('usuario', data, {
        headers : {
            'Content-type':'aplication/json'
        }
    });
    
}

const editUsuario = (usuarioId , data) =>{
    return axiosInstance.put(`usuario/${usuarioId}`, data, {
        headers : {
            'Content-type':'aplication/json'
        }
    });
    
}

export{
    getUsuarios,crearUsuario, editUsuario
}