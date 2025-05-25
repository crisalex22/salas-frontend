import React, { useEffect, useState } from "react";
import { getSalas } from "../api/api";

const SalaList = ({ onSelect }) => {
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSalas().then(res => {
      setSalas(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Cargando salas...</div>;

  return (
    <div className="card my-3">
      <div className="card-header">Salas disponibles</div>
      <ul className="list-group list-group-flush">
        {salas.map(sala => (
          <li
            key={sala.id}
            className="list-group-item d-flex justify-content-between align-items-center"
            onClick={() => onSelect && onSelect(sala)}
            style={{ cursor: onSelect ? 'pointer' : 'default' }}
          >
            <span>
              <strong>{sala.nombre}</strong> ({sala.ubicacion}) - Capacidad: {sala.capacidad}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalaList;
