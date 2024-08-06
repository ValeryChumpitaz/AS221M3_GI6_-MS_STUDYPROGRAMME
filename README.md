# PRS211 - Estándares para Spring Cloud Gateway y Keycloak

## Spring Cloud Gateway

### Definición

**Spring Cloud Gateway** es un componente esencial en aplicaciones de microservicios que proporciona una capa de puerta de enlace (gateway) para enrutar, filtrar y gestionar solicitudes entrantes y salientes. Actúa como un enrutador inverso que dirige el tráfico a los microservicios correspondientes y ofrece funciones de seguridad, autenticación y autorización.

### Funcionalidades

Spring Cloud Gateway ofrece las siguientes funcionalidades clave:

- **Enrutamiento Dinámico**: Rutea solicitudes a diferentes microservicios basándose en rutas, cabeceras, parámetros y otros criterios configurables.
- **Filtrado**: Aplica filtros para modificar, validar o autenticar solicitudes y respuestas.
- **Gestión de Solicitudes y Respuestas**: Modifica solicitudes y respuestas, incluyendo la adición de cabeceras, reescritura de URL, redirecciones, etc.
- **Integración con Spring Security**: Implementa medidas de seguridad, autenticación y autorización a nivel de la puerta de enlace.
- **Escalabilidad**: Administra un alto volumen de tráfico en entornos de microservicios de manera eficiente.

### Uso

Para utilizar Spring Cloud Gateway en tu aplicación:

1. **Configuración**: Configura tu aplicación para usar Spring Cloud Gateway, definiendo rutas, filtros y políticas de seguridad.
2. **Rutas Personalizadas**: Define rutas personalizadas para enrutar solicitudes a microservicios o servicios externos según las necesidades de tu aplicación.
3. **Filtrado Personalizado**: Configura filtros para modificar solicitudes y respuestas, como autenticación o adición de cabeceras.
4. **Seguridad y Autenticación**: Implementa medidas de seguridad y autenticación para proteger tus servicios y rutas.

### Estructura

La estructura de Spring Cloud Gateway incluye:

- **`src/`**: Código fuente principal de Spring Cloud Gateway.
- **`config/`**: Configuración específica de la puerta de enlace.
- **`routes/`**: Definición de rutas y políticas de enrutamiento.
- **`filters/`**: Filtros personalizados para modificar solicitudes y respuestas.

## Integración con Keycloak

**Keycloak** es una plataforma de código abierto para la gestión de identidades y la seguridad de aplicaciones. Para integrar Keycloak en tu aplicación con Spring Cloud Gateway, sigue estos pasos:

1. **Configuración de Keycloak**: Asegúrate de tener Keycloak configurado y funcionando. Consulta la [documentación oficial](https://www.keycloak.org/documentation) para detalles.

2. **Configuración en la Aplicación o yml**:

    - Abre el archivo `application.properties` de tu proyecto.
    - Configura las propiedades de conexión a Keycloak, especificando la URL de Keycloak, el realm y el cliente. Ejemplo:
      ```properties
      # Configuración de Keycloak
      spring:
        security:
          oauth2:
            resourceserver:
              jwt:
                issuer-uri: http://localhost:8090/realms/PRS
      ```

3. **Protección de Rutas**: Usa Spring Security junto con Keycloak para proteger las rutas de tu aplicación. Define roles y restricciones de acceso en tu configuración de seguridad.

4. **Autenticación y Autorización**:

    - Los usuarios serán redirigidos a Keycloak para la autenticación al intentar acceder a rutas protegidas.
    - Keycloak gestionará la autenticación y proporcionará tokens JWT para tu aplicación.

5. **Uso de Tokens JWT**: Verifica la identidad del usuario y autoriza el acceso a recursos protegidos utilizando los tokens JWT proporcionados por Keycloak.

## Arquitectura

La arquitectura de Spring Cloud Gateway y su integración con Keycloak garantiza una gestión eficiente de solicitudes y una robusta seguridad en la aplicación.

---

**Nota**: Asegúrate de seguir estos estándares para mantener la coherencia y calidad en la implementación de Spring Cloud Gateway y Keycloak en tu proyecto.
