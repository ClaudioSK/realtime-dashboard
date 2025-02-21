# **Panel de Control en Tiempo Real**

Un panel de control interactivo que muestra métricas y estadísticas en tiempo real mediante gráficos dinámicos.

## **🛠 Tecnologías Utilizadas**

### **Frontend**  
- 🚀 **Next.js 15** – Framework de React para aplicaciones de producción  
- ⚛️ **React 19** – Biblioteca de JavaScript para construir interfaces de usuario  
- 📊 **Chart.js & React-ChartJS-2** – Para crear gráficos interactivos  
- 🎨 **TailwindCSS** – Para estilos y diseño responsivo  
- 🔌 **Socket.IO Client** – Para comunicación cliente-servidor en tiempo real  
- 🏢 **TypeScript** – Para tipado estático y mejor experiencia de desarrollo  

### **Backend**  
- 🌎 **Express** – Framework web ligero para Node.js  
- 🔄 **Socket.IO** – Para comunicación bidireccional en tiempo real  
- 🔒 **TypeScript** – Para mejorar seguridad y mantenibilidad del código  

---

## **📂 Estructura del Proyecto**  
```
realtime-dashboard/
├── src/
│   ├── app/                    # Aplicación Next.js
│   │   ├── page.tsx            # Página principal del panel
│   │   ├── layout.tsx          # Diseño global
│   │   └── globals.css         # Estilos globales
│   ├── components/             # Componentes reutilizables
│   │   ├── BarChart.tsx        # Gráfico de barras
│   │   ├── LineChart.tsx       # Gráfico de líneas
│   │   ├── DoughnutChart.tsx   # Gráfico circular
│   │   └── ...                 # Otros componentes de gráficos
│   └── types/                  # Definiciones de tipos TypeScript
├── server.ts                   # Servidor de Socket.IO con Express
├── tailwind.config.ts           # Configuración de Tailwind CSS
└── package.json                 # Dependencias del proyecto
```

---

## **✨ Características Principales**  

✅ **Actualización de datos en tiempo real** usando **Socket.IO**  
✅ **Diversidad de gráficos** para diferentes tipos de datos:  
   - 📈 **Líneas** – Análisis de tendencias  
   - 📊 **Barras** – Comparaciones  
   - 🥧 **Circulares** – Distribución  
   - ⚫ **Dispersión** – Correlaciones  
   - 📦 **Diagramas de caja** – Análisis estadístico  
   - 🔵 **Burbujas** – Datos tridimensionales  
   - 🌐 **Polares** – Datos cíclicos  
   - 🎯 **Radar** – Datos multivariables  
   - 📉 **Pareto** – Análisis de importancia  

✅ **Interfaz responsiva**, compatible con escritorio y móvil  
✅ **Modo oscuro/claro**  
✅ **Controles interactivos** para explorar los gráficos  

---

## **🚀 Instalación y Ejecución**  

### **1️⃣ Clonar el repositorio**  
```bash
git clone https://github.com/tu_usuario/realtime-dashboard.git
cd realtime-dashboard
```

### **2️⃣ Instalar dependencias**  
```bash
npm install
```

### **3️⃣ Iniciar el servidor de Socket.IO**  
```bash
npm run server
```

### **4️⃣ En otra terminal, iniciar el servidor de desarrollo de Next.js**  
```bash
npm run dev
```

📌 **El panel estará disponible en:** [http://localhost:3000](http://localhost:3000)  

---

