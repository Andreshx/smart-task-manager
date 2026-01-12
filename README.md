# 🧠 Smart Task Manager

Aplicación Full Stack para gestión de tareas desarrollada con **React**, **Node.js**, **Express** y **SQLite**, completamente dockerizada usando **Docker Compose**.

Permite crear, editar, eliminar y marcar tareas como completadas, con una interfaz moderna y responsiva.

---

## 🚀 Funcionalidades

✅ CRUD completo de tareas  
✅ Edición inline  
✅ Marcar tareas como completadas  
✅ Filtros (Todas / Pendientes / Completadas)  
✅ Orden automático de tareas  
✅ UI moderna y responsiva  
✅ Backend REST API  
✅ Dockerización completa  

---

## 🛠️ Stack Tecnológico

### Frontend
- React + Vite
- JavaScript (ES6+)
- CSS moderno (custom)
- Fetch API

### Backend
- Node.js
- Express
- SQLite
- REST API

### DevOps
- Docker
- Docker Compose

---

## 📦 Instalación Local (sin Docker)

### Requisitos
- Node.js 18+

---

### ⚙️Backend

Desde la raíz del proyecto:

bash
npm install
node src/app.js

### Servidor disponible en:
http://localhost:3000

### 🌐 Frontend
cd frontend
npm install
npm run dev
Aplicación disponible en:
http://localhost:5173

### 🐳 Ejecutar con Docker

Requisitos

Docker Desktop instalado

Desde la raíz del proyecto:

docker compose up --build

### Frontend: 
http://localhost:5173

### Backend (health check):
http://localhost:3000/health

## Para detener los contenedores:
docker compose down 

### 🏗️ Arquitectura

<img src="screnshots/arquitectura.png" width="400"/>


## ☁️ Arquitectura Cloud

Este proyecto está diseñado para ser desplegado en AWS siguiendo buenas prácticas de seguridad, escalabilidad y aislamiento de red.

La arquitectura separa claramente las capas públicas y privadas, evitando exposición directa de los servicios internos y permitiendo escalar la solución en el futuro.

## 🔐 Componentes principales

VPC: Red privada que aísla la infraestructura del entorno público.

Public Subnet: Contiene el Application Load Balancer (ALB), encargado de recibir el tráfico externo.

Private Subnet: Aloja la instancia EC2 donde se ejecuta la aplicación.

Application Load Balancer (ALB):

Recibe tráfico HTTPS (443) desde Internet.

Distribuye las peticiones hacia la capa privada.

EC2 Instance:

Ejecuta Docker Compose.

Contiene los servicios:

Nginx como reverse proxy.

Frontend React.

Backend Node.js + Express.

Base de datos SQLite.

Security Groups:

Permiten únicamente tráfico HTTPS público hacia el ALB.

Permiten tráfico interno controlado hacia la instancia EC2.

SSL Encryption:

Garantiza comunicación segura entre el cliente y el sistema.

Para simplicidad del proyecto se utiliza SQLite embebido. En un entorno productivo se recomienda utilizar una base de datos administrada como Amazon RDS.

## 🔄 Flujo de tráfico

Usuario → Internet → ALB (HTTPS 443) → EC2 (HTTP 80) → Nginx → Aplicación





<img src="screnshots/Smart Task Manager Cloud AWS.png" width="600"/>


### 📸 Capturas

### Vista principal
![Vista principal](screnshots/SmartTaskManager.png)

### Edición de tareas
![Edición](screnshots/SmartTaskManager5.png)

## Tareas Agregadas
![Agregar](screnshots/SmartTaskManager1.png)

## Tarea Completada vista principal
![Agregar](screnshots/SmartTaskManager2.png)

## Tareas Pendientes filtro
![Agregar](screnshots/SmartTaskManager3.png)

## Tareas Completada filtro
![Agregar](screnshots/SmartTaskManager4.png)




### 👨‍💻 Autor

Andrés Espinosa
Software Developer
Ecuador 🇪🇨

### 📄 Licencia

MIT License
ask-manager
