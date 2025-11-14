import React from 'react';
import { Link } from 'react-router-dom';

// Barra de navegación principal.
// Muestra opciones según si hay usuario autenticado y su rol.
export default function Navbar({ currentUser, onLogout }) {
  return (
    <header className="navbar">
      <div className="navbar-title">CleanSuite</div>
      <nav className="navbar-links">
        {currentUser ? (
          <>
            <Link to="/home">Inicio</Link>
            <Link to="/bandeja">Bandeja de tareas</Link>
            {currentUser.rol === 'ADMIN' && <Link to="/asignar">Asignar tareas</Link>}
            <button className="secondary" onClick={onLogout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link to="/login">Iniciar sesión</Link>
        )}
      </nav>
    </header>
  );
}
