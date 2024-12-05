from app.models import db, User, environment, SCHEMA, Question
from sqlalchemy.sql import text

def seed_questions():
    demo_user = User.query.filter_by(username='Demo').first()
    marnie_user = User.query.filter_by(username='marnie').first()
    
    question1 = Question(
        title='Managing my Diabetes HELP!', question_text='What is the best way to manage diabetes? I have been having difficulty with understanding when to take my medication and the type of diet I should be on to decrease my daily blood sugar. I do not like needles and I hate having to use insulin everyday. Any suggestions?', answered=True, user=demo_user)
    question2 = Question(
        title='How to understand my levels', question_text='How can I control my blood sugar levels? I have a hard time eating regular meals because I work graveyard shifts and I only have time to eat fast food because I am so tired.', answered=True, user=marnie_user)
    question3 = Question(
        title='Foods best to lower glycemic numbers', question_text='What are some good glucose control foods? I am hispanic and I eat tortillas and rice with almost everything. How can I switch that with something healthy?', answered=False, user=marnie_user)
    question4 = Question(
        title='Cost of Medication with no insurance', question_text='Hi, I am in America visiting and I forgot my medication back in India, how can I get more insulin and metformin without insurance here?', answered=False, user=demo_user)
    question5 = Question(
        title='Healthy Food Choices',
        question_text='What are some diabetes-friendly meals that you have found to be both tasty and easy to prepare? Are there specific ingredients or food groups you focus on to help manage your blood sugar levels?',
        answered=False, user=demo_user)

    question6 = Question(
        title='Interpreting Blood Sugar Numbers',
        question_text='I am still learning about blood sugar management. Can someone explain what a normal blood sugar range is and how often should we check our glucose levels throughout the day to keep them in check?',
        answered=False, user=marnie_user)

    question7 = Question(
        title='Affordable Healthy Food',
        question_text='Where can someone with diabetes find affordable, healthy food options in the Oakland/Berkeley area? Are there any programs or organizations that offer low-cost or discounted food for people managing diabetes?',
        answered=False, user=marnie_user)

    question8 = Question(
        title='Carbs and Blood Sugar',
        question_text='How do different types of carbohydrates (e.g., simple vs. complex carbs) affect blood sugar levels for people with diabetes? What are some carb-rich foods you avoid, and which ones do you include in your diet?',
        answered=False, user=demo_user)

    question9 = Question(
        title='Meal Planning Tips',
        question_text='What are some effective strategies or tips for meal planning as a diabetic? How do you balance meals with your blood sugar levels in mind, and do you use any tools or apps to help with this?',
        answered=False, user=demo_user)

    question10 = Question(
        title='Budget-Friendly Grocery Shopping',
        question_text='Grocery shopping for a diabetes-friendly diet can be expensive. Can anyone share their tips for navigating grocery stores on a budget, especially in the Oakland/Berkeley area? How do you prioritize healthy food options without breaking the bank?',
        answered=False, user=marnie_user)

    question11 = Question(
        title='Food Assistance Programs',
        question_text='Are there any programs in the Oakland/Berkeley area that offer food stamps or financial assistance for low-income individuals with diabetes? How can one apply, and what resources are available for those struggling with the cost of healthy food?',
        answered=False, user=demo_user)

    question12 = Question(
        title='Managing Sugar Cravings',
        question_text='Dealing with sugar cravings while managing diabetes can be tough. What are some healthier alternatives or tricks you have found helpful when you are craving sweets? How do you stay on track without feeling deprived?',
        answered=False, user=marnie_user)

    question13 = Question(
        title='Culturally Sensitive Diabetic Diet',
        question_text='How do you incorporate your cultural food traditions while managing diabetes? Are there ways to modify recipes or find substitutions that help keep blood sugar levels stable while still enjoying familiar flavors?',
        answered=False, user=demo_user)

    question14 = Question(
        title='Gut Health and Diabetes',
        question_text='Theres been a lot of talk about the connection between gut health and diabetes. Can anyone share their experiences with foods or supplements that have helped improve digestion and potentially helped manage blood sugar levels more effectively?',
        answered=False, user=marnie_user)

    # Additional questions
    question15 = Question(
        title='Exercise and Blood Sugar Control',
        question_text='How does regular physical activity affect your blood sugar levels? What types of exercises have you found most helpful for managing your diabetes? Do you find any particular routines beneficial for maintaining healthy glucose levels?',
        answered=False, user=demo_user)

    question16 = Question(
        title='Best Snacks for Diabetics',
        question_text='What are some of your go-to snacks that help keep your blood sugar levels stable throughout the day? Are there any low-carb or high-protein snacks you have found to be effective and satisfying?',
        answered=False, user=marnie_user)

    question17 = Question(
        title='Supplements for Diabetes',
        question_text='Has anyone found any supplements, vitamins, or natural remedies that help with managing diabetes or improving blood sugar control? Are there any that you would recommend to others who are managing the condition?',
        answered=False, user=demo_user)

    question18 = Question(
        title='Managing Mental Health with Diabetes',
        question_text='Living with diabetes can be mentally taxing. How do you manage stress or anxiety related to your condition? Are there any specific practices or support systems you use to maintain mental well-being while managing diabetes?',
        answered=False, user=marnie_user)

    question19 = Question(
        title='Favorite Diabetic-Friendly Recipes',
        question_text='Can anyone share their favorite recipes that are diabetic-friendly? What types of meals have you found easy to make and nutritious for managing blood sugar levels while still enjoying food?',
        answered=False, user=demo_user)


    db.session.add(question1)
    db.session.add(question4)
    db.session.add(question3)
    db.session.add(question2)
    db.session.add(question5)
    db.session.add(question6)
    db.session.add(question7)
    db.session.add(question8)
    db.session.add(question9)
    db.session.add(question10)
    db.session.add(question11)
    db.session.add(question12)
    db.session.add(question13)
    db.session.add(question14)
    db.session.add(question15)
    db.session.add(question16)
    db.session.add(question17)
    db.session.add(question18)
    db.session.add(question19)

    db.session.commit()



def undo_questions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM questions"))
    db.session.commit()
