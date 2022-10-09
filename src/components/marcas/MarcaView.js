import React,{useState, useEffect} from 'react';
import {getMarcas} from '../../services/marcaService';
import {MarcaNew} from './MarcaNew';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export const MarcaView = () => {

  const [marcas, setMarcas] = useState([]);
  const [openModal,setOpenModal] = useState(false);

  const listarMarcas = async () =>{
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const {data} = await getMarcas();
      setMarcas(data);
      Swal.close();
    } catch (error) {
      Swal.close();
    } 
  }

  useEffect( () => {
    listarMarcas();
  },[])

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col'>
          <div className='sidebar-header mt-2'>
            <h3>Marcas</h3>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <hr/>
        </div>
      </div>
      {/* TABLA DE MARCAS */}

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
              marcas.map((marca) =>{
                return <tr key={ marca._id }>
                  <td>{marca.nombre}</td>
                  <td>{marca.estado}</td>
                  <td>
                    <Link to={`marcas/edit/${marca._id}`} type="button" className="btn btn-success">Editar</Link>
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
        openModal ? <MarcaNew
                      handleOpenModal = {handleOpenModal}
                      listarMarcas = {listarMarcas} />:
          (<button className= 'btn btn-primary fab' onClick={handleOpenModal} data-bs-toggle="modal" data-bs-target="#exampleModal">
            <i className="fa fa-solid fa-plus"></i>
          </button>)
      }


    </div>
  )
}
