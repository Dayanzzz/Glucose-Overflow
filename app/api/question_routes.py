from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..models import db, Question, User, Bookmark, Comment
from datetime import datetime

question_routes = Blueprint('notebooks', __name__, url_prefix="/api/questions")

@question_routes.route('/manage', methods=['GET'])
@login_required
def get_my_questions():
    questions = Question.query.filter_by(user_id=current_user.id).all()
    return jsonify([
        {
            'id': question.id,
            'question_text': question.question_text,
            'answered': question.answered,
            'date_asked': question.date_asked,
            
        }
        for question in questions
    ])

@question_routes.route('/', methods=['GET'])

def get_questions():
    questions = Question.query.all()
    print("Fetched questions:", questions)
    return jsonify([question.to_dict() for question in questions])


@question_routes.route('/<int:question_id>', methods=['GET'])
@login_required
def get_question_by_id(question_id):
    question = Question.query.get(question_id)
    if not question:
         return jsonify({"error": "Resource not found"}), 404

    # Ensure the question is created by the current user
    if question.user_id != current_user.id:
        return jsonify({"error": "Forbidden"}), 403

    return jsonify(question.to_dict())


# POST: Create a new question
@question_routes.route('', methods=['POST'])
@login_required
def create_question():
    data = request.get_json()

    # Ensure that all required fields are present
    if 'question_text' not in data:
        return jsonify({'error': 'Question text is required'}), 400

    question_text = data['question_text']
    
    # Create a new Question instance
    new_question = Question(
        question_text=question_text,
        user_id=current_user.id,
        date_asked=datetime.utcnow()
    )

    db.session.add(new_question)
    db.session.commit()

    return jsonify(new_question.to_dict()), 201


# PUT: Update an existing question by ID
@question_routes.route('/<int:question_id>', methods=['PUT'])
@login_required
def update_question(question_id):
    question = Question.query.get(question_id)
    if not question:
        return jsonify({"error": "Resource not found"}), 404


    # Ensure the question is created by the current user
    if question.user_id != current_user.id:
        return jsonify({"error": "Forbidden"}), 403

    data = request.get_json()

    # Update the fields as needed
    if 'question_text' in data:
        question.question_text = data['question_text']
    
    if 'answered' in data:
        question.answered = data['answered']
    
    db.session.commit()

    return jsonify(question.to_dict())


# DELETE: Delete a question by ID
@question_routes.route('/<int:question_id>', methods=['DELETE'])
@login_required
def delete_question(question_id):
    question = Question.query.get(question_id)
    if not question:
        return jsonify({"error": "Resource not found"}), 404


    # Ensure the question is created by the current user
    if question.user_id != current_user.id:
         return jsonify({"error": "Forbidden"}), 403
    
    bookmarks = Bookmark.query.filter_by(question_id=question_id).all()
    if bookmarks:
        return jsonify({"error": "Sorry, you cannot delete this question because it has been bookmarked."}), 400


    db.session.delete(question)
    db.session.commit()
    return jsonify({'message': 'Question deleted successfully'}), 200
