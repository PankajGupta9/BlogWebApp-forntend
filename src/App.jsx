import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from './pages/Home';
import Admin from './pages/admin';
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={'/'} element={<Home/>} />
        <Route path={'/admin/*'} element={<Admin/>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;