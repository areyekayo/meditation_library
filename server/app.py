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

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200
        return {'error': 'Unauthorized'}, 401
    
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
        
class SignUp(Resource):
    def post(self):
        data = request.get_json()
        try:
            user = User(username=data.get('username'))
            user.password_hash = data.get('password')
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            return user.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            errors_dict = {}
            message = str(e)
            errors_dict['error'] = [message]
            return {'errors': errors_dict}, 422
    
class Users(Resource):
    def get(self):
        users = [
            user.to_dict(only=('id', 'username')) for user in User.query.all()
        ]
        return users, 200
        

api.add_resource(Meditations, '/meditations')
api.add_resource(Login, '/login')
api.add_resource(CheckSession, '/check_session')
api.add_resource(SignUp, '/signup')
api.add_resource(Users, '/users')



if __name__ == '__main__':
    app.run(port=5555, debug=True)

