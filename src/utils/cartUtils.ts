export const addDecimals = (num: number) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state: any) => {
  //Caculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce(
      (acc: any, item: any) => acc + item.price * item.qty,
      0
    )
  );
  //Caculate shipping price (price>100?free:$10)
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
  //Caculate tax price (15%)
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
  //Caculate total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem('cart', JSON.stringify(state));
  return state;
};
