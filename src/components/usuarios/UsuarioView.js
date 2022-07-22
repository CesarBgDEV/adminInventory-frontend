import React,{useState, useEffect} from 'react';
import {getUsuarios} from '../../services/usuarioService';
// import {UsuarioTable} from './UsuarioTable';
import {UsuarioNew} from './UsuarioNew';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export const UsuarioView = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [openModal, setOpenModal] = useState(false);


  const listarUsuarios = async () =>{
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const {data} = await getUsuarios();
      setUsuarios(data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() =>{
    listarUsuarios();
  },[])

  const handleOpenModal = () =>{
    setOpenModal(!openModal)
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
            <div className="sidebar-header mt-2">
              <h3>Empleados</h3>
            </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <hr/>
        </div>
      </div>
      {/* TABLA DE USARIOS */}
      <div className="col"> 
              <table className="table ">
                  <thead className=" table-dark" >
                      <tr>
                          <th scope="col">#</th>
                          <th scope="col">Nombre</th>
                          <th scope="col">Puesto</th>
                          <th scope="col">Estatus</th>
                          <th scope="col">Fecha de Creación</th>
                          <th scope="col">Fecha de Actualización</th>
                          <th scope="col">Acción</th>
                      </tr>
                  </thead>
                  <tbody className="table-light">
                    {
                      usuarios.map((usuario) =>{
                        return <tr key={usuario._id}>
                              <th scope="row">{usuario.numero}</th>
                              <td>{usuario.nombre}</td>
                              <td>{usuario.puesto}</td>
                              <td>{usuario.estado}</td>
                              <td>{usuario.fechaCreacion}</td>
                              <td>{usuario.fehcaActualizacion}</td>
                              <td>
                                    <Link to={`usuarios/edit/${usuario._id}`} type="button" className="btn btn-success">Editar</Link>
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
            openModal ? <UsuarioNew
                          handleOpenModal = {handleOpenModal}
                          listarUsuarios = {listarUsuarios} />:
              (<button className='btn btn-primary fab' onClick={handleOpenModal} data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i className="fa-solid fa-plus"></i>
              </button>)
          }
        


    

          
    </div>

  )
}
