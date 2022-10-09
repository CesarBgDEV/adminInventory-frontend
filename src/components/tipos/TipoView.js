import React, {useState, useEffect} from 'react';
import {getTiposEquipos} from '../../services/tipoEquipoService';
import {TipoNew} from './TipoNew';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export const TipoView = () => {

  const [tipos, setTipos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  
  const listarTipos = async () =>{
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const { data } = await getTiposEquipos();
      setTipos(data);
      Swal.close();
      
    } catch (error) {
      Swal.close();
    }
  }

  useEffect ( () => {
    listarTipos();
  },[])

  const handleOpenModal = () =>{
    setOpenModal(!openModal);
  }


  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col'>
          <div className='sidebar-header mt-2'>
            <h3>Tipos de Activo</h3>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <hr/>
        </div>
      </div>
      {/* TABLA DE TIPOS */}

      <div className="col">
        <table className="table table-sm table-responsive">
          <thead className="table-dark">
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Estado</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody className=" table-light ">
            {
              tipos.map((tipo) =>{
                return <tr key={ tipo._id }>
                  <td>{tipo.nombre}</td>
                  <td>{tipo.estado}</td>
                  <td>
                    <Link to={`tipos/edit/${tipo._id}`} type="button" className="btn btn-success">Editar</Link>
                    {"  "}
                    {/* <Link type="button" className="btn btn-danger">Eliminar</Link> */}
                  </td>
                </tr>
              })
            }
            
          </tbody>
        </table>
      </div>

      {
        openModal ? <TipoNew
                      handleOpenModal = {handleOpenModal}
                      listarTipos = {listarTipos} />:
          (<button className= 'btn btn-primary fab' onClick={handleOpenModal} data-bs-toggle="modal" data-bs-target="#exampleModal">
            <i className="fa fa-solid fa-plus"></i>
          </button>)
      }


    </div>
  )
}
