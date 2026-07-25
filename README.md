# danielmatalone.dev

Portfolio profesional de **Daniel Luciano Matalone** — Full Stack Developer · Buenos Aires, AR

## Stack

- **Frontend:** React 18 + Vite + Tailwind CSS v4
- **Backend:** Node.js + Express
- **Deploy:** Vercel

## Estructura

```
├── client/          # App React (Vite)
│   └── src/
│       ├── components/
│       │   ├── Hero.jsx
│       │   ├── Skills.jsx
│       │   ├── Projects.jsx
│       │   ├── About.jsx
│       │   ├── Contact.jsx
│       │   ├── Nav.jsx
│       │   └── Shared.jsx
│       ├── App.jsx
│       └── api.js
└── server/          # API Node.js + Express
    ├── index.js
    └── data.js      # ← Editar aquí para personalizar contenido
```

## Desarrollo local

```bash
# Instalar dependencias
npm run install:all

# Levantar API + frontend en paralelo
npm run dev
```

- **Frontend:** http://localhost:5173
- **API:** http://localhost:3001

## Personalización

Todos los datos del portfolio se encuentran en [`server/data.js`](server/data.js):
- `personal` — nombre, bio, stats, links
- `skills` — grupos de habilidades
- `projects` — proyectos con stack, links y categorías

## Deploy en Vercel

El proyecto incluye `vercel.json` con rutas configuradas para el API serverless.

## Links

- GitHub: [github.com/Tanofxp](https://github.com/Tanofxp)
- LinkedIn: [linkedin.com/in/daniel-matalone-a09b9214a](https://www.linkedin.com/in/daniel-matalone-a09b9214a/)
