
# 📚 vg-ms-programa-estudio

Bienvenido al repositorio de `vg-ms-programa-estudio`. Este microservicio está diseñado para gestionar programas de estudio con un enfoque en buenas prácticas y estándares modernos. 

## 🚀 Estructura del Proyecto

La estructura del proyecto está organizada para mantener una separación clara de responsabilidades y facilitar el mantenimiento. Aquí se detalla la estructura de directorios:

```plaintext
src/
  main/
    java/
      pe/
        edu/
          vallegrande/
            vgmsstudyprogramme/
              application/
              domain/
              presentation/
                controller/
  test/
    java/
      pe/
        edu/
          vallegrande/
            vgmsstudyprogramme/
              application/
              domain/
              presentation/
                controller/
```

### Descripción de Directorios

- **`application/`**: Contiene la configuración y clases relacionadas con la aplicación, como la clase principal `VgMsStudyProgrammeApplication.java`.
- **`domain/`**: Incluye las clases de dominio, que representan el modelo de datos y la lógica de negocio.
- **`presentation/`**: Maneja la lógica de presentación, incluyendo los controladores en `controller/`.

## 🛠️ Tecnologías Utilizadas

- **Java**: Lenguaje de programación principal.
- **Spring Boot**: Framework para el desarrollo de aplicaciones empresariales.
- **Spring WebFlux**: Soporte para programación reactiva.
- **PostgreSQL**: Sistema de gestión de bases de datos relacional.

## 🌟 Buenas Prácticas en el Desarrollo

### Separación de Responsabilidades

- Divide el código en capas lógicas como controladores, servicios y repositorios.
- Mantén una separación clara para facilitar el mantenimiento y escalabilidad.

### Nombres Descriptivos

- Usa nombres descriptivos para funciones y variables.
- Facilita la comprensión del código y su mantenimiento.

### Validación de Datos

- Valida siempre los datos de entrada para prevenir vulnerabilidades y errores.
- No confíes en los datos del cliente.

### Testing

- Realiza pruebas unitarias, de integración y de extremo a extremo.
- Automatiza las pruebas para garantizar la calidad del código.

### Versionado de API

- Proporciona versiones de tus APIs para asegurar la compatibilidad hacia atrás.
- Facilita las actualizaciones y cambios en la API.

## 🔄 Prácticas Reactivas con Spring WebFlux

### Responsivos

- Asegura tiempos de respuesta establecidos para mantener la calidad del servicio.

### Resilientes

- Mantén la capacidad de respuesta incluso en casos de error.

### Elásticos

- Maneja aumentos de carga de trabajo sin perder capacidad de respuesta.

### Orientados a Mensajes

- Minimiza el acoplamiento entre componentes para interacciones asincrónicas.

### Uso de Anotaciones Reactivas de Spring

- Utiliza anotaciones específicas como `@RestController`, `@GetMapping`, `@PostMapping`, etc.

### Programación Reactiva

- Adopta el paradigma de programación reactiva usando clases y operadores de Proyecto Reactor, como `Mono` y `Flux`.

### Uso de Operadores Reactivos

- Utiliza operadores para manejar errores y transformar flujos de datos, como `onErrorResume`, `map`, `flatMap`, etc.

## 📂 Nombres de Archivos y Funciones

- Usa nombres que reflejen el contenido y propósito del archivo, por ejemplo, `usuario-controller.java` para un controlador de usuarios.
- Sigue un patrón estandarizado para nombres de funciones para facilitar la comprensión y mantenimiento del código.

## 🌐 Nomenclatura de Endpoints

- Utiliza nombres coherentes y descriptivos para los endpoints de la API REST.

## ⚙️ Principios SOLID

### Principio de Responsabilidad Única

- Cada clase debe tener una sola razón para cambiar.

### Principio Abierto-Cerrado

- Las clases deben estar abiertas para extensión pero cerradas para modificación.

### Principio de Sustitución de Liskov

- Las subclases deben ser sustituibles por sus clases base sin alterar el comportamiento del cliente.

### Principio de Segregación de Interfaces

- Los clientes no deben depender de interfaces que no utilizan.

### Principio de Inversión de Dependencia

- Los módulos de alto nivel no deben depender de los módulos de bajo nivel; ambos deben depender de abstracciones.

## 🔍 Conclusiones

### Mejora en la Eficiencia

- La programación reactiva mejora la eficiencia al manejar operaciones asincrónicas sin bloqueos innecesarios.

### Escalabilidad

- La capacidad de manejar flujos de datos reactivos facilita la construcción de sistemas escalables que pueden gestionar un gran número de solicitudes concurrentes.

## 🔗 Enlaces Útiles

- [Documentación de Spring Boot](https://spring.io/projects/spring-boot)
- [Documentación de Spring WebFlux](https://docs.spring.io/spring-framework/docs/current/reference/html/web-reactive.html)
- [Documentación de PostgreSQL](https://www.postgresql.org/docs/)
- [Proyecto Reactor](https://projectreactor.io/)

## 👥 Integrantes

- **Valery Chumpitaz**
- **Shirley Ascencio**

¡Gracias por contribuir a PRS2! 🎉


