import typesense
import os
from dotenv import load_dotenv

load_dotenv()

client = typesense.Client({
  'nodes': [{
    'host': os.getenv('DATABASE_URL'),  # For Typesense Cloud use xxx.a1.typesense.net
    'port': '443',       # For Typesense Cloud use 443
    'protocol': 'https'    # For Typesense Cloud use https
  }],
  'api_key': os.getenv('SEARCH_API_KEY'),
  'connection_timeout_seconds': 2
})
