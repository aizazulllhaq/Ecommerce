import { EyeIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../Order/orderSlice";
import { discountPrice, ITEM_PER_ORDERS_PAGE } from "../../App/constant";
import { Pagination } from "../Product-List/Components/ProductList";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({});
  const [editibleStatus, setEditibleStatus] = useState(-1);

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    setSort(sort);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "received":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  const handleOrderStatus = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditibleStatus(-1);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEM_PER_ORDERS_PAGE };
    dispatch(getAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  return (
    <>
      {/* component */}
      <div className="p-6  px-0 bg-white overflow-x-auto rounded-md">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-extrabold leading-none opacity-70">
                  ORDER# {/* Arrow icons  */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </p>
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-extrabold leading-none opacity-70">
                  ITEMS{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </p>
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-extrabold leading-none opacity-70">
                  TOTAL AMOUNT{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-4 w-4"
                    onClick={() =>
                      handleSort({
                        sort: "itemsTotalAmount",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </p>
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-extrabold leading-none opacity-70">
                  SHIPPING ADDRESS{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </p>
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-extrabold leading-none opacity-70">
                  STATUS{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </p>
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-extrabold leading-none opacity-70">
                  ACTIONS
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* First Row  */}
            {orders &&
              orders.map((order, index) => (
                <tr key={index}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">{order._id}</div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {order.items.map((item, indx) => (
                      <div className="flex items-center gap-3" key={indx}>
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          className="inline-block relative object-cover object-center !rounded-full w-9 h-9 rounded-md"
                        />
                        <div className="flex flex-col">
                          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                            {item.product.title}
                          </p>
                          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                            QTY : {item.quantity} * $
                            {discountPrice(item.product)} = $
                            {item.quantity * discountPrice(item.product)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                      ${order.itemsTotalAmount}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="">
                      <div>
                        <strong>{order.selectAddress.fullname}</strong>,
                      </div>
                      <div>{order.selectAddress.streetAddress},</div>
                      <div>{order.selectAddress.city}, </div>
                      <div>{order.selectAddress.country}, </div>
                      <div>{order.selectAddress.zipCode}, </div>
                      <div>{order.selectAddress.phone}, </div>
                      <div>{order.selectAddress.email}, </div>
                      <div>{order.selectAddress.region}, </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {order._id === editibleStatus ? (
                      <select onChange={(e) => handleOrderStatus(e, order)}>
                        <option value="pending">Pending</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    ) : (
                      <span
                        className={`${chooseColor(
                          order.status
                        )} py-1 px-3 rounded-full text-xs`}
                      >
                        {order.status}
                      </span>
                    )}
                  </td>

                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex justify-around items-center">
                      <EyeIcon className="w-6 h-6 cursor-pointer" />
                      <button
                        className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
                        type="button"
                        onClick={() => setEditibleStatus(order._id)}
                      >
                        <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            className="h-4 w-4"
                          >
                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {/* Pagination  */}
        <Pagination
          state="ADMIN"
          page={page}
          handlePage={handlePage}
          totalItems={totalOrders}
        />
      </div>
      <footer className="relative pt-8 pb-6 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-6/12 px-4 mx-auto text-center">
              <div className="text-sm text-gray-500  py-1">
                Made with{" "}
                <a
                  href="https://www.creative-tim.com/product/soft-ui-dashboard-tailwind"
                  className="text-gray-900 hover:text-gray-800"
                  target="_blank"
                >
                  Soft UI
                </a>{" "}
                by{" "}
                <a
                  href="https://www.creative-tim.com"
                  className="text-gray-900 hover:text-gray-800"
                  target="_blank"
                >
                  {" "}
                  Creative Tim
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default AdminOrders;
