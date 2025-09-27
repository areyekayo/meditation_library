#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from config import db, app
from models import Meditation

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        print("Deleting data...")
        Meditation.query.delete()

        print("Creating meditations...")
        metta = Meditation(title="Lovingkindness", duration=15, instructions=fake.sentence(), type="Lovingkindness")

        insight = Meditation(title="Being Present", duration=15, instructions=fake.sentence(), type="Vipassana")

        body_scan = Meditation(title="Bed Time Body Scan", duration=15, instructions=fake.sentence(), type="Body Scan")

        visualization = Meditation(title="Visualizing Peace", duration=15, instructions=fake.sentence(), type="Visualization")

        mantra = Meditation(title="Happiness Mantra", duration=15, instructions=fake.sentence(), type="Mantra")

        meditations = [metta, insight, body_scan, visualization, mantra]



        db.session.add_all(meditations)
        db.session.commit()
        print("Seeding done!")

        
