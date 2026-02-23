from datetime import datetime
import uuid
from sqlalchemy import ForeignKey, func
from .base import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID

class Guest(Base):
    __tablename__ = "guests"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at: Mapped[datetime] = mapped_column(default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(default=func.now(), onupdate=func.now(), nullable=False)

    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    wedding_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("weddings.id", ondelete="CASCADE"), nullable=False)

    wedding = relationship("Wedding", back_populates="guests")
    user = relationship("User", back_populates="guest_entries")