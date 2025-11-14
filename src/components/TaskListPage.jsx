import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

// Página de "Bandeja de tareas".
// Muestra la tabla con las tareas asignadas al usuario autenticado
// y permite filtrarlas por ID o nombre del responsable.
export default function TaskListPage({ currentUser, tasks }) {
  const [filtro, setFiltro] = useState('');

  // Filtrado de tareas según el documento del usuario y el texto del filtro.
  const tareasFiltradas = useMemo(() => {
    const propias = tasks.filter(
      (t) => t.responsableDocumento === currentUser.documento
    );
    if (!filtro.trim()) return propias;

    const f = filtro.trim().toLowerCase();
    return propias.filter((t) => {
      if (String(t.id) === f) return true;
      return t.responsableNombre.toLowerCase().includes(f);
    });
  }, [tasks, currentUser, filtro]);

  const renderBadge = (estado) => {
    switch (estado) {
      case 'PENDIENTE':
        return <span className="badge pendiente">Pendiente</span>;
      case 'EN_CURSO':
        return <span className="badge en-curso">En curso</span>;
      case 'FINALIZADO':
        return <span className="badge finalizado">Finalizado</span>;
      case 'NO_MOLESTAR':
        return <span className="badge no-molestar">No molestar</span>;
      case 'NO_REQUIERE_SERVICIO':
        return (
          <span className="badge no-requiere">Servicio no requerido</span>
        );
      default:
        return <span className="badge">{estado}</span>;
    }
  };

  return (
    <>
      <div className="page-header">
        <h1>Bandeja de tareas</h1>
      </div>

      <div className="card" style={{ maxWidth: '900px' }}>
        <h3>Buscar tareas</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="form-group">
            <label>Buscar por ID de tarea o nombre del responsable</label>
            <input
              type="text"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              placeholder="Ej: 1 o Ana"
            />
          </div>
        </form>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Responsable</th>
              <th>Número de habitación</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {tareasFiltradas.length === 0 ? (
              <tr>
                <td colSpan="5">No hay tareas para mostrar.</td>
              </tr>
            ) : (
              tareasFiltradas.map((t) => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.responsableNombre}</td>
                  <td>{t.numeroHabitacion}</td>
                  <td>{renderBadge(t.estado)}</td>
                  <td>
                    <Link className="link" to={`/tarea/${t.id}`}>
                      {t.tomada ? 'Editar tarea' : 'Tomar tarea'}
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
