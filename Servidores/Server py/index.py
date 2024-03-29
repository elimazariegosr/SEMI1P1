from flask import Flask, request, jsonify, json
import boto3, base64, os, MySQLdb, uuid
from botocore.config import Config
from flask_cors import CORS

#import sys
#import boto3

ENDPOINT="semi-practica1.cgjxuheag3sv.us-east-2.rds.amazonaws.com"
USR="admin"
PASS="12345678"
DBNAME="semi1practica1"

'''PORT="3306"
REGION="us-east-2"
os.environ['LIBMYSQL_ENABLE_CLEARTEXT_PLUGIN'] = '1'''

conn =  MySQLdb.connect(host=ENDPOINT, user=USR, passwd=PASS, database=DBNAME)
cur = conn.cursor()

ruta = "https://practica1-g30-imagenes.s3.us-east-2.amazonaws.com/"
perfil = "Fotos_Perfil"
publicas = "Fotos_Publicadas"

app = Flask(__name__)
CORS(app)

'''---------------------CONSULTAS A MYSQL--------------------'''
@app.route('/crearUsuario', methods=['POST']) 
def crearUsuario():
    print("CREAR USUARIO----------------->")
    
    try:
        req = request.get_json()
        user = req['user']
        name = req['name']
        pas = req['pass']
        consulta = f'insert into Usuario(codigo_usuario, nombre, psw) values ("{user}","{name}","{pas}");'
    
        a = cur.execute(consulta)
        if(a):
            conn.commit()
            return '{"res":"si"}'
        else:
            return 'null'
    except Exception as e:
        return 'null'

@app.route('/crearAlbum', methods=['POST']) 
def crearAlbum():
    print("CREAR ALBUM----------------->")
    
    try:
        req = request.get_json()
        user = req['user']
        album = req['album']
        consulta = f'insert into Album(nombre, usuario_codigo) values ("{album}","{user}");'

        a = cur.execute(consulta)
        if(a):
            conn.commit()
            return '{"res":"si"}'
        else:
            return 'null'
    except Exception as e:
        return 'null'

@app.route('/crearFoto', methods=['POST']) 
def crearFoto():
    print("CREAR FOTO----------------->")
    
    try:
        req = request.get_json()
        user = req['user']
        album = req['album']
        origen = req['origen']
        nombreFoto = req['nombreFoto']
        tipo = req['tipo']
        base64s = req['base64']

        img = uuid.uuid4()
        if(origen == "0"):
            img = f'{perfil}/{nombreFoto}-{str(img)}.{tipo}'
        else:
            img = f'{publicas}/{nombreFoto}-{str(img)}.{tipo}'

        url = ruta + img

        image_64_decode = base64.b64decode(base64s)
        
        client = boto3.resource('s3', config=Config( region_name = 'us-east-2' ),
                        aws_access_key_id = 'AKIAYNCEHQNLPYYPEDNP',
                        aws_secret_access_key = '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'
                        )

        response = client.Bucket('practica1-g30-imagenes').put_object(Key=img, Body=image_64_decode, ContentType="image", ACL='public-read')

        consulta = f'insert into Foto(nombre, url_fotop, album_codigo) values ("{nombreFoto}","{url}",(select codigo_album from Album where nombre = "{album}" and usuario_codigo = "{user}" group by codigo_album));'

        a = cur.execute(consulta)
        if(a):
            conn.commit()
            return '{"res": "' + url +'"}'
        else:
            return 'null'

    except Exception as e:
        return 'null'

@app.route('/modificarUsuario', methods=['POST']) 
def modificarUsuario():
    print("MODIFICAR USUARIO----------------->")
    
    try:
        req = request.get_json()
        user = req['user']
        userNew = req['userNew']
        nombre = req['nombre']
        url = req['url']

        consulta = f'update Usuario set codigo_usuario="{userNew}", nombre="{nombre}", url_fotop="{url}" where codigo_usuario="{user}";'

        a = cur.execute(consulta)
        if(a):
            conn.commit()
            return '{"res":"si"}'
        else:
            return 'null'
    except Exception as e:
        return 'null'

