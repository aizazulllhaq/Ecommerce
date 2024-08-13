export const ITEM_PER_PAGE = 9;

export const ITEM_PER_ORDERS_PAGE = 5;

export const discountPrice = (item) => {
  return Math.floor(item.price * (1 - item.discountPercentage / 100));
};
