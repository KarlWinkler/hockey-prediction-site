import{
  BrowserRouter as Router,
  Route, 
  Routes
} from "react-router-dom";
import Home from "./Pages/Home";
import Admin from "./Pages/Admin";

import Header from "./Base/Header";
import Footer from "./Base/Footer";

import './styles/app.scss'
import './styles/base.scss'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />

        <Routes>
          <Route path='/admin' element={<Admin />} />
          <Route path='/' element={<Home />} />
          <Route path='/games/:date' element={<Home />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;