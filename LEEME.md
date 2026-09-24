# NEXO Académico · Puesta en marcha (Fase 1)

- Cuenta de Google: **crinfield06@gmail.com**
- Cuenta de GitHub: **crinfield06-RELOAD**
- Dirección del sitio: **https://crinfield06-reload.github.io/nexo/**

Tiempo estimado: 30–40 minutos, una sola vez. Después, todo se actualiza desde la hoja de Google.

## Archivos de esta carpeta

| Archivo | Para qué sirve | ¿Se edita? |
| --- | --- | --- |
| index.html, styles.css, app.js | El sitio | No |
| config.js | Conecta el sitio con tu hoja de Google | Una vez |
| datos-ejemplo.js | Datos de muestra (se usan mientras la hoja no esté conectada) | No |
| foto.jpg | Tu foto profesional | Ya incluida |
| NEXO_Panel_de_contenidos.xlsx | Panel de contenidos (se sube a Google Sheets) | A diario |

## Paso 1 · Publicar el sitio en GitHub Pages (10 min)

1. Entra a github.com con la cuenta **crinfield06-RELOAD**.
2. Botón verde **New** (nuevo repositorio) → nombre: `nexo` → **Public** → **Create repository**.
3. En la página del repositorio: enlace **uploading an existing file** → arrastra todos los archivos de esta carpeta → **Commit changes**.
4. **Settings → Pages** → Source: **Deploy from a branch** → Branch: `main` y `/ (root)` → **Save**.
5. En 1–2 minutos el sitio estará en `https://crinfield06-reload.github.io/nexo/` (con datos de ejemplo).

## Paso 2 · Conectar la hoja de contenidos (10 min)

1. En tu Drive, abre la carpeta **NEXO Académico** → Nuevo → Subir archivo → `NEXO_Panel_de_contenidos.xlsx`. Ábrelo y elige Archivo → **Guardar como Hojas de cálculo de Google**.
2. **Archivo → Compartir → Publicar en la web** → «Documento completo» · «Valores separados por comas (.csv)» → **Publicar**.
3. Copia el enlace y envíamelo junto con el número `gid=` de cada pestaña (aparece al final de la dirección al abrir cada pestaña). Te devuelvo `config.js` listo; solo lo reemplazas en GitHub (**Add file → Upload files**).

La hoja publicada muestra solo títulos y descripciones. Los archivos siguen protegidos en Drive.

## Paso 3 · Proteger los archivos con un grupo de Google (5 min por curso)

1. Ve a **groups.google.com** → **Crear grupo**.
   - Nombre: `NEXO CINE1248P` · Correo: `nexo-cine1248p` (si está ocupado, prueba `nexo-cine1248p-2026`).
   - Quién puede buscar el grupo: **Cualquier usuario de la Web**.
   - Quién puede unirse: **Cualquier usuario puede solicitar unirse** (tú apruebas).
   - Quién puede ver miembros / publicar: **Solo administradores del grupo** (así no se convierte en lista de correo).
2. En Drive: clic derecho en la carpeta **CINE1248P - Producción y Operaciones Sostenibles** → Compartir → escribe el correo del grupo (`nexo-cine1248p@googlegroups.com`) → **Lector** → desmarca «Notificar» → Compartir. Todo lo que subas a esa carpeta hereda el permiso.
3. En la hoja, pestaña **Cursos**, columna `grupo`: la dirección del grupo (ej. `https://groups.google.com/g/nexo-cine1248p`). El sitio muestra el botón «Solicitar acceso a los archivos».
4. Cada inicio de ciclo: aprueba las solicitudes (Grupo → Miembros → Solicitudes pendientes) y compara con tu lista de matriculados. Al terminar el ciclo, puedes vaciar el grupo.

Prueba antes de anunciarlo: pide a un estudiante que solicite acceso con su cuenta UPN y abra un archivo. Si la universidad bloqueara el acceso a archivos externos, avísame y usamos la alternativa (compartir con la lista de correos del curso).

## Paso 4 · Subir los materiales (continuo)

- Guarda cada archivo en la subcarpeta de su tema (T01 … T07).
- Nombre de archivo: `CINE1248P_T03_GUIA_Calculo-OEE_v2.pdf`.
- Copia el enlace (Compartir → Copiar enlace) y pégalo en la columna `enlace` de la pestaña **Recursos**. El sitio genera solo el botón de descarga directa.
- Reemplazar un archivo: clic derecho → **Administrar versiones → Subir nueva versión** (el enlace no cambia).
- No borres filas: cambia `estado` a **Archivado**.

Los cambios de la hoja aparecen en el sitio en unos 5 minutos.

## Para los estudiantes

Comparte `https://crinfield06-reload.github.io/nexo/` en el aula virtual y como código QR en la primera diapositiva de cada sesión.
