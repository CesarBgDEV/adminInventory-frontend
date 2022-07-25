import {axiosInstance} from '../helpers/axios-config';

const getUsuarios = () =>{
    return axiosInstance.get('usuario',{
        headers:{
            'Content-type' : 'application/json'
        }
    });
}

//todo crear,actualizar, listar por id

const crearUsuario = (data) =>{
    return axiosInstance.post('usuario', data, {
        headers : {
            'Content-type':'application/json'
        }
    });
    
}

const editUsuario = (usuarioId , data) =>{
    return axiosInstance.put(`usuario/${usuarioId}`, data, {
        headers : {
            'Content-type':'application/json'
        }
    });
    
}

const getUsuarioPorId = (usuarioId) =>{
    return axiosInstance.get(`usuario/${usuarioId}`,{
        headers: {
            'content-type' : 'application/json'
        }
    });
}


export{
    getUsuarios,crearUsuario, editUsuario, getUsuarioPorId
}