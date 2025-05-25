import React, { useEffect, useState } from "react";
import { getReservas, eliminarReserva } from "../api/api";

const ReservaList = ({ onReservasChanged }) => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarReservas = () => {
    getReservas().then(res => {
      setReservas(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    cargarReservas();
  }, [onReservasChanged]);

  const handleEliminar = (id) => {
    if (window.confirm("¿Seguro que desea cancelar esta reserva?")) {
      eliminarReserva(id).then(() => cargarReservas());
    }
  };

  if (loading) return <div>Cargando reservas...</div>;

  return (
    <div className="card my-3">
      <div className="card-header">Reservas</div>
      <ul className="list-group list-group-flush">
        {reservas.map(reserva => (
          <li key={reserva.id} className="list-group-item">
            <div>
              <strong>Sala:</strong> {reserva.sala.nombre} <br/>
              <strong>Usuario:</strong> {reserva.usuario.nombre} <br/>
              <strong>Desde:</strong> {reserva.fechaInicio.replace("T", " ")} <br/>
              <strong>Hasta:</strong> {reserva.fechaFin.replace("T", " ")}
            </div>
            <button
              className="btn btn-sm btn-danger mt-2"
              onClick={() => handleEliminar(reserva.id)}
            >
              Cancelar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservaList;
