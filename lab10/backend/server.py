from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS # Import CORS for enabling cross-origin requests
import json
import os

app = Flask(__name__)
CORS(app, origins=["http://example.com", "http://localhost:3001"]) #Enable CORS for all domains on all routes

# Function to load products from JSON file
def load_products():
    with open('products.json', 'r') as f:
        return json.load(f)['products']

# Function to save products to JSON file
def save_products(products):
    with open('products.json', 'w') as f:
        json.dump({"products": products}, f)    

# Route to get all products or a specific product by ID   
@app.route('/products', methods=['GET'])
@app.route('/products/<int:product_id>', methods=['GET'])
def get_products(product_id=None):
    products = load_products()
    if product_id is None:
        # Return all products wrapped in an object with a 'products' key
        return jsonify({"products": products})
    else:
        product = next((p for p in products if p['id'] == product_id), None)
        # If a specific product is requested,
        # wrap it in an object with a 'products' key
        # Note: You might want to change this
        # if you want to return a single product not wrapped in a list
        return jsonify(product) if product else ('', 404)

#Flask app code
# Route to add a new product
@app.route('/products/add', methods=['POST'])
def add_product():
    new_product = request.json
    products = load_products()
    new_product['id'] = len(products) + 1
    products.append(new_product)
    with open('products.json', 'w') as f:
        json.dump({"products": products}, f)
    return jsonify(new_product), 201

# Route to update a product by ID
@app.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    products = load_products()
    for product in products:
        if product['id'] == product_id:
            updated_product_data = request.json
            product.update(updated_product_data)
            save_products(products)
            return jsonify(product), 200
    return jsonify({"error": "Product not found"}), 404

# Route to delete a product by ID
@app.route('/products/<int:product_id>', methods=['DELETE'])
def remove_product(product_id):
    products = load_products()
    for index, product in enumerate(products):
        if product['id'] == product_id:
            del products[index]
            save_products(products)
            return jsonify({"message": "Product deleted successfully"}), 200
    return jsonify({"error": "Product not found"}), 404

# Route to serve product images
@app.route('/product-images/<path:filename>')
def get_image(filename):
    return send_from_directory('product-images', filename)

if __name__ == '__main__':
    app.run(debug=True)
