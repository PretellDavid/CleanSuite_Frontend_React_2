import React, { useState } from 'react';

// Página del módulo "Asignar tareas".
// Solo debería ser accesible para usuarios con rol ADMIN.
export default function AssignTasksPage({ onAssign }) {
  const [documentoColaborador, setDocumentoColaborador] = useState('');
  const [nombreColaborador, setNombreColaborador] = useState('');
  const [cantidadHabitaciones, setCantidadHabitaciones] = useState('');
  const [listaHabitaciones, setListaHabitaciones] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('success');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !documentoColaborador.trim() ||
      !nombreColaborador.trim() ||
      !cantidadHabitaciones.trim() ||
      !listaHabitaciones.trim()
    ) {
      setMessageType('error');
      setMessage('Todos los campos son obligatorios para asignar tareas.');
      return;
    }

    const cantidad = Number(cantidadHabitaciones);
    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      setMessageType('error');
      setMessage('La cantidad de habitaciones debe ser un número entero positivo.');
      return;
    }

    const parts = listaHabitaciones.split(',').map((p) => p.trim()).filter(Boolean);
    if (parts.length !== cantidad) {
      setMessageType('error');
      setMessage(
        'El número de habitaciones listadas no coincide con la cantidad ingresada.'
      );
      return;
    }

    const habitaciones = [];
    for (const p of parts) {
      const n = Number(p);
      if (!Number.isInteger(n) || n <= 0) {
        setMessageType('error');
        setMessage(
          `El valor de habitación "${p}" no es un número de habitación válido.`
        );
        return;
      }
      habitaciones.push(n);
    }

    onAssign(documentoColaborador.trim(), nombreColaborador.trim(), habitaciones);
    setMessageType('success');
    setMessage(
      `Se asignaron ${habitaciones.length} tareas al colaborador ${nombreColaborador} (${documentoColaborador}).`
    );

    // Limpiar campos
    setDocumentoColaborador('');
    setNombreColaborador('');
    setCantidadHabitaciones('');
    setListaHabitaciones('');
  };

  return (
    <section className="card">
      <h1>Asignar tareas</h1>

      {message && (
        <div className={`alert ${messageType === 'error' ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Documento del colaborador</label>
          <input
            type="text"
            value={documentoColaborador}
            onChange={(e) => setDocumentoColaborador(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Nombre del colaborador</label>
          <input
            type="text"
            value={nombreColaborador}
            onChange={(e) => setNombreColaborador(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Número de habitaciones a asignar</label>
          <input
            type="number"
            min="1"
            value={cantidadHabitaciones}
            onChange={(e) => setCantidadHabitaciones(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Números de habitación (separados por comas)</label>
          <textarea
            rows="3"
            value={listaHabitaciones}
            onChange={(e) => setListaHabitaciones(e.target.value)}
            placeholder="Ejemplo: 101, 102, 103"
          />
        </div>

        <button type="submit">Asignar tareas</button>
      </form>
    </section>
  );
}
