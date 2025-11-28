# reto-internet-de-las-cosas
_Reto de la clase Internet de las cosas, semestre Otoño 2025._

Este repositorio integra el código de un prototipo físico para usarse en autobuses. El usuario acerca una objeto (anteriormente comprado) con tecnología [RFID](https://en.wikipedia.org/wiki/Radio-frequency_identification) al prototipo al entrar al autobus. El NodeMCU comunica este ID a un API REST, el cual consulta una base de datos en la nube para luego comunicar al NodeMCU si el usuario es aprobado o no. Posteriormente el prototipo informa al usuario del resultado a través de una pantalla LCD y un buzzer.

Además, los datos de cada ingreso se registran y gráficas al respecto se muestran en una página web. La intención es proporcionar esta información al personal apropiado de la secretaría de movilidad.

## Especificación API
### Credenciales de base de datos
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

### Endpoints API
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

## Enlaces externos
- Documento de especificación funcional: https://docs.google.com/document/d/1RieXtCxUfjijQfvcl2mbmLjK4nbEObHmX6bG5EK_jwM/edit \
- Calendario de trabajo: https://docs.google.com/spreadsheets/u/1/d/1C0o6nHsccZLH3F16_n7NiZ3QxBL8-WfwXS5-zea69N4/edit
