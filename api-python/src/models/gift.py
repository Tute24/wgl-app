from datetime import datetime
import uuid

from sqlalchemy import ForeignKey, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base

class Gift(Base):
    __tablename__ = "gifts"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(nullable=False)
    purchase_link: Mapped[str] = mapped_column(nullable=False)
    quantity: Mapped[int] = mapped_column(nullable=False)
    created_at: Mapped[datetime] = mapped_column(default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(default=func.now(), onupdate=func.now(), nullable=False)

    wedding_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("weddings.id", ondelete="CASCADE"), nullable=False)

    wedding = relationship("Wedding", back_populates="gifts")
    gift_contributions = relationship("GiftContribution", back_populates="gift", cascade="all, delete-orphan")
