import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import ThankYou from "./components/ThankYou";
import Footer from "./components/Footer";
import Pricing from "./pages/Pricing";
import ProblemForm from "./components/ProblemForm";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      {/* <TopNav /> */}
      <Routes>
        <Route path="/form/:type" element={<ProblemForm />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