@app.route('/buscarUsuario', methods=['POST']) 
def buscarUsuario():
    print("BUSCAR USUARIO----------------->")
    
    
    try:
        req = request.get_json()
        user = req['user']

        consulta = f'select * from Usuario where codigo_usuario = "{user}";'
    
        a = cur.execute(consulta)
        if(a):
            row_headers=[x[0] for x in cur.description]

            json_data=[]
            for result in cur:
                json_data.append(dict(zip(row_headers,result)))
            return json.dumps(json_data)
        else:
            return 'null'

    except Exception as e:
        return 'null'

@app.route('/buscarFotos', methods=['POST']) 
def buscarFotos():
    print("BUSCAR FOTOS----------------->")
    
    try:
        req = request.get_json()
        user = req['user']

        consulta = f'select F.nombre as nombreF, F.url_fotop, A.nombre as nombreA from Foto F, Album A where A.usuario_codigo = "{user}" and F.album_codigo = A.codigo_album;'
        
        a = cur.execute(consulta)

        if(a):
            row_headers=[x[0] for x in cur.description]

            json_data=[]
            for result in cur:
                json_data.append(dict(zip(row_headers,result)))
            return json.dumps(json_data)
        else:
            return 'null'

    except Exception as e:
        return 'null'

@app.route('/buscarAlbum', methods=['POST']) 
def buscarAlbum():
    print("BUSCAR ALBUM----------------->")
    
    try:
        req = request.get_json()
        user = req['user']

        consulta = f'select nombre from Album where usuario_codigo = "{user}" and nombre != "Fotos_Perfil";'
    
        a = cur.execute(consulta)
        if(a):
            row_headers=[x[0] for x in cur.description]

            json_data=[]
            for result in cur:
                    json_data.append(dict(zip(row_headers,result)))
            return json.dumps(json_data)
        else:
            return 'null'

    except Exception as e:
        return 'null'

@app.route('/eliminarAlbum', methods=['POST']) 
def eliminarAlbum():
    print("ELIMINAR ALBUM----------------->")
    
    try:
        req = request.get_json()
        user = req['user']
        album = req['album']

        consulta = f'delete from Album where nombre="{album}" and usuario_codigo="{user}";'
    
        a = cur.execute(consulta)
        if(a):
            conn.commit()
            return '{"res":"si"}'
        else:
            return 'null'

    except Exception as e:
        return 'null'

'''--------------------------PRUEBAS------------------------'''
@app.route('/', methods=['POST']) 
def index():
    try:
        response = request.get_json()
        a = cur.execute('select * from Usuario;')
        
        if(a):
            row_headers=[x[0] for x in cur.description]
            json_data=[]
            for result in cur:
                    json_data.append(dict(zip(row_headers,result)))
            return json.dumps(json_data)
        else:
            return 'null'

    except Exception as e:
        return 'null'

@app.route('/up', methods=['POST']) 
def upload():

    #client = boto3.client('s3', region_name='us-west-2')

    response = request.get_json()
    img_b = response['foto']
    name = "prueba/" + response['id']
    image_64_decode = base64.b64decode(img_b)

    '''
    client = boto3.resource('s3', config=Config( region_name = 'us-east-2' ),
                        aws_access_key_id = 'AKIAYNCEHQNLPYYPEDNP',
                        aws_secret_access_key = '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'
                        )#'''

    '''
    client = boto3.client('s3', config=Config( region_name = 'us-east-2' ),
                        aws_access_key_id = 'AKIAYNCEHQNLPYYPEDNP',
                        aws_secret_access_key = '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'
                        )#'''

    #response = client.Bucket('practica1-g30-imagenes').put_object(Key=name, Body=image_64_decode, ContentType="image", ACL='public-read')

    #response = client.Object("prueba", name).put(Body=image_64_decode)

    #response = client.upload_fileobj(image_64_decode, "prueba", name, ExtraArgs={ "ContentType": "image", "ACL": 'public-read'})
    
    return 'exito'

if __name__ == '__main__':
    app.run(debug=True)#host='0.0.0.0',
