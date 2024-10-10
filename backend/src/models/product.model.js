import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
    },
    description: {
        type: String,
        default: '',
    },
    stock: {
        type: Number,
        default: 0,
    },
    isDeleted: {
        type: Boolean,
        default: false,  // Borrado lógico
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
    },
    images: [{
        type: String,  // URL de la imagen
        required: true,
    }],
}, { timestamps: true });

// Método estático para obtener solo productos no eliminados
productSchema.statics.findAvailableProducts = function() {
    return this.find({ isDeleted: false });
};

// Método para hacer un "borrado lógico" del producto
productSchema.methods.softDelete = function() {
    this.isDeleted = true;
    return this.save();
};

// Método para restaurar el producto
productSchema.methods.restore = function() {
    this.isDeleted = false;
    return this.save();
};

const Product = mongoose.model('Product', productSchema);
export default Product;
