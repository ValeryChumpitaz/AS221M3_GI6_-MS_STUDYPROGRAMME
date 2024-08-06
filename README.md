# 📊 Estándares de Base de Datos PRS

## Reglas Generales

1. **Nombre de la Base de Datos**  
   Debe ser consistente y bien definido, utilizando letras mayúsculas. Ejemplo: `DB_PROGRAMAS_ESTUDIO`.

2. **Charset**  
   Definir el charset de la base de datos como UTF-8 para garantizar la compatibilidad con caracteres especiales (ñ, á, etc.).

3. **Nombres de Objetos**  
   Los nombres de tablas, campos, y otros objetos no deben contener caracteres especiales como: `", ', /, #, ), (, %, &, $, =, ?, ¿, ¡, |, ., ;`.

4. **Palabras Reservadas**  
   No se deben utilizar palabras reservadas de los manejadores de base de datos (comandos de los manejadores de base de datos) como nombres de tablas o campos.

## Tablas

### Nomenclatura de Tablas

Los nombres de las tablas deben seguir la siguiente nomenclatura:

`<Tipo de tabla>_<Nombre del módulo, Submódulo>_<Nombre de la tabla>`

**Ejemplos:**

- `TBL_PROGRAMAS_ESTUDIO`: Tabla que almacena los datos del módulo de programas de estudio.
- `DET_PROGRAMAS_ESTUDIO_CREDITOS`: Tabla que almacena el detalle de los créditos asociados al módulo de programas de estudio.
- `AUD_HISTORIAL_PROGRAMAS_ESTUDIO`: Tabla que almacena los datos de auditoría relacionados con el módulo de programas de estudio.
- `TMP_PROGRAMAS_ESTUDIO`: Tabla que almacena los datos temporales de una solicitud de borrador del módulo de programas de estudio.

### Nombres de Campos

Para los campos en las tablas, seguir estas convenciones:

1. **Primary Key (Clave Principal)**  
   - Utilizar `ID` para campos auto-incrementales. Ejemplo: `PROGRAM_ID`.
   - Utilizar `NUM` para atributos numéricos. Ejemplo: `NUM_CREDITOS`.
   - Utilizar `COD` para claves generadas por concatenación o caracteres. Ejemplo: `COD_PLAN_ESTUDIO`.

2. **Foreign Key (Clave Foránea)**  
   Las claves foráneas deben tener el mismo nombre, tipo de dato y longitud que la clave primaria a la que hacen referencia. Ejemplo: `CETPRO_ID` en la tabla `TBL_PROGRAMAS_ESTUDIO` debe referirse a la misma clave primaria en la tabla `TBL_CETPRO`.

3. **Comentarios**  
   Se recomienda agregar comentarios breves para describir la función de cada tabla y campo.

### Ejemplo de Nombres de Campos para Programas de Estudio

- `PROGRAM_ID`: Identificador único del programa de estudio (Primary Key).
- `NAME`: Nombre del programa de estudio.
- `MODULE`: Módulo al que pertenece el programa de estudio.
- `TRAINING_LEVEL`: Nivel de formación del programa de estudio.
- `STUDY_PLAN_TYPE`: Tipo de plan de estudio.
- `CREDITS`: Créditos asociados al programa de estudio.
- `HOURS`: Horas del programa de estudio.
- `STATUS`: Estado del programa de estudio.
- `CETPRO_ID`: Identificador del CETPRO asociado (Foreign Key).

## Relaciones

1. **Cardinalidad**  
   Definir el número de instancias esperado en cada extremo de la relación.

2. **Clasificación de Relaciones**  
   - **Identificadora**: Si los atributos de la clave foránea están contenidos en la clave primaria de la entidad “hijo”.
   - **No-identificadora**: Si no es así.

3. **Nombre de la Relación**  
   Las relaciones deben ser nombradas como un verbo o una frase verbal que describa la relación. Ejemplo: `pertenece_a`, `es_asignado`.

4. **Relaciones Recursivas**  
   Nombrar de la siguiente forma: `tblRecursivo`.

5. **Relaciones entre Dos Tablas**  
   Nombrar de la siguiente forma: `NombreTablaOrigen_NombreTablaRelacionar_NombreCampo`. Ejemplo: `TBL_PROGRAMAS_ESTUDIO_TBL_CETPRO_CETPRO_ID`.

## File Server

1. **Nombres de Campos**  
   - `N_ID`: Identificador único auto-incremental.
   - `C_NUM`: Número de documento del usuario (DNI).
   - `C_COD_URL`: Código URL para identificar el archivo del certificado.

## Blockchain

1. **Nombres de Campos**  
   - `N_ID`: Identificador único auto-incremental.
   - `C_NAME`: Nombre del usuario.
   - `C_DETAILS`: Detalle del título.
   - `C_COD_URL`: Código URL del file server.
   - `C_USER`: Usuario.
   - `C_STATUS`: Estado del certificado.


