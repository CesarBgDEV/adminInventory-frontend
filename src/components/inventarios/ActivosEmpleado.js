import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {getInventarioEmpleado} from '../../services/inventarioService';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const ActivosEmpleado = () => {
    const {usuarioId= ''} = useParams();
    const [activos, setActivos] = useState([]);
    const [nombreUsuario, setNombreUsuario] = useState([]);
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


            let nombre = ""
            if( data.length >= 1 ){
                nombre =  await data[0]['usuario']['nombre']
                
            }
            setNombreUsuario(nombre)
            console.log(nombre);
            console.log(nombreUsuario);
            

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


    const descargarPDF = async () => {

        const {data} = await getInventarioEmpleado(usuarioId);
            
            setActivos(data);


            let nombre = ""
            if( data.length >= 1 ){
                nombre =  await data[0]['usuario']['nombre']
                
            }


        const doc = new jsPDF()
        doc.text("Activos de "+ nombre , 20, 10);

        // doc.autotable({

        //     columns: activos.map((activo)=>{
        //         activo.descripcion,
        //         activo.estadoEquipo,
        //         activo.af,
        //         activo.marca,
        //         activo.modelo,
        //         activo.serviceTag
        //     })
            

        // })
        

        doc.save('Activos de '+ nombre + '.pdf')
    }

  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col">
                <div className="sidebar-header mt-2">
                    <h3>Activos de {nombreUsuario}</h3>
                </div>

                <div>
                    <button className="btn btn-primary" onClick={descargarPDF}> <i className="fa-solid fa-print"></i> </button>
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
            <table className="table" id="#activosEmpleado">
                <thead className=" table-dark ">
                    <tr>
                        <th scope="col">Descripción</th>
                        <th scope="col">Estado</th>
                        <th scope="col">AF</th>
                        <th scope="col">Marca</th>
                        <th scope="col">Modelo</th>
                        <th scope="col">Service tag</th>
                    </tr>
                </thead>
                <tbody className="table-light">
                    {
                        activos.map((activo) =>{
                            return <tr key={activo._id}>
                                <td>{activo.descripcion}</td>
                                <td>{activo.estadoEquipo['nombre']}</td>
                                <td>{activo.af}</td>
                                <td>{activo.marca['nombre']}</td>
                                <td>{activo.modelo}</td>
                                <td>{activo.serviceTag}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
    )
}
