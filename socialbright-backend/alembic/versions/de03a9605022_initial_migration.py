"""Initial migration

Revision ID: de03a9605022
Revises: 
Create Date: 2025-07-10 14:24:10.774078

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'de03a9605022'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tenants',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('domain', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('clients',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('tenant_id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=False),
    sa.Column('last_name', sa.String(), nullable=False),
    sa.Column('date_of_birth', sa.Date(), nullable=False),
    sa.Column('medicaid_id', sa.String(), nullable=True),
    sa.Column('phone', sa.String(), nullable=True),
    sa.Column('mco', sa.String(), nullable=True),
    sa.Column('address', sa.String(), nullable=True),
    sa.Column('city', sa.String(), nullable=True),
    sa.Column('state', sa.String(), nullable=True),
    sa.Column('zip', sa.String(), nullable=True),
    sa.Column('gender', sa.String(), nullable=True),
    sa.Column('language', sa.String(), nullable=True),
    sa.Column('primary_phone', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['tenant_id'], ['tenants.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('medicaid_id')
    )
    op.create_table('case_notes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('client_id', sa.Integer(), nullable=False),
    sa.Column('tenant_id', sa.Integer(), nullable=False),
    sa.Column('date_of_contact', sa.Date(), nullable=True),
    sa.Column('assigned_staff', sa.String(), nullable=True),
    sa.Column('send_notification', sa.Boolean(), nullable=True),
    sa.Column('send_to_another', sa.Boolean(), nullable=True),
    sa.Column('additional_staff', sa.String(), nullable=True),
    sa.Column('type_of_contact', sa.String(), nullable=True),
    sa.Column('is_30_day_call', sa.Boolean(), nullable=True),
    sa.Column('participant_checked', sa.Boolean(), nullable=True),
    sa.Column('collateral_checked', sa.Boolean(), nullable=True),
    sa.Column('collateral_comment', sa.Text(), nullable=True),
    sa.Column('contact_name', sa.String(), nullable=True),
    sa.Column('medical_conditions', sa.String(), nullable=True),
    sa.Column('additional_interventions', sa.Text(), nullable=True),
    sa.Column('case_note_detail', sa.Text(), nullable=True),
    sa.Column('case_manager_name', sa.String(), nullable=True),
    sa.Column('signature', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['client_id'], ['clients.id'], ),
    sa.ForeignKeyConstraint(['tenant_id'], ['tenants.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('documents',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('client_id', sa.Integer(), nullable=False),
    sa.Column('tenant_id', sa.Integer(), nullable=False),
    sa.Column('filename', sa.String(), nullable=False),
    sa.Column('file_type', sa.String(), nullable=True),
    sa.Column('upload_date', sa.DateTime(), nullable=True),
    sa.Column('category', sa.String(), nullable=True),
    sa.Column('url', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['client_id'], ['clients.id'], ),
    sa.ForeignKeyConstraint(['tenant_id'], ['tenants.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('eligibility',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('client_id', sa.Integer(), nullable=False),
    sa.Column('eligible', sa.Boolean(), nullable=True),
    sa.Column('monthly_income', sa.Float(), nullable=True),
    sa.Column('deductions', sa.Float(), nullable=True),
    sa.Column('redetermination_date', sa.Date(), nullable=True),
    sa.Column('mea_review_date', sa.Date(), nullable=True),
    sa.ForeignKeyConstraint(['client_id'], ['clients.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('client_id')
    )
    op.create_table('guardians',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('client_id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=True),
    sa.Column('last_name', sa.String(), nullable=True),
    sa.Column('relation_to_participant', sa.String(), nullable=True),
    sa.Column('phone', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['client_id'], ['clients.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('guardians')
    op.drop_table('eligibility')
    op.drop_table('documents')
    op.drop_table('case_notes')
    op.drop_table('clients')
    op.drop_table('tenants')
    # ### end Alembic commands ###
