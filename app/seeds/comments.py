from app.models import db, User, environment, SCHEMA, Comment, Question
from sqlalchemy.sql import text





def seed_comments():
    demo_user = User.query.filter_by(username='Demo').first()
    marnie_user = User.query.filter_by(username='marnie').first()
    question2 = Question.query.filter_by(question_text='How can I control my blood sugar levels?').first()
    question2 = Question.query.filter_by(question_text='How can I control my blood sugar levels?').first()

    comment1 = Comment(comment_text='I agree, controlling blood sugar is important.', question=question2, user=marnie_user)
    comment2 = Comment(comment_text='Exercise helps me manage mine.', question=question2, user=demo_user)

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.commit()



def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
    db.session.commit()

