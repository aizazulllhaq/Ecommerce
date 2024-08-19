import { model, Schema } from "mongoose";

const categorySchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});


const Category = model("Category", categorySchema);

export default Category;
