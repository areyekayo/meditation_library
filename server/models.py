from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy import Enum
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

class Meditation(db.Model, SerializerMixin):
    __tablename__ = "meditations"

    meditation_types = ('Visualization', 'Body Scan', 'Lovingkindness', 'Mantra', 'Vipassana')

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    duration = db.Column(db.Integer)
    instructions = db.Column(db.String)
    type = db.Column(Enum(*meditation_types, name='meditation_type_enum'), nullable=False)

    @validates('title')
    def validate_title(self, key, title):
        if not (5 <= len(title) <= 100):
            raise ValueError("Title must be between 5 and 100 characters")
        return title
    
    @validates('duration')
    def validate_duration(self, key, duration):
        if not 0 < duration:
            raise ValueError("Duration must be greater than 0 minutes")
        return duration

    @validates('type')
    def validate_type(self, key, type):
        if type not in self.meditation_types:
            raise ValueError("Meditation type is invalid value")
        return type
        
class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')
        )
