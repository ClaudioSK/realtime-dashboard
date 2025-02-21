# Panel de Control en Tiempo Real

Un panel de control que muestra diversas métricas y estadísticas usando gráficos interactivos.

## Tecnologías Utilizadas

### Frontend
- **Next.js 15** - Framework de React para producción
- **React 19** - Biblioteca de JavaScript para construir interfaces de usuario
- **Chart.js & React-ChartJS-2** - Para crear gráficos interactivos
- **TailwindCSS** - Para estilos y diseño responsivo
- **Socket.IO Client** - Para comunicación cliente-servidor en tiempo real
- **TypeScript** - Para seguridad de tipos y mejor experiencia de desarrollo

### Backend
- **Express** - Framework web para Node.js
- **Socket.IO** - Para comunicación bidireccional en tiempo real
- **TypeScript** - Para desarrollo del servidor con tipos seguros

## Estructura del Proyecto
```
realtime-dashboard/
├── src/
│   ├── app/                    # Directorio de Next.js
│   │   ├── page.tsx           # Página principal del panel
│   │   ├── layout.tsx         # Diseño raíz
│   │   └── globals.css        # Estilos globales
│   ├── components/            # Componentes React
│   │   ├── BarChart.tsx      # Componente de gráfico de barras
│   │   ├── LineChart.tsx     # Componente de gráfico de líneas
│   │   ├── DoughnutChart.tsx # Componente de gráfico circular
│   │   └── ...               # Otros componentes de gráficos
│   └── types/                 # Definiciones de tipos TypeScript
├── server.ts                  # Servidor Socket.IO
├── tailwind.config.ts        # Configuración de Tailwind CSS
└── package.json              # Dependencias del proyecto

```
## Características

- Actualizaciones de datos en tiempo real usando Socket.IO
- Múltiples tipos de gráficos:
  - Gráficos de líneas para análisis de tendencias
  - Gráficos de barras para datos comparativos
  - Gráficos circulares para distribución
  - Gráficos de dispersión para correlaciones
  - Diagramas de caja para análisis estadístico
  - Gráficos de Pareto para análisis de importancia
  - Gráficos polares para datos cíclicos
  - Gráficos de radar para datos multivariables
  - Gráficos de burbujas para datos tridimensionales
- Diseño responsivo que funciona en escritorio y móvil
- Soporte para modo oscuro/claro
- Controles interactivos de gráficos

## Ejecutar el Proyecto

1. Iniciar el servidor Socket.IO:

npm run server

2. En otra terminal, iniciar el servidor de desarrollo de Next.js:

npm run dev

El panel estará disponible en http://localhost:3000

Esta documentación proporciona una visión clara de la pila tecnológica, estructura y características de tu proyecto. ¡Puedes modificarla o expandirla según tus necesidades!