from app.models import db, User, environment, SCHEMA, Comment, Question, Bookmark
from sqlalchemy.sql import text








def seed_bookmarks():
    demo_user = User.query.filter_by(username='Demo').first()
    marnie_user = User.query.filter_by(username='marnie').first()
    question1 = Question.query.filter_by(question_text='What is the best way to manage diabetes?').first()
    question2 = Question.query.filter_by(question_text='How can I control my blood sugar levels?').first()

    bookmark1 = Bookmark(user=demo_user, question=question1)
    bookmark2 = Bookmark(user=marnie_user, question=question2)

    db.session.add(bookmark1)
    db.session.add(bookmark2)
    db.session.commit()


# Delete all bookmarks from the database
def undo_bookmarks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookmarks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bookmarks"))
    db.session.commit()