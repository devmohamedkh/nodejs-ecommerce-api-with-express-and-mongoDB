const Cart = require("../../models/cartModels");

exports.getCart = async (userId) => {
  return await Cart.findOne({ userId }).populate("items.productId");
};
exports.getCartFor = async (customerId) => {
  const cart = await Cart.findOne({ customerId }).populate("items.productId");
  if (!cart) throw new new ErrorHandler(404, "cart not exist!")();
  return cart;
};

exports.updateCartProductItem = async (userId, data) => {
  const userCart = await Cart.find({ userId });

  if (userCart) {
    const cartProductIndex = userCart.items.findIndex((item) => {
      return item.productId.toString() === data.productId.toString();
    });

    if (cartProductIndex >= 0) {
      userCart.items[cartProductIndex].quantity = Number.parseInt(
        data.quantity
      );
    } else {
      userCart.items.push({
        productId: data.productId,
        quantity: Number.parseInt(data.quantity),
      });
    }
    return userCart.save();
  } else {
    const add = Cart.create({
      userId,
      items: data,
    });
    return add;
  }
};

exports.RemoveProductfromeCart = async (userId, productId) => {
  const Usercart = await Cart.findOne({ userId });

  const updatedCartItems = Usercart.items.filter((item) => {
    return item.productId.toString() !== productId.toString();
  });

  Usercart.items = updatedCartItems;
  return await Usercart.save();
};

exports.clearCart = async (customerId) => {
  const Usercart = await Cart.findOneAndDelete({ customerId });
  return Usercart;
};

exports.addProductTocart = async (userId, data) => {
  const userCart = await Cart.findOne({ userId });

  if (userCart) {
    const cartProductIndex = userCart.items.findIndex((item) => {
      return item.productId.toString() === data.productId.toString();
    });

    if (cartProductIndex >= 0) {
      userCart.items[cartProductIndex].quantity = Number.parseInt(
        data.quantity
      );
    } else {
      userCart.items.push({
        productId: data.productId,
        quantity: Number.parseInt(data.quantity),
      });
    }
    return userCart.save();
  } else {
    const add = Cart.create({
      userId,
      items: data,
    });
    return add;
  }
};
