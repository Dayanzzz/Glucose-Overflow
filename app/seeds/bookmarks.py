from app.models import db, User, environment, SCHEMA, Comment, Question, Bookmark
from sqlalchemy.sql import text








def seed_bookmarks():
    demo_user = User.query.filter_by(username='Demo').first()
    marnie_user = User.query.filter_by(username='marnie').first()
    question1 = Question.query.filter_by(question_text='What is the best way to manage diabetes?').first()
    question3 = Question.query.filter_by(question_text='What are some good glucose control foods?').first()

    bookmark1 = Bookmark(user= demo_user, question=question1)
    bookmark3 = Bookmark(user=marnie_user, question=question3)

    db.session.add(bookmark1)
    db.session.add(bookmark3)
    db.session.commit()



def undo_bookmarks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookmarks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bookmarks"))
    db.session.commit()