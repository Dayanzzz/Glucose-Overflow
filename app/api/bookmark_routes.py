from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from ..models import Bookmark,db

bookmark_routes = Blueprint('bookmarks', __name__, url_prefix="/api/bookmarks")

# GET: Fetch all bookmarks for the currently logged-in user
@bookmark_routes.route('/', methods=['GET'])
@login_required
def get_bookmarks():
    # Fetch all bookmarks for the logged-in user
    bookmarks = Bookmark.query.filter_by(user_id=current_user.id).all()

    # Return the list of bookmarks as JSON
    return jsonify([{
        'id': bookmark.id,
        'user_id': bookmark.user_id,
        'question_id': bookmark.question_id,
    } for bookmark in bookmarks])


@bookmark_routes.route('/<int:bookmark_id>', methods=['DELETE'])
@login_required
def delete_bookmark(bookmark_id):
    # Find the bookmark by id and make sure it belongs to the current user
    bookmark = Bookmark.query.filter_by(id=bookmark_id, user_id=current_user.id).first()

    if bookmark:
        # If the bookmark exists, delete it
        db.session.delete(bookmark)
        db.session.commit()

        # Return a success message
        return jsonify({'message': 'Bookmark deleted successfully'}), 200
    else:
        # If bookmark doesn't exist or doesn't belong to the current user, return an error
        return jsonify({'error': 'Bookmark not found or unauthorized'}), 404
