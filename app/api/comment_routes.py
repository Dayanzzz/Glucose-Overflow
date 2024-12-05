from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..models import db, Comment, Question


comment_routes = Blueprint('comments', __name__, url_prefix="/api/questions")


@comment_routes.route('/<int:question_id>/comments', methods=['GET'])
@login_required
def get_comments(question_id):
    if not current_user.is_authenticated:
        return jsonify({'error': 'User is not authenticated'}), 403  
    question = Question.query.get_or_404(question_id)
    if question is None:
        return jsonify({'error': 'Question not found'}), 404
    comments = Comment.query.filter_by(question_id=question_id).all()
    return jsonify([comment.to_dict() for comment in comments]), 200


@comment_routes.route('/<int:question_id>/comments', methods=['POST'])
@login_required
def add_comment(question_id):
    data = request.get_json()
    comment_text = data.get('comment_text')

    if not comment_text:
        return jsonify({'error': 'Comment text is required'}), 400

 
    new_comment = Comment(comment_text=comment_text, user_id=current_user.id, question_id=question_id)
    db.session.add(new_comment)
    db.session.commit()

    return jsonify(new_comment.to_dict()), 201

@comment_routes.route('/comments/<int:comment_id>', methods=['PUT'])
@login_required
def update_comment(comment_id):
    data = request.get_json()
    comment = Comment.query.get(comment_id)

    if not comment:
        return jsonify({"message": "Comment not found"}), 404


    if comment.user_id != current_user.id:
        return jsonify({"message": "You can only edit your own comments"}), 403

  
    comment_text = data.get('comment_text')
    if comment_text:
        comment.comment_text = comment_text
        db.session.commit()
        return jsonify(comment.to_dict()), 200
    else:
        return jsonify({"message": "Comment text is required"}), 400

@comment_routes.route('/comments/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    comment = Comment.query.get(comment_id)

    if not comment:
        return jsonify({"message": "Comment not found"}), 404

    
    if comment.user_id != current_user.id:
        return jsonify({"message": "You can only delete your own comments"}), 403

    db.session.delete(comment)
    db.session.commit()
    return jsonify({"message": "Comment deleted successfully"}), 200
