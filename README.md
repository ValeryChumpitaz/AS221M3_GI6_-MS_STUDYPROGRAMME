# Guía de Arquitectura de Proyecto para Programas de Estudio

## Objetivos

| **Objetivo**                       | **Descripción**                                                                                      |
|------------------------------------|------------------------------------------------------------------------------------------------------|
| **Estructura Uniforme**            | Establecer un lenguaje común para facilitar la colaboración entre equipos.                           |
| **Pautas Consistentes**            | Definir pautas de trabajo estandarizadas para mejorar la eficiencia en el desarrollo de software.   |
| **Marco de Referencia**            | Proporcionar un marco de referencia con vocabulario compartido y herramientas normalizadas.          |
| **Modelo de Arquitectura**          | Seleccionar un modelo adecuado de arquitectura de software y hardware para el desarrollo.            |

## Normas ISO

- **ISO/IEC 14598**: Norma internacional que proporciona un enfoque metodológico para evaluar la calidad del software en diversas etapas de desarrollo. Incluye criterios y métricas para garantizar que el software cumpla con los estándares de calidad establecidos.

## Funciones

### Roles y Responsabilidades

| **Rol**                           | **Descripción**                                                                                     |
|-----------------------------------|-----------------------------------------------------------------------------------------------------|
| **Jefe de Proyecto (Luis Manzo)**  | Lidera el proyecto y es la autoridad principal en la entrega del servicio.                         |
| **Cliente (SOA)**                 | Define los requisitos del proyecto y acepta la entrega del servicio.                               |
| **Usuario Final (SOA)**           | Utiliza el producto o aplicación generada.                                                         |
| **Analista del Proyecto**         | Supervisa el desarrollo de aplicaciones y asegura el cumplimiento de los requisitos del cliente.    |
| **Scrum Master**                  | Facilita el proceso ágil, eliminando obstáculos y promoviendo un ambiente productivo.              |
| **Equipo de Desarrollo**          | Incluye desarrolladores, testers y otros miembros responsables de la creación y entrega del producto final. |

## Estructura del Proyecto

### 1. Procesos Organizativos

#### Preparación y Adquisición

| **Aspecto**                       | **Descripción**                                                                                  |
|----------------------------------|--------------------------------------------------------------------------------------------------|
| **Adquisición**                   | Necesidades del sistema: gestionar información de adolescentes, generar historiales, automatizar procesos, etc. |
| **Equipamiento**                 | Herramientas necesarias: GitLab, JDK 11, Google Cloud Platform (GCP), PostgreSQL, Spring Framework. |
| **Infraestructura Técnica**       | Implementación de Arquitectura Hexagonal y DDD (Domain-Driven Design).                           |

#### Administración del Proyecto

| **Herramienta**                  | **Descripción**                                      |
|----------------------------------|------------------------------------------------------|
| **Jira**                         | Gestión de proyectos.                               |
| **GitHub**                       | Control de versiones y colaboración.               |
| **GitLab**                       | Control de versiones y desarrollo colaborativo.    |
| **Google Docs**                  | Documentación y colaboración.                      |
| **Google Sheets**                | Hojas de cálculo en línea.                         |

### 2. Procesos Operativos

#### Análisis

- **Prototipo**: Crear un prototipo basado en los requisitos para gestionar y automatizar la información de los adolescentes.

#### Diseño

- **Sistematización**: Implementar el sistema con restricciones de seguridad, compatibilidad con navegadores y manejo eficiente de la información.

#### Implementación

- **Funcionalidades**:
  - Descargar el expediente completo de cada adolescente.
  - Acceso restringido basado en permisos.
  - Autenticación de documentos con firma digital.
  - Dashboard informativo para cada adolescente.

#### Implementación y Aceptación del Sistema

- **Pruebas y Verificación**: Ejecutar pruebas para verificar los resultados obtenidos y asegurar que se cumplan los requisitos.

## Herramientas de Desarrollo

### Fase 1: Automatización

| **Nombre**                      | **Descripción**                                      |
|---------------------------------|------------------------------------------------------|
| **Google Docs**                 | Crear y editar documentos de texto.                 |
| **Google Sheets**               | Hojas de cálculo en línea.                          |
| **Google Forms**                | Crear encuestas y formularios.                      |
| **Google Apps Script**          | Automatizar tareas en Google Workspace.            |
| **Gmail**                       | Enviar y recibir correos electrónicos.              |
| **Google Drive**                | Alojamiento y sincronización de archivos.           |

### Fase 2: Creación de Software

| **Nombre**                      | **Descripción**                                      |
|---------------------------------|------------------------------------------------------|
| **Angular**                     | Framework para aplicaciones web en el frontend.     |
| **MongoDB**                  | Base de datos relacional.                           |
| **GitLab**                      | Control de versiones y desarrollo colaborativo.    |
| **IntelliJ**                    | Entorno de desarrollo integrado.                   |
| **VS Code**                     | Editor de código fuente multiplataforma.            |
| **GitHub**                      | Alojamiento de repositorios y desarrollo colaborativo. |
| **Google Cloud Platform**       | Plataforma en la nube para servicios y aplicaciones. |
| **Spring**                      | Framework Java para desarrollo de aplicaciones.     |
| **Spring Boot**                 | Crear aplicaciones autocontenidas.                  |
| **Spring Data**                 | Repositorios de acceso a datos.                     |
| **Spring Security**             | Servicios de seguridad en proyectos Spring.         |

## Estrategia de Desarrollo: Trunk Based Development

| **Característica**              | **Descripción**                                        |
|---------------------------------|--------------------------------------------------------|
| **Rama Principal Única**         | Todos los desarrolladores envían cambios a la rama principal. |
| **Entregas Frecuentes**          | Permite entregas más frecuentes y acelera el desarrollo. |
| **Mantenimiento Sencillo**       | Simplifica la gestión de versiones.                   |
| **Mayor Visibilidad**           | La rama principal contiene siempre el código actualizado. |
| **Resolución Rápida de Conflictos** | Conflictos se detectan y resuelven más ágilmente.    |

---

**Analistas:** Valery Chumpitaz y Shirley Ascencio
