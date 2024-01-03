// Laboratorios.jsx
import React, { useState, useEffect } from 'react';
import { getLaboratorios } from '../../BD/FireBase';
import Seleccion from './Seleccion';

const Laboratorios = () => {
  const [laboratorios, setLaboratorios] = useState([]);
  const [laboratorioSeleccionado, setLaboratorioSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const obtenerLaboratorios = async () => {
      try {
        const laboratoriosData = await getLaboratorios();
        const laboratoriosOrdenados = laboratoriosData.sort((a, b) => a.Nom_Lab.localeCompare(b.Nom_Lab));
        setLaboratorios(laboratoriosOrdenados);
      } catch (error) {
        console.error('Error al obtener laboratorios:', error.message);
      }
    };

    obtenerLaboratorios();
  }, []);

  const handleReservar = async (nombreLaboratorio) => {
    try {
      // Si deseas obtener más detalles del laboratorio, puedes hacerlo aquí con getLaboratorios
      setLaboratorioSeleccionado({ nombre: nombreLaboratorio, horario: 'Horario no disponible' });
      setMostrarModal(true);
    } catch (error) {
      console.error('Error al obtener información del laboratorio:', error.message);
    }
  };

  const cerrarModal = () => {
    setLaboratorioSeleccionado(null);
    setMostrarModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h2 className="text-4xl font-bold text-white mb-8">Laboratorios</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {laboratorios.map((lab) => (
          <div
            key={lab.id}
            className="bg-slate-600 text-white p-6 rounded shadow-md cursor-pointer"
            onClick={() => handleReservar(lab.Nom_Lab)}
          >
            <h1 className="text-2xl font-semibold mb-4 text-center">{lab.Nom_Lab}</h1>
            <p className="text-base mb-2">Piso: {lab.Pis_Lab}</p>
            <p className="text-base mb-2">Estado: {lab.Estado}</p>
            <p className="text-base">Ubicación: {lab.Ubi}</p>
          </div>
        ))}
      </div>

      {mostrarModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70">
          <div className="bg-white p-4 rounded shadow-md">
            <Seleccion
              laboratorioSeleccionado={laboratorioSeleccionado.nombre}
              horario={laboratorioSeleccionado.horario}
            />
            <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600" onClick={cerrarModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Laboratorios;
