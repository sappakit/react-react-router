import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function HomePage() {
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate(); // เรียกใช้ useNavigate

  const getProducts = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const results = await axios("http://localhost:4001/products");
      setProducts(results.data.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false); // ย้ายไปที่นี่เพื่อให้แน่ใจว่ามีการหยุดโหลดไม่ว่าจะสำเร็จหรือไม่
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/products/${id}`); // ลบผลิตภัณฑ์จาก Server
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      ); // อัปเดต state เพื่อไม่แสดงผลิตภัณฑ์ที่ถูกลบ
    } catch (error) {
      console.error("Failed to delete product:", error);
      // สามารถเพิ่มการจัดการข้อผิดพลาดที่นี่ เช่น แสดงข้อความเตือน
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleCreateProduct = () => {
    navigate("/product/create"); // พาไปที่หน้า Create Product Page
  };

  // ฟังก์ชันเพื่อไปยังหน้ารายละเอียดผลิตภัณฑ์
  const handleViewProductPage = (id) => {
    navigate(`/product/view/${id}`); // พาไปที่หน้า View Product Page
  };

  const handleEditProductPage = (id) => {
    navigate(`/product/edit/${id}`); // พาไปที่หน้า Edit Product Page
  };

  return (
    <div>
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
        <button onClick={handleCreateProduct}>Create Product</button>
      </div>
      <div className="product-list">
        {products.map((product) => {
          return (
            <div className="product" key={product.id}>
              <div className="product-preview">
                <img
                  src="https://via.placeholder.com/250/250"
                  alt="some product"
                  width="250"
                  height="250"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {product.name} </h1>
                <h2>Product price: {product.price}</h2>
                <p>Product description: {product.description} </p>
                <div className="product-actions">
                  <button
                    className="view-button"
                    onClick={() => handleViewProductPage(product.id)} // ใช้ฟังก์ชันนี้เพื่อดูรายละเอียดผลิตภัณฑ์
                  >
                    View
                  </button>
                  <button
                    className="edit-button"
                    onClick={() => handleEditProductPage(product.id)} // เรียกใช้งานฟังก์ชันนี้เมื่อคลิก Edit
                  >
                    Edit
                  </button>
                </div>
              </div>
              <button
                className="delete-button"
                onClick={() => handleDeleteProduct(product.id)}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
      {isError && <h1>Request failed</h1>}
      {isLoading && <h1>Loading ....</h1>}
    </div>
  );
}

export default HomePage;
