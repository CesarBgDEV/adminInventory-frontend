import React, {useState,useEffect} from 'react';
import {crearMarca} from '../../services/marcaService';
import Swal from 'sweetalert2';

export const MarcaNew = ({handleOpenModal, listarMarcas}) => {

    const [valoresForm, setValoresForm] = useState({});
    const [nombre= '', estado = ''] = valoresForm;

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
            const {data} = await crearMarca(marca);
            console.log(data);
            Swal.close();
            handleOpenModal();
            listarMarcas();
            
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
    <div className= 'sidebar'>
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    ...
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        
        <div className='container-fluid'>
            <div className='row'>
                <div className='col'>
                    <div className='sidebar-header'>
                        <h3>Nueva Marca</h3>
                        <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <hr/>
                </div>
            </div>
            <form onSubmit={ (e) => hadleOnSubmit(e) }>
                <div className='row'>
                    <div className='col'>
                        <div className="mb-3">
                            <label  className="form-label">Nombre</label>
                            <input type="text" name='nombre'
                                required
                                value={nombre}
                                onChange= { (e) => handleOnCHange(e) }
                                className="form-control"   />
                        </div>
                    </div>


                    <div className='col'>
                        <div className="mb-3">
                            <label  className="form-label">Estatus</label>
                            <select className='form-select' 
                                name='estado'
                                value={estado}
                                required
                                onChange={(e) => handleOnCHange(e)}>
                                    <option value="">-- SELECCIONE --</option>
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                            </select>

                        </div>
                    </div>
                </div>
                
                <div className='row'>
                    <div className='col'>
                        <div className="mb-3">
                            <button className="btn btn-primary">Guardar</button>
                            
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}
