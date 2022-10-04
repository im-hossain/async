const getProducts = (amount, max, min) => {
  let products = [];
  for (let i = 1; i <= amount; i++) {
    products.push({
      _id: i,
      dateTime: {
        hour: Math.floor(Math.random() * 12),
        day: Math.floor(Math.random() * 30),
        month: Math.floor(Math.random() * 12),
        year: 2022,
      },
      price: Math.floor(Math.random() * (max - min) + min),
    });
  }
  return products;
};
const products = getProducts(50, 14, 10);
