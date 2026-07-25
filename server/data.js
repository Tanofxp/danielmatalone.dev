export const portfolioData = {
  personal: {
    name: "Daniel Luciano Matalone",
    role: "Full Stack Developer",
    location: "Aveiro, Portugal",
    github: "https://github.com/Tanofxp",
    email: "daniel.matalone@gmail.com",
    linkedin: "https://www.linkedin.com/in/daniel-matalone-a09b9214a/",
    bio: [
      "Soy Daniel Matalone, desarrollador Full Stack con base en Aveiro, Portugal. Me especializo en construir aplicaciones web y móviles completas, desde APIs robustas hasta interfaces modernas y responsivas. Me muevo con comodidad en JavaScript, TypeScript y PHP: React, Node.js, Express y Laravel son parte de mi día a día.",
      "Tengo experiencia profesional desarrollando portales municipales con Laravel y autenticación LDAP, scripts de automatización en Python para entornos IT de retail, APIs REST con Node.js y TypeScript, y aplicaciones móviles con geolocalización. Me interesa el desarrollo orientado a resultados concretos y las buenas prácticas de arquitectura.",
      "Desarrollo proyectos propios donde experimento con nuevas tecnologías y patrones de diseño. Me interesa trabajar en equipos que valoren el código limpio, la colaboración y el impacto real de lo que se construye."
    ],
    stats: [
      { num: "8+", label: "Proyectos desarrollados" },
      { num: "4+", label: "Años de experiencia" },
      { num: "4", label: "Lenguajes principales" },
      { num: "2", label: "Proyectos en producción" }
    ]
  },
  skills: [
    {
      title: "Frontend",
      color: "#38c5d9",
      items: [
        { label: "React", hi: true },
        { label: "TypeScript", hi: true },
        { label: "JavaScript", hi: true },
        { label: "HTML/CSS", hi: false },
        { label: "Vite", hi: false },
        { label: "Tailwind CSS", hi: false }
      ]
    },
    {
      title: "Backend",
      color: "#3dd68c",
      items: [
        { label: "Node.js", hi: true },
        { label: "Express", hi: true },
        { label: "PHP / Laravel", hi: true },
        { label: "TypeScript", hi: false },
        { label: "REST API", hi: false },
        { label: "JWT / LDAP", hi: false }
      ]
    },
    {
      title: "Python & Data",
      color: "#f7b155",
      items: [
        { label: "Python", hi: true },
        { label: "pandas", hi: true },
        { label: "Automatización", hi: true },
        { label: "REST APIs", hi: false },
        { label: "CSV / Excel", hi: false },
        { label: "requests", hi: false }
      ]
    },
    {
      title: "Bases de datos",
      color: "#b07ef7",
      items: [
        { label: "MySQL", hi: true },
        { label: "PostgreSQL", hi: false },
        { label: "MongoDB", hi: false },
        { label: "SQLite", hi: false }
      ]
    },
    {
      title: "Mobile & Mapas",
      color: "#f76f6f",
      items: [
        { label: "React Native", hi: true },
        { label: "Geolocalización", hi: true },
        { label: "Google Maps", hi: false },
        { label: "Cámara / GPS", hi: false }
      ]
    },
    {
      title: "DevOps & Tooling",
      color: "#4f8ef7",
      items: [
        { label: "Git / GitHub", hi: true },
        { label: "Vercel", hi: true },
        { label: "Docker", hi: false },
        { label: "VS Code", hi: false }
      ]
    }
  ],
  projects: [
    {
      id: 1,
      title: "Portal del Contribuyente",
      desc: "Portal de pagos municipales desarrollado en Laravel 5.8 con PHP. Incluye autenticación LDAP corporativa, dashboard de tasas, configuración de débito automático y gestión de perfil de usuario.",
      type: "Full Stack",
      category: "professional",
      stack: ["PHP", "Laravel", "LDAP", "MySQL", "Blade", "Bootstrap"],
      color: "#3dd68c",
      highlights: [
        "Autenticación LDAP integrada con adldap2-laravel para usuarios corporativos",
        "Sistema de débito automático con soporte multi-banco",
        "Panel de gestión de perfil y cambio de contraseña",
        "Arquitectura MVC con Form Requests y validaciones robustas"
      ]
    },
    {
      id: 2,
      title: "API Vusion — Extracción de IPs",
      desc: "Script Python que se conecta a la API de Vusion  para extraer automáticamente los Access Points y sus IPs de tiendas retail, generando reportes en CSV/Excel.",
      type: "Backend",
      category: "professional",
      stack: ["Python", "requests", "pandas", "REST API", "CSV", "Excel"],
      color: "#f7b155",
      highlights: [
        "Integración con API V:Cloud para obtener storeIds de cadenas retail",
        "Consulta masiva a Vusion Manager Pro por tienda",
        "Exportación a CSV con retailChainId, storeId, AP name, IP y versión",
        "Soporte para múltiples cadenas retail y modo --all-retail-chains"
      ]
    },
    {
      id: 3,
      title: "Suite de Scripts IT",
      desc: "Conjunto de scripts Python para automatización de tareas IT en entorno retail: procesamiento de incidentes CSV, extracción de IPs de tiendas, parseo de correos EML y exportación a Excel.",
      type: "Backend",
      category: "professional",
      stack: ["Python", "pandas", "openpyxl", "ipaddress", "email"],
      color: "#b07ef7",
      highlights: [
        "Procesador de incidentes CSV con soporte multi-encoding (UTF-8, Latin-1, CP1252)",
        "Extractor de IPs por tienda desde archivos Excel",
        "Parser de correos EML a Excel con pandas",
        "Conversor de JSON a CSV/Excel y utilidades de automatización"
      ]
    },
    {
      id: 4,
      title: "danielmatalone.dev",
      desc: "Portfolio profesional de nueva generación. Diseño oscuro con partículas interactivas, terminal animada, secciones de proyectos, habilidades y contacto. Desplegado en Vercel.",
      type: "Full Stack",
      category: "personal",
      stack: ["React", "Vite", "Node.js", "Express", "Tailwind CSS"],
      color: "#4f8ef7",
      github: "https://github.com/Tanofxp/danielmatalone.dev"
    },
    {
      id: 5,
      title: "API-Node",
      desc: "API REST construida con Node.js, Express y TypeScript. Implementa autenticación JWT completa y operaciones CRUD. Arquitectura limpia con tipado estricto.",
      type: "Backend",
      category: "personal",
      stack: ["TypeScript", "Node.js", "Express", "JWT"],
      color: "#3dd68c",
      github: "https://github.com/Tanofxp/API-Node"
    },
    {
      id: 6,
      title: "btn-mobile",
      desc: "Backend API para gestión de alertas de emergencia. Incluye autenticación, servicios de notificaciones y renderizado de vistas con EJS.",
      type: "Backend",
      category: "personal",
      stack: ["Node.js", "JavaScript", "Express", "EJS", "JWT"],
      color: "#f76f6f",
      github: "https://github.com/Tanofxp/btn-mobile"
    },
    {
      id: 7,
      title: "Foto_Map",
      desc: "Aplicación móvil para recolección de fotos geolocalizadas y gestión de direcciones. Combina cámara, GPS y mapas para registrar puntos de interés.",
      type: "Full Stack",
      category: "personal",
      stack: ["JavaScript", "React Native", "Geolocalización", "Google Maps"],
      color: "#b07ef7",
      github: "https://github.com/Tanofxp/Foto_Map"
    },
    {
      id: 8,
      title: "web-scn",
      desc: "Sitio web corporativo desarrollado para una empresa de soluciones tecnológicas. Diseño profesional, responsivo y optimizado.",
      type: "Frontend",
      category: "personal",
      stack: ["JavaScript", "HTML", "CSS"],
      color: "#f7b155",
      github: "https://github.com/Tanofxp/web-scn"
    },
    {
      "id": 9,
      "title": "Presupuesto Participativo",
      "desc": "Plataforma de votación online para vecinos de Morón: inscripción, proyectos por categoría, votos y panel de admin con resultados en tiempo real.",
      "type": "Full Stack",
      "category": "professional",
      "stack": [
        "Node.js",
        "Express",
        "SQL Server",
        "EJS",
        "Docker"
      ],
      "color": "#4f8ef7"
    },
    {
      "id": 10,
      "title": "API Facturador Municipal",
      "desc": "Microservicio Lumen para emisión y consulta de facturas municipales por número, sistema, clave o CUIT.",
      "type": "API",
      "category": "professional",
      "stack": [
        "Lumen",
        "PHP",
        "SQL Server",
        "MySQL",
        "REST API"
      ],
      "color": "#f7b155"
    },
    {
      "id": 11,
      "title": "Portal de Tasas",
      "desc": "Plataforma para consulta de deuda y generación de boletas para pago mediante Pago Fácil o Rapipago, o pago online por MercadoPago, Provincia.Net o Epagos de todas las tasas del municipio. Doble autenticación: empleados y ciudadanos.",
      "type": "Full Stack",
      "category": "professional",
      "stack": [
        "Laravel",
        "Blade",
        "SQL Server",
        "Provincia.Net",
        "Mercado Pago",
        "Epagos"
      ],
      "color": "#3dd68c",
      "live": "https://apps.moron.gob.ar/portal_tasas"
    },
    {
      "id": 4,
      "title": "Portal de Proveedores",
      "desc": "Autogestión de proveedores municipales: alta, validación CUIT, actualización de email con token, adjuntos y consulta de pagos.",
      "type": "Full Stack",
      "category": "professional",
      "stack": [
        "Laravel",
        "PHP",
        "SQL Server",
        "MySQL",
        "Token Email"
      ],
      "color": "#38c5d9"
    },
    {
      "id": 5,
      "title": "Sistema de Permisos (Alfa)",
      "desc": "Administración de usuarios y permisos granulares para todas las apps municipales. Auth LDAP corporativo y reportes JasperReports.",
      "type": "Backend",
      "category": "professional",
      "stack": [
        "Laravel",
        "LDAP",
        "SQL Server",
        "JasperReports"
      ],
      "color": "#b07ef7"
    },
    {
      "id": 1,
      "title": "API Gateway Municipal",
      "desc": "API REST Laravel que centraliza expedientes, personas, RRHH y GIS con autenticación dual LDAP + JWT.",
      "type": "Microservicios",
      "category": "professional",
      "stack": [
        "Laravel",
        "PHP",
        "JWT",
        "LDAP",
        "SQL Server",
        "MySQL"
      ],
      "color": "#f76f6f"
    },
  ]
}
