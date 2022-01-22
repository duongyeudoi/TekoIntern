import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import ProductList from "./components/productList";

function App() {
  return (
    <div className="App">
      <Container>
        <ProductList></ProductList>
      </Container>
    </div>
  );
}

export default App;
