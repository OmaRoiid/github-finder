import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Alert } from "./components/layout/Alert";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { AlertProvider } from "./context/alert/AlertContext";
import { GithubProvider } from "./context/github/GithubContext";

import { About } from "./pages/About";
import { Home } from "./pages/Home";
import { Notfound } from "./pages/NotFound";
import { User } from "./pages/User";

function App() {
  return (
    <GithubProvider>
      <AlertProvider>
        <Router>
          <div className="flex flex-col justify-between h-screen">
            <Navbar />
            <Alert />
            <main className="container mx-auton px-3 pb-12">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/user/:login" element={<User />} />
                <Route path="/notfound" element={<Notfound />} />
                <Route path="/*" element={<Notfound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AlertProvider>
    </GithubProvider>
  );
}

export default App;
