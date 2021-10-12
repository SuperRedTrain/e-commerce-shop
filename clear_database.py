import sys
import json
import requests
from requests.structures import CaseInsensitiveDict

if len(sys.argv) > 1:
    APIKEY=sys.argv[1]
else:
    print("An API key is needed.")
    exit()


headers = CaseInsensitiveDict()
headers['X-Authorization'] = APIKEY

r = requests.get('https://api.chec.io/v1/products?limit=25', headers=headers)
response = json.loads(r.text)
if ("data" in response):
    products = response["data"]
    for product in products:
        product_request = requests.delete('https://api.chec.io/v1/products/'+product["id"], headers=headers)
        print(product_request.text)
else:
    print(response)

r = requests.get('https://api.chec.io/v1/assets', headers=headers)
response = json.loads(r.text)
if ("data" in response):
    assets = response["data"]
    for asset in assets:
        asset_request = requests.delete('https://api.chec.io/v1/assets/'+asset["id"], headers=headers)
        print(asset_request.text)
else:
    print(response)