import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080", // Ajusta según tu backend
});

export const getSalas = () => API.get("/salas");
export const getReservas = () => API.get("/reservas");
export const crearReserva = (reserva) => API.post("/reservas", reserva);
export const eliminarReserva = (id) => API.delete(`/reservas/${id}`);
