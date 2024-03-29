import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: {type:String, required: true},
    comment: {type:String, required:true},
    rating: {type:Number, required:true},
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String,required: true},
    image: { type: String, required: true},
    images: [String],
    price: { type: Number,required: true},
    countInStock: { type: Number,required: true,maxlength:3},
    brand: { type: String,required: true},
    rating: { type: Number,required: true},
    numReviews: { type: Number,required: true},
    reviews: [reviewSchema],
    // Description: { type: String,},
  },
  {
    timestamps: true,
  }
); 

const Product = mongoose.model('Product', productSchema);
export default Product;