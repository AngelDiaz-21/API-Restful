# Sesión 6: Desarrollo de API Restful l

Objetivo: 
* Desarrollar una API

Tabla de contenido:
* Analisis y diseño de base de datos.
* Configuración de base de datos.
* Generación de modelos/migraciones y configuración de conexión con Sequelize.
* Creación y definición de API.
* Programación de funcionadad Create, Read, Updated y Delete.

## Descripción del problema
Pepe es un emprendedor y experto en ventas, uno de sus objetivos este año es lanzar su primera tienda en línea para venta de productos de cómputo. En su plataforma, podrán registrarse los usuarios para completar su proceso de compra y escribir alguna reseña de los productos que han adquirido.
Él necesita de tu ayuda para crear su plataforma, en la cuál se publicaran productos, reseñas de los producto y además se gestionarán usuarios y ordenes de compras.

Las propiedades que a Pepe le gustaría tener sobre las tablas son las siguientes
* Productos
  - Nombre del producto.
  - Breve descripción.
  - Precio.
  - Imagen del producto.

* Reviews
  - Contenido de la reseña.
  - Se debe de agregar una relación entre el producto y la reseña.

* Users
  - Nombre del usuario.
  - Apellido paterno.
  - Apellido materno.
  - Tipo de usuario.
        - La plataforma deberá tener dos tipos de usuarios: administrador y cliente.
  - Email.
  - Password.

* Orders
  - Se debe de agregar una relación entre el producto y la orden.
  - Se debe de agregar una relación entre el usuario y la orden.
  - Número de productos agregados.

## Desarrollo
En un principio se inicializo un nuevo proyecto con Node utilizando el comando `npm init` y sucesivamente se instaló la dependencia de express con el comando `npm i express`.

Luego en el archivo ``server.js`` se guardo toda la configuración inicial así como la incialización de la aplicación con express.

Después, se instaló sequelize y mysql2 con los siguientes comandos:
```
npm install sequelize
npm install mysql2
```

Las instalaciones anteriores más adelante nos permitirán realizar la conexión con la base de datos así como interactuar con ella, es decir, poder agregar, leer, actualizar y borrar registros. Otras función que se tiene es que se puede generar de una manera más simple y sencilla la base de datos a través de las migraciones.

También se instaló sequelize-cli como dependencia de desarrollo con el siguiente comando:
```
npm i -D sequelize-cli
```

El comando para generar una migration de una tabla con sequelize es el siguiente:
```
./node_modules/.bin/sequelize migration:create --name nombre_Tabla
```
Ejemplo:
```
./node_modules/.bin/sequelize migration:create --name CreateTableProducts
```

Una vez que se entendió lo anterior se realizó la migration de las tablas Products, Reviews, Users y Orders. Al momento de escribir el código para las migraciones, para especificar el tipo de dato que se utilizará se hace usando `Sequelize`, es decir, de la siguiente manera
`Sequelize.STRING`, etc.

Antes de ejecutar las migraciones se crea un archivo ``config.json`` donde sequelize obtendrá los datos de conexión a la base de datos y de esta manera ejecutar las migraciones.
En el archivo ``config.json`` se necesitan los siguientes parámetros:
```
{
    "development":{
        "username": "username_DB",
        "password": "password_DB",
        "database": "nombre_DB",
        "host": "127.0.0.1",
        "port": "3306",
        "dialect": "mysql"
    }
}
```

Para ejecutar o crear las tablas en la base de datos de mysql se hace con el siguiente comando:
```
./node_modules/.bin/sequelize db:migrate
```

Una vez que se han creado las tablas en la base de datos para poder interactuar con ellas en el proyecto se crearon sus respectivos modelos. En el caso de los modelos para especificar el tipo de dato se recomienda utilizar ``DataTypes`` y no ``Sequelize``.

Luego que se han generado los modelos se deben de registrar, para esto se crea el archivo `db.js`. Adentro del archivo se debe de importar Sequelize, luego se importan los modelos, también se hace la conexión a la base de datos. Una vez hecho lo anterior se deben de obtener los modelos para esto se hace un arreglo llamado models y adentro se colocan el nombre de los modelos que se importaron anteriormente. Luego se deben de registrar los modelos en sequelize y para esto se hace con un `for`, adentro se crea una variable llamada model la cual va a recorrer a la variable models(la cuál es un arreglo que contiene los 4 modelos) y después, se utiliza model y sequelize para hacer la conexión de los modelos y sequelize. Por último, se hace la configuración de las relaciones, es decir, las relaciones que tienen los modelos.

Luego en el directorio de rutas se crea un archivo llamado `index.js`, dentro se importará express así como la función `Router` y se agregarán las rutas de los diferentes modelos, tendrá la siguiente sintaxis:
`app.use(path, handler)`
Ejemplo:
`router.use('/users', require('./users'));`

Una vez que se crea el archivo ``index.js`` en el directorio de rutas se debe registrar en el archivo `server.js`:
`app.use('/api', require('./routes'));`

Nuevamente en el directorio de rutas se crean los archivos correspondientes para cada modelo con el fin de poder gestionar la información a través de los métodos HTTP como `get`, `post`, `put` y `delete`, también conocido como CRUD. Por último, las rutas se deben de agregar dentro del archivo ``index.js``.

Nota: En migraciones usar sequelize y no DataTypes

Para cubrir algunos de los elementos básicos de seguridad de un servicio web, utilizaremos un paquete para Express llamada Helmet.
Helmet es un middleware con un set de HTTP Headers para proteger nuestra aplicación, contra Sniffers, ataques XSS, protecciones a través de políticas y controles de DNS, entre otras.

También, haremos una protección utilizando CORS (Cross-origin resource sharing), con el cuál indicaremos los origenes permitidos para acceder a nuestros recursos desde un servidor, en un origen distinto (dominio) al que pertenece.

Una vez que hayan sido instaladas, vamos a abrir nuestro archivo app.js y agregaremos la configuración necesaria para helmet y cors.
Además, helmet nos da la facilidad de personalizar las configuraciones de cada una de las protecciones (como las cabeceras) que se han aplicado e incluso aplicar de manera individual cada una de ellas para una mejor gestión.

``npm i helmet cors``

El primer paso que haremos, será corregir como se almacenan las contraseñas en nuestra base de datos, por ahora, todo usuario registrado a través de nuestro API almacena la contraseña en un texto plano. Como sabes esto es una mala práctica de seguridad, ya que si por alguna razón un intruso llegara a vulnerar tu base de datos, podrá obtener los datos y sus contraseñas y será un problema para tu aplicación y tus usuarios. Así que, vamos a protegerlas, para eso utilizaremos el paquete bcrypt que nos permitirá hashear nuestros password y mantenerlos seguros.

``npm i bcrypt``

Ahora que hemos instalado la dependencia, haremos una modificación a nuestro módelo de usuarios dentro del archivo /models/User.js. Donde a través de los hooks disponibles dentro de Sequelize, utilizaremos beforeCreate, indicandole que antes de que se cree el registro debe procesar el password y hashearlo.

También, agregaremos un método al modelo para validar las contraseñas hasheadas con lo que el usuario nos esta enviando a través de su solicitud.

El método compara/valida las contraseñas, de la que el usuario esta usando y de la que esta guardada en la db. Se usaria como para el login
    Función que se esta incorporando: validPassword
    Se deja con una función normal, ya que con un arrow function da error con el prototype

Ahora, vamos a generar nuestras rutas para iniciar sesión o permitir que un usuario se registre. Primero, vamos a generar un archivo auth.js donde agregaremos la lógica correspondiente a la autenticación del usuario.

necesitamos una nueva dependencia para generar los tokens de acceso, así que vamos a instalar la dependencia:
npm i jsonwebtoken

vamos a crear la lógica correspondiente a Iniciar sesión. Dentro de la ruta login primero se extrae el body de la petición, luego se utilza el modelo users y se hace una búsqueda con el método `findOne` el cuál devuelve un único registro de acuerdo a lo que se haya indicado en el where, que en este caso es el email.
Después, se hace 2 validaciones, la primera validación indica que si no se encontró el registro indicado anteriormente muestre un mensaje de Unauthorized. La segunda validación permite validar el password que se envié en la petición (request), para esto se utiliza el método `validPassword` que se creó en el modelo users. Ya que anteriormente a la constante user se le asignó `sequelize.models.users` se puede acceder al método. En dado caso que la contraseña no sea correcta se mostrará un mensaje de Invalid credentials. 

Luego se genera el token con jwt. Con jwt se pasan datos no tan relevantes, en este caso será con id. En producción no se recomienda dejar el parámetro secretKey. También se indica la expiración del token en segundos para ya no hacer validaciones. Con un token podemos saber que usuarios son.

Por último, si todo esta correcto se envía como respuesta un mensaje de Athenticated successfully! junto con el token generado.

Para la ruta signup(crear cuenta) nuevamente se crea una constante y se desestructura body del request, esto con el fin de ya no realizar lo siguiente `req.body.name` quedando de la siguiente manera `body.name`.
Lugo se hace una búsqueda en el modelo users con el método `findOne`, en este caso va buscar si el email ingresado en la petición existe dentro de la db. Luego se hace una validación con un `if`, en donde si dentro de la db ya existe ese email regrese un mensaje de this email is already registered, sino existe entonces creará ese nuevo usuario con el método `create`, en este caso por defecto en el tipo de usuario se esta dejando que sea un `client`. Por último, devuelve un mensaje de Your account was created successfully.

Nota: En algunas otras rutas para crear registros se usa el método `create` y seguido del método `save`, sin embargo, no es necesario usar el método `save` ya que el método `create` tiene la misma función.

También se podría utilizar este otro código:
```
const { name, firstSurname, secondSurname, email, password } = req.body;
    let statusCode = 201;
    const response = {
        success: true,
        message: "",
        data: []
    };

    let user = await models.users.findOne({
        where:{
            email,
        },
    });

    console.log(user);

    if(user){
        response.success = false;
        response.message = "Email is already taken";
        statusCode = 400;
    } else {
        const hash = await bcrypt.hash(password, 10);
        const data = {name, email, firstSurname, secondSurname, type: "Customer"};
        user = await models.users.create({ ...data, password: hash });
        response.message = "Customer was successfully registered";
    }

    return res.status(statusCode).json(response);
```

En la clase anterior, hemos construido el proceso de autenticación, permitiendonos generar usuarios e iniciar sesión, sin embargo todavía todos los usuarios tienen acceso a nuestras rutas. Por eso, es importante indicar cuales de nuestras rutas son de acceso autorizado y además si tiene el rol para hacerlo.

**Autenticación de usuarios**
Lo primero que haremos será generar un middleware que nos permitirá verificar el acceso e identificar el usuario autenticado. Vamos a crear el directorio middlewares donde crearemos cada uno de ellos.
Ahora, crearemos un archivo authentication.js donde escribiremos las validaciones necesarias.
Como podrás observar en el código anterior los middlewares tienen una similitud a los handlers de las solicitudes, sin embargo, su caracteristica principal es interceptar las solicitudes para realizar una acción previa a continuar con la solicitud.

Ya con el middleware listo, es momento de implementarlo en aquellas rutas que sean consideradas de acceso restringido, en este caso, las de productos, reseñas, usuarios y ordenes de compra. Para lograrlo haremos una modificación en nuestro archivo routes/index.js.

*Entonces con la autenticación de usuarios le indicamos a la APP cuales rutas se pueden usar siempre y cuando se haya hecho un login*

Ahora que ya estamos autenticados, necesitamos indicarle a nuestra API, cuales rutas son accesibles para usuarios de tipo administrador y cuales son para usuarios de tipo cliente.

Vamos a construir un nuevo middleware que nos permitirá identificar si un usuario tiene acceso o no a cierto recurso.

Con este middleware ahora podremos utilizarlo en cada una de nuestras rutas, para protegerlo de acuerdo a los requerimientos.

Por ejemplo en productos podría quedar de la siguiente manera:
```
// products.js
const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const permission = require('../middlewares/permission');

// Get all products
router.get('/', permission('admin', 'client'), async (req, res) => {
  ...
});

// Create a new product
router.post('/', permission('admin'), async (req, res) => {
  ...
});

// Update a product by id
router.put('/:id', permission('admin'), async (req, res) => {
  ...
});

// Delete a product by id
router.delete('/:id', permission('admin'), async (req, res) => {
  ...
});

module.exports = router;
```
En donde tanto para administradores y clientes podrían ver todos los productos. Pero ya para crear, actualizar y borrar solo lo podría hacer el administrador.

Instalar dotenv para usar las variables de entorno
``npm i dotenv``