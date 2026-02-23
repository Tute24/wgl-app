from .base import Base
from sqlalchemy import ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime

class GuestRequest(Base):
    __tablename__ = "guest_requests"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    pending: Mapped[bool] = mapped_column(default=True, nullable=False)
    accepted: Mapped[bool] = mapped_column(default=False, nullable=False)
    created_at: Mapped[datetime] = mapped_column(default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(default=func.now(), onupdate=func.now(), nullable=False)

    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    wedding_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("weddings.id", ondelete="CASCADE"), nullable=False)

    wedding = relationship("Wedding", back_populates="guest_requests")
    user = relationship("User", back_populates="guest_requests")