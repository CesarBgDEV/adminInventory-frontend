import React,{useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import {getUsuarioPorId, editUsuario} from '../../services/usuarioService';
import Swal from 'sweetalert2';
export const UsuarioUpdate = () => {
    const {usuarioId = ''} = useParams();
    const [usuario, setUsuario] = useState({});
    const [valoresForm, setValoresForm] = useState({});
    const {nombre ='' , numero= '', puesto = '', estado = ''} = valoresForm;


    const getUsuario = async () =>{
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await getUsuarioPorId(usuarioId);
            setUsuario(data);
            Swal.close();
            
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    }

    useEffect(() =>{
        getUsuario();
    },[ usuarioId ]);

    useEffect(()=>{
        setValoresForm({
            nombre: usuario.nombre,
            numero: usuario.numero,
            puesto: usuario.puesto,
            estado: usuario.estado,
        });
    }, [ usuario ]);

    const handleOnCHange = ({ target }) =>{
        const {name, value} = target;
        setValoresForm({...valoresForm, [name]: value})//spread
    }

    const hadleOnSubmit = async (e) =>{
        e.preventDefault();

        const usuario = {
            nombre, numero, puesto ,estado,
        };

        try {
            Swal.fire({
                allowOutsideClick:false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const {data} = await editUsuario(usuarioId, usuario);
            Swal.close();
            console.log(data);
            
        } catch (error) {
            console.log(error);
            Swal.close();
            let mensaje;
            if(error && error.response && error.response.data){
                mensaje = error.response.data;
            }else{
                mensaje = 'Ocurrio un error, por favor intente de nuevo';
            }
            Swal.fire('Error' , mensaje , 'error');
        }

    }

  return (
    <div className='container-fluid mt-3 mb-2'>
        <div className='card'>
            <div className='card-header'>
                <h5 className='card-title'>Detalles de Empleados</h5>
            </div>
            <div className='card-body'>
                <div className='row'>
                    <div className='col-md-4'>
                        <img src="https://www.americares.org/wp-content/uploads/xylem.gif"/>
                    </div>
                
                    <div className='col-md-8'>
                        <form onSubmit= { (e) => hadleOnSubmit(e) }>
                            <div className='row'>
                                <div className='col'>
                                    <div className='mb-3'>
                                        <label className='form-label'>Numero</label>
                                        <input type="text" name='numero'
                                            required
                                            value={numero} 
                                            onChange= { (e) => handleOnCHange(e) }
                                            className= "form-control" />  
                                    </div>                          
                                </div>

                                <div className='col'>
                                    <div className='mb-3'>
                                        <label className='form-label'>Nombre</label>
                                        <input type="text" name='nombre'
                                            required
                                            value={nombre} 
                                            onChange= { (e) => handleOnCHange(e) }
                                            className= "form-control" /> 
                                    </div>                          
                                </div>

                                <div className='col'>
                                    <div className='mb-3'>
                                        <label className='form-label'>Puesto</label>
                                        <input type="text" name='puesto'
                                            required
                                            value={puesto}
                                            onChange = { (e) => handleOnCHange(e) }
                                            className= "form-control"/>
                                    </div>
                                </div>

                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <div className='mb-3'>
                                        <label className='form-label'>Estado</label>
                                        <select className="form-select"
                                            name='estado'
                                            value={estado}
                                            required
                                            onChange = { (e) => handleOnCHange(e) }>
                                                <option value="">-- SELECCIONE --</option>
                                                <option value="Activo">Activo</option>
                                                <option value="Inactivo">Inactivo</option>

                                            </select>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className='mb-3 mt-4'>
                                        <button className="btn btn-primary">Guardar</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
