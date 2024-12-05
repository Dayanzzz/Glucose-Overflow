from app.models import db, User, environment, SCHEMA, Comment, Question, Bookmark
from sqlalchemy.sql import text








def seed_bookmarks():
    demo_user = User.query.filter_by(username='Demo').first()
    marnie_user = User.query.filter_by(username='marnie').first()
    question1 = Question.query.filter_by(question_text='What is the best way to manage diabetes? I have been having difficulty with understanding when to take my medication and the type of diet I should be on to decrease my daily blood sugar. I do not like needles and I hate having to use insulin everyday. Any suggestions?').first()
    question3 = Question.query.filter_by(question_text='What are some good glucose control foods? I am hispanic and I eat tortillas and rice with almost everything. How can I switch that with something healthy?').first()
 
    question10 = Question.query.filter_by(question_text='Grocery shopping for a diabetes-friendly diet can be expensive. Can anyone share their tips for navigating grocery stores on a budget, especially in the Oakland/Berkeley area? How do you prioritize healthy food options without breaking the bank?').first()

    bookmark1 = Bookmark(user= demo_user, question=question1)
    bookmark3 = Bookmark(user=marnie_user, question=question3)
    bookmark5 = Bookmark(user= demo_user, question=question10)
    

    db.session.add(bookmark1)
    db.session.add(bookmark3)

    db.session.add(bookmark5)

    db.session.commit()



def undo_bookmarks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookmarks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bookmarks"))
    db.session.commit()