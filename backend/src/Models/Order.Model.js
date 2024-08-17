import { model, Schema } from "mongoose";

const orderSchema = new Schema({
  items: {
    type: [Schema.Types.Mixed],
    required: true,
  },
  uid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  totalItemsAmount: {
    type: Number,
    required: true,
  },
  selectedAddress: {
    type: [Schema.Types.Mixed],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["PENDING", "SUCCESS", "DELIVERED", "DISPATCHED", "CANCEL"],
    default: "PENDING",
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
