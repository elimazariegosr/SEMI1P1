var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
var uuid = require('uuid');
const mysql = require('mysql');

var app = express();

var corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

//const mysql = require('mysql');
//var uuid = require('uuid');
const aws_keys = require('./users');

var port = 3000;
app.listen(port);
console.log('Server running in port: ', port);

//const db_credentials = require('./db_creds');
//var conn = mysql.createPool(db_credentials);

//instanciamos el sdk
var AWS = require('aws-sdk');

//instanciamos los servicios a utilizar con sus respectivos accesos.
const s3 = new AWS.S3(aws_keys.s3);
const ddb = new AWS.DynamoDB(aws_keys.dynamodb);

const fijo = "https://practica1-g30-imagenes.s3.us-east-2.amazonaws.com/";

//MySQL base de datos
var conn = mysql.createPool(aws_keys.db_credentials);

const tabla = "semi_practica1";
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


//--------------------------------------------------BASES DE DATOS---------------------------------------
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
      res.send("{'message':'user exist'}");
    }else{
      res.send("{'message':'user created'}");
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
      res.send("{'message':'album exist'}");
      return;
    }else{
      res.send("{'message': 'album created'}");
    }
  });

});

app.post("/crearFoto", async (req, res) => {
  console.log("CREAR USUARIO----------------->")
  let body = req.body;

  let user = body.user;
  let album = body.album;
  let origen = body.origen;
  let nombreFoto = body.nombreFoto;
  let tipo = body.tipo;
  let base64String = body.base64;

  let img = "";
  if(origen == "0"){
    img = perfil + "/" + nombreFoto + "." + tipo;
  }else{
    img = publicas + "/" + nombreFoto + "." + tipo
  }

  //Decodificar imagen
  let encodedImage = base64String;
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
      res.send({ 'message': 's3 failed' })
    } else {
      url = data.Location;

      let consulta = `insert into Foto(nombre, url_fotop, album_codigo) values ("${nombreFoto}","${url}",(select codigo_album from Album where nombre = "${album}" and usuario_codigo = "${user}"group by codigo_album));`;
      //console.log(consulta)
      conn.query(consulta, function (err, result) {
        if (err){
          res.send("{'message':'image exist'}");
          return;
        }else{
          res.send("{'message': 'image created'}");
        }
      });
      
    }

  });

  
  /*conn.query(`SELECT * FROM ejemplo`, function (err, result) {
    if (err) throw err;
    res.send(result);
  });*/
});

app.post("/modificarUsuario", async (req, res) => {
  console.log("CREAR USUARIO----------------->")
  let body = req.body;

  let user = body.user;
  let album = body.album;
  let origen = body.origen;
  let nombreFoto = body.nombreFoto;
  let tipo = body.tipo;
  let base64String = body.base64;

  //Decodificar imagen
  let encodedImage = base64String;
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
      res.send({ 'message': 's3 failed' })
    } else {
      url = data.Location;

      let consulta = `insert into Foto(nombre, url_fotop, album_codigo) values ("${nombreFoto}","${url}",(select codigo_album from Album where nombre = "${album}" and usuario_codigo = "${user}"group by codigo_album));`;
      //console.log(consulta)
      conn.query(consulta, function (err, result) {
        if (err){
          res.send("{'message':'image exist'}");
          return;
        }else{
          res.send("{'message': 'image created'}");
        }
      });
      
    }

  });

  
  /*conn.query(`SELECT * FROM ejemplo`, function (err, result) {
    if (err) throw err;
    res.send(result);
  });*/
});

app.post("/modificarUsuario", async (req, res) => {
  console.log("CREAR USUARIO----------------->")
  let body = req.body;

  let user = body.user;
  let album = body.album;
  let origen = body.origen;
  let nombreFoto = body.nombreFoto;
  let tipo = body.tipo;
  let base64String = body.base64;

  //Decodificar imagen
  let encodedImage = base64String;
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
      res.send({ 'message': 's3 failed' })
    } else {
      url = data.Location;

      let consulta = `insert into Foto(nombre, url_fotop, album_codigo) values ("${nombreFoto}","${url}",(select codigo_album from Album where nombre = "${album}" and usuario_codigo = "${user}"group by codigo_album));`;
      //console.log(consulta)
      conn.query(consulta, function (err, result) {
        if (err){
          res.send("{'message':'image exist'}");
          return;
        }else{
          res.send("{'message': 'image created'}");
        }
      });
      
    }

  });

});


