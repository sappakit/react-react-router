import { useState } from "react";
import axios from "axios";

function CreateProductForm() {
  const [inputChange, setInputChange] = useState({});

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

      await axios.post("http://localhost:4001/products", data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className="product-form" onSubmit={(event) => handleSubmit(event)}>
      <h1>Create Product Form</h1>
      <div className="input-container">
        <label>
          Name
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name here"
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
            onChange={(event) => {
              handleInputChange(event, "description");
            }}
            rows={4}
            cols={30}
          />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit">Create</button>
      </div>
    </form>
  );
}

export default CreateProductForm;
