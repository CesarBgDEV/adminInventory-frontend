import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTiposPorId, editTipoEquipo,
} from "../../services/tipoEquipoService";
import Swal from "sweetalert2";


export const TipoUpdate = () => {
  const { tipoEquipoId = '' } = useParams();
  const [tipoEquipo, setTipoEquipo] = useState({});
  const [valoresForm, setValoresForm] = useState({});
  const { nombre = '', estado = '' } = valoresForm;

  const getTiposEquipos = async () =>{
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
    });
    Swal.showLoading();

    const {data} = await getTiposPorId(tipoEquipoId);

    } catch (error) {
      Swal.close();
    }
  }

  useEffect(() => {
    getTiposEquipos();
  }, [tipoEquipoId]);

  useEffect(() => {
    setValoresForm({
      nombre: tipoEquipo.nombre,
      estado: tipoEquipo.estado,
    });
  }, [tipoEquipo]);

  const handleOnCHange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value }); //spread
  };

  const hadleOnSubmit = async (e) => {
    e.preventDefault();
    const tipoEquipo = {
      nombre,
      estado,
    };
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await editTipoEquipo(tipoEquipoId, tipoEquipo);
      Swal.close();
    } catch (error) {
      Swal.close();
      let mensaje;
      if (error & error.response && error.response.data) {
        mensaje = error.response.data;
      } else {
        mensaje = "Ocurrio un error, por favor intente de nuevo";
      }
      Swal.fire("Error", mensaje, "error");
    }
  };

  return (
    <div className="container-fluid mt-3 mb-2">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Detalle del Tipo del Activo</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <img src="https://www.americares.org/wp-content/uploads/xylem.gif" />
            </div>
            <div className="col-md-8">
              <form onSubmit={(e) => hadleOnSubmit(e)}>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Nombre</label>
                      <input
                        type="text"
                        name="nombre"
                        required
                        value={nombre}
                        onChange={(e) => handleOnCHange(e)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Estado</label>
                      <select
                        className="form-select"
                        name="estado"
                        value={estado}
                        required
                        onChange={(e) => handleOnCHange(e)}
                      >
                        <option value="">-- SELECCIONE --</option>
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                      </select>
                    </div>
                  </div>

                  <div className="col">
                    <div className="mb-3 mt-4">
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
  );
};
