#  Sistema Bancario
Una aplicación construida con React, TypeScript y Tailwind CSS.
# url con VerceL : 
https://tecopos-test-rx8f.vercel.app/

## 🚀 Características

- 💳 **Gestión de Cuentas** - Visualiza y administra tus cuentas bancarias
- 💰 **Transacciones** - Realiza depósitos y retiros de forma segura
- 📱 **Diseño Responsive** - Funciona perfecto en desktop y móvil
- 🎨 **Interfaz Moderna** - Diseño limpio y profesional con Tailwind CSS
- ⚡ **Rendimiento Optimizado** - Caché inteligente con React Query
- 🔒 **Tipado Estático** - TypeScript para mayor confiabilidad

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React 18, TypeScript, Tailwind CSS
- **Routing:** React Router DOM
- **Estado del Servidor:** TanStack React Query
- **HTTP Client:** Axios
- **Iconos:** Lucide React
- **Build Tool:** Vite

## 📦 Instalación
```bash
# Clonar el repositorio
https://github.com/nandaAlf/TECOPOS_TEST

# Entrar al directorio
cd TECOPOS_TEST

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

#  Estructura del Proyecto
text
src/
├── components/          # Componentes reutilizables
├── pages/              # Páginas de la aplicación
├── hooks/              # Custom hooks (React Query)
├── services/           # Servicios API   con  https://mockapi.io/
├── types/              # Definiciones TypeScript

#  Funcionalidades Principales
 Páginas
Login - Autenticación de usuarios
Dashboard - Vista general de cuentas
Detalles de Cuenta - Información específica y transacciones
Formulario de Transacciones - Modal para operaciones

# Gestión de Estado
React Query para cache y sincronización de datos
Validaciones en tiempo real en formularios

# Diseño y UX
Skeletons durante la carga de datos
Estados vacíos con mensajes descriptivos
Design System consistente con Tailwind

# API y Datos
La aplicación utiliza MockAPI para simular endpoints REST:
GET /accounts - Obtener listado de cuentas
GET /accounts/:id - Obtener cuenta específica
GET /transactions - Obtener transacciones de una cuenta por id
POST /transactions - Crear nueva transacción en la cuenta



