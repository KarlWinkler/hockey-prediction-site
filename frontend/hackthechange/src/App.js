import Home from "./Pages/Home";
import Header from "./Base/Header";
import Footer from "./Base/Footer";

import './styles/app.scss'
import './styles/base.scss'

function App() {

  // let clearSelects = (e) => {
  //   // closes all dropdowns when clicking outside of them
  //   let selects = document.querySelectorAll('.SearchSelect')
  //   selects.forEach((select) => {
  //     let input = select.querySelector('.SearchSelectInput')
  //     let options = select.querySelector('.SearchSelectOptions')

  //     if (e.target !== input && e.target !== options && !options.contains(e.target)) {
  //       select.querySelector('.SearchSelectOptions').classList.remove('active')
  //     }
  //   })
  // }

  return (
      <div className="app">
        <Header />
        <Home />
        <Footer />
      </div>
  );
}

export default App;
