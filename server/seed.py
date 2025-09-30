#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from config import db, app
from models import Meditation, User, MeditationSession

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        print("Deleting data...")
        Meditation.query.delete()
        User.query.delete()
        MeditationSession.query.delete()

        print("Creating meditations...")
        metta = Meditation(title="Lovingkindness", duration=15, instructions=fake.sentence(), type="Lovingkindness")

        insight = Meditation(title="Being Present", duration=15, instructions=fake.sentence(), type="Vipassana")

        body_scan = Meditation(title="Bed Time Body Scan", duration=15, instructions=fake.sentence(), type="Body Scan")

        visualization = Meditation(title="Visualizing Peace", duration=15, instructions=fake.sentence(), type="Visualization")

        mantra = Meditation(title="Happiness Mantra", duration=15, instructions=fake.sentence(), type="Mantra")

        meditations = [metta, insight, body_scan, visualization, mantra]

        print("Creating users...")
        riko = User(username="riko")
        sam = User(username="sam")
        alex = User(username="alex")
        steph = User(username="steph")
        
        riko.password_hash = riko.username + 'password'
        sam.password_hash = sam.username + 'password'
        alex.password_hash = alex.username + 'password'
        steph.password_hash = steph.username + 'password'
        users = [riko, sam, alex, steph]

        print("Creating meditation sessions...")
        session1 = MeditationSession(completed_duration=15, rating=5, session_note=fake.sentence(), meditation=metta, user=riko)

        session2 = MeditationSession(completed_duration=10, rating=3, session_note=fake.sentence(), meditation=visualization, user=riko)

        session3 = MeditationSession(completed_duration=10, rating=4, session_note=fake.sentence(), meditation=insight, user=riko)

        session4 = MeditationSession(completed_duration=15, rating=3, session_note=fake.sentence(), meditation=insight, user=riko)

        session5 = MeditationSession(completed_duration=15, rating=4, session_note=fake.sentence(), meditation=metta, user=sam)

        session6 = MeditationSession(completed_duration=3, rating=1, session_note=fake.sentence(), meditation=insight, user=steph)

        session7 = MeditationSession(completed_duration=5, rating=2, session_note=fake.sentence(), meditation=body_scan, user=steph)

        session8 = MeditationSession(completed_duration=6, rating=3, session_note=fake.sentence(), meditation=mantra, user=sam)

        session9 = MeditationSession(completed_duration=15, rating=5, session_note=fake.sentence(), meditation=visualization, user=alex)

        session10 = MeditationSession(completed_duration=5, rating=3, session_note=fake.sentence(), meditation=metta, user=alex)

        meditation_sessions = [session1, session2, session3, session4, session5, session6, session7, session8, session9, session10]

        db.session.add_all(meditations)
        db.session.add_all(users)
        db.session.add_all(meditation_sessions)
        db.session.commit()
        print("Seeding done!")

        
