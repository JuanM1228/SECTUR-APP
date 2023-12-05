import {
  Search,
  Assignment,
  BarChart,
  FormatListBulleted,
} from '@mui/icons-material'

export const NAVIGATION_CONFIG = [
  {
    key: 'consulta',
    path: null,
    title: 'CONSULTA',
    icon: <Search />,
    authority: [],
    subMenu: [
      {
        key: 'tramitesEnProceso',
        path: null,
        title: 'Trámites en proceso',
        icon: null,
        authority: [],
        subMenu: [],
      },
      {
        key: 'prestadoresDeServicio',
        path: null,
        title: 'Presadores de servicio',
        icon: null,
        authority: [],
        subMenu: [],
      },
      {
        key: 'controlDeCertificados',
        path: null,
        title: 'Control de certificados',
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
    icon: <Assignment />,
    authority: [],
    subMenu: [
      {
        key: 'solicitudes',
        path: '/home/tramites/solicitudes',
        title: 'Solicitudes',
        icon: null,
        authority: [],
        subMenu: [],
      },
      {
        key: 'tramitesSub',
        path: null,
        title: 'Trámites',
        icon: null,
        authority: [],
        subMenu: [],
      },
      {
        key: 'tramitesDeEstado',
        path: null,
        title: 'Trámites de Estado',
        icon: null,
        authority: [],
        subMenu: [],
      },
      {
        key: 'certificados',
        path: null,
        title: 'Certificados',
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
    icon: <BarChart />,
    authority: [],
    subMenu: [
      {
        key: 'prestadoresDeServicio',
        path: null,
        title: 'Prestadores de servicio registrados',
        icon: null,
        authority: [],
        subMenu: [],
      },
      {
        key: 'reportePST',
        path: null,
        title: 'Reporte PST',
        icon: null,
        authority: [],
        subMenu: [],
      },
      {
        key: 'ofertaTuristica',
        path: null,
        title: 'Oferta Turistica',
        icon: null,
        authority: [],
        subMenu: [
          {
            key: 'estadoMunicipio',
            path: null,
            title: 'Estado y Municipio',
            icon: null,
            authority: [],
            subMenu: [],
          },
          {
            key: 'general',
            path: null,
            title: 'General',
            icon: null,
            authority: [],
            subMenu: [],
          },
          {
            key: 'tipoPST',
            path: null,
            title: 'Tipo PST',
            icon: null,
            authority: [],
            subMenu: [],
          },
        ],
      },
      {
        key: 'financiero',
        path: null,
        title: 'Financiero',
        icon: null,
        authority: [],
        subMenu: [],
      },
      {
        key: 'tipoDeTramite',
        path: null,
        title: 'Tipo de Tramite',
        icon: null,
        authority: [],
        subMenu: [],
      },
      {
        key: 'historicoDeTramites',
        path: null,
        title: 'Historico de Trámites',
        icon: null,
        authority: [],
        subMenu: [],
      },
    ],
  },
  {
    key: 'catalogos',
    path: null,
    title: 'CATÁLOGOS',
    icon: <FormatListBulleted />,
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
        key: 'parametrizacion',
        path: null,
        title: 'Parametrización',
        icon: null,
        authority: [],
        subMenu: [],
      },
      {
        key: 'usuarios',
        path: null,
        title: 'Usuarios',
        icon: null,
        authority: [],
        subMenu: [],
      },
      {
        key: 'temas',
        path: null,
        title: 'Temas',
        icon: null,
        authority: [],
        subMenu: [],
      },
    ],
  },
]
