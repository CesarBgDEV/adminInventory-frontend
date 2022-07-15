import React , {useState, useEffect} from 'react'
import {getUsuarios} from '../../services/usuarioService';
import {getEstadosEquipos} from '../../services/estadoEquipoService';
import {getMarcas} from '../../services/marcaService';
import {getTiposEquipos} from '../../services/tipoEquipoService';
import {crearInventario} from '../../services/inventarioService';
import Swal from 'sweetalert2';


export const InventarioNew = ({handleOpenModal}) => {

    const [usuarios, setUsuarios] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [estados, setEstados] = useState([]);
    const [valoresForm, setValoresForm] = useState({});
    const {serial = '', modelo= '', descripcion= '',serviceTag= '',af= '',
        foto= '',fechaEntrega= '',usuario, marca, tipo, estado} = valoresForm;

    //USE EFFECT USARIOS
    const listarUsuarios = async () =>{
        try {
            const {data} = await getUsuarios();
            setUsuarios(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect( () =>{
        listarUsuarios();
    },[]);


    //USE EFFECT MARCAS
    const listarMarcas = async () =>{
        try {
            const {data} = await getMarcas();
            setMarcas(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect( () =>{
        listarMarcas();
    },[]);


    //USE EFFECT TIPOS DE EQUIPOS
    const listarTipos = async () =>{
        try {
            const {data} = await getTiposEquipos();
            setTipos(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect( () =>{
        listarTipos();
    },[]);


    //USE EFFECT ESTADOS DE EQUIPOS
    const listarEstados = async () =>{
        try {
            const {data} = await getEstadosEquipos();
            setEstados(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect( () =>{
        listarEstados();
    },[]);

    const handleOnCHange = ({target}) =>{
        const {name, value} = target;
        setValoresForm({ ...valoresForm, [name]: value })//spread
    }

    const hadleOnSubmit = async (e) =>{
        e.preventDefault();
        const inventario = {
            serial, modelo, descripcion, serviceTag,af, foto, fechaEntrega, 
            usuario:{_id:usuario}, 
            marca:{_id:marca},
            tipoEquipo:{_id:tipo},
            estadoEquipo:{_id:estado}
        };
        console.log(inventario);
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const {data} = await crearInventario(inventario);
            console.log(data);
            Swal.close();
            handleOpenModal();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    }

  return (
    <div className= 'sidebar'>
        
        <div className='container-fluid'>
            <div className='row'>
                <div className='col'>
                    <div className='sidebar-header'>
                    <h3>Nuevo Activo</h3>
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
                            <label  className="form-label">Serial</label>
                            <input type="text" name='serial'
                                required
                                value={serial}
                                onChange= { (e) => handleOnCHange(e) }
                                className="form-control"   />
                        </div>
                    </div>
                    <div className='col'>
                        <div className="mb-3">
                            <label  className="form-label">Modelo</label>
                            <input type="text" name='modelo'
                                required
                                onChange= { (e) => handleOnCHange(e) }
                                value={modelo} 
                                className="form-control"   />
                        </div>
                        
                    </div>
                    <div className='col'>
                        <div className="mb-3">
                            <label  className="form-label">Descripción</label>
                            <input type="text" name='descripcion'
                                onChange= { (e) => handleOnCHange(e) } 
                                value={descripcion} 
                                className="form-control"   />
                        </div>
                        
                    </div>
                    <div className='col'>
                        <div className="mb-3">
                            <label  className="form-label">Service Tag</label>
                            <input type="text" name='serviceTag'
                                required
                                onChange= { (e) => handleOnCHange(e) } 
                                value={serviceTag} 
                                className="form-control"   />
                        </div>
                        
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                    <div className="mb-3">
                        <label  className="form-label">Activo Fijo</label>
                        <input type="number" name='af'
                            onChange= { (e) => handleOnCHange(e) } 
                            value={af} 
                            className="form-control"   />
                    </div>
                    </div>
                    <div className='col'>
                        <div className="mb-3">
                            <label  className="form-label">Foto</label>
                            <input type="url" name='foto'
                                onChange= { (e) => handleOnCHange(e) } 
                                value={foto} 
                                className="form-control"   />
                        </div>
                        
                    </div>
                    <div className='col'>
                        <div className="mb-3">
                            <label  className="form-label">Fecha de Entrega</label>
                            <input type="date" name='fechaEntrega'
                                required
                                onChange= { (e) => handleOnCHange(e) } 
                                value={fechaEntrega} 
                                className="form-control"   />
                        </div>
                        
                    </div>
                    <div className='col'>
                        <div className="mb-3">
                            <label  className="form-label">Usuario</label>
                            <select className="form-select"
                                required
                                onChange= { (e) => handleOnCHange(e) } 
                                name='usuario'
                                value={usuario}>
                                <option value= "">-- SELECCIONE --</option>
                                {
                                    usuarios.map(({_id, nombre}) =>{
                                        return <option key={_id} value={_id}>
                                                {nombre}
                                            </option>
                                    })
                                }

                            </select>
                        </div>
                        
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <div className="mb-3">
                            <label  className="form-label">Marca</label>
                            <select className="form-select"
                                required
                                onChange= { (e) => handleOnCHange(e) } 
                                name='marca'
                                value={marca}>
                                <option value="">-- SELECCIONE --</option>
                                {
                                    marcas.map(({_id,nombre}) =>{
                                        return <option key={_id} value={_id}>
                                            {nombre}
                                        </option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className='col'>
                        <div className="mb-3">
                            <label  className="form-label">Tipo de Equipo</label>
                            <select className="form-select"
                                required
                                onChange= { (e) => handleOnCHange(e) } 
                                name='tipo'
                                value={tipo}>
                                <option value="">-- SELECCIONE --</option>
                                {
                                    tipos.map(({_id, nombre}) =>{
                                        return <option key={_id} value={_id}>
                                            {nombre}
                                        </option>
                                    })
                                }
                            </select>
                        </div>
                        
                    </div>
                    <div className='col'>
                        <div className="mb-3">
                            <label  className="form-label">Estado del Equipo</label>
                            <select className="form-select"
                                required
                                onChange= { (e) => handleOnCHange(e) } 
                                name='estado'
                                value={estado}>
                                <option value="">-- SELECCIONE --</option>
                                {
                                    estados.map(({_id, nombre}) =>{
                                        return <option key={_id} value={_id}>
                                            {nombre}
                                        </option>
                                    })
                                }
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
