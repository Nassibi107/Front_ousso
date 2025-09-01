import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Contact ,ProductSalesPage , TestimonialsPage}  from './compenents';
import Home from './compenents/Home';
// import ContactPage from './ContactPage';
const colors = {
  primary: '#025984',
  secondary: '#0a8899',
  accent: '#0fb5a0',
  light: '#e7d8c4',
  success: '#01af4c'
};
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home colors={colors} />} />
        <Route path="/contact" element={<Contact colors={colors} />} />
        <Route path="/testimonials" element={<TestimonialsPage colors={colors} />} />
        <Route path="/ProductSalesPage" element={<ProductSalesPage colors={colors} />} />
      </Routes>
    </Router>
  );
};

export default App;
