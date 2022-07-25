import React, {useState,useEffect} from 'react';
import {crearMarca} from '../../services/marcaService';
import Swal from 'sweetalert2';

export const MarcaNew = ({handleOpenModal, listarMarcas}) => {

    const [valoresForm, setValoresForm] = useState({});
    const {nombre= '', estado = ''} = valoresForm;

    const handleOnCHange = ({ target }) => {
        const{name, value} = target;
        setValoresForm({...valoresForm, [name]:value})//spread
    }

    const hadleOnSubmit = async (e) =>{
        e.preventDefault();
        const marca= {
            nombre, estado
        };
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });

            Swal.showLoading();
            const {data} = await crearMarca()
            
        } catch (error) {
            console.log(error);
            Swal.close();
            let mensaje;
            if(error && error.response && error.response.data){
                mensaje = error.response.data
            }else{
                mensaje = 'Ocurrio un error, por favor intente de nuevo';
            }
        }
    }

  return (
    <div>MarcaNew</div>
  )
}
