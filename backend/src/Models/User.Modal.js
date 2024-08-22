import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constant.js";

const addressSchema = new Schema({
  fullname: String,
  streetAddress: String,
  city: String,
  zipCode: String,
  email: String,
  country: String,
  region: String,
});

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: [1, "Password length must be greater then or equal to 8"],
    },
    addresses: [addressSchema],
    role: {
      type: String,
      enum: ["NORMAL", "ADMIN"],
      default: "NORMAL",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    profileImg: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const virtual = userSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10); // return hash-password

  next();
});

userSchema.methods.generateAccessToken = function () {
  const payload = {
    id: this._id,
    email: this.email,
    role: this.role,
    isVerified: this.isVerified,
  };

  const accessToken = jwt.sign(payload, JWT_SECRET);

  return accessToken;
};

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password); // return true-false
};

const User = model("User", userSchema);

export default User;
