"""Add password to users table

Revision ID: a034faa48156
Revises: c576638d9b12
Create Date: 2024-04-28 20:18:55.291876

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a034faa48156'
down_revision: Union[str, None] = 'c576638d9b12'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('users', sa.Column('password', sa.String, nullable=False))


def downgrade() -> None:
    op.drop_column('users', 'password')
