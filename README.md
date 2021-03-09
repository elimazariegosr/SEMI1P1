# [SEMI1]Practica1 💡
developed by **Eli Samuel Mazariegos Ramirez - 201709426**
developed by **Miguel Angel Solis Yantuche - 201700543**

## _Manual Tecnico_ 📔

Amazon Web Services (AWS) es una plataforma de servicios de nube que ofrece potencia de cómputo, almacenamiento de bases de datos, entrega de contenido y otra funcionalidad para ayudar a las empresas a escalar y crecer.

Se desarrollaro un aplicación web similar a un aplicación para almacenamiento de fotos, esta permitire subir todo tipo de fotos. Tiene las secciones para listar todas las fotos subidas, listarlas por álbumes o mostrar las fotos de perfil del usuario.

Mediante la ayuda de un balanceador de carga se tiene resguardado lo que es la conexión de la aplicación, a la hora que uno de los 2 servidores sea apagado este debe de ser capaz de redirigir el trafico al servidor aun en funcionamiento.

Para la práctica se utilizaron de los siguientes servicios de AWS:
- Usuarios IAM
- Instancias EC2
- Segurity Groups
- Balanceador de Carga
- Buckets de S3
- RDS


## BackEnd 💻
### Servidor Node JS 📲

Librerias utilizadas:
- Express
- BodyParser
- Cors
- Mysql
- Uuid
- Aws-sdk

Se importan las librerias:
```
var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
var uuid = require('uuid');
var AWS = require('aws-sdk');
```

Se instancia el servidor con sus configuraciones y se inicia:
```
var app = express();
var corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
var port = 3000;
app.listen(port);
console.log('Server running in port: ', port);
```

Se instancias los servicios a utilizar de aws y mysql con sus respectivas keys:
```
//Importamos las llaves de los diferentes servicios
const aws_keys = require('./users');

//Instanciamos el sdk
var AWS = require('aws-sdk');

//Instanciamos los servicios a utilizar con sus respectivos accesos.
const s3 = new AWS.S3(aws_keys.s3);

//MySQL base de datos
var conn = mysql.createPool(aws_keys.db_credentials);
```

Ejemplo de un servicio (los demas se encuentran en /Servidores/Server js/index.js):
- Creacion de una foto, el resultado es un json del url de la imagen de ser exitosa la insercion o un null de no haberla echo
```
//Se obtienen los datos del request
let body = req.body;
let user = body.user;
let album = body.album;
let origen = body.origen;
let nombreFoto = body.nombreFoto;
let tipo = body.tipo;
let base64 = body.base64;

//Se inisializa la direccion que tendra la imagen en el bucket S3
let img = "";
if(origen == "0"){
  img = `${perfil}/${nombreFoto}-${uuid()}.${tipo}`;
}else{
  img = `${publicas}/${nombreFoto}-${uuid()}.${tipo}`;
}

//Decodifica imagen de base64 a bytes
let encodedImage = base64;
let decodedImage = Buffer.from(encodedImage, 'base64');

//Parámetros para subir imagen a S3
var paramsS3 = {
  Bucket: "practica1-g30-imagenes",
  Key: img,
  Body: decodedImage,
  ContentType: "image",
  ACL: 'public-read',
};

//Realiza la incercion de la imagen al bucket S3
s3.upload(paramsS3, function sync(err, data) {
if (err) {
  console.log('Error uploading photo:', err);
  res.send(null)
} else {
  //Se obtiene la direccion de la imagen creada
  url = data.Location;

  //Se genera la consulta de insercion a realizar en mysql
  let consulta = `insert into Foto(nombre, url_fotop, album_codigo) values ("${nombreFoto}","${url}",(select codigo_album from Album where nombre = "${album}" and usuario_codigo = "${user}" group by codigo_album));`;
  conn.query(consulta, function (err, result) {
    if (err){
      res.send(null);
    }else{
      res.send(`{"res": "${url}"}`);
    }
  });
}
});
```

### Servidor Python 🐍
Librerias utilizadas:
- Flask
- Flask-cors
- Boto3
- Base64
- Os
- Mysql
- Uuid

Se importan las librerias:
```
from flask import Flask, request, jsonify, json
import boto3, base64, os, MySQLdb, uuid
from botocore.config import Config
from flask_cors import CORS
```

Se instancia el servidor con sus configuraciones y se inicia:
```
app = Flask(__name__)
CORS(app)

if __name__ == '__main__':
    app.run(debug=True)#host='0.0.0.0',
```

Se instancias los servicios a utilizar de aws y mysql con sus respectivas keys:
```
//Se inician los datos a utilizar de mysql
ENDPOINT="direccion de mysql"
USR="usuario"
PASS="contraseña"
DBNAME="nombre de la base de datos"

//Se inicia el servicio de mysql
conn =  MySQLdb.connect(host=ENDPOINT, user=USR, passwd=PASS, database=DBNAME)
cur = conn.cursor()

//Variables utilizadas para subir las imagenes a S3
ruta = "https://practica1-g30-imagenes.s3.us-east-2.amazonaws.com/"
perfil = "Fotos_Perfil"
publicas = "Fotos_Publicadas"
```

Ejemplo de un servicio (los demas se encuentran en /Servidores/Server py/index.py):

- Creacion de una foto, el resultado es un json del url de la imagen de ser exitosa la insercion o un null de no haberla echo
```
try:
    //Se obtienen los datos del request
    req = request.get_json()
    user = req['user']
    album = req['album']
    origen = req['origen']
    nombreFoto = req['nombreFoto']
    tipo = req['tipo']
    base64s = req['base64']

    //Se inisializa la direccion que tendra la imagen en el bucket S3
    img = uuid.uuid4()
    if(origen == "0"):
        img = f'{perfil}/{nombreFoto}-{str(img)}.{tipo}'
    else:
        img = f'{publicas}/{nombreFoto}-{str(img)}.{tipo}'
    
    //Se genera la url de la imagen
    url = ruta + img
    
    //Decodifica imagen de base64 a bytes
    image_64_decode = base64.b64decode(base64s)
    
    //Parámetros para subir imagen a S3
    client = boto3.resource('s3', config=Config( region_name = 'nombre de la region del bucket' ),
                    aws_access_key_id = 'key id del usuario con permisos S3',
                    aws_secret_access_key = 'access key del usuario con permisos S3'
                    )
    //Realiza la incercion de la imagen al bucket S3
    response = client.Bucket('nombre del bucket').put_object(Key=img, Body=image_64_decode, ContentType="image", ACL='public-read')

    //Se genera la consulta de insercion a realizar en mysql
    consulta = f'insert into Foto(nombre, url_fotop, album_codigo) values ("{nombreFoto}","{url}",(select codigo_album from Album where nombre = "{album}" and usuario_codigo = "{user}" group by codigo_album));'

    a = cur.execute(consulta)
    if(a):
        conn.commit()
        return '{"res": "' + url +'"}'
    else:
        return 'null'

except Exception as e:
    return 'null'
```

## FrontEnd
