import { model, Schema } from "mongoose";

const orderSchema = new Schema({
  items: [
    {
      type: Schema.Types.Mixed,
      required: true,
    },
  ],
  uid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  itemsTotalAmount: {
    type: Number,
    required: true,
  },
  selectAddress: {
    type: Schema.Types.Mixed,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["PENDING", "SUCCESS", "DELIVERED", "DISPATCHED", "CANCEL"],
    default: "PENDING",
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "card"],
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const virtual = orderSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

orderSchema.set("toJOSN", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Order = model("Order", orderSchema);

export default Order;
