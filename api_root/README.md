# Especificación API
## Credenciales de base de datos
/* Información pendiente sobre las credenciales de la base de datos. Planeamos implementar algo como lo siguiente en un archivo de credenciales:

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
*/

## Endpoints API
Todos los endpoints inician con `/iot-challenge/api`. Los siguientes endpoints están disponibles:
* POST
    * /getCustomerStatus
        * Consulta si el usuario identificado por un dado RFID está aprobado o no. Debido a que se deben mandar datos se usa el método POST, no GET.
        * Inputs:
            * `rfid`: RFID de un usuario. Integer.
            * `mac_address`: MAC address del NodeMCU. Este identificador se usa para determinar el autobús. Integer.
        * Outputs:
            * `customer_status`: "APPROVED", "UNAPPROVED", o "UNIDENTIFIED", el último en caso de que el RFID no se encontró en la base de datos (y por ende no tiene acceso). String.
/* Algunos detalles del endpoint están por decidirse. \*/