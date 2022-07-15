import {axiosInstance} from '../helpers/axios-config';

const getInventarios = () =>{
    return axiosInstance.get('inventario', {
        headers : {
            'Content-type':'aplication/json'
        }
    });
    
}

const crearInventario = (data) =>{
    return axiosInstance.post('inventario', data, {
        headers : {
            'Content-type':'aplication/json'
        }
    });
    
}

const editInventario = (inventarioId , data) =>{
    return axiosInstance.put(`inventario/${inventarioId}`, data, {
        headers : {
            'Content-type':'aplication/json'
        }
    });
    
}

export{
    getInventarios, crearInventario, editInventario
}