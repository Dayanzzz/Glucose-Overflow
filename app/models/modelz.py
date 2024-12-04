from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .user import User


class GlucoseTracker(db.Model):
    __tablename__ = 'glucose_tracker'


    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    before_breakfast = db.Column(db.Float, nullable=True)
    before_lunch = db.Column(db.Float, nullable=True)
    before_dinner = db.Column(db.Float, nullable=True)
    hbA1c = db.Column(db.Float, nullable=True)  

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    
    
    user = db.relationship('User', back_populates='glucose_trackers')


    def __repr__(self):
        return f"<GlucoseTracker {self.date}>"

    def to_dict(self):
        return {
            'id': self.id,
            'date': self.date.strftime('%Y-%m-%d'), 
            'before_breakfast': self.before_breakfast,
            'before_lunch': self.before_lunch,
            'before_dinner': self.before_dinner,
            'hbA1c': self.hbA1c
        }


class Question(db.Model):
    __tablename__ = 'questions'


    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    question_text = db.Column(db.String(255), nullable=False)
    answered = db.Column(db.Boolean, default=False)
    date_asked = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    user = db.relationship('User', back_populates='questions')

   


    users_bookmarked = db.relationship('Bookmark', back_populates='question')
    comments = db.relationship('Comment', back_populates='question', lazy=True)


    

    def __repr__(self):
        return f"<Question {self.question_text}>"

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'question_text': self.question_text,
            'answered': self.answered,
            'date_asked': self.date_asked,
            
            'user_id': self.user_id
        }

class Bookmark(db.Model):
    __tablename__ = 'bookmarks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('questions.id')), nullable=False)

    
    user = db.relationship('User', back_populates='bookmarked_questions')
    question = db.relationship('Question', back_populates='users_bookmarked')

    def __repr__(self):
        return f"<Bookmark {self.user_id} -> {self.question_id}>"

    def to_dict(self):
        return {
            'id': self.id,
        'user_id': self.user_id,
        'question_id': self.question_id,
        'question_title': self.question.title,  # Assuming question.title exists
        'question_text': self.question.question_text
            
        }




class Comment(db.Model):
    __tablename__ = 'comments'

    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment_text = db.Column(db.String(500), nullable=False)
    date_posted = db.Column(db.DateTime, default=datetime.utcnow)


    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    user = db.relationship('User', back_populates='comments')
    
    
    question_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('questions.id')), nullable=False)
    question = db.relationship('Question', back_populates='comments')

    def __repr__(self):
        return f"<Comment {self.comment_text[:20]}>"

    def to_dict(self):
        return {
            'id': self.id,
            'comment_text': self.comment_text,
            'date_posted': self.date_posted,
            'question_id': self.question_id,
            'user_id': self.user_id
        }
