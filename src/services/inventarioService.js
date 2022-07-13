import {axiosInstance} from '../helpers/axios-config';

const getInventarios = () =>{
    return axiosInstance.get('inventario', {
        headers : {
            'Content-type':'aplication/json'
        }
    });
    
}

const crearInventarios = (data) =>{
    return axiosInstance.post('inventario', data, {
        headers : {
            'Content-type':'aplication/json'
        }
    });
    
}

const editInventarios = (inventarioId , data) =>{
    return axiosInstance.put(`inventario/${inventarioId}`, data, {
        headers : {
            'Content-type':'aplication/json'
        }
    });
    
}

export{
    getInventarios, crearInventarios, editInventarios
}