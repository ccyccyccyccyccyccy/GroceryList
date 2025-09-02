from fastapi import APIRouter, Query
from schemas import Product, BrandNames
from database import client

router = APIRouter()
@router.get("/query_grocery/", response_model=list[Product])
async def query(product_name:str, upper_px_limit: float|None=None, lower_px_limit: float|None=None, in_stock_only: bool|None=None, brand_filter: list[BrandNames]|None= Query(None),  page: int = 1,per_page: int = 20):
    filter_conditions = []

    # Price range filter
    if lower_px_limit is not None and upper_px_limit is not None:
        filter_conditions.append(f"price:[{lower_px_limit}..{upper_px_limit}]")
    elif lower_px_limit is not None:
        filter_conditions.append(f"price:>={lower_px_limit}")
    elif upper_px_limit is not None:
        filter_conditions.append(f"price:<={upper_px_limit}")

    # Stock filter
    if in_stock_only:
        filter_conditions.append("is_in_stock:=true")
    # Brand filter
    if brand_filter:
        brands = ",".join(brand_filter)
        filter_conditions.append(f"brand:=[{brands}]")

    # Combine filters
    filter_by = " && ".join(filter_conditions) if filter_conditions else None

    # Perform search
    search_params = {
        "q": product_name,
        "query_by": "name",
        "sort_by": "_text_match:desc",
        "per_page": per_page, 
        "page" :page
    }

    if filter_by:
        search_params["filter_by"] = filter_by

    results = client.collections["grocery"].documents.search(search_params)
    return [hit["document"] for hit in results["hits"]]