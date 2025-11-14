import React, { useState } from 'react';

// Pantalla de inicio de sesión y registro.
// Replica la lógica de los módulos de "Inicio de sesión" del proyecto original.
export default function LoginPage({ onLogin, onRegister }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [documento, setDocumento] = useState('');
  const [password, setPassword] = useState('');
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('success');

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const result = onLogin(documento.trim(), password.trim());
    if (!result.ok) {
      setMessageType('error');
      setMessage(result.message);
    } else {
      setMessage(null);
    }
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    const result = onRegister(nombreCompleto.trim(), documento.trim(), password.trim());
    setMessageType(result.ok ? 'success' : 'error');
    setMessage(result.message);
    if (result.ok) {
      // Limpia campos y cambia a modo login
      setIsRegisterMode(false);
      setNombreCompleto('');
      setDocumento('');
      setPassword('');
    }
  };

  return (
    <section className="card">
      {isRegisterMode ? (
        <>
          <h1>Registro de usuario</h1>
          {message && (
            <div className={`alert ${messageType === 'error' ? 'error' : 'success'}`}>
              {message}
            </div>
          )}
          <form onSubmit={handleSubmitRegister}>
            <div className="form-group">
              <label>Nombre completo</label>
              <input
                type="text"
                value={nombreCompleto}
                onChange={(e) => setNombreCompleto(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Documento de identidad</label>
              <input
                type="text"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Contraseña (igual al documento)</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Registrar</button>
            <button
              type="button"
              className="secondary"
              onClick={() => {
                setIsRegisterMode(false);
                setMessage(null);
              }}
            >
              Ya tengo usuario
            </button>
          </form>
        </>
      ) : (
        <>
          <h1>Inicio de sesión</h1>
          {message && (
            <div className={`alert ${messageType === 'error' ? 'error' : 'success'}`}>
              {message}
            </div>
          )}
          <form onSubmit={handleSubmitLogin}>
            <div className="form-group">
              <label>Documento (ID)</label>
              <input
                type="text"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Iniciar sesión</button>
            <button
              type="button"
              className="secondary"
              onClick={() => {
                setIsRegisterMode(true);
                setMessage(null);
              }}
            >
              Registrarse
            </button>
          </form>
        </>
      )}
    </section>
  );
}