//--------------------------------------------------BASES DE DATOS---------------------------------------
//Registrar usuario, subir foto y guardar en dynamo
app.post('/createUsr', (req, res) => {
  console.log("CREAR USUARIO----------------->")
  let body = req.body;

  let user = body.user;
  let name = body.name;
  let pass = body.pass;
  //let album = body.album;
  let nombreFoto = body.nombreFoto;
  let tipo = body.tipo;
  let base64String = body.base64;

  let img = perfil + "/" + nombreFoto + "." + tipo;

  //Decodificar imagen
  let encodedImage = base64String;
  let decodedImage = Buffer.from(encodedImage, 'base64');

  //Parámetros para subir imagen a S3
  var paramsS3 = {
    Bucket: "practica1-g30-imagenes",
    Key: img,
    Body: decodedImage,
    ContentType: "image",
    ACL: 'public-read',
  };

  //Subida de imagen al S3
  s3.upload(paramsS3, function sync(err, data) {
    if (err) {
      console.log('Error uploading file:', err);
      res.send({ 'message': 's3 failed' })
    } else {
      let url = data.Location;
      console.log(url)

      //Parametros para surbir usuario a dynamo
      var paramsDy = {
        TableName: tabla,
        Item: {
          'id': {S: uuid()},
          'user' : {S : user},
          'name' : {S : name},
          'pass' : {S : pass},
          'fotoPerfil' : {S : url},
          /*'album': {S: album},
          'nombreFoto' : {S : nombreFoto},
          'tipo' : {S : tipo},
          'fotoUrl' : {S : url}*/
        }
      };
      
      //Subida de ususario a dynamo
      ddb.putItem(paramsDy, function (err, data) {
        if (err) {
          console.log('Error saving data:', err);
          res.send({ 'message': 'db failed' });
        } /*else {
          console.log('Save success:', data);
          res.send({ 'message': 'db success' });
        }*/
      });


      //Parametros para subir imagen de usuario a dynamo
      var paramsDy = {
        TableName: tabla,
        Item: {
          'id': {S: uuid()},
          'user' : {S : user},
          /*'name' : {S : ""},
          'pass' : {S : ""},
          'fotoPerfil' : {S : ""},
          'album': {S: album},*/
          'nombreFoto' : {S : nombreFoto},
          'tipo' : {S : tipo},
          'fotoUrl' : {S : url}
        }
      };
      
      //Subida de imagen a dynamo
      ddb.putItem(paramsDy, function (err, data) {
        if (err) {
          console.log('Error saving data:', err);
          res.send({ 'message': 'db failed' });
        } else {
          console.log('Save success:', data);
          res.send({ 'message': 'user created' });
        }
      });

    }

  });

});

//Obtener datos del usuario en la BD
app.post("/getUsr", async (req, res) => {
  console.log("OBTENER USUARIO----------------->")
  let body = req.body;
  let user = body.user;
  let pass = body.pass;

  //Parametros de usuario a buscar
  var paramsUsr = {
    TableName: tabla,
    ConsistentRead: true,
    //ProjectionExpression: "id, nombre,fotos,nombres",
    FilterExpression: "#name = :val and #name1 = :val1",
    ExpressionAttributeNames:{
        "#name": "user",
        "#name1": "pass"
    },
    ExpressionAttributeValues: {
        ":val": {S: user},
        ":val1": {S: pass}
    }
  };

  //Consulta de usuario a dynamo
  ddb.scan(paramsUsr, function(err, data) {
    if (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
      res.send({ 'message': 'db failed' });

    } else {
      if(data.Items.length == 1){
        let usr = data.Items[0];
        console.log("Query succeeded. Usrs=" + data.Items.length);
        //res.send({"user":usr.user, "name":usr.name, ""});
        res.json(usr);

      }else{
        res.send({ 'message': 'user doesnt exist' });
      }
    }
  });

});

