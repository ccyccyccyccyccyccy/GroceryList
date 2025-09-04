from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time
from pydantic import BaseModel
from typing import Optional
import re

# ---- Connect to DB ----
from database import client

# ---- Product Model ----
class Product(BaseModel):
    name: str
    quantity: Optional[str]= None
    price: float
    image_url: str
    is_in_stock: bool
    brand: str

# ---- Utility functions ----
def split_on_first_number(s):
    match = re.search(r'\d+', s)
    if match:
        start = match.start()
        return s[:start].strip(), s[start:].strip()
    else:
        return s, None  # No number found

def scroll_to_bottom(driver):
    last_height = driver.execute_script("return document.body.scrollHeight")
    while True:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(5)
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height

def slow_scroll(driver):
    scroll_pause = 0.5
    scroll_step = 300
    current_position = 0
    while True:
        driver.execute_script(f"window.scrollTo(0, {current_position});")
        time.sleep(scroll_pause)
        new_position = driver.execute_script("return window.pageYOffset + window.innerHeight")
        total_height = driver.execute_script("return document.body.scrollHeight")
        if new_position >= total_height:
            break
        current_position += scroll_step

# ---- Scraping Functions ----
def scrape_parknshop(url, brand):
    options = Options()
    driver = webdriver.Chrome(options=options)
    driver.get(url)
    scroll_to_bottom(driver)
    products = driver.find_elements(By.CLASS_NAME, "productContainer")
    print(f"{len(products)} products found for {brand}")
    scraped_products = []
    for product in products:
        try:
            img_url = product.find_element(By.TAG_NAME, "img").get_attribute("src")
            name = product.find_element(By.CLASS_NAME, "name").text
            quantity = product.find_element(By.CLASS_NAME, "productUnit").text
            price = float(product.find_element(By.CLASS_NAME, "currentPrice").text.replace("$",""))
            try:
                product.find_element(By.CLASS_NAME, "productHighlightOOS")
                is_in_stock = False
            except:
                is_in_stock = True
            p = Product(
                name=name,
                quantity=quantity,
                price=price,
                image_url=img_url,
                is_in_stock=is_in_stock,
                brand=brand,
            )
            scraped_products.append(p)
        except Exception as e:
            print(f"Error processing product: {e}")
            continue
    driver.quit()
    return scraped_products

def scrape_wellcome():
    results = []
    for i in range(1, 12):
        options = Options()
        driver = webdriver.Chrome(options=options)
        driver.get(f"https://www.wellcome.com.hk/en/category/100011/{i}.html")
        time.sleep(3)
        slow_scroll(driver)
        products = driver.find_elements(By.CLASS_NAME, "ware-wrapper")
        for product in products:
            try:
                img_url = product.find_element(By.CLASS_NAME, "el-image__inner").get_attribute("src")
                name_quantity = product.find_element(By.CLASS_NAME, "promo").text
                price_txt = product.find_element(By.CLASS_NAME, "price").text + product.find_element(By.CLASS_NAME, "small-price").text
                price = float(price_txt.replace("$",""))
                name, quantity = split_on_first_number(name_quantity)
                try:
                    product.find_element(By.CLASS_NAME, "out-of-stock")
                    is_in_stock = False
                except:
                    is_in_stock = True
                p = Product(
                    name=name,
                    quantity=quantity,
                    price=price,
                    image_url=img_url,
                    brand="Wellcome",
                    is_in_stock=is_in_stock
                )
                results.append(p)
            except Exception as e:
                print(f"Error processing product: {e}")
                continue
        driver.quit()
    return results

# ---- Upsert function ----
def upsert_documents(data_list, client=client):
    for doc in data_list:
        name = doc.get("name")
        brand = doc.get("brand")
        def sanitize_for_filter(value):
            value = value.replace('"', '\\"')
            value = re.sub(r'\(|\)', '', value)
            return value
        name = sanitize_for_filter(name)
        search_result = client.collections['grocery'].documents.search({
            'q': "*",
            'query_by': 'name',
            'filter_by': f'brand:="{brand}" && name:="{name}"',
            'per_page': 1
        })
        if search_result['found'] > 0:
            existing_id = search_result['hits'][0]['document']['id']
            doc['id'] = existing_id
    client.collections['grocery'].documents.import_(data_list, {'action': 'upsert'})

# ---- Main ----
if __name__ == "__main__":
    # Scrape ParknShop Fruits
    fruits = scrape_parknshop(
        "https://www.pns.hk/en/food-beverages/fruit/c/04090100", "ParknShop"
    )
    # Scrape ParknShop Vegetables
    veggies = scrape_parknshop(
        "https://www.pns.hk/en/food-beverages/vegetable/c/04090200", "ParknShop"
    )
    # Scrape Wellcome Fruits
    wellcome_products = scrape_wellcome()
    # Combine all
    all_products = fruits + veggies + wellcome_products
    # Convert to dicts
    all_products_dict = [p.model_dump() for p in all_products]
    # Upsert to DB
    upsert_documents(all_products_dict)
    print(f"Upserted {len(all_products_dict)} products to the database.")