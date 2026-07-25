export const portfolioData = {
  personal: {
    name: "Daniel Luciano Matalone",
    role: "Full Stack Developer",
    location: "Buenos Aires, Argentina",
    github: "https://github.com/Tanofxp",
    email: "daniel.matalone@gmail.com",
    linkedin: "https://www.linkedin.com/in/daniel-matalone-a09b9214a/",
    bio: [
      "Soy Daniel Matalone, desarrollador Full Stack con base en Buenos Aires. Me especializo en construir aplicaciones web completas, desde APIs robustas hasta interfaces modernas y responsivas, con foco en soluciones que funcionen en producción y resuelvan problemas reales. Me muevo con comodidad en el ecosistema JavaScript: React, Node.js y TypeScript son parte de mi día a día.",
      "Tengo experiencia en el desarrollo de proyectos web de principio a fin, integrando bases de datos relacionales, construyendo APIs REST y desplegando aplicaciones en la nube. Me interesa el desarrollo orientado a resultados concretos, la calidad del código y las buenas prácticas de arquitectura.",
      "Fuera del trabajo, desarrollo proyectos propios donde experimento con nuevas tecnologías y patrones de diseño. Me interesa trabajar en equipos que valoren el código limpio, la colaboración y el impacto real de lo que se construye."
    ],
    stats: [
      { num: "8+",  label: "Repositorios públicos" },
      { num: "3+",  label: "Años de experiencia" },
      { num: "5+",  label: "Tecnologías dominadas" },
      { num: "4",   label: "Seguidores en GitHub" }
    ]
  },
  skills: [
    { title: "Frontend",         color: "#38c5d9", items: [{ label:"React",hi:true},{ label:"Vite",hi:true},{ label:"TypeScript",hi:true},{ label:"JavaScript",hi:false},{ label:"HTML/CSS",hi:false},{ label:"Tailwind CSS",hi:false}] },
    { title: "Backend",          color: "#3dd68c", items: [{ label:"Node.js",hi:true},{ label:"Express",hi:true},{ label:"REST API",hi:false},{ label:"PHP",hi:false},{ label:"Python",hi:false}] },
    { title: "Bases de datos",   color: "#f7b155", items: [{ label:"MySQL",hi:true},{ label:"PostgreSQL",hi:true},{ label:"MongoDB",hi:false},{ label:"SQLite",hi:false},{ label:"Firebase",hi:false}] },
    { title: "Herramientas",     color: "#4f8ef7", items: [{ label:"Git/GitHub",hi:true},{ label:"Docker",hi:false},{ label:"Vercel",hi:false},{ label:"VS Code",hi:false}] },
    { title: "APIs & Servicios", color: "#f76f6f", items: [{ label:"REST APIs",hi:true},{ label:"JWT",hi:false},{ label:"OAuth",hi:false},{ label:"Firebase",hi:false}] },
    { title: "Soft Skills",      color: "#b07ef7", items: [{ label:"Trabajo en equipo",hi:true},{ label:"Comunicación",hi:false},{ label:"Resolución de problemas",hi:false},{ label:"Autodidacta",hi:false}] }
  ],
  projects: [
    {
      id: 1,
      title: "Portfolio Personal",
      desc: "Portfolio profesional desarrollado con React, Vite y Node.js. Diseño oscuro moderno con animaciones de partículas, terminal interactiva y secciones de proyectos, habilidades y contacto.",
      type: "Full Stack",
      category: "personal",
      stack: ["React","Vite","Node.js","Express","Tailwind CSS"],
      color: "#4f8ef7",
      github: "https://github.com/Tanofxp/danielmatalone.dev"
    },
    {
      id: 2,
      title: "Proyecto Web Frontend",
      desc: "Aplicación web desarrollada con tecnologías modernas de frontend. Interfaz responsiva con componentes reutilizables y buenas prácticas de desarrollo.",
      type: "Frontend",
      category: "personal",
      stack: ["React","JavaScript","HTML","CSS"],
      color: "#38c5d9",
      github: "https://github.com/Tanofxp"
    },
    {
      id: 3,
      title: "API REST Backend",
      desc: "API RESTful desarrollada con Node.js y Express. Endpoints para gestión de recursos, autenticación JWT y documentación de endpoints.",
      type: "Backend",
      category: "personal",
      stack: ["Node.js","Express","JWT","MySQL"],
      color: "#3dd68c",
      github: "https://github.com/Tanofxp"
    },
    {
      id: 4,
      title: "Aplicación Full Stack",
      desc: "Aplicación web completa con frontend en React y backend en Node.js. Integración con base de datos, manejo de estados y flujos de autenticación.",
      type: "Full Stack",
      category: "personal",
      stack: ["React","Node.js","Express","MySQL","Tailwind CSS"],
      color: "#b07ef7",
      github: "https://github.com/Tanofxp"
    },
    {
      id: 5,
      title: "Proyecto TypeScript",
      desc: "Aplicación desarrollada en TypeScript con tipado estricto, patrones de diseño y arquitectura escalable. Orientado a buenas prácticas y mantenibilidad.",
      type: "Backend",
      category: "personal",
      stack: ["TypeScript","Node.js","Express"],
      color: "#f7b155",
      github: "https://github.com/Tanofxp"
    }
  ]
}
