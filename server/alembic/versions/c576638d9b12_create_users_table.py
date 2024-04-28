"""Create users table

Revision ID: c576638d9b12
Revises:
Create Date: 2024-04-28 19:49:19.581287

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c576638d9b12'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'users',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('email', sa.String, nullable=False),
        sa.Column('first_name', sa.String),
        sa.Column('last_name', sa.String),
        sa.Column('phone', sa.String),
        sa.Column('company', sa.String),
        sa.Column('is_admin', sa.Boolean, nullable=False, default=False)
    )


def downgrade() -> None:
    op.drop_table('users')
