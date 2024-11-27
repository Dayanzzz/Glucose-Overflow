"""creating tables

Revision ID: f91502d7cd49
Revises: ffdc0a98111c
Create Date: 2024-11-25 15:02:21.714139

"""
from alembic import op
import sqlalchemy as sa



# revision identifiers, used by Alembic.
revision = 'f91502d7cd49'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('glucose_tracker',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('before_breakfast', sa.Float(), nullable=True),
    sa.Column('before_lunch', sa.Float(), nullable=True),
    sa.Column('before_dinner', sa.Float(), nullable=True),
    sa.Column('hbA1c', sa.Float(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),  
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('questions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('question_text', sa.String(length=255), nullable=False),
    sa.Column('answered', sa.Boolean(), nullable=True),
    sa.Column('date_asked', sa.DateTime(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('comment_text', sa.String(length=500), nullable=False),
    sa.Column('date_posted', sa.DateTime(), nullable=True),
    sa.Column('question_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['question_id'], ['questions.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('comments')
    op.drop_table('questions')
    op.drop_table('glucose_tracker')
    # ### end Alembic commands ###
