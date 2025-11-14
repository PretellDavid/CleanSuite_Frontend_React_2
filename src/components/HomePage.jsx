import React from 'react';
import { Link } from 'react-router-dom';

// Pantalla de inicio después de iniciar sesión.
// Muestra información básica del usuario y accesos rápidos a otros módulos.
export default function HomePage({ currentUser }) {
  return (
    <section className="card">
      <h1>Bienvenido(a), {currentUser.nombreCompleto}</h1>
      <p><strong>Documento:</strong> {currentUser.documento}</p>
      <p><strong>Rol:</strong> {currentUser.rol}</p>

      <h3>Accesos rápidos</h3>
      <ul>
        <li>
          <Link className="link" to="/bandeja">
            Ir a bandeja de tareas
          </Link>
        </li>
        {currentUser.rol === 'ADMIN' && (
          <li>
            <Link className="link" to="/asignar">
              Asignar tareas
            </Link>
          </li>
        )}
      </ul>
    </section>
  );
}
