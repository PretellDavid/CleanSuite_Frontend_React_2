import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import TaskListPage from './components/TaskListPage';
import TaskDetailPage from './components/TaskDetailPage';
import AssignTasksPage from './components/AssignTasksPage';
import { initialTasks, initialUsers } from './data/mockData';

// Componente principal de la aplicación.
// Aquí manejamos el estado global simple (usuario y tareas)
// y definimos las rutas de navegación usando React Router.
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState(initialTasks);
  const [users] = useState(initialUsers);

  const navigate = useNavigate();

  // Función para iniciar sesión simulando la lógica del backend.
  const handleLogin = (documento, password) => {
    const user = users.find(
      (u) => u.documento === documento && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      navigate('/home');
      return { ok: true };
    }
    return { ok: false, message: 'Documento o contraseña incorrectos.' };
  };

  // Función para registrar un nuevo usuario (rol COLABORADOR por defecto).
  const handleRegister = (nombreCompleto, documento, password) => {
    const exists = users.find((u) => u.documento === documento);
    if (exists) {
      return { ok: false, message: 'Ya existe un usuario con ese documento.' };
    }
    if (password !== documento) {
      return { ok: false, message: 'La contraseña debe ser igual al documento.' };
    }
    const newUser = {
      nombreCompleto,
      documento,
      password,
      rol: 'COLABORADOR',
    };
    users.push(newUser);
    return { ok: true, message: 'Registro exitoso. Ya puede iniciar sesión.' };
  };

  // Función para cerrar sesión.
  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/login');
  };

  // Función para actualizar una tarea (se usa en el detalle).
  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  };

  // Función para asignar nuevas tareas desde el módulo de asignación.
  const assignTasks = (documentoColaborador, nombreColaborador, habitaciones) => {
    setTasks((prev) => {
      const nextId = prev.length > 0 ? Math.max(...prev.map((t) => t.id)) + 1 : 1;
      const nuevas = habitaciones.map((numHab, index) => ({
        id: nextId + index,
        responsableDocumento: documentoColaborador,
        responsableNombre: nombreColaborador,
        numeroHabitacion: numHab,
        estado: 'PENDIENTE',
        checkOut: false,
        servicio: false,
        servicioCompleto: false,
        observaciones: '',
        tomada: false,
      }));
      return [...prev, ...nuevas];
    });
  };

  return (
    <div className="app-container">
      <Navbar currentUser={currentUser} onLogout={handleLogout} />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              currentUser ? (
                <Navigate to="/home" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage onLogin={handleLogin} onRegister={handleRegister} />
            }
          />
          <Route
            path="/home"
            element={
              currentUser ? (
                <HomePage currentUser={currentUser} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/bandeja"
            element={
              currentUser ? (
                <TaskListPage currentUser={currentUser} tasks={tasks} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/tarea/:id"
            element={
              currentUser ? (
                <TaskDetailPage
                  currentUser={currentUser}
                  tasks={tasks}
                  onUpdateTask={updateTask}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/asignar"
            element={
              currentUser && currentUser.rol === 'ADMIN' ? (
                <AssignTasksPage onAssign={assignTasks} />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />
        </Routes>
      </main>
    </div>
  );
}
