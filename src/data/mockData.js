// Datos simulados para usuarios y tareas.
// En un proyecto real, estos datos se obtendrían desde el backend (API REST).

export const initialUsers = [
  {
    nombreCompleto: 'Administrador CleanSuite',
    documento: '999999',
    password: '999999',
    rol: 'ADMIN',
  },
  {
    nombreCompleto: 'Ana Torres',
    documento: '123456',
    password: '123456',
    rol: 'COLABORADOR',
  },
  {
    nombreCompleto: 'Carlos Pérez',
    documento: '789012',
    password: '789012',
    rol: 'COLABORADOR',
  },
];

export const initialTasks = [
  {
    id: 1,
    responsableDocumento: '123456',
    responsableNombre: 'Ana Torres',
    numeroHabitacion: 101,
    estado: 'PENDIENTE',
    checkOut: false,
    servicio: false,
    servicioCompleto: false,
    observaciones: '',
    tomada: false,
  },
  {
    id: 2,
    responsableDocumento: '123456',
    responsableNombre: 'Ana Torres',
    numeroHabitacion: 102,
    estado: 'EN_CURSO',
    checkOut: false,
    servicio: true,
    servicioCompleto: false,
    observaciones: 'Se inició limpieza básica.',
    tomada: true,
  },
  {
    id: 3,
    responsableDocumento: '789012',
    responsableNombre: 'Carlos Pérez',
    numeroHabitacion: 201,
    estado: 'PENDIENTE',
    checkOut: false,
    servicio: false,
    servicioCompleto: false,
    observaciones: '',
    tomada: false,
  },
];
