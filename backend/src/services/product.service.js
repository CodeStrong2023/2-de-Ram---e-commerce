import productRepository from '../repositories/product.repository.js';
import Product from '../models/product.model.js';

export default class ProductService {
    async createProduct(productData) {
        try {
            return await productRepository.createProduct(productData);
        } catch (error) {
            throw new Error(`Error creating product: ${error.message}`);
        }
    }

    async getProductById(id) {
        try {
            const product = await productRepository.findProductById(id);
            if (!product) throw new Error('Product not found');
            return product;
        } catch (error) {
            throw new Error(`Error retrieving product: ${error.message}`);
        }
    }

    async getAllProducts() {
        try {
            return await productRepository.getAllProducts();
        } catch (error) {
            throw new Error(`Error retrieving products: ${error.message}`);
        }
    }

    async updateProduct(id, updateData) {
        try {
            return await productRepository.updateProduct(id, updateData);
        } catch (error) {
            throw new Error(`Error updating product: ${error.message}`);
        }
    }

    async deleteProduct(id) {
        try {
            return await productRepository.deleteProduct(id);  // Borrado lógico
        } catch (error) {
            throw new Error(`Error deleting product: ${error.message}`);
        }
    }
}


