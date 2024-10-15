import Product from '../models/product.model.js'; // Importación en estilo ES6

class ProductRepository {
    async createProduct(productData) {
        const product = new Product(productData);
        return await product.save();
    }

    async findProductById(id) {
        // Excluir productos eliminados lógicamente
        return await Product.findOne({ _id: id, isDeleted: false });
    }

    async getAllProducts() {
        return await Product.find({ isDeleted: false });  // Excluir productos eliminados lógicamente
    }

    async updateProduct(id, updateData) {
        return await Product.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteProduct(id) {
        // Borrado lógico
        return await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    }
}

const productRepository = new ProductRepository();
export default productRepository;