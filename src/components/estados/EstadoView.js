import React, {useState,useEffect} from 'react';
import {getEstadosEquipos} from '../../services/estadoEquipoService';
import {EstadoNew} from './EstadoNew';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';

export const EstadoView = () => {

  const [estados,setEstados] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const listarEstados = async () =>{
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const {data} = await getEstadosEquipos();
      setEstados(data)
      Swal.close();

    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect( () =>{
    listarEstados();
  }, [])

  const handleOpenModal = () =>{
    setOpenModal(!openModal);
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col'>
          <div className='sidebar-header mt-2'>
            <h3>Estado de Equipos</h3>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <hr/>
        </div>
      </div>

      {/* TABLA DE ESTADO DE EQUIPOS */}

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
              estados.map((estado) =>{
                return <tr key={ estado._id }>
                  <td>{estado.nombre}</td>
                  <td>{estado.estado}</td>
                  <td>
                    <Link to={`estados/edit/${estado._id}`} type="button" className="btn btn-success">Editar</Link>
                    {"  "}
                    <Link type="button" className="btn btn-danger">Eliminar</Link>
                  </td>
                </tr>
              })
            }
            
          </tbody>
        </table>
      </div>

      {
        openModal ? <EstadoNew
                      handleOpenModal = {handleOpenModal}
                      listarEstados = {listarEstados}/>:
          (<button className= 'btn btn-primary fab' onClick={handleOpenModal} data-bs-toggle="modal" data-bs-target="#exampleModal">
            <i className="fa fa-solid fa-plus"></i>
          </button>)
      }

    </div>
  )
}
