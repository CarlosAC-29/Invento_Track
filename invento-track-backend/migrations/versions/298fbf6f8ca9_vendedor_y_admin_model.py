"""vendedor y admin model

Revision ID: 298fbf6f8ca9
Revises: 
Create Date: 2024-04-24 21:07:18.499556

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '298fbf6f8ca9'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('administrador',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=128), nullable=True),
    sa.Column('apellido', sa.String(length=128), nullable=True),
    sa.Column('email', sa.String(length=128), nullable=True),
    sa.Column('password', sa.String(length=128), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('cliente',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=128), nullable=True),
    sa.Column('apellido', sa.String(length=128), nullable=True),
    sa.Column('email', sa.String(length=128), nullable=True),
    sa.Column('direccion', sa.String(length=128), nullable=True),
    sa.Column('telefono', sa.String(length=128), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('vendedor',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=128), nullable=True),
    sa.Column('apellido', sa.String(length=128), nullable=True),
    sa.Column('email', sa.String(length=128), nullable=True),
    sa.Column('estado', sa.String(length=128), nullable=True),
    sa.Column('password', sa.String(length=128), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('vendedor')
    op.drop_table('cliente')
    op.drop_table('administrador')
    # ### end Alembic commands ###
