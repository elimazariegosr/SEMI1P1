var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
var uuid = require('uuid');

var app = express();

var corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

const aws_keys = require('./users');

var port = 3000;
app.listen(port);
console.log('Server running in port: ', port);

//instanciamos el sdk
var AWS = require('aws-sdk');

//instanciamos los servicios a utilizar con sus respectivos accesos.
const s3 = new AWS.S3(aws_keys.s3);

//MySQL base de datos
var conn = mysql.createPool(aws_keys.db_credentials);

const perfil = "Fotos_Perfil";
const publicas = "Fotos_Publicadas";

//--------------------------------------------------ALMACENAMIENTO---------------------------------------
//subir foto en s3
app.post('/uploadImg', function (req, res) {
  var id = req.body.id;
  var foto = req.body.foto;

  //carpeta y nombre que quieran darle a la imagen
  var nombrei = "prueba/" + id;

  //se convierte la base64 a bytes
  let buff = new Buffer.from(foto, 'base64');

  const params = {
    Bucket: "practica1-g30-imagenes",
    Key: nombrei,
    Body: buff,
    ContentType: "image",
    ACL: 'public-read'
  };

  const putResult = s3.putObject(params).promise();
  res.json({ mensaje: putResult })
  return "exito"

});

//obtener foto en s3
app.post('/seeImg', function (req, res) {
  var id = req.body.id;

  //direcccion donde esta el archivo a obtener
  var nombrei = "prueba/" + id;
  var getParams = {
    Bucket: 'practica1-g30-imagenes',
    Key: nombrei
  }

  s3.getObject(getParams, function (err, data) {
    if (err)
      res.json({ mensaje: "error" })
    //de bytes a base64
    var dataBase64 = Buffer.from(data.Body).toString('base64');
    res.json({ mensaje: dataBase64 })
  });

});


//--------------------------------------------------BASES DE DATOS---------------------------------------//
app.post("/crearUsuario", async (req, res) => {
  console.log("CREAR USUARIO----------------->")
  let body = req.body;

  let user = body.user;
  let name = body.name;
  let pass = body.pass;

  let consulta = `insert into Usuario(codigo_usuario, nombre, psw) values ("${user}","${name}","${pass}");`;
  //console.log(consulta)    
  conn.query(consulta, function (err, result) {
    if (err){
      res.send(null);
    }else{
      res.send('{"res" : "si"}');
    }
  });

});

app.post("/crearAlbum", async (req, res) => {
  console.log("CREAR ALBUM----------------->")
  let body = req.body;

  let user = body.user;
  let album = body.album;

  
  let consulta = `insert into Album(nombre, usuario_codigo) values ("${album}","${user}");`;
  conn.query(consulta, function (err, result) {
    if (err){
      res.send(null);
    }else{
      res.send('{"res" : "si"}');
    }
  });

});

app.post("/crearFoto", async (req, res) => {
  console.log("CREAR FOTO----------------->")
  let body = req.body;

  let user = body.user;
  let album = body.album;
  let origen = body.origen;
  let nombreFoto = body.nombreFoto;
  let tipo = body.tipo;
  let base64 = body.base64;

  let img = "";
  if(origen == "0"){
    img = `${perfil}/${nombreFoto}-${uuid()}.${tipo}`;
  }else{
    img = `${publicas}/${nombreFoto}-${uuid()}.${tipo}`;
  }

  //Decodificar imagen
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

  s3.upload(paramsS3, function sync(err, data) {
    if (err) {
      console.log('Error uploading photo:', err);
      res.send(null)
    } else {
      url = data.Location;

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

});

app.post("/modificarUsuario", async (req, res) => {
  console.log("MODIFICAR USUARIO----------------->")
  let body = req.body;

  let user = body.user;
  let userNew = body.userNew;
  let nombre = body.nombre;
  let url = body.url;

  let consulta = `update Usuario set codigo_usuario="${userNew}", nombre="${nombre}", url_fotop="${url}" where codigo_usuario="${user}";`;
  conn.query(consulta, function (err, result) {
    if (err){
      res.send(null);
    }else{
      console.log(result)
      res.send('{"res":"si"}');
    }
  });

});

app.post("/buscarUsuario", async (req, res) => {
  console.log("BUSCAR USUARIO----------------->")
  let body = req.body;

  let user = body.user;

  let consulta = `select * from Usuario where codigo_usuario = "${user}";`;
  conn.query(consulta, function (err, result) {
    if (err){
      res.send(null);
    }else{
      res.send(result);
    }
  });

});

app.post("/buscarFotos", async (req, res) => {
  console.log("BUSCAR FOTOS----------------->")
  let body = req.body;

  let user = body.user;

  let consulta = `select F.nombre as nombreF, F.url_fotop, A.nombre as nombreA from Foto F, Album A where A.usuario_codigo = "${user}" and F.album_codigo = A.codigo_album;`;
  conn.query(consulta, function (err, result) {
    if (err){
      res.send(null);
    }else{
      res.send(result);
    }
  });

});

app.post("/buscarAlbum", async (req, res) => {
  console.log("BUSCAR ALBUM----------------->")
  let body = req.body;

  let user = body.user;

  let consulta = `select nombre from Album where usuario_codigo = "${user}" and nombre != "Fotos_Perfil";`;
  conn.query(consulta, function (err, result) {
    if (err){
      res.send(null);
    }else{
      res.send(result);
    }
  });

});

app.post("/eliminarAlbum", async (req, res) => {
  console.log("ELIMINAR ALBUM----------------->")
  let body = req.body;

  let user = body.user;
  let album = body.album;

  let consulta = `delete from Album where nombre="${album}" and usuario_codigo="${user}";`;
  conn.query(consulta, function (err, result) {
    if (err){
      res.send(null);
    }else{
      res.send('{"res":"si"}');
    }
  });

});

app.post("/", async (req, res) => {
  console.log("BUSCAR USUARIOS----------------->")

  let consulta = `select * from Usuario;`;
  conn.query(consulta, function (err, result) {
    if (err){
      res.send(null);
    }else{
      res.send(result);
    }
  });

});