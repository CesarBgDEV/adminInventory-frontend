import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {getInventarioEmpleado, getInventarios} from '../../services/inventarioService';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


export const ActivosEmpleado = () => {
    const {usuarioId= ''} = useParams();
    const [activos, setActivos] = useState({});
    const [openModal, setOpenModal] = useState(false);

    const listarActivos = async ()=>{
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const {data} = await getInventarioEmpleado(usuarioId);
            console.log(data);
            setActivos(data);
            Swal.close();
            
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    };
    
    useEffect(()=>{
        listarActivos();
    },[usuarioId])

    const handleOpenModal = () =>{
        setOpenModal(!openModal)
    }

  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col">
                <div className="sidebar-header mt-2">
                    <h3>Activos del Empleado</h3>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <hr/>
            </div>
        </div>
        {/* TABLA DE ACTIVOS */}
        <div className="col">
            <table className="table">
                <thead>
                    <th scope="col">Descripción</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Numero de Activo</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Modelo</th>
                    <th scope="col">No.Serie</th>
                </thead>
            </table>
        </div>
    </div>
  )
}
