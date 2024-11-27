from flask import Blueprint, request, jsonify, abort
from flask_login import login_required, current_user
from ..models import db, GlucoseTracker
from datetime import datetime


glucose_routes = Blueprint('glucose', __name__, url_prefix="/api/glucose")

# GET
@glucose_routes.route('', methods=['GET'])
@login_required
def get_glucose_entries():
    user_id = current_user.id  
    glucose_entries = GlucoseTracker.query.filter_by(user_id=user_id).all()

    if not glucose_entries:
        return jsonify({"message": "No glucose entries found"}), 404

    return jsonify([{
        'id': entry.id,
        'date': entry.date.strftime('%Y-%m-%d'),
        'before_breakfast': entry.before_breakfast,
        'before_lunch': entry.before_lunch,
        'before_dinner': entry.before_dinner,
        'hbA1c': entry.hbA1c,
        
       
    } for entry in glucose_entries]), 200

# POST
@glucose_routes.route('', methods=['POST'])
@login_required
def create_glucose_entry():
    data = request.get_json()
    print(f"Received data: {data}")  
    

    if not data.get('date') or not any([data.get('before_breakfast'), data.get('before_lunch'), data.get('before_dinner')]):
        return jsonify({'error': 'Please fill in at least one meal value (Breakfast, Lunch, or Dinner).'}), 400
    try:
    
        parsed_date = datetime.strptime(data.get('date'), '%Y-%m-%d').date()

        glucose_entry = GlucoseTracker(
            user_id=current_user.id,
            date=parsed_date, 
            before_breakfast=data.get('before_breakfast'),
            before_lunch=data.get('before_lunch'),
            before_dinner=data.get('before_dinner'),
            hbA1c=data.get('hbA1c')
        )

        db.session.add(glucose_entry)
        db.session.commit()

        return jsonify({
            'id': glucose_entry.id,
            'date': glucose_entry.date,
            'before_breakfast': glucose_entry.before_breakfast,
            'before_lunch': glucose_entry.before_lunch,
            'before_dinner': glucose_entry.before_dinner,
            'hbA1c': glucose_entry.hbA1c
        }), 201
    except Exception as e:
        db.session.rollback()
        print(f"Error while committing to the database: {e}")
        return jsonify({'error': str(e)}), 500
    

# GET/PUT
@glucose_routes.route('/<int:entryId>', methods=['GET', 'PUT'])
@login_required
def handle_glucose_entry(entryId):
    print(f"Received _id: {entryId}")
    glucose_entry = GlucoseTracker.query.get(entryId)

    if not glucose_entry or glucose_entry.user_id != current_user.id:
        abort(404, description="Glucose entry not found or not owned by the current user")

    if request.method == 'GET':
        print("Returning glucose entry:", glucose_entry)
        return jsonify({
            'id': glucose_entry.id,
            'date': glucose_entry.date, 
            'before_breakfast': glucose_entry.before_breakfast,
            'before_lunch': glucose_entry.before_lunch,
            'before_dinner': glucose_entry.before_dinner,
            'hbA1c': glucose_entry.hbA1c
        })
            
               
        

    elif request.method == 'PUT':
        data = request.get_json()
        print("Data received for update:", data)
        

       
        if 'date' in data:
         glucose_entry.date = datetime.strptime(data['date'], '%Y-%m-%d').date()
        glucose_entry.before_breakfast = data.get('before_breakfast', glucose_entry.before_breakfast)
        glucose_entry.before_lunch = data.get('before_lunch', glucose_entry.before_lunch)
        glucose_entry.before_dinner = data.get('before_dinner', glucose_entry.before_dinner)
        glucose_entry.hbA1c = data.get('hbA1c', glucose_entry.hbA1c)

        print("Updated glucose entry:", glucose_entry)

        
        try:
            
            db.session.commit()
            print("Changes committed successfully")
        except Exception as e:
            db.session.rollback()  
            print(f"Error during commit: {e}")
            return jsonify({"error": "Failed to update glucose entry"}), 500

        
        updated_glucose_entry = GlucoseTracker.query.get(entryId)
        print("Updated glucose entry after commit:", updated_glucose_entry)

        
        return jsonify({
            'id': updated_glucose_entry.id,
            'date': updated_glucose_entry.date,
            'before_breakfast': updated_glucose_entry.before_breakfast,
            'before_lunch': updated_glucose_entry.before_lunch,
            'before_dinner': updated_glucose_entry.before_dinner,
            'hbA1c': updated_glucose_entry.hbA1c,
        })

# DELETE
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
