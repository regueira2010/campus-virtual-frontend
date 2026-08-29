# 🎓 Campus Virtual System - Full-Stack Integration

## 🛠️ Stack Tecnológico
* **Backend:** Java 21, Spring Boot 3, Spring Data JPA, Hibernate, OpenAPI/Swagger.
* **Frontend:** TypeScript Vanilla, Vite, Native ESM, HTML5/CSS3 Semántico.
* **Infraestructura:** Docker Compose, PostgreSQL 16 Alpine.
* **Calidad y Testing:** JUnit 5, Mockito, JaCoCo, TDD & Clean Architecture.

---

## 🔗 Repositorios de Referencia
| Hito | Repositorio | Enlace |
| --- | --- | --- |
| **Hito 1** | Core de Dominio | https://github.com/regueira2010/campus-virtual |
| **Hito 4** | Backend Spring Boot | https://github.com/regueira2010/campus-virtual-api |
| **Hito 2** | Frontend Vite + TS | https://github.com/regueira2010/campus-virtual-frontend |

---

## 🏛️ Estructura y Arquitectura

La base de código sigue principios de diseño modular y separación de responsabilidades (SRP - Single Responsibility Principle):

```text
src/
├── assets/         # Recursos estáticos locales
├── components/     # Componentes independientes de UI
│   ├── CourseCard.ts             # Tarjeta visual del listado de cursos
│   ├── CourseCounter.ts          # Contador dinámico de cursos disponibles
│   └── CourseEnrollmentForm/     # Componente e Inscripción
│       ├── CourseEnrollmentForm.ts       # Definición de la UI y listeners
│       ├── CourseEnrollmentValidator.ts  # Reglas de validación y formateo
│       └── CourseEnrollmentValidator.test.ts # Pruebas unitarias del validador
├── data/           # Datos estáticos auxiliares de desarrollo (mock data)
├── models/         # Interfaces de datos y tipos de negocio (dominio)
│   └── Course.ts                 # Modelo de Curso y enumeraciones de estado
├── services/       # Capa de comunicación asíncrona con el exterior
│   └── course.service.ts         # Peticiones fetch y simulador del API
├── main.ts         # Punto de entrada principal y orquestador del renderizado
└── style.css       # Estilos globales de la aplicación y layouts de UI
```

---

## 🚀 Guía de Puesta en Marcha Local

### 1. Levantar la Base de Datos Relacional
```bash
docker compose up -d
```

### 2. Ejecutar Pruebas Automatizadas (Backend)
```bash
./mvnw clean test
```

### 3. Iniciar el Microservicio Backend
```bash
./mvnw spring-boot:run
```
* **API REST:** http://localhost:8080/api/v1/courses
* **Swagger UI (Perfil Dev):** http://localhost:8080/swagger-ui.html

### 4. Iniciar la Interfaz Web Frontend
```bash
cd campus-virtual-frontend
npm install
npm run dev
```
* **App Web:** http://localhost:5173

---

## 📋 Contrato de Datos (DTOs / Entidad Course)

| Campo | Tipo | Descripción |
| --- | --- | --- |
| id | String | Identificador único del curso (ej. JAVA-TR-01) |
| title | String | Nombre oficial del curso |
| description | String | Resumen del contenido programático |
| professor | String | Nombre del docente a cargo |
| startDate | String | Fecha de inicio del curso |
| schedule | String | Días y horarios de impartición |
| status | Enum | Estado actual (AVAILABLE, IN_PROGRESS, ARCHIVED) |
