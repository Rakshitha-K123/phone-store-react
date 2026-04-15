import { useNavigate } from "react-router-dom";

function Home({ user }) {

  const navigate = useNavigate();

  const handleShop = () => {
    if (user) {
      navigate("/products");
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      style={{
        height: "80vh",
        width: "100%",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center"
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0,0.6)",
          padding: "40px",
          borderRadius: "10px"
        }}
      >
        <h1>Welcome to PhoneStore 📱</h1>
        <p>Buy latest smartphones at best price</p>

        <button className="btn btn-warning mt-3" onClick={handleShop}>
          Shop Now
        </button>
      </div>
    </div>
  );
}

export default Home;