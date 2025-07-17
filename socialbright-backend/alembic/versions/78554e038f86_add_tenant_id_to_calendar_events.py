"""Add tenant_id to calendar_events"""

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '78554e038f86'
down_revision = '78ce756e993a'
branch_labels = None
depends_on = None

def upgrade():
    # Step 1: Add tenant_id as nullable
    op.add_column('calendar_events', sa.Column('tenant_id', sa.Integer(), nullable=True), schema='clients')

    # Step 2: Populate tenant_id based on client_id
    op.execute("""
        UPDATE clients.calendar_events ce
        SET tenant_id = c.tenant_id
        FROM clients.clients c
        WHERE ce.client_id = c.id
    """)

    # Step 3: Set column to NOT NULL
    op.alter_column('calendar_events', 'tenant_id', nullable=False, schema='clients')



def downgrade():
    op.drop_column('calendar_events', 'tenant_id', schema='clients')

