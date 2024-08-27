import Navbar from "../Features/Navbar/Navbar";
import ProductList from "../Features/Product-List/Components/ProductList";

const HomePage = () => {
  return (
    <div>
      <Navbar>
        <ProductList />
      </Navbar>
    </div>
  );
};

export default HomePage;
