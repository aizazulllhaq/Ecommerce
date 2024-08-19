import React from "react";
import { useState } from "react";

import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { deleteCartItemAsync, selectItems, updateCartAsync } from "./cartSlice";
import { discountPrice } from "../../App/constant";
import Modal from "../Common/Modal";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const totalItems = items.length;
  const totalItemsAmount = Math.floor(
    items.reduce(
      (amount, item) => discountPrice(item) * item.quantity + amount,
      0
    )
  );
  const [openModal, setOpenModal] = useState(null);

  const handleDeleteItem = (id) => {
    dispatch(deleteCartItemAsync(id));
  };

  const handleQuantity = (e, pid) => {
    const data = { pid, quantity: +e.target.value };
    dispatch(updateCartAsync(data));
  };
  return (
    <>
      {!items.length && <Navigate to={"/"} replace={true} />}
      <Navbar>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white p-4 mt-10">
          <div className="mt-8">
            <h1 className="text-3xl font-bold py-4">Cart</h1>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {items &&
                  items.map((item) => (
                    <li key={item.product.id} className="flex py-6 my-[5px]">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          alt={item.product.title}
                          src={item.product.thumbnail}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link to={item.product.title}>
                                {item.product.title}
                              </Link>
                            </h3>
                            <p className="ml-4">
                              {discountPrice(item.product)}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.product.color}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500 rounded-3xl">
                            <label
                              htmlFor="password"
                              className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty
                            </label>
                            <select
                              name=""
                              id=""
                              className="rounded-sm"
                              value={item.product.quantity}
                              onChange={(e) =>
                                handleQuantity(e, item.product.id)
                              }
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                            </select>
                          </div>

                          <Modal
                            title={`Delete ${item.product.title}`}
                            msg={"Do you want to delete this item ? "}
                            dangerOption={"Delete"}
                            cancelOption={"Cancel"}
                            cancelAction={() => setOpenModal(-1)}
                            dangerAction={() => handleDeleteItem(item.product.id)}
                            showModal={openModal === item.product.id}
                          />
                          <div className="flex">
                            <button
                              onClick={() => setOpenModal(item.product.id)}
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-0">
            <div className="flex flex-col text-base font-medium text-gray-900">
              <div className="flex justify-between text-sm">
                <p>Total Items</p>
                <p>{totalItems}</p>
              </div>
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>${totalItemsAmount}</p>
              </div>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Link
                to={"/checkout"}
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{" "}
                <Link
                  to={"/"}
                  onClick={() => setOpen(false)}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Navbar>
    </>
  );
};

export default Cart;
