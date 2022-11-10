import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    slug: { type: String, unique: true },
    category: { type: String},
    image: { type: String},
    price: { type: Number},
    countInStock: { type: Number},
    brand: { type: String},
    rating: { type: Number},
    numReviews: { type: Number},
    Description: { type: String},
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;