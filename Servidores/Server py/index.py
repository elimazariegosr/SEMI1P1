from flask import Flask, request, jsonify, json
import boto3, base64
from botocore.config import Config

app = Flask(__name__)

@app.route('/') 
def index():
    return 'Hello World!'

@app.route('/up', methods=['POST']) 
def upload():

    #client = boto3.client('s3', region_name='us-west-2')

    response = request.get_json()
    img_b = response['foto']
    name = "prueba/" + response['id']
    image_64_decode = base64.b64decode(img_b)

    #'''
    client = boto3.resource('s3', config=Config( region_name = 'us-east-2' ),
                        aws_access_key_id = 'AKIAYNCEHQNLPYYPEDNP',
                        aws_secret_access_key = '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'
                        )#'''

    '''
    client = boto3.client('s3', config=Config( region_name = 'us-east-2' ),
                        aws_access_key_id = 'AKIAYNCEHQNLPYYPEDNP',
                        aws_secret_access_key = '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'
                        )#'''

    response = client.Bucket('practica1-g30-imagenes').put_object(Key=name, Body=image_64_decode, ContentType="image", ACL='public-read')

    #response = client.Object("prueba", name).put(Body=image_64_decode)

    #response = client.upload_fileobj(image_64_decode, "prueba", name, ExtraArgs={ "ContentType": "image", "ACL": 'public-read'})
    
    return 'exito'

if __name__ == '__main__':
    app.run(debug=True)


