function Cart({
  cart,
  removeFromCart,
  clearCart,
  search,
  increaseQty,
  decreaseQty
}) {

  const filteredCart = (cart || []).filter(item =>
    item.name.toLowerCase().includes((search || "").toLowerCase())
  );

  const total = filteredCart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleBuy = () => {
    if (filteredCart.length === 0) {
      alert("Cart is empty ❌");
      return;
    }

    alert("Purchase Successful ✅");
    clearCart();
  };

  return (
    <div className="container mt-4">

      <h2>🛒 Cart</h2>

      {filteredCart.length === 0 ? (
        <h4>No items in cart</h4>
      ) : (
        <>
          {filteredCart.map(item => (
            <div
              key={item.id}
              className="card p-3 mb-3 d-flex flex-row justify-content-between align-items-center"
            >
              
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "80px" }}
              />

              <div>
                <h5>{item.name}</h5>
                <p>₹{item.price}</p>
              </div>

              <div>
                <button
                  className="btn btn-secondary"
                  onClick={() => decreaseQty(item.id)}
                >
                  -
                </button>

                <span className="mx-2">{item.qty}</span>

                <button
                  className="btn btn-secondary"
                  onClick={() => increaseQty(item.id)}
                >
                  +
                </button>
              </div>

              <button
                className="btn btn-danger"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}

          <h3>Total: ₹{total}</h3>

          <div className="mt-3">
            <button className="btn btn-warning me-2" onClick={clearCart}>
              Clear Cart
            </button>

            <button className="btn btn-success" onClick={handleBuy}>
              Buy Now 🛍
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;