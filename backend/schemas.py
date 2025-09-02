from pydantic import BaseModel
from enum import Enum, IntEnum
from typing import Optional

class Product(BaseModel):
    name: str
    quantity: Optional[str]= None
    price: float
    image_url: str
    is_in_stock: bool
    brand: str

class BrandNames(str, Enum):
    parknshop = "ParknShop"
    wellcome = "Wellcome"
