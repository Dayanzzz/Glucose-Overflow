from app.models import db, User, environment, SCHEMA, Comment, Question
from sqlalchemy.sql import text





def seed_comments():
    demo_user = User.query.filter_by(username='Demo').first()
    marnie_user = User.query.filter_by(username='marnie').first()
    question1 = Question.query.filter_by(question_text='What is the best way to manage diabetes? I have been having difficulty with understanding when to take my medication and the type of diet I should be on to decrease my daily blood sugar. I do not like needles and I hate having to use insulin everyday. Any suggestions?').first()
    question2 = Question.query.filter_by(question_text='How can I control my blood sugar levels? I have a hard time eating regular meals because I work graveyard shifts and I only have time to eat fast food because I am so tired.').first()
   
    question7 = Question.query.filter_by(question_text='Where can someone with diabetes find affordable, healthy food options in the Oakland/Berkeley area?').first()
   
    question16 = Question.query.filter_by(question_text='What are some of your go-to snacks that help keep your blood sugar levels stable throughout the day?').first()
    
    comment1 = Comment(comment_text='I love making stir-fry with vegetables and lean protein like chicken or tofu. It is quick, filling, and diabetic-friendly!.', question=question16, user=marnie_user)
    comment2 = Comment(comment_text='I find that a combination of medication, regular exercise, and mindful eating really helps me keep my blood sugar levels in check.', question=question2, user=demo_user)
    comment3 = Comment(comment_text='For me, keeping track of my meals and snacks is key. I also try to avoid sugary drinks and focus on high-fiber foods.', question=question1, user=marnie_user)

    comment6 = Comment(comment_text='I found that the Berkeley Food Pantry is a great resource, and some farmers markets offer discounted prices for those in need.', question=question7, user=demo_user)
   

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
 
    db.session.add(comment6)

    db.session.commit()



def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
    db.session.commit()

