import {
  deleteFileFromCloudinary,
  uploadOnCloudinary,
} from "../Config/CloudinaryConfig.js";
import Order from "../Models/Order.Model.js";
import User from "../Models/User.Modal.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js";
import wrapAsync from "../Utils/wrapAsync.js";

export const getUserOrders = wrapAsync(async (req, res, next) => {
  const uid = req.user?.id;

  const userOrders = await Order.find({ uid });

  return res.status(200).json(new ApiResponse(true, "User Orders", userOrders));
});

export const getUserinfo = wrapAsync(async (req, res, next) => {
  const uid = req.user.id;

  const userInfo = await User.findById(uid).select(
    "-createdAt -updatedAt -password"
  );

  return res.status(200).json(new ApiResponse(true, "User Info", userInfo));
});

export const updateUser = wrapAsync(async (req, res, next) => {
  // updating ( username , profileImage )
  const uid = req.user?.id;
  const { username } = req.body;
  const profileImg = req.file; // get file from request object

  const user = await User.findById(uid);

  if (!user) return next(new ApiError(false, 404, "User Not Found"));

  if (user.username !== username) {
    user.username = username;
  }

  if (profileImg) {
    // check if file is given in request object;
    const oldProfileImage = user.profileImg; // getting a profileImg url from user object;

    const response = await uploadOnCloudinary(profileImg.path); // uploading a file given in request object;

    if (response && response.url !== user.profileImg) {
      // check if the uploaded file url on cloudinary or the url which is store in user object is same or not ; if same ? go-forward don't do changes : change the new profileImg url in user object;
      user.profileImg = response.url; //change the new profileImg url in user object;

      if (oldProfileImage) {
        // if in case oldProfileImg which is user old image is present or user can't upload doesn't exists ; if exist ? we delete this file from cloudinary : forward to other operations
        const publicId = oldProfileImage.split("/").pop().split(".")[0];
        await deleteFileFromCloudinary(publicId);
      }
    }
  }

  await user.save();

  return res.status(200).json(new ApiResponse(true, "User Updated", user));
});

export const updateUserAddresses = wrapAsync(async (req, res, next) => {
  const uid = req.user.id;

  const user = await User.findByIdAndUpdate(uid, req.body, { new: true });

  return res
    .status(200)
    .json(new ApiResponse(true, "User Addresses Updated", user));
});