//Realizar login del usuario
app.post("/login", async (req, res) => {
  console.log("LOGIN USUARIO----------------->")
  let body = req.body;
  
  //Parametros de usuario a logear
  var paramsUsr = {
    TableName: tabla,
    ConsistentRead: true,
    //ProjectionExpression: "id, nombre,fotos,nombres",
    FilterExpression: "#name = :val and #name1 = :val1",
    ExpressionAttributeNames:{
        "#name": "user",
        "#name1": "pass"
    },
    ExpressionAttributeValues: {
        ":val": {S: body.user},
        ":val1": {S: body.pass}
    }
  };

  //Consulta de usuario a dynamo
  ddb.scan(paramsUsr, function(err, data) {
    if (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
      res.json(err);

    } else {
      if(data.Items.length == 1){
        let user = data.Items[0];
        console.log("Query succeeded.");
        res.json(user);

      }else{
        console.log("Query error.");
        res.send({ 'message': 'invalid data' });
      }
    }
  });

});

//Editar perfil del usuario
app.post("/editUsr", async (req, res) => {
  console.log("EDITAR USUARIO----------------->")
  let body = req.body;

  let id = body.id;
  let user = body.user;
  let name = body.name;
  let pass = body.pass;
  let fotoPerfil = body.fotoPerfil;

  let nombreFoto = body.nombreFoto;
  let tipo = body.tipo;
  let base64String = body.base64;

  if(base64String != ""){
    let img = perfil + "/" + nombreFoto + "." + tipo;
    //Decodificar imagen
    let encodedImage = base64String;
    let decodedImage = Buffer.from(encodedImage, 'base64');

    //Parámetros para S3
    var paramsS3 = {
      Bucket: "practica1-g30-imagenes",
      Key: img,
      Body: decodedImage,
      ContentType: "image",
      ACL: 'public-read',
    };

    //Subida de imagen a S3
    s3.upload(paramsS3, function sync(err, data) {
      if (err) {
        console.log('Error uploading file:', err);
        res.send({ 'message': 's3 failed' })

      } else {
        fotoPerfil = data.Location;

        //Parametros para subir imagen de usuario a dynamo
        var paramsDy = {
          TableName: tabla,
          Item: {
            'id': {S: uuid()},
            'user' : {S : user},
            'nombreFoto' : {S : nombreFoto},
            'tipo' : {S : tipo},
            'fotoUrl' : {S : fotoPerfil}
          }
        };
        
        //Subida de imagen a dynamo
        ddb.putItem(paramsDy, function (err, data) {
          if (err) {
            console.log('Error saving data:', err);
            res.send({ 'message': 'db failed' });
          } /*else {
            console.log('Save success:', data);
            res.send({ 'message': 'db success' });
          }*/
        });

        //Parametros de usuario a actualizar
        var paramsDy = {
          TableName: tabla,
          Item: {
            'id': {S: id},
            'user' : {S : user},
            'name' : {S : name},
            'pass' : {S : pass},
            'fotoPerfil' : {S : fotoPerfil}
          }
        };

        //Actualizacion de usaurio en dynamo
        ddb.putItem(paramsDy, function (err, data) {
          if (err) {
            console.log('Error saving data:', err);
            res.send({ 'message': 'update failed' });
          } else {
            console.log('Save success:', data);
            res.send({ 'message': 'update success' });
          }
        });

      }

    });
  }

});

