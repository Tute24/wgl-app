import uuid
from datetime import datetime
from sqlalchemy import func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base

class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email: Mapped[str] = mapped_column(unique=True, nullable=False)
    first_name: Mapped[str] = mapped_column(nullable=False)
    last_name: Mapped[str] = mapped_column(nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    created_at: Mapped[datetime] = mapped_column(default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(default=func.now(), onupdate=func.now(), nullable=False)

    weddings = relationship("Wedding", back_populates="owner", cascade="all, delete-orphan")
    guest_entries = relationship("Guest", back_populates="user", cascade="all, delete-orphan")
    guest_requests = relationship("GuestRequest", back_populates="user", cascade="all, delete-orphan")
    gift_contributions = relationship("GiftContribution", back_populates="user", cascade="all, delete-orphan")
    reset_password_requests = relationship("ResetPasswordRequest", back_populates="user", cascade="all, delete-orphan")