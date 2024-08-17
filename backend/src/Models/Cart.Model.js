import { model, Schema } from "mongoose";

const cartSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    requried: true,
  },
  uid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  size: {
    type: Schema.Types.Mixed,
  },
  color: {
    type: Schema.Types.Mixed,
  },
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
