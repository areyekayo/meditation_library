#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import Meditation, User


@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Meditations(Resource):
    def get(self):
        meditations = [
            meditation.to_dict(only=('id', 'title', 'duration', 'type', 'instructions'))
            for meditation in Meditation.query.all()
        ]
        return meditations, 200
    
class Login(Resource):
    def post(self):
        data = request.get_json()
        try:
            username = data['username']
            user = User.query.filter(User.username == username).first()
            password = data['password']
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200
        except Exception:
            return {'error': 'Unauthorized'}, 401
        

api.add_resource(Meditations, '/meditations')
api.add_resource(Login, '/login')



if __name__ == '__main__':
    app.run(port=5555, debug=True)

