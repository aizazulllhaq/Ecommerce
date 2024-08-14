import Footer from "../Features/Common/Footer";
import Navbar from "../Features/Navbar/Navbar";
import ProductList from "../Features/Product-List/Components/ProductList";

const HomePage = () => {
  return (
    <div>
      <Navbar>
        <ProductList />
      </Navbar>
      <Footer/>
    </div>
  );
};

export default HomePage;
