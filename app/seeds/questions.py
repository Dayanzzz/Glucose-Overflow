from app.models import db, User, environment, SCHEMA, Question
from sqlalchemy.sql import text

def seed_questions():
    demo_user = User.query.filter_by(username='Demo').first()
    marnie_user = User.query.filter_by(username='marnie').first()
    
    question1 = Question(
        title='Manage', question_text='What is the best way to manage diabetes?', answered=False, user=demo_user)
    # question2 = Question(
    #     title='Levles', question_text='How can I control my blood sugar levels?', answered=False, user=marnie_user)
    question3 = Question(
        title='Foods', question_text='What are some good glucose control foods?', answered=False, user=marnie_user)
    question4 = Question(
        title='Cost', question_text='How can I get insulin without insurance??', answered=False, user=demo_user)


    db.session.add(question1)
    db.session.add(question4)
    db.session.add(question3)

    db.session.commit()



def undo_questions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM questions"))
    db.session.commit()
