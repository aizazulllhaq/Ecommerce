import { model, Schema } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [1, "Price must be greater then 0"],
  },
  discountPercentage: {
    type: Number,
    min: [1, "Discount must be greater then 0 Percent"],
    max: [100, "Discount must be less then 100 Percent"],
  },
  rating: {
    type: Number,
    min: [1, "Rating must be greater then 0"],
    max: [5, "Rating must be less then 5"],
  },
  stock: {
    type: Number,
    required: true,
    min: [1, "Stock must be greater then 0"],
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
  },
  sizes: [
    {
      type: Schema.Types.Mixed,
    },
  ],
  colors: [
    {
      type: Schema.Types.Mixed,
    },
  ],
  highlights: {
    type: [String],
  },
  discountPrice: {
    type: Number,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

const virtual = productSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Product = model("Product", productSchema);

export default Product;
