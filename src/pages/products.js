import { Link } from "react-router-dom";

function Products({ products, addToCart, addToWishlist, wishlist, darkMode })  {
  return (
    <div className="container mt-4">
      <div className="row">

        {products.map((product) => {

          const discount = product.oldPrice
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          // ✅ IMPORTANT FIX
          const isInWishlist = wishlist?.some(
            (item) => item.id === product.id
          ) || false;

          return (
            <div className="col-md-4 mb-4" key={product.id}>

              <div
                className="card shadow position-relative"
                style={{ overflow: "visible" }}
              >

                {/* 🏷 DISCOUNT */}
                <span className="badge bg-danger position-absolute top-0 start-0 m-2">
                  {discount}% OFF
                </span>

                {/* ❤️ HEART FIX */}
                <span
                  className="position-absolute top-0 end-0 m-2"
                  style={{
                    cursor: "pointer",
                    zIndex: 10,
                    fontSize: "22px",
                    color: isInWishlist ? "red" : "gray"   // ✅ FIXED
                  }}
                  onClick={() => addToWishlist(product)}
                >
                  {isInWishlist ? "❤️" : "🤍"}   {/* ✅ ICON FIX */}
                </span>

                {/* 📱 IMAGE */}
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "250px", objectFit: "cover" }}
                />

                {/* 📦 BODY */}
                <div className="card-body text-center">

                  <h5>{product.name}</h5>

                  <p className="text-warning">⭐ {product.rating || 4.5}</p>

                  <p>
  <span
    style={{
      textDecoration: "line-through",
      color: darkMode ? "#bbb" : "#666",
      marginRight: "8px"
    }}
  >
    ₹{product.oldPrice}
  </span>

  <span
    style={{
      fontWeight: "bold",
      color: darkMode ? "#fff" : "#000"
    }}
  >
    ₹{product.price}
  </span>
</p>
                  <Link
                    to={`/details/${product.id}`}
                    className="btn btn-outline-primary btn-sm me-2"
                  >
                    View
                  </Link>

                  <button
                    className="btn btn-dark btn-sm"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>

                </div>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}

export default Products;