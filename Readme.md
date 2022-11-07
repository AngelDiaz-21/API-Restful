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