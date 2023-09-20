import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import CreateAccount from "./pages/CreateAccount";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import UploadFile from "./files/UploadFile";
import DownloadFile from "./files/DownloadFile.js";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/create-user" element={<CreateAccount />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/uploads" element={<UploadFile />} />
          <Route path="/view-files" element={<DownloadFile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
