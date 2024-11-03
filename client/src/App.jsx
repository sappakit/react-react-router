import "./App.css";
import HomePage from "./pages/HomePage.jsx";
import ViewProductPage from "./pages/ViewProductPage.jsx";
import CreateProductForm from "./pages/CreateProductPage.jsx";
import EditProductForm from "./components/EditProductForm.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Ensure correct import

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* http://localhost:5173/ */}
          <Route path="/" element={<HomePage />} />

          {/* http://localhost:5173/product/view/:productId */}
          <Route
            path="/product/view/:productId"
            element={<ViewProductPage />}
          />

          {/* http://localhost:5173/product/create */}
          <Route path="/product/create" element={<CreateProductForm />} />

          {/* http://localhost:5173/product/edit/:productId */}
          <Route
            path="/product/edit/:productId"
            element={<EditProductForm />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
