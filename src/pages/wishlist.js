import { Link } from "react-router-dom";

function Wishlist({ wishlist, removeFromWishlist, search }) {

  const filteredWishlist = (wishlist || []).filter(item =>
    item.name.toLowerCase().includes((search || "").toLowerCase())
  );

  return (
    <div className="container mt-4">

      <h2>❤️ Wishlist</h2>

      {filteredWishlist.length === 0 ? (
        <h4 className="text-muted mt-3">No matching items</h4>
      ) : (
        <div className="row">

          {filteredWishlist.map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>

              <div className="card shadow">

                <Link to={`/details/${item.id}`}>
                  <img src={item.image} className="card-img-top" alt={item.name}/>
                </Link>

                <div className="card-body text-center">

                  <h5>{item.name}</h5>
                  <p>₹{item.price}</p>

                  <Link
                    to={`/details/${item.id}`}
                    className="btn btn-primary btn-sm me-2"
                  >
                    View
                  </Link>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Remove
                  </button>

                </div>
              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default Wishlist;