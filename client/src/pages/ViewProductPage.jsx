import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ViewProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  async function getProduct() {
    try {
      const productData = await axios.get(
        `http://localhost:4001/products/${productId}`
      );
      setProduct({ ...productData.data.data });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProduct();
  }, [productId]);

  return (
    <div>
      <h1>View Product Page</h1>
      <div className="view-product-container">
        <h2>{`Name: ${product.name}`}</h2>
        <p>{`${product.price} THB`}</p>
        <p>{product.description}</p>
      </div>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
}

export default ViewProductPage;
