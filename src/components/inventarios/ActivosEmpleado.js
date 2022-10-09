import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {getInventarioEmpleado} from '../../services/inventarioService';
import Swal from 'sweetalert2';
import 'jspdf-autotable';

export const ActivosEmpleado = () => {
    const {usuarioId= ''} = useParams();
    const [activos, setActivos] = useState([]);
    const [informacionUsuario, setInformacionUsuario] = useState({nombreUsuario: '', puestoUsuario: '', areaUsuario: '', curpUsuario: '', rfcUsuario: '' , fechaConsulta: '', numeroUsuario:''});
    const [openModal, setOpenModal] = useState(false);

    const listarActivos = async ()=>{
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const {data} = await getInventarioEmpleado(usuarioId);
            setActivos(data);


            let nombre = ""
            let puesto = ""
            let numero = ""
            let area = ""
            let curp = ""
            let rfc = ""
            let hoy = new Date()
            let fecha = `${hoy.getDate()}/${hoy.getMonth()+1}/${hoy.getFullYear()}`

            if( data.length >= 1 ){
                nombre =  await data[0]['usuario']['nombre']
                puesto = await data[0]['usuario']['puesto']
                numero = await data[0]['usuario']['numero']
                area = await data[0]['usuario']['area']
                curp = await data[0]['usuario']['curp']
                rfc = await data[0]['usuario']['rfc']
                
            }
            setInformacionUsuario({
                nombreUsuario: nombre,
                puestoUsuario: puesto,
                numeroUsuario: numero,
                areaUsuario: area,
                curpUsuario: curp,
                rfcUsuario: rfc,
                fechaConsulta: fecha,
            })
            

            Swal.close();
            
        } catch (error) {
            Swal.close();
        }
    };
    



    useEffect(()=>{
        listarActivos();
    },[usuarioId])



    // const descargarPDF = async () => {
    //     const {data} = await getInventarioEmpleado(usuarioId);
            
    //         setActivos(data);


    //         let nombre = ""
    //         if( data.length >= 1 ){
    //             nombre =  await data[0]['usuario']['nombre']
                
    //         }


    //     const  doc = new jsPDF()
    //     doc.text("Activos de "+ nombre , 20, 10);
        

    //     doc.autotable({
    //         html: '#activosEmpleado'
    //     })
        

    //     doc.save('Activos de '+ nombre + '.pdf')
    // }
    
    const descargarPDF = () =>{
        window.print();
    }



  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col">
                <div className="sidebar-header mt-2">
                    <h3>Activos de {informacionUsuario['nombreUsuario']}  
                        <span> - Fecha: {informacionUsuario['fechaConsulta']}  </span> </h3>
                </div>

                <div className="sidebar-header mt-2">
                    <p>
                        Puesto: <b>{informacionUsuario['puestoUsuario']}</b>
                    </p>
                    <p>
                        Número de Empleado: <b>{informacionUsuario['numeroUsuario']}</b>
                    </p>
                    <p>
                        Area: <b>{informacionUsuario['areaUsuario']}</b>
                    </p>
                    <p>
                        CURP: <b>{informacionUsuario['curpUsuario']}</b>
                    </p>
                    <p>
                        RFC: <b>{informacionUsuario['rfcUsuario']}</b>
                    </p>
                </div>
                <div>
                    <button className="btn btn-primary" onClick={descargarPDF} id="descargar"> <i className="fa-solid fa-print"></i> </button>
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
            <table className="table" id="activosEmpleado">
                <thead className=" table-dark ">
                    <tr>
                        <th scope="col">Descripción</th>
                        <th scope="col">Estado</th>
                        <th scope="col">AF</th>
                        <th scope="col">Marca</th>
                        <th scope="col">Modelo</th>
                        <th scope="col">Observaciones</th>
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
                                <td><textarea></textarea></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>

            <div className='col container-leyenda' id='leyenda'>
                    <p className='leyenda-parrafo'>
                        Los activos de arriba listados, propiedad <b><u>XYLEM WATER SOLUTIONS MEXICO S DE RL DE CV,</u></b> los cuales me han sido asignados para el desempeño de mis funciones quedan bajo mi responsabilidad, guarda y custodia, por lo que es mi obligación reportar cualquier movimiento del mismo a la persona encargada de administrar y controlar los Activos Fijos de la empresa por escrito, así como devolverlo en buen estado cuando lo solicite la compañia para quedar liberado de toda responsabilidad.
                    </p>
            </div>

            <div className='row containerFirmas' id='firmas'>
                <span className='col container-firma-usuario'>EMPLEADO DE XYLEM WATER SOLUTION MEXICO S DE RL DE CV NOMBRE Y FIRMA</span>
            </div>
        </div>
    </div>
    )
}
