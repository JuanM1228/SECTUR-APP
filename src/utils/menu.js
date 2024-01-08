export const NAVIGATION_CONFIG = [
  {
    key: 'consulta',
    path: null,
    title: 'CONSULTA',
    icon: 'Search',
    authority: [],
    subMenu: [
      {
        key: 'consultaCertificados',
        path: '/home',
        title: 'Consulta Certificados',
        icon: null,
        authority: [],
        subMenu: [],
      },
    ],
  },
  {
    key: 'tramites',
    path: null,
    title: 'TRÁMITES',
    icon: 'Assignment',
    authority: [],
    subMenu: [
      {
        key: 'nuevaSolicitud',
        path: '/home/tramites/solicitudes/null',
        title: 'Nueva solicitud',
        icon: null,
        authority: [],
        subMenu: [],
      },
      {
        key: 'solicitudes',
        path: '/home/tramites',
        title: 'Solicitudes',
        icon: null,
        authority: [],
        subMenu: [],
      },
    ],
  },
  {
    key: 'reportes',
    path: null,
    title: 'REPORTES',
    icon: 'BarChart',
    authority: [],
    subMenu: [
      {
        key: 'prestadoresDeServicio',
        path: '/home/reportes',
        title: 'Prestadores de servicio',
        icon: null,
        authority: [],
        subMenu: [],
      },
      {
        key: 'reportesGraficos',
        path: '/home/reportesGraficos',
        title: 'Gráficos',
        icon: null,
        authority: [],
        subMenu: [],
      },
    ],
  },
  {
    key: 'settings',
    path: null,
    title: 'CONFIGURACIONES',
    icon: 'Settings',
    authority: [],
    subMenu: [
      {
        key: 'edicionDeCatalogos',
        path: '/home/catalogos',
        title: 'Edición de catálogos',
        icon: null,
        authority: [],
        subMenu: [],
      },
      {
        key: 'configuration',
        path: '/home/configuration',
        title: 'Apariencia y configuraciones',
        icon: null,
        authority: [],
        subMenu: [],
      },
      {
        key: 'usuarios',
        path: '/home/usuarios',
        title: 'Usuarios',
        icon: null,
        authority: [],
        subMenu: [],
      },
    ],
  },
]
