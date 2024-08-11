# vg-web-artemiosolutions 
# Implementacion del Login con FireBase
## Estructura del Proyecto

El proyecto `vg-web-artemiosolutions` está diseñado para gestionar y mostrar información relacionada con programas de estudio. A continuación se detalla la estructura y los estándares de desarrollo para el frontend.

### Estructura de Carpetas

- **`src`**: Contiene todos los archivos de origen del proyecto.
  - **`app`**: Implementación principal de la aplicación.
  - **`assets`**: Recursos estáticos como imágenes y archivos.
  - **`favicon.ico`**: Icono de la aplicación.
  - **`index.html`**: Archivo HTML principal.
  - **`main.ts`**: Punto de entrada de la aplicación.
  - **`styles.css`**: Estilos globales para la aplicación.

### Requerimientos

1. **Node.js**  
   Versión: v14.18.1 o superior

2. **Angular CLI**  
   Versión: 16.2.11 o superior

3. **IDE**  
   Utilizar IntelliJ IDEA

### Buenas Prácticas de Usabilidad

- **Diseño centrado en el usuario**: Asegúrate de que la interfaz esté orientada a las necesidades del usuario.
- **Diseño intuitivo**: La interfaz debe ser fácil de entender y usar.
- **Legibilidad y visibilidad**: El contenido debe ser fácil de leer y visualizar.
- **Evitamos la jerga**: Usa un lenguaje claro y accesible.
- **Minimización de la carga cognitiva**: Simplifica las tareas para que los usuarios puedan realizar sus objetivos con el menor esfuerzo posible.
- **Mensajes de errores amigables**: Proporciona mensajes de error que ayuden al usuario a solucionar problemas.
- **Actualizaciones y mantenimiento**: Mantén la interfaz actualizada y funcional.
- **Diseño estético**: Asegúrate de que el diseño sea visualmente atractivo.

### Consumir Datos de una API

- **APIs de Microservicios**:
  - **Programs** (Programas de Estudio): Para obtener información sobre los programas de estudio.
  - **Other APIs**: Si se usan otras APIs relacionadas, asegúrate de documentarlas aquí.

### Interfaz de Usuario (Vista)

- **Elementos de la interfaz**: Incluye botones, campos de entrada, menús desplegables, barras de desplazamiento, ventanas emergentes, etc.
- **Diseño y disposición**: Organización del contenido, jerarquía visual y disposición de los elementos en pantalla.
- **Estilo y apariencia**: Uso de colores, fuentes, iconos y otros elementos gráficos.
- **Interacción**: Cómo los elementos responden a las acciones del usuario como clics, desplazamiento del ratón, pulsaciones de teclas.
- **Flujo de trabajo y navegación**: Cómo los usuarios navegan y acceden a las diferentes funciones de la aplicación.

### Estructura de Carpetas Recomendadas

- **`components`**: Componentes reutilizables.
- **`model`**: Modelos de datos.
- **`pages`**: Páginas de la aplicación.
- **`services`**: Servicios para manejar la lógica de negocio.
- **`image`**: Recursos de imágenes.

### Implementación de Paquetes Externos

- **Uso de RxJS**: Facilitar funciones asíncronas y la gestión de eventos.

- **Instalación de Angular**:
  ```bash
  npm install -g @angular/cli
  ```

- **Instalación de Angular Material**:
  ```bash
  ng add @angular/material
  ```

### Plantillas de Diseño

- Utilizar plantillas para mejorar la eficiencia y mantenibilidad del desarrollo web.

### Creación de Componentes y Servicios

- **Crear un componente**:
  ```bash
  ng generate component name-component
  ```

- **Crear un modelo**:
  ```bash
  ng generate model name-model
  ```

- **Crear una página**:
  ```bash
  ng generate page name-page
  ```

- **Crear un servicio**:
  ```bash
  ng generate service name-service
  ```

### Guía de Estilo y Estandarización

- Asegurar coherencia, legibilidad y mantenimiento del código.
- Seguir las convenciones acordadas en el equipo.

### Componentes Necesarios Aplicables

- **Botón de registro**:
  ```css
  color: #9ADE7B;
  border-radius: 15px;
  margin: 2px;
  width: 100px;
  ```

- **Botón de eliminación**:
  ```css
  color: #FF8080;
  border-radius: 15px;
  margin: 2px;
  width: 100px;
  ```

- **Botón de modificación**:
  ```css
  color: #F1C93B;
  border-radius: 15px;
  margin: 2px;
  width: 100px;
  ```

- **Botón de cancelación**:
  ```css
  color: #FF8080;
  border-radius: 15px;
  margin: 2px;
  width: 100px;
  ```

- **Botón de exportación**:
  ```css
  color: #E9B384;
  border-radius: 15px;
  margin: 2px;
  width: 100px;
  ```

### Definición del Sistema de Rutas

- Configurar el módulo de enrutamiento de los componentes en el archivo `app-routing.module.ts`.

### Nombres de Variables

- Elegir nombres descriptivos para asegurar la legibilidad y mantenibilidad del código.

### Nombres de Funciones

- Usar nombres claros y descriptivos para las funciones para facilitar la comprensión de su propósito.

### Recomendaciones

- Actualizar bibliotecas y dependencias regularmente.
- Seguir los estándares de codificación y convenciones del equipo.
- Documentar partes clave del código y decisiones de diseño.
- Separar archivos por tipo y función.
- Establecer reglas claras para nombres de archivos y carpetas.
- Implementar pruebas unitarias y de integración.

### Evitar

- **Código duplicado**: Utilizar funciones o clases para encapsular lógica y reutilizarla.
- **Excesiva anidación**: Evitar demasiada anidación en bloques de código.
- **Dependencias innecesarias**: Mantener el código simple y libre de dependencias superfluas.
- **Código muerto**: Eliminar o comentar el código que no se usa.
- **Funciones extensas**: Dividir la funcionalidad en funciones más pequeñas y específicas.

