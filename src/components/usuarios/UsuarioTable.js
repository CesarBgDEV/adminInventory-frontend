import React from 'react';
import {Link} from 'react-router-dom';


export const UsuarioTable = (props, openEditById) => {
    const {usuario} = props;
  return (
    <div className=" table-responsive-mt3 "> 
        <table className="table">
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
                
                    <tr>
                        <th scope="row">{usuario.numero}</th>
                        <td>{usuario.nombre}</td>
                        <td>{usuario.puesto}</td>
                        <td>{usuario.estado}</td>
                        <td>{usuario.fechaCreacion}</td>
                        <td>{usuario.fehcaActualizacion}</td>
                        <td>{}</td> 
                    </tr> 
            </tbody>
        </table>
    </div>
  )
}
