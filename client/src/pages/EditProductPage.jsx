import { useNavigate } from "react-router-dom";
import EditProductForm from "../components/EditProductForm";

function EditProductPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Edit Product Page</h1>
      <EditProductForm />
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
}

export default EditProductPage;