//Actualiza la foto de perfil del usuario
app.post('/updateFotoUsr', (req, res) => {
  console.log("ACTUALIZAR FOTO DE PERFIL----------------->")
  let body = req.body;

  let id = body.id;
  let user = body.user;
  
  let nombreFoto = body.nombreFoto;
  let tipo = body.tipo;
  let base64String = body.base64;

  let img = perfil + "/" + nombreFoto + "." + tipo;

  //Decodificar imagen
  let encodedImage = base64String;
  let decodedImage = Buffer.from(encodedImage, 'base64');

  //Parámetros para subir imagen a S3
  var paramsS3 = {
    Bucket: "practica1-g30-imagenes",
    Key: img,
    Body: decodedImage,
    ContentType: "image",
    ACL: 'public-read',
  };

  //Subida de imagen al S3
  s3.upload(paramsS3, function sync(err, data) {
    if (err) {
      console.log('Error uploading file:', err);
      res.send({ 'message': 's3 failed' })
    } else {
      let url = data.Location;
      console.log(url)

      //Parametros para subir imagen de usuario a dynamo
      var paramsDy = {
        TableName: tabla,
        Item: {
          'id': {S: uuid()},
          'user' : {S : user},
          'nombreFoto' : {S : nombreFoto},
          'tipo' : {S : tipo},
          'fotoUrl' : {S : url}
        }
      };
      
      //Subida de imagen a dynamo
      ddb.putItem(paramsDy, function (err, data) {
        if (err) {
          console.log('Error saving data:', err);
          res.send({ 'message': 'db failed' });
        } else {
          console.log('Save success:', data);
          //res.send({ 'message': 'user created' });
        }
      });

      //Parametros de usuario a actualizar
      var paramsDy = {
        TableName: tabla,
        Item: {
          'id': {S: id},
          'fotoPerfil' : {S : url}
        }
      };

      //Actualizacion de usaurio en dynamo
      ddb.putItem(paramsDy, function (err, data) {
        if (err) {
          console.log('Error saving data:', err);
          res.send({ 'message': 'update failed' });
        } else {
          console.log('Save success:', data);
          res.send({ 'message': 'update image success' });
        }
      });

    }

  });

});

//Subir foto
app.post("/uploadFotoUsr", async (req, res) => {
  console.log("SUBIR FOTO----------------->")
  let body = req.body;

  let user = body.user;
  let album = body.album;
  let nombreFoto = body.nombreFoto;
  let tipo = body.tipo;
  let base64String = body.base64;
  let fotoUrl = "";

  let img = publicas + "/" + nombreFoto + "." + tipo;
  //Decodificar imagen
  let encodedImage = base64String;
  let decodedImage = Buffer.from(encodedImage, 'base64');

  //Parámetros para S3
  var paramsS3 = {
    Bucket: "practica1-g30-imagenes",
    Key: img,
    Body: decodedImage,
    ContentType: "image",
    ACL: 'public-read',
  };

  //Subida de imagen a S3
  s3.upload(paramsS3, function sync(err, data) {
    if (err) {
      console.log('Error uploading file:', err);
      res.send({ 'message': 's3 failed' })

    } else {
      fotoUrl = data.Location;

      //Parametros para subir imagen de usuario a dynamo
      var paramsDy = {
        TableName: tabla,
        Item: {
          'id': {S: uuid()},
          'user' : {S : user},
          'nombreFoto' : {S : nombreFoto},
          'tipo' : {S : tipo},
          'fotoUrl' : {S : fotoUrl},
          'album' : {S: album}
        }
      };
      
      //Subida de imagen a dynamo
      ddb.putItem(paramsDy, function (err, data) {
        if (err) {
          console.log('Error saving data:', err);
          res.send({ 'message': 'db failed' });
        } else {
          console.log('Save success:', data);
          res.send({ 'message': 'foto upload success' });
        }
      });

    }

  });


});


