import React, {useState, useEffect} from 'react';
import {crearTipoEquipo} from '../../services/tipoEquipoService';
import Swal from 'sweetalert2';

export const TipoNew = ({handleOpenModal, listarTipos}) => {

  const [valoresForm, setValoresForm] = useState({});
  const [nombre = '', estado = ''] =  setValoresForm;

  const handleOnCHange = ({ target }) => {
    const {name, value} = target;
    setValoresForm({...valoresForm,[name]:value})//spread
  }

  const hadleOnSubmit = async (e) =>{
    e.preventDefault();
    const tipo = {
      nombre, estado
    };

    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });

      Swal.showLoading();
      const {data} = await crearTipoEquipo(tipo);
      console.log(data);
      Swal.close();
      handleOpenModal();
      listarTipos();
      
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
    <div className='sidebar'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col'>
            <div className='sidebar-header'>
              <h3> Nuevo Tipo </h3>
              <i className='fa-solid fa-xmark' onClick={handleOpenModal}></i>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <hr/>
          </div>
        </div>
      </div>
    </div>
  )
}
