from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models import Bookmark,db, User, Question

bookmark_routes = Blueprint('bookmarks', __name__, url_prefix="/api/bookmarks")


@bookmark_routes.route('/', methods=['GET'])
@login_required
def get_bookmarks():
 
    bookmarks = Bookmark.query.filter_by(user_id=current_user.id).all()

   
    return jsonify([{
        'id': bookmark.id,
        'user_id': bookmark.user_id,
        'question_id': bookmark.question_id,
    } for bookmark in bookmarks])


@bookmark_routes.route('/<int:bookmark_id>', methods=['DELETE'])
@login_required
def delete_bookmark(bookmark_id):
  
    bookmark = Bookmark.query.filter_by(id=bookmark_id, user_id=current_user.id).first()

    if bookmark:
  
        db.session.delete(bookmark)
        db.session.commit()

    
        return jsonify({'message': 'Bookmark deleted successfully'}), 200
    else:
    
        return jsonify({'error': 'Bookmark not found or unauthorized'}), 404





@bookmark_routes.route('/<int:question_id>', methods=['POST'])
@login_required
def create_bookmark(question_id):
    user_id = request.json.get('user_id')
    
   
    if not user_id:
        return jsonify({'error': 'Missing user_id'}), 400

 
    existing_bookmark = Bookmark.query.filter_by(user_id=user_id, question_id=question_id).first()
    if existing_bookmark:
        return jsonify({'error': 'Bookmark already exists'}), 400

   
    new_bookmark = Bookmark(user_id=user_id, question_id=question_id)
    db.session.add(new_bookmark)
    db.session.commit()

    return jsonify(new_bookmark.to_dict()), 201  

# try:
#         # Get the user ID and question ID from the request JSON body
#         data = request.get_json()
#         user_id = data.get('user_id')
#         question_id = data.get('question_id')

#         # Check if the user and question exist
#         user = User.query.get(user_id)
#         question = Question.query.get(question_id)

#         if not user:
#             return jsonify({"error": "User not found"}), 404
#         if not question:
#             return jsonify({"error": "Question not found"}), 404

#         # Create and save the bookmark
#         new_bookmark = Bookmark(user_id=user_id, question_id=question_id)
#         db.session.add(new_bookmark)
#         db.session.commit()

#         return jsonify({
#             "message": "Bookmark added successfully",
#             "bookmark": {
#                 "id": new_bookmark.id,
#                 "user_id": new_bookmark.user_id,
#                 "question_id": new_bookmark.question_id,
#                 "created_at": new_bookmark.created_at
#             }
#         }), 201

#     except Exception as e:
#         print(e)
#         return jsonify({"error": "Error creating bookmark"}), 500