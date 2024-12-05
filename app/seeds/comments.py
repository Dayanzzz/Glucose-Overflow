from app.models import db, User, environment, SCHEMA, Comment, Question
from sqlalchemy.sql import text





def seed_comments():
    demo_user = User.query.filter_by(username='Demo').first()
    marnie_user = User.query.filter_by(username='marnie').first()
    question1 = Question.query.filter_by(question_text='What is the best way to manage diabetes? I have been having difficulty with understanding when to take my medication and the type of diet I should be on to decrease my daily blood sugar. I do not like needles and I hate having to use insulin everyday. Any suggestions?').first()
    question2 = Question.query.filter_by(question_text='How can I control my blood sugar levels? I have a hard time eating regular meals because I work graveyard shifts and I only have time to eat fast food because I am so tired.').first()
    question4 = Question.query.filter_by(question_text='Hi, I am in America visiting and I forgot my medication back in India, how can I get more insulin and metformin without insurance here?').first()
    question7 = Question.query.filter_by(question_text='Where can someone with diabetes find affordable, healthy food options in the Oakland/Berkeley area?').first()
    question13 = Question.query.filter_by(question_text='How do you incorporate your cultural food traditions while managing diabetes?').first()
    question16 = Question.query.filter_by(question_text='What are some of your go-to snacks that help keep your blood sugar levels stable throughout the day?').first()
    question17 = Question.query.filter_by(question_text='Has anyone found any supplements, vitamins, or natural remedies that help with managing diabetes?').first()
    question18 = Question.query.filter_by(question_text='Living with diabetes can be mentally taxing. How do you manage stress or anxiety related to your condition?').first()
    question19 = Question.query.filter_by(question_text='Can anyone share their favorite recipes that are diabetic-friendly?').first()
    question15 = Question.query.filter_by(question_text='How does regular physical activity affect your blood sugar levels?').first()
    question14 = Question.query.filter_by(question_text='What are some of your favorite recipes that are diabetic-friendly?').first()
    question9 = Question.query.filter_by(question_text='What are some effective strategies or tips for meal planning as a diabetic?').first()

    comment1 = Comment(comment_text='I love making stir-fry with vegetables and lean protein like chicken or tofu. It is quick, filling, and diabetic-friendly!.', question=question16, user=marnie_user)
    comment2 = Comment(comment_text='I find that a combination of medication, regular exercise, and mindful eating really helps me keep my blood sugar levels in check.', question=question2, user=demo_user)
    comment3 = Comment(comment_text='For me, keeping track of my meals and snacks is key. I also try to avoid sugary drinks and focus on high-fiber foods.', question=question1, user=marnie_user)
    comment4 = Comment(comment_text='I found that leafy greens like spinach and kale, along with whole grains like quinoa, are excellent for keeping my glucose in check.', question=question4, user=demo_user)
    comment5 = Comment(comment_text='There are patient assistance programs available through pharmaceutical companies. Also, check with local clinics; some offer sliding scale pricing.', question=question4, user=marnie_user)
    comment6 = Comment(comment_text='I found that the Berkeley Food Pantry is a great resource, and some farmers markets offer discounted prices for those in need.', question=question7, user=demo_user)
    comment7 = Comment(comment_text='I try to modify traditional dishes by reducing the use of sugar and replacing white rice with brown or cauliflower rice.', question=question7, user=marnie_user)
    comment8 = Comment(comment_text='Walking and swimming have worked wonders for me. They are gentle on the joints and help regulate my blood sugar.', question=question15, user=demo_user)
    comment9 = Comment(comment_text='I usually keep some almonds or a boiled egg around. They are low in carbs and high in protein, perfect for a quick snack.', question=question9, user=marnie_user)
    comment10 = Comment(comment_text='I heard that cinnamon can help with blood sugar regulation, and I have been taking it in my tea every day.', question=question17, user=demo_user)
    comment11 = Comment(comment_text='Yoga and deep breathing exercises have been incredibly helpful for me. Mental health is just as important as physical health when managing diabetes.', question=question18, user=marnie_user)
    comment12 = Comment(comment_text='A favorite recipe of mine is roasted chicken with roasted sweet potatoes and Brussels sprouts. It is easy and low-carb.', question=question14, user=demo_user)
    comment13 = Comment(comment_text='I noticed that after a 30-minute walk, my blood sugar drops and stays more stable throughout the day.', question=question13, user=marnie_user)
    comment14 = Comment(comment_text='One of my favorites is a cauliflower rice stir fry with shrimp. It is low-carb, tasty, and filling!', question=question19, user=demo_user)
    comment15 = Comment(comment_text='I always make sure to include lean protein, a healthy fat, and plenty of non-starchy vegetables in each meal. This helps balance my blood sugar.', question=question9, user=marnie_user)

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)
    db.session.add(comment11)
    db.session.add(comment12)
    db.session.add(comment13)
    db.session.add(comment14)
    db.session.add(comment15)
    db.session.commit()



def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
    db.session.commit()

