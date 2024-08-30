import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrdersAsync, selectUserOrders } from "../userSlice";
import { discountPrice } from "../../../App/constant";

const UserOrders = () => {
  const dispatch = useDispatch();
  const userOrders = useSelector(selectUserOrders);

  useEffect(() => {
    // TODO : user.id needed here
    dispatch(getUserOrdersAsync());
  }, [dispatch]);
  return (
    <>
      {userOrders &&
        userOrders.map((order) => (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white py-2 mt-10">
            <h1 className="text-2xl font-bold">Order # {order._id}</h1>
            <h1 className="text-xl font-semibold text-red-800">
              Order Status : {order.status}
            </h1>
            <div className="my-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.items &&
                    order.items.map((item) =>
                      item.product.map((p) => (
                        <li key={p.id} className="flex py-6 my-[5px]">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              alt={p.title}
                              src={p.thumbnail}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>{p.title}</h3>
                                <p className="ml-4">${discountPrice(p)}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {p.color}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500 rounded-3xl">
                                <label
                                  htmlFor="password"
                                  className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                >
                                  Qty {p.quantity}
                                </label>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))
                    )}
                </ul>
              </div>
            </div>

            <div className="">
              <p className="mt-1 text-sm leading-6 text-gray-600">Address :</p>
              <ul role="list" className="divide-y divide-gray-100">
                <li className="flex justify-between gap-x-6 py-5 border-2 border-gray-200 p-2 m-2">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {order.selectAddress.fullname}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {order.selectAddress.email}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {order.selectAddress.zipCode}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {order.selectAddress.city}
                    </p>
                    <p>{order.selectAddress.region}</p>
                    <p>{order.selectAddress.city}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="border-t border-gray-200 px-4 py-8 sm:px-0 opacity-90">
              <div className="flex flex-col text-base font-medium text-gray-900">
                <div className="flex justify-between text-sm">
                  <p>Total Items</p>
                  <p>{order.totalItems}</p>
                </div>
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>${order.itemsTotalAmount}</p>
                </div>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
            </div>
          </div>
        ))}
    </>
  );
};

export default UserOrders;
