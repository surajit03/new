import React from "react";
import Menubar from './components/Menubar.jsx';
import Navebar from './components/Navebar.jsx'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard.jsx'
import Customer from './components/Customer.jsx'
import Items from './components/Items.jsx'
import Sell from './components/Sell.jsx'
import Accountant from './components/Accountant.jsx'
import New_coustomer from './components/New_coustomer.jsx'
import INavebar from './introComponents/INavbar.jsx'
import Home from './introComponents/Home.jsx'
import Benefit from './introComponents/Benefit.jsx'
import About from './introComponents/About.jsx'
import Contact from './introComponents/Contact.jsx'
import JoinUs from './introComponents/JoinUs.jsx'
import { useSelector } from "react-redux";

function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className='App'>
      { currentUser ? (
        <Router>
          <div className='navebar'>
            <Navebar />
          </div>
          <div className='man'>
            <div className='side-bar'>
              <Menubar />
            </div>
            <div className='rout'>
              <Routes>
                <Route path="Dashboard" element={<Dashboard />}> </Route>
                <Route index element={<Dashboard />} />
                <Route path="Customer" element={<Customer />} />
                <Route path="Items" element={<Items />} />
                <Route path="Sell" element={<Sell />} />
                <Route path="Accountant" element={<Accountant />} />
                <Route path="/New_coustomer" element={<New_coustomer />} />
              </Routes>
            </div>
          </div>
        </Router>
      ) : (
        <div>
        <Router>
          <div className='navebar'>
            <INavebar />
          </div>
              <Routes>
                <Route path="Home" element={<Home />}> </Route>
                <Route index element={<Home />} />
                <Route path="Benefit" element={<Benefit />} />
                <Route path="About" element={<About />} />
                <Route path="Contact" element={<Contact />} />
                <Route path="JoinUs" element={<JoinUs />} />

              </Routes>
        </Router>
        </div>
      )}
    </div>
  );
}

export default App;
