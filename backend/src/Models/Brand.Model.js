import { model, Schema } from "mongoose";

const brandSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const Brand = model("Brand", brandSchema);

export default Brand;
