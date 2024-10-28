import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EditProductForm() {
  const { productId } = useParams();
  const [inputChange, setInputChange] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
  });

  async function getProduct() {
    try {
      const productData = await axios.get(
        `http://localhost:4001/products/${productId}`
      );
      setInputChange((prevProducts) => ({
        ...prevProducts,
        ...productData.data.data,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  function handleInputChange(event, key) {
    const inputText = {};
    inputText[key] = [...event.target.value].join("");

    if (key === "price") {
      inputText[key] = Number(inputText[key]);
    }

    setInputChange((prevInput) => ({ ...prevInput, ...inputText }));
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const data = { ...inputChange };

      await axios.put(`http://localhost:4001/products/${productId}`, data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProduct();
  }, [productId]);

  return (
    <form className="product-form" onSubmit={(event) => handleSubmit(event)}>
      <h1>Edit Product Form</h1>
      <div className="input-container">
        <label>
          Name
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name here"
            value={inputChange.name}
            onChange={(event) => {
              handleInputChange(event, "name");
            }}
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
            value={inputChange.image}
            onChange={(event) => {
              handleInputChange(event, "image");
            }}
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
            value={inputChange.price}
            onChange={(event) => {
              handleInputChange(event, "price");
            }}
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Description
          <textarea
            id="description"
            name="description"
            type="text"
            placeholder="Enter description here"
            value={inputChange.description}
            onChange={(event) => {
              handleInputChange(event, "description");
            }}
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

export default EditProductForm;
