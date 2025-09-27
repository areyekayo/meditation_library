from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy import Enum
from sqlalchemy.orm import validates

from config import db

class Meditation(db.Model, SerializerMixin):
    __tablename__ = "meditations"

    meditation_types = ('Visualization', 'Body Scan', 'Lovingkindness', 'Mantra', 'Vipassana') # should go in app.py

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
        