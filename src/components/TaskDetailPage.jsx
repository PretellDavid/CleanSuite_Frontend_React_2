import React, { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

// Página de "Gestión de tarea".
// Permite diligenciar el checklist, cambiar el estado y guardar la tarea.
export default function TaskDetailPage({ currentUser, tasks, onUpdateTask }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const tarea = useMemo(
    () => tasks.find((t) => t.id === Number(id)),
    [tasks, id]
  );

  const [checkOut, setCheckOut] = useState(tarea?.checkOut ?? false);
  const [servicio, setServicio] = useState(tarea?.servicio ?? false);
  const [servicioCompleto, setServicioCompleto] = useState(
    tarea?.servicioCompleto ?? false
  );
  const [estado, setEstado] = useState(tarea?.estado ?? '');
  const [observaciones, setObservaciones] = useState(
    tarea?.observaciones ?? ''
  );
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('success');

  if (!tarea || tarea.responsableDocumento !== currentUser.documento) {
    return (
      <section className="card">
        <p>No se encontró la tarea o no pertenece al usuario actual.</p>
        <p>
          <Link className="link" to="/bandeja">
            Volver a la bandeja
          </Link>
        </p>
      </section>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!estado) {
      setMessageType('error');
      setMessage('Debe seleccionar un estado para la tarea.');
      return;
    }

    if (estado === 'FINALIZADO') {
      if (!checkOut && !servicio && !servicioCompleto) {
        setMessageType('error');
        setMessage(
          'Para finalizar la tarea debe marcar al menos una acción realizada (check out / servicio / servicio completo).'
        );
        return;
      }
      if (!observaciones.trim()) {
        setMessageType('error');
        setMessage('Para finalizar la tarea debe ingresar observaciones.');
        return;
      }
    }

    const updatedTask = {
      ...tarea,
      checkOut,
      servicio,
      servicioCompleto,
      estado,
      observaciones,
      tomada: true,
    };

    onUpdateTask(updatedTask);
    setMessageType('success');
    setMessage('Tarea guardada correctamente.');

    // Podríamos redirigir de vuelta a la bandeja si lo prefieres:
    // navigate('/bandeja');
  };

  return (
    <section className="card" style={{ maxWidth: '700px' }}>
      <h1>Gestión de tarea</h1>

      <p>
        <strong>ID:</strong> {tarea.id}
      </p>
      <p>
        <strong>Responsable:</strong> {tarea.responsableNombre} (
        {tarea.responsableDocumento})
      </p>
      <p>
        <strong>Habitación:</strong> {tarea.numeroHabitacion}
      </p>

      {message && (
        <div className={`alert ${messageType === 'error' ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <h3>Checklist</h3>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={checkOut}
              onChange={(e) => setCheckOut(e.target.checked)}
            />{' '}
            Check out
          </label>
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={servicio}
              onChange={(e) => setServicio(e.target.checked)}
            />{' '}
            Servicio
          </label>
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={servicioCompleto}
              onChange={(e) => setServicioCompleto(e.target.checked)}
            />{' '}
            Servicio completo
          </label>
        </div>

        <h3>Estado de la tarea</h3>
        <div className="form-group">
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
          >
            <option value="">-- Seleccione --</option>
            <option value="PENDIENTE">Pendiente</option>
            <option value="EN_CURSO">En curso</option>
            <option value="FINALIZADO">Finalizado</option>
            <option value="NO_MOLESTAR">No molestar</option>
            <option value="NO_REQUIERE_SERVICIO">Servicio no requerido</option>
          </select>
        </div>

        <h3>Observaciones</h3>
        <div className="form-group">
          <textarea
            rows="4"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
          />
        </div>

        <button type="submit">Guardar tarea</button>
        <button
          type="button"
          className="secondary"
          onClick={() => navigate('/bandeja')}
        >
          Volver a la bandeja
        </button>
      </form>
    </section>
  );
}
