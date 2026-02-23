import uuid
from sqlalchemy import ForeignKey, func
from sqlalchemy.dialects.postgresql import UUID
from .base import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime

class Wedding(Base):
    __tablename__ = "weddings"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    wedding_title: Mapped[str] = mapped_column(nullable=False)
    wedding_date: Mapped[datetime] = mapped_column(nullable=False)
    shipping_address: Mapped[str] = mapped_column(nullable=True)
    created_at: Mapped[datetime] = mapped_column(default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(default=func.now(), onupdate=func.now(), nullable=False)

    owner_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    owner = relationship("User", back_populates="weddings")
    gifts = relationship("Gift", back_populates="wedding", cascade="all, delete-orphan")
    guests = relationship("Guest", back_populates="wedding", cascade="all, delete-orphan")
    guest_requests = relationship("GuestRequest", back_populates="wedding", cascade="all, delete-orphan")
    gift_contributions = relationship("GiftContribution", back_populates="wedding", cascade="all, delete-orphan")