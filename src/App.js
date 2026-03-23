import './App.css';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import 'bootstrap/dist/css/bootstrap.min.css';
import Makepayment from './components/Makepayment';
import Notfound from './components/Notfound';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Getproducts />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='signin' element={<Signin />} />
        <Route path='/addproduct' element={<Addproducts />} />
        <Route path='/makepayment' element={<Makepayment />} />
        <Route path='*' element={<Notfound />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
