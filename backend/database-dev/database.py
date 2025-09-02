import typesense
import os
from dotenv import load_dotenv

load_dotenv()

client = typesense.Client({
  'nodes': [{
    'host': os.getenv("DATABASE_URL"),  # For Typesense Cloud use xxx.a1.typesense.net
    'port': '443',       # For Typesense Cloud use 443
    'protocol': 'https'    # For Typesense Cloud use https
  }],
  'api_key': os.getenv("ADMIN_API_KEY"),
  'connection_timeout_seconds': 300
})

def create_collection(client):
    schema = {
    'name': 'grocery',
    'fields': [
        {
        'name'  :  'name',
        'type'  :  'string'
        },
        {
        'name'  :  'quantity',
        'type'  :  'string', 
        "optional": True
        },
        {
        'name'  :  'price',
        'type'  :  'float',
        }, 
        {
            'name'  :  'image_url',
            'type'  :  'string', 
            'index' :False #don't need to search/ filter this field 
        }, 
        {
        'name'  :  'is_in_stock',
        'type'  :  'bool'
        }, 
        {
            "name" : "brand",
            "type" : "string"
        }
    ],
    'default_sorting_field': 'price'
    }

    client.collections.create(schema)
