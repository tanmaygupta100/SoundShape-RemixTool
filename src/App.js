//import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Homepage"
import Remixer from "./pages/Main"

function App() {
  return (
    <Router>
      <Routes>
        {/* All routes: */}
        <Route
          path="/"
          element={<Home/>}
        />
        <Route
          path="/Remixer"
          element={<Remixer/>}
        />
      </Routes>
    </Router>
  );
}

export default App;