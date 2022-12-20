import{
  BrowserRouter as Router,
  Route, 
  Routes
} from "react-router-dom";
import Home from "./Pages/Home";
import Games from "./Pages/Games";
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
          <Route path='/games/:date' element={<Games />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