//Actualizar user de las fotos
app.post("/updateFotoUsr", async (req, res) => {
  console.log("EDITAR USUARIO----------------->")
  let body = req.body;

  let id = body.id;
  let user = body.user;
  let name = body.name;
  let pass = body.pass;
  let fotoPerfil = body.fotoPerfil;

  let nombreFoto = body.nombreFoto;
  let tipo = body.tipo;
  let base64String = body.base64;

  if(base64String != ""){
    let img = perfil + "/" + nombreFoto + "." + tipo;
    //Decodificar imagen
    let encodedImage = base64String;
    let decodedImage = Buffer.from(encodedImage, 'base64');

    //Parámetros para S3
    var paramsS3 = {
      Bucket: "practica1-g30-imagenes",
      Key: img,
      Body: decodedImage,
      ContentType: "image",
      ACL: 'public-read',
    };

    //Subida de imagen a S3
    s3.upload(paramsS3, function sync(err, data) {
      if (err) {
        console.log('Error uploading file:', err);
        res.send({ 'message': 's3 failed' })

      } else {
        fotoPerfil = data.Location;

        //Parametros para subir imagen de usuario a dynamo
        var paramsDy = {
          TableName: tabla,
          Item: {
            'id': {S: uuid()},
            'user' : {S : user},
            'nombreFoto' : {S : nombreFoto},
            'tipo' : {S : tipo},
            'fotoUrl' : {S : fotoPerfil}
          }
        };
        
        //Subida de imagen a dynamo
        ddb.putItem(paramsDy, function (err, data) {
          if (err) {
            console.log('Error saving data:', err);
            res.send({ 'message': 'db failed' });
          } /*else {
            console.log('Save success:', data);
            res.send({ 'message': 'db success' });
          }*/
        });

      }

    });
  }

  //Parametros de usuario a actualizar
  var paramsDy = {
    TableName: tabla,
    Item: {
      'id': {S: id},
      'user' : {S : user},
      'name' : {S : name},
      'pass' : {S : pass},
      'fotoPerfil' : {S : fotoPerfil}
    }
  };

  //Actualizacion de usaurio en dynamo
  ddb.putItem(paramsDy, function (err, data) {
    if (err) {
      console.log('Error saving data:', err);
      res.send({ 'message': 'update failed' });
    } else {
      console.log('Save success:', data);
      res.send({ 'message': 'update success' });
    }
  });

  //Parametros de usuario a logear
  var paramsUsr = {
    TableName: tabla,
    ConsistentRead: true,
    Key:{
      "user":user
    },
    FilterExpression: "#name = :val",
    ExpressionAttributeNames:{
        "#name": "user"
    },
    ExpressionAttributeValues: {
        ":val": {S: user}
    }
  };

  var params = {
    TableName:table,
    Key:{
        "user": user
    },
    UpdateExpression: "#name = :val",
    ConditionExpression: "#name = :val",
    ExpressionAttributeNames:{
      "#name": "user"
    },
    ExpressionAttributeValues: {
        ":val": {S: userLast}
    },
    ReturnValues:"UPDATED_NEW"
  };

});


//prueba exitosa no tocar :v

  app.get("/prueba", async (req, res) => {
    let dato = req.body.dato;
    let dato1 = req.body.dato1;

    var params = {
      TableName: tabla,
      Key:{
          "user": {S: "elimazarieos"}
      },
      UpdateExpression: "SET #user = :val",
      //ConditionExpression: ":dato1 = :val",
      ExpressionAttributeNames:{
        "#user": "user"
      },
      ExpressionAttributeValues: {
          ":val": {S: "modificado"}
      },
      ReturnValues:"UPDATED_NEW"
    };
    console.log(params)

    ddb.updateItem(params, function(err, data) {
        if (err) {
          console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
          res.send(err);
        } else {
          console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
          res.send(data);
        }
    });

  });




//prueba exitosa no tocar :v
/*
  app.get("/prueba", async (req, res) => {
    let dato = req.body.albun;
    let dato1 = req.body.albun1;
    var params = {
      TableName: tabla,
      ConsistentRead: true,
      //ProjectionExpression: "id, nombre,fotos,nombres",
      FilterExpression: "#name = :val and #name1 = :val1",
      ExpressionAttributeNames:{
          "#name": "nombreFoto",
          "#name1": "user"
      },
      ExpressionAttributeValues: {
          ":val": {S: dato},
          ":val1": {S: dato1}
      }
    };

    ddb.scan(params, function(err, data) {
      if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        res.json(err)
      } else {
          console.log("Query succeeded."+data.Items.length);
          data.Items.forEach(function(item) {
            console.log(" -", item.nombref);
          });

          res.json(data)
      }
    });

  });
*/
