import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addProduct,
  deleteProductPermanently,
  deleteProductTemporary,
  getAllBrands,
  getAllCategries,
  getProductById,
  getProductsByFilter,
  updateProduct,
} from "./productApi";

export const getProductsByFilterAsync = createAsyncThunk(
  "product/getProductsByFilter",
  async ({ filter, sort, pagination }) => {
    const response = await getProductsByFilter(filter, sort, pagination);
    return response;
  }
);

export const getAllCategoriesAsync = createAsyncThunk(
  "product/getAllCategories",
  async () => {
    const response = await getAllCategries();
    return response;
  }
);

export const getAllBrandsAsync = createAsyncThunk(
  "product/getAllBrands",
  async () => {
    const response = await getAllBrands();
    return response;
  }
);

export const getProductByIdAsync = createAsyncThunk(
  "product/getProductById",
  async (id) => {
    const response = await getProductById(id);
    return response;
  }
);

export const addProductAsync = createAsyncThunk(
  "product/addProduct",
  async (newProduct) => {
    const response = await addProduct(newProduct);
    return response;
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (updatedProduct) => {
    const response = await updateProduct(updatedProduct);
    return response;
  }
);

export const deleteProductTemporaryAsync = createAsyncThunk(
  "product/deleteProductTemporary",
  async (id) => {
    const response = await deleteProductTemporary(id);
    return response;
  }
);

export const deleteProductPermanentlyAsync = createAsyncThunk(
  "product/deleteProductPermanently",
  async (id) => {
    const response = await deleteProductPermanently(id);
    return response;
  }
);

const initialState = {
  status: "idle",
  products: [],
  product: null,
  totalItems: 0,
  categories: [],
  brands: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.data;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(getProductsByFilterAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(getAllCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload.data;
      })
      .addCase(getAllBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload.data;
      })
      .addCase(getProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.product = action.payload;
      })
      .addCase(addProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        state.products[index] = action.payload;
      })
      .addCase(deleteProductTemporaryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProductTemporaryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        state.products[index] = action.payload;
      })
      .addCase(deleteProductPermanentlyAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProductPermanentlyAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        state.products.splice(index, 1);
      });
  },
});

export const selectProduct = (state) => state.product.product;

export default productSlice.reducer;
