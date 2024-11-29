from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..models import db, Comment, Question

# Define the Blueprint for comments with a new url_prefix
comment_routes = Blueprint('comments', __name__, url_prefix="/api/questions")

# Fetch comments for a specific question
@comment_routes.route('/<int:question_id>/comments', methods=['GET'])
@login_required 
def get_comments(question_id):
    if not current_user.is_authenticated:
        return jsonify({'error': 'User is not authenticated'}), 403  # Handle if user isn't logged in
    question = Question.query.get_or_404(question_id)
    if question is None:
        return jsonify({'error': 'Question not found'}), 404
    comments = Comment.query.filter_by(question_id=question_id).all()
    return jsonify([comment.to_dict() for comment in comments]), 200

# Post a new comment to a specific question
@comment_routes.route('/<int:question_id>/comments', methods=['POST'])
def post_comment(question_id):
    data = request.get_json()
    text = data.get('text')
    user_id = data.get('user_id')  # Assuming you're passing the user_id

    if not text or not user_id:
        return jsonify({"message": "Text and user_id are required"}), 400

    # Check if the question exists
    question = Question.query.get(question_id)
    if not question:
        return jsonify({"message": "Question not found"}), 404

    new_comment = Comment(text=text, user_id=user_id, question_id=question_id)
    db.session.add(new_comment)
    db.session.commit()

    return jsonify(new_comment.to_dict()), 201

# Update an existing comment
@comment_routes.route('/comments/<int:comment_id>', methods=['PUT'])
def update_comment(comment_id):
    data = request.get_json()
    comment = Comment.query.get(comment_id)

    if not comment:
        return jsonify({"message": "Comment not found"}), 404

    text = data.get('text')
    if text:
        comment.text = text
        db.session.commit()
        return jsonify(comment.to_dict()), 200
    else:
        return jsonify({"message": "Text is required"}), 400

# Delete a comment
@comment_routes.route('/comments/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    comment = Comment.query.get(comment_id)

    if not comment:
        return jsonify({"message": "Comment not found"}), 404

    db.session.delete(comment)
    db.session.commit()
    return jsonify({"message": "Comment deleted successfully"}), 200
