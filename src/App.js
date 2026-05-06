import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import GamingSetups from './components/GamingSetups';
import Navbar from './components/Navbar';

import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Accessories from "./components/Accessories";
import Repairs from "./components/Repairs";
import Services from "./components/Services";
import Offers from "./components/Offers";
import AdminDashboard from "./components/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import Orders from "./components/Orders";
import AdminOrders from "./components/AdminOrders";
import AdminRepairs from "./components/AdminRepairs";
import AdminQuotes from "./components/AdminQuotes";
import AdminAnalytics from "./components/AdminAnalytics";
import Profile from "./components/Profile";
import SetupDetails from "./components/SetupDetails";
import About from "./components/About";
import ChatBot from "./components/ChatBot";
import Contact from "./components/Contact";
import AdminContacts from "./components/AdminContacts";

import 'bootstrap/dist/css/bootstrap.min.css';

import Makepayment from './components/Makepayment';

import Home from './components/Home';

import { CartProvider } from "./context/CartContext";

import Cart from "./components/Cart";
import Footer from './components/Footer';

import Notfound from './components/Notfound';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Navbar />
        {/* Main Content */}
        <div className="flex-grow-1">
          <CartProvider>
              <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/products' element={<Getproducts />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/signin' element={<Signin />} />
              <Route path="/accessories" element={<Accessories />} />
              <Route path="/repairs" element={<Repairs />} />
              <Route path="/services" element={<Services />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              <Route
                path="/gaming-setup/:id"
                element={<SetupDetails />}
              />

              <Route path="/admin" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />

              <Route
                path="/addproducts"
                element={
                  <AdminRoute>
                    <Addproducts />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <AdminOrders />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/repairs"
                element={
                  <AdminRoute>
                    <AdminRepairs />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/quotes"
                element={
                  <AdminRoute>
                    <AdminQuotes />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/analytics"
                element={
                  <AdminRoute>
                    <AdminAnalytics />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/contacts"
                element={
                  <AdminRoute>
                    <AdminContacts />
                  </AdminRoute>
                }
              />

              <Route path="/makepayment" element={<Makepayment />} />
              <Route path="/orders" element={<Orders />} />
              <Route path='/cart' element={<Cart />} />
              <Route path="/gaming-setups" element={<GamingSetups />} />
              <Route path='*' element={<Notfound />} />
            </Routes>

            <ChatBot />
          </CartProvider>
        </div>

        {/* Footer (Always at bottom) */}
        <Footer />
       

      </div>
    </Router>
  );
}

export default App;