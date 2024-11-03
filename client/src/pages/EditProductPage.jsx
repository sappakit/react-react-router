import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditProductPage() {
  const { productId } = useParams(); // ดึง productId จาก URL Parameters
  const [productData, setProductData] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
  });
  const navigate = useNavigate(); // สำหรับนำทางกลับไปที่ Home Page

  // ดึงข้อมูลผลิตภัณฑ์เมื่อหน้าโหลด
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4001/products/${productId}`
        );
        setProductData(response.data); // เก็บข้อมูลที่ดึงมาลงใน state
      } catch (error) {
        console.error("Failed to fetch product data:", error);
        // สามารถเพิ่มการจัดการข้อผิดพลาดได้ที่นี่
      }
    };

    fetchProductData();
  }, [productId]);

  // ฟังก์ชันจัดการการเปลี่ยนแปลงในฟอร์ม
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ฟังก์ชันสำหรับส่งข้อมูลที่แก้ไขไปยัง Server
  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้า
    try {
      await axios.put(
        `http://localhost:4001/products/${productId}`,
        productData
      ); // ส่งข้อมูลไปยัง Server
      navigate("/"); // เปลี่ยนเส้นทางไปที่หน้า Home Page
    } catch (error) {
      console.error("Failed to update product:", error);
      // สามารถเพิ่มการจัดการข้อผิดพลาดได้ที่นี่
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h1>Edit Product Form</h1>
      <div className="input-container">
        <label>
          Name
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name here"
            value={productData.name}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Image Url
          <input
            id="image"
            name="image"
            type="text"
            placeholder="Enter image url here"
            value={productData.image}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Price
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Enter price here"
            value={productData.price}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Enter description here"
            value={productData.description}
            onChange={handleChange}
            rows={4}
            cols={30}
          />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit">Update</button>
      </div>
    </form>
  );
}

export default EditProductPage;
