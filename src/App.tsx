import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/mainPage";
import GlobalSnackbar from "./components/GlobalSnackbar";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
      <GlobalSnackbar />
    </Router>
  );
}

export default App;
