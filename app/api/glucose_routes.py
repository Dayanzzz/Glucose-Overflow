from flask import Blueprint, request, jsonify, abort
from flask_login import login_required, current_user
from ..models import db, GlucoseTracker

glucose_routes = Blueprint('glucose', __name__, url_prefix="/api/glucose")

# GET: Fetch all glucose entries for the current user
@glucose_routes.route('', methods=['GET'])
@login_required
def get_glucose_entries():
    user_id = current_user.id  # Use current_user to fetch data specific to logged-in user
    glucose_entries = GlucoseTracker.query.filter_by(user_id=user_id).all()

    if not glucose_entries:
        return jsonify({"message": "No glucose entries found"}), 404

    return jsonify([{
        'id': entry.id,
        'date': entry.date,
        'before_breakfast': entry.before_breakfast,
        'before_lunch': entry.before_lunch,
        'before_dinner': entry.before_dinner,
        'hbA1c': entry.hbA1c,
        'created_at': entry.created_at,
        'updated_at': entry.updated_at,
    } for entry in glucose_entries]), 200

# POST: Create a new glucose entry
@glucose_routes.route('', methods=['POST'])
@login_required
def create_glucose_entry():
    data = request.get_json()

    # Validate required fields
    if not data.get('date') or not data.get('before_breakfast') or not data.get('before_lunch') or not data.get('before_dinner'):
        return jsonify({'error': 'Date and all glucose levels are required'}), 400
    
    user_id = current_user.id  # Associate the entry with the current user

    # Create a new glucose entry
    new_entry = GlucoseTracker(
        date=data['date'],
        before_breakfast=data['before_breakfast'],
        before_lunch=data['before_lunch'],
        before_dinner=data['before_dinner'],
        hbA1c=data.get('hbA1c'),
        user_id=user_id
    )

    db.session.add(new_entry)
    db.session.commit()

    return jsonify({
        'id': new_entry.id,
        'date': new_entry.date,
        'before_breakfast': new_entry.before_breakfast,
        'before_lunch': new_entry.before_lunch,
        'before_dinner': new_entry.before_dinner,
        'hbA1c': new_entry.hbA1c,
        'created_at': new_entry.created_at,
        'updated_at': new_entry.updated_at,
    }), 201

# GET/PUT: Get or update a glucose entry by ID
@glucose_routes.route('/<int:id>', methods=['GET', 'PUT'])
@login_required
def handle_glucose_entry(id):
    glucose_entry = GlucoseTracker.query.get(id)

    if not glucose_entry or glucose_entry.user_id != current_user.id:
        abort(404, description="Glucose entry not found or not owned by the current user")

    if request.method == 'GET':
        return jsonify({
            'id': glucose_entry.id,
            'date': glucose_entry.date,
            'before_breakfast': glucose_entry.before_breakfast,
            'before_lunch': glucose_entry.before_lunch,
            'before_dinner': glucose_entry.before_dinner,
            'hbA1c': glucose_entry.hbA1c,
             'created_at': glucose_entry.created_at,
        'updated_at': glucose_entry.updated_at,
        })

    elif request.method == 'PUT':
        data = request.get_json()

        # Update fields if provided
        glucose_entry.date = data.get('date', glucose_entry.date)
        glucose_entry.before_breakfast = data.get('before_breakfast', glucose_entry.before_breakfast)
        glucose_entry.before_lunch = data.get('before_lunch', glucose_entry.before_lunch)
        glucose_entry.before_dinner = data.get('before_dinner', glucose_entry.before_dinner)
        glucose_entry.hbA1c = data.get('hbA1c', glucose_entry.hbA1c)

        db.session.commit()

        return jsonify({
            'id': glucose_entry.id,
            'date': glucose_entry.date,
            'before_breakfast': glucose_entry.before_breakfast,
            'before_lunch': glucose_entry.before_lunch,
            'before_dinner': glucose_entry.before_dinner,
            'hbA1c': glucose_entry.hbA1c
        })

# DELETE: Delete a glucose entry by ID
@glucose_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_glucose_entry(id):
    glucose_entry = GlucoseTracker.query.get(id)

    if not glucose_entry:
        return jsonify({'message': 'Glucose entry not found'}), 404

    if glucose_entry.user_id != current_user.id:
        return jsonify({'message': 'You do not have permission to delete this entry'}), 403

    db.session.delete(glucose_entry)
    db.session.commit()

    return jsonify({'message': 'Glucose entry deleted successfully'}), 200
