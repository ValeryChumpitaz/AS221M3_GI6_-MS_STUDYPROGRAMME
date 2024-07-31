# 📊 Estándares de Base de Datos PRS

Este documento describe los estándares y reglas generales para el diseño y manejo de bases de datos en el proyecto PRS. Asegúrate de seguir estas directrices para mantener la consistencia y calidad en el almacenamiento de datos.

## 📝 Reglas Generales

- **Nombre de la Base de Datos**: Debe ser consistente y estar bien definido, usando solo letras mayúsculas. Por ejemplo: `DB_PROYECTO`.

- **Charset**: Define el charset de la base de datos para permitir la compatibilidad con caracteres especiales como ñ, á, etc. Recomendado: `UTF-8`.

- **Nombres de Objetos**: Evita caracteres especiales en los nombres de objetos como: `",',/,#,),(,%,&,$,=,?,¿,¡,|,.,;`.

- **Palabras Reservadas**: No utilices palabras reservadas del manejador de base de datos (comandos del manejador de base de datos) como nombres de tablas o campos.
