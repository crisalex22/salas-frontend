import React, { useState, useEffect } from "react";
import { getSalas, crearReserva } from "../api/api";

const ReservaForm = ({ onReservasChanged }) => {
  const [salas, setSalas] = useState([]);
  const [form, setForm] = useState({
    salaId: "",
    usuarioId: "",
    fechaInicio: "",
    fechaFin: "",
  });
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    getSalas().then(res => setSalas(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje("");
    // Simula usuarioId=1 para pruebas rápidas
    crearReserva({ ...form, usuarioId: 1 }).then(() => {
      setMensaje("Reserva creada exitosamente.");
      setForm({ ...form, fechaInicio: "", fechaFin: "" });
      onReservasChanged();
    }).catch(err => {
      setMensaje(err.response?.data?.message || "Error al crear reserva");
    });
  };

  return (
    <form className="card my-3 p-3" onSubmit={handleSubmit}>
      <h5>Crear nueva reserva</h5>
      <div className="mb-3">
        <label className="form-label">Sala</label>
        <select
          className="form-select"
          name="salaId"
          value={form.salaId}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar sala...</option>
          {salas.map(sala => (
            <option key={sala.id} value={sala.id}>
              {sala.nombre} ({sala.ubicacion})
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Fecha y hora inicio</label>
        <input
          type="datetime-local"
          className="form-control"
          name="fechaInicio"
          value={form.fechaInicio}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Fecha y hora fin</label>
        <input
          type="datetime-local"
          className="form-control"
          name="fechaFin"
          value={form.fechaFin}
          onChange={handleChange}
          required
        />
      </div>
      <button className="btn btn-primary" type="submit">Reservar</button>
      {mensaje && <div className="mt-2 alert alert-info">{mensaje}</div>}
    </form>
  );
};

export default ReservaForm;
