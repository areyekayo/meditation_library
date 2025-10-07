#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource
from datetime import datetime

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
        if not meditation:
            return {'error': 'Meditation not found'}, 404

        meditation_dict = meditation.to_dict(only=('id', 'title', 'type', 'duration', 'instructions'))
        user_id = session.get('user_id')

        # If user is logged in, return their meditation sessions for each meditation
        if user_id:
            user_meditations = [
                s.to_dict(only=('id', 'completed_duration', 'rating', 'session_note', 'session_timestamp')) for s in meditation.meditation_sessions if s.user_id == user_id
            ]
            meditation_dict['meditation_sessions'] = user_meditations

        return meditation_dict, 200
    

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(
                only=('id', 'username')), 200
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
    
# class UserById(Resource):
#     def get(self):
#         user_id = session.get('user_id')
#         if user_id:
#             user = User.query.filter(User.id == user_id).first()
#             return user.to_dict(only=('id', 'meditation_sessions')), 200
        
       
    
class MeditationSessions(Resource):
    def get(self):
        user_id = session['user_id']
        if not user_id:
            return {'error': 'Unauthorized'}, 401
        
        user = User.query.get(user_id)
        if not user:
            return {'error': 'User not found'}, 404
        
        meditation_sessions = [
            meditation_session.to_dict(only=(
                'id', 'completed_duration', 'rating', 'session_note', 'session_timestamp', 'user_id', 'meditation_id', 'meditation'
            )) for meditation_session in user.meditation_sessions
        ]

        return meditation_sessions, 200
            
        # meditation_map = {}


        # for med in user.meditation_sessions:
        #     meditation = med.meditation
        #     if meditation.id not in meditation_map:
        #         meditation_map[meditation.id] = {
        #             "id": meditation.id,
        #             "title": meditation.title,
        #             "type": meditation.type,
        #             "duration": meditation.duration,
        #             "instructions": meditation.instructions,
        #             "meditation_sessions": []
        #         }
        #     meditation_map[meditation.id]["meditation_sessions"].append({
        #         "id": med.id,
        #         "user_id": med.user_id,
        #         "session_note": med.session_note,
        #         "rating": med.rating,
        #         "session_timestamp": med.session_timestamp.isoformat() if med.session_timestamp else None,
        #         "completed_duration": med.completed_duration,
        #         "meditation_id": med.meditation.id
        #     })
        
        # return list(meditation_map.values()), 200
    
    def post(self):
        data = request.get_json()
        user_id = session.get('user_id')
        user = User.query.filter(User.id == user_id).first()
        if not user: return {'error': 'Unauthorized'}, 401

        meditation_id = data.get('meditation')
        meditation = Meditation.query.get(meditation_id)
        if not meditation: return {'error': 'Meditation not found'}, 404

        try:
            meditation_session = MeditationSession(
                completed_duration=data['completed_duration'],
                rating=data['rating'],
                session_note=data['session_note'],
                user=user,
                meditation=meditation
            )
            db.session.add(meditation_session)
            db.session.commit()

            meditation_session_dict = meditation_session.to_dict(only=(
                'id', 'completed_duration', 'rating', 'session_note', 'session_timestamp', 'user_id', 'meditation_id', 'meditation', 'user'
            ))
            return meditation_session_dict, 201
        except Exception as e:
            db.session.rollback()
            return {"errors": [str(e)]}, 400
        

api.add_resource(Meditations, '/meditations')
api.add_resource(Login, '/login')
api.add_resource(CheckSession, '/check_session')
api.add_resource(SignUp, '/signup')
# api.add_resource(Users, '/users')
api.add_resource(MeditationById, '/meditations/<int:id>')
api.add_resource(MeditationSessions, '/meditation_sessions')



if __name__ == '__main__':
    app.run(port=5555, debug=True)

