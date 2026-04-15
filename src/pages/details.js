import { useParams } from "react-router-dom";

function Details({ products, addToCart }) {

  const { id } = useParams();

  const product = products.find(
    (item) => item.id === parseInt(id)
  );

  if (!product) {
    return <h2 className="text-center mt-5">Product not found</h2>;
  }

  return (
    <div className="container mt-5">

      <div className="row">

        {/* IMAGE */}
        <div className="col-md-6">
          <img
            src={product.image}
            className="img-fluid"
            style={{ borderRadius: "10px" }}
          />
        </div>

        {/* DETAILS */}
        <div className="col-md-6">

          <h2>{product.name}</h2>

          <p className="text-warning">⭐ {product.rating}</p>

          <h4 className="text-success">₹{product.price}</h4>

          <p className="text-muted">
            <del>₹{product.oldPrice}</del>
          </p>

          <p>
            This is a premium smartphone with best performance and features.
          </p>

          {/* ✅ ADD TO CART */}
          <button
            className="btn btn-dark mt-3"
            onClick={() => addToCart(product)}
          >
            Add to Cart 🛒
          </button>

        </div>

      </div>

    </div>
  );
}

export default Details;