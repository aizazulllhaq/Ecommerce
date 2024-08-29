import { model, Schema } from "mongoose";


// Define the schema for the sizes
const SizeSchema = new Schema({
  name: { type: String },
  inStock: { type: Boolean },
  id: { type: String }
});

// Define the schema for the colors
const ColorSchema = new Schema({
  name: { type: String },
  class: { type: String },
  selectedClass: { type: String },
  id: { type: String }
});

// Define the schema for the product
const ProductSchema = new Schema({
  title: { type: String },
  description: { type: String },
  price: { type: Number },
  discountPercentage: { type: Number },
  stock: { type: Number },
  brand: { type: String },
  category: { type: String },
  thumbnail: { type: String },
  images: [{ type: String }],
  sizes: SizeSchema,
  colors: ColorSchema,
  highlights: [{ type: String }],
  deleted: { type: Boolean, default: false },
  discountPrice: { type: Number },
  quantity: { type: Number }
});

const cartSchema = new Schema({
  product: [ProductSchema],
  uid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
});

const virtual = cartSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

cartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Cart = model("Cart", cartSchema);

export default Cart;
