#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import Meditation, User, MeditationSession


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
    
class MeditationById(Resource):
    def get(self, id):
        meditation = Meditation.query.filter(Meditation.id == id).first()
        if meditation:
            meditation_dict = meditation.to_dict(only=('id', 'title', 'type', 'duration', 'instructions'))
            return meditation_dict, 200
        else:
            return {'error': 'Meditation not found'}, 404

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
        username = data.get('username')
        password = data.get('password')

        user = User.query.filter(User.username == username).first()
        if not user:
            return {'errors': {'username': ['Username not found']}}, 401
        if user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(), 200
        else:
            return {'errors': {'password': ['Invalid password']}}, 401

        
class SignUp(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if User.query.filter_by(username=username).first():
            return {'errors': {'username': ['Username already taken']}}, 422
        
        try:
            user = User(username=data.get('username'))
            user.password_hash = password
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            return user.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {'errors': {'error': [str(e)]}}, 422
    
class Users(Resource):
    def get(self):
        users = [
            user.to_dict(only=('id', 'username')) for user in User.query.all()
        ]
        return users, 200
    
class MeditationSessions(Resource):
    def get(self):
        meditation_sessions = [
            session.to_dict(only=('id', 'completed_duration', 'rating', 'session_note', 'user', 'meditation'))
            for session in MeditationSession.query.all()
        ]
        return meditation_sessions, 200
    
    def post(self):
        data = request.json()
        try:
            meditation_session = MeditationSession(
                completed_duration=data['completed_duration'],
                rating=data['rating'],
                session_note=data['session_note'],
                user_id=data['user_id'],
                meditation_id=data['meditation_id']
            )
            db.session.add(meditation_session)
            db.session.commit()

            meditation_session_dict = meditation_session.to_dict(only=(
                'id', 'completed_duration', 'rating', 'session_note', 'session_timestamp', 'user_id', 'user', 'meditation_id', 'meditation'
            ))
            return meditation_session_dict, 201
        except Exception:
            db.session.rollback()
            return {"errors": ["validation errors"]}, 400
        

api.add_resource(Meditations, '/meditations')
api.add_resource(Login, '/login')
api.add_resource(CheckSession, '/check_session')
api.add_resource(SignUp, '/signup')
api.add_resource(Users, '/users')
api.add_resource(MeditationById, '/meditations/<int:id>')
api.add_resource(MeditationSessions, '/meditation_sessions')



if __name__ == '__main__':
    app.run(port=5555, debug=True)

