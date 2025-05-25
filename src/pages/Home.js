import React, { useState } from "react";
import SalaList from "../components/SalaList";
import ReservaForm from "../components/ReservaForm";
import ReservaList from "../components/ReservaList";

const Home = () => {
  const [reservasChanged, setReservasChanged] = useState(0);

  return (
    <div className="container py-4">
      <h2>Gestión de Reservas de Salas</h2>
      <ReservaForm onReservasChanged={() => setReservasChanged(r => r + 1)} />
      <ReservaList onReservasChanged={reservasChanged} />
      <SalaList />
    </div>
  );
};

export default Home;
