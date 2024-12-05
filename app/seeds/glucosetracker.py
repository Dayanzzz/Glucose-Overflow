from app.models import db, User, environment, SCHEMA, GlucoseTracker
from sqlalchemy.sql import text
from datetime import date




def seed_glucose_trackers():
    demo_user = User.query.filter_by(username='Demo').first()
    marnie_user = User.query.filter_by(username='marnie').first()
    
    glucose1 = GlucoseTracker(
        date=date(2024, 11, 1), before_breakfast=120, before_lunch=130, before_dinner=110, hbA1c=6.5, user=demo_user)
    glucose2 = GlucoseTracker(
        date=date(2024, 11, 2), before_breakfast=140, before_lunch=145, before_dinner=120, hbA1c=6.8, user=marnie_user)
    glucose3 = GlucoseTracker(
        date=date(2024, 11, 3), before_breakfast=125, before_lunch=135, before_dinner=115, hbA1c=6.6, user=demo_user)
    glucose4 = GlucoseTracker(
        date=date(2024, 11, 4), before_breakfast=130, before_lunch=140, before_dinner=118, hbA1c=6.7, user=demo_user)


    db.session.add(glucose1)
    db.session.add(glucose2)
    db.session.add(glucose3)
    db.session.add(glucose4)
   
    db.session.commit()



def undo_glucose_trackers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.glucose_tracker RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM glucose_tracker"))
    db.session.commit()
