import React,{useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {getTiposPorId, editTipoEquipo} from '../../services/tipoEquipoService';
import Swal from 'sweetalert2';
export const TipoUpdate = () => {

  const {tipoEquipoId = ''} = useParams();
  const [tipoEquipo, setTipoEquipo] = useState({});
  const [valoresForm, setValoresForm] = useState({});
  const {nombre = '' , estado = ''} = valoresForm;

  const getTiposEquipos = async () =>{
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const { data } = await getTiposPorId(tipoEquipoId);
      setTipoEquipo(data);
      Swal.close();
      
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() =>{
    getTiposEquipos();
  },[tipoEquipoId]);

  useEffect(() =>{
    setValoresForm({
      nombre: tipoEquipo.nombre,
      estado: tipoEquipo.estado,
    });
  },[tipoEquipo]);

  const handleOnCHange = ({target}) =>{
    const {name, value} = target;
    setValoresForm({...valoresForm, [name]:value})//spread
  }

  const hadleOnSubmit = async (e) =>{
    e.preventDefault();
    const tipoEquipo = {
      nombre, estado
    };
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const { data } = await editTipoEquipo(tipoEquipoId, tipoEquipo);
      Swal.close();
      console.log(data);
      
    } catch (error) {
      console.log(error);
      Swal.close();
      let mensaje;
      if(error & error.response && error.response.data){
        mensaje = error.response.data;
      }else{
        mensaje = 'Ocurrio un error, por favor intente de nuevo';
      }
      Swal.fire('Error', mensaje, 'error');
    }
  }

  return (
    <div>TipoUpdate</div>
  )
}
