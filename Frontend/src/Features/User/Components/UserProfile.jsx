import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEdit = (data, index) => {
    const updatedUser = { ...user, addresses: [...user.addresses] };
    updatedUser.addresses.splice(index, 1, data);
    dispatch(updateUserAsync(updatedUser));
    setSelectedEditIndex(-1);
    reset();
  };

  const handleEditForm = (index) => {
    setShowAddAddressForm(false);
    setSelectedEditIndex(index);
    const address = user.addresses[index];
    setValue("fullname", address.fullname);
    setValue("streetAddress", address.streetAddress);
    setValue("city", address.city);
    setValue("zipCode", address.zipCode);
    setValue("email", address.email);
    setValue("country", address.country);
    setValue("region", address.region);
  };

  const handleRemove = (index) => {
    const userData = { ...user, addresses: [...user.addresses] };
    userData.addresses.splice(index, 1);
    dispatch(updateUserAsync(userData));
  };

  const handleAddAddress = (data) => {
    reset();
    const newUser = { ...user, addresses: [...user.addresses, data] };
    dispatch(updateUserAsync(newUser));
    setShowAddAddressForm(false);
    reset();
  };
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white py-2 mt-10">
      <h1 className="text-2xl font-bold">Name : {user.name}</h1>
      <h1 className="text-xl font-semibold text-red-800">
        Email : {user.email} and Role : {user.role}
      </h1>

      <button
        onClick={() => {
          setShowAddAddressForm(true);
          setSelectedEditIndex(-1);
          reset();
        }}
        className="px-[15px] py-[6px] bg-green-400 my-[20px] text-white rounded-md"
      >
        Add Address
      </button>

      {showAddAddressForm && (
        <form onSubmit={handleSubmit(handleAddAddress)}>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-4 sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  {...register("fullname", {
                    required: "Fullname is required",
                  })}
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.fullname && (
                  <p className="text-red-500 text-sm">
                    {errors.fullname.message}
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-4 sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="col-span-4 sm:col-span-2">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  {...register("country", {
                    required: "Country is required",
                  })}
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
                {errors.country && (
                  <p className="text-red-500 text-sm">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-4">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Street address
              </label>
              <div className="mt-2">
                <input
                  id="street-address"
                  {...register("streetAddress", {
                    required: "Street Address is required",
                  })}
                  type="text"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.streetAddress && (
                  <p className="text-red-500 text-sm">
                    {errors.streetAddress.message}
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-4 sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  {...register("city", {
                    required: "City is required",
                  })}
                  type="text"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city.message}</p>
                )}
              </div>
            </div>

            <div className="col-span-4 sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                State / Province
              </label>
              <div className="mt-2">
                <input
                  id="region"
                  {...register("region", {
                    required: "Region is required",
                  })}
                  type="text"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.region && (
                  <p className="text-red-500 text-sm">
                    {errors.region.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  id="postal-code"
                  {...register("zipCode", {
                    required: "Zip Code is required",
                  })}
                  type="text"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.zipCode && (
                  <p className="text-red-500 text-sm">
                    {errors.zipCode.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              onClick={() => setSelectedEditIndex(-1)}
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Address
            </button>
          </div>
        </form>
      )}

      <p className="mt-1 text-sm leading-6 text-gray-600">Addresses :</p>

      {user.addresses.map((address, index) => (
        <div key={index}>
          {selectedEditIndex === index && (
            <form onSubmit={handleSubmit((data) => handleEdit(data, index))}>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-4 sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="first-name"
                      {...register("fullname", {
                        required: "Fullname is required",
                      })}
                      type="text"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.fullname && (
                      <p className="text-red-500 text-sm">
                        {errors.fullname.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-span-4 sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      {...register("email", {
                        required: "Email is required",
                      })}
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-span-4 sm:col-span-2">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      {...register("country", {
                        required: "Country is required",
                      })}
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                    {errors.country && (
                      <p className="text-red-500 text-sm">
                        {errors.country.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-span-4">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      id="street-address"
                      {...register("streetAddress", {
                        required: "Street Address is required",
                      })}
                      type="text"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.streetAddress && (
                      <p className="text-red-500 text-sm">
                        {errors.streetAddress.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-span-4 sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      id="city"
                      {...register("city", {
                        required: "City is required",
                      })}
                      type="text"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-span-4 sm:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      id="region"
                      {...register("region", {
                        required: "Region is required",
                      })}
                      type="text"
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.region && (
                      <p className="text-red-500 text-sm">
                        {errors.region.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      id="postal-code"
                      {...register("zipCode", {
                        required: "Zip Code is required",
                      })}
                      type="text"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.zipCode && (
                      <p className="text-red-500 text-sm">
                        {errors.zipCode.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  onClick={() => setSelectedEditIndex(-1)}
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Edit Address
                </button>
              </div>
            </form>
          )}
          <ul role="list" className="divide-y divide-gray-100">
            <li className="flex justify-between gap-x-6 py-5 border-2 border-gray-200 p-2 m-2">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {address.fullname}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {address.email}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {address.zipCode}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  {address.city}
                </p>
                <p>{address.region}</p>
                <p>{address.city}</p>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <button
                  className="text-blue-700 cursor-pointer"
                  onClick={() => handleEditForm(index)}
                >
                  Edit
                </button>
                <button
                  className="text-blue-700 cursor-pointer"
                  onClick={() => handleRemove(index)}
                >
                  Remove
                </button>
              </div>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default UserProfile;
