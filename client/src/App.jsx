import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ViewProductPage from "./pages/ViewProductPage";
import CreateProductPage from "./pages/CreateProductPage";
import EditProductPage from "./pages/EditProductPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/create" element={<CreateProductPage />} />
          <Route
            path="/product/view/:productId"
            element={<ViewProductPage />}
          />
          <Route path="product/edit/:productId" element={<EditProductPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
