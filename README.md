# reto-internet-de-las-cosas

### Implementación de Internet de las Cosas (Grupo 502)

_Reto de la clase Internet de las cosas, semestre Otoño 2025._

**INTEGRANTES (Equipo 2):**

-   **A00841769**, Carlos Eduardo Arias Capetillo
-   **A01412672**, Ilan David Narváez Martínez
-   **A01742073**, Christopher Evans Palafox
-   **A01412628**, Carlos David Padrón Hernández
-   **A01178419**, Carolina Maysen Hernández

> **Importante:** nota que este repositorio es público, por lo que te recomiendo agregar un archivo llamado "myCredentials.js" dentro de /api_utilities en donde puedas poner tu usuario y contraseña para la BD en la nube, y asi no exponer tus datos.

En tu archivo `myCredentials.js`, pondrías lo siguiente.

```js
const dbConfig = {
    name: "nombre_de_bd",
    host: "tu_host",
    port: "tu_puerto",
    user: "usuario_de_bd",
    pass: "contraseña_de_bd",
};

module.exports = {
    dbConfig,
};
```

## Overview

**Contexto en URL:**

-   /iot-challenge/api

Encontrarás múltiples endpoints en este servidor.

-   **GET**
    -   /getCustomers
-   **POST**
    -   /insertCustomer
    -   /insertPickup
    -   /createRoute
    -   /createBus

## Documentación y Organización

**Documento de especificación funcional:**

-   https://docs.google.com/document/d/1RieXtCxUfjijQfvcl2mbmLjK4nbEObHmX6bG5EK_jwM/edit \

**Calendario de trabajo:**

-   https://docs.google.com/spreadsheets/u/1/d/1C0o6nHsccZLH3F16_n7NiZ3QxBL8-WfwXS5-zea69N4/edit
