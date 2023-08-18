from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json

app = Flask(__name__)

CORS(app)
# Allow specific HTTP methods (e.g., GET, POST, PUT) 
CORS(app, methods=['GET', 'POST', 'PUT']) #[2]
# Allow specific headers in the request
CORS(app, headers=['Content-Type']) # [2]
# Allow cookies to be included in cross-origin requests
CORS(app, supports_credentials=True) 

cred = credentials.Certificate("C:\\Users\\AVuser\\Desktop\\gcp-firestore-chatroom\\src\\config\\chatroom-cdfc5-firebase-adminsdk-1odxt-ae099b1d63.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


@app.route('/storeuser', methods=['POST'])
def storeUserInfo():
    user_data = request.json
    user_email=user_data.get('userEmail')
    user_password=user_data.get('userPassword')
    user_first_name=user_data.get('userFirstName')
    user_Last_name=user_data.get('userLastName')

    doc_ref = db.collection('Users').document(user_email)
    doc_ref.set({
        'email': user_email,
        'password': user_password,
        'firstName': user_first_name,
        'lastName': user_Last_name
    })
    return jsonify({'message': 'user added successfully'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)