import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [data, setData] = useState({
    addItem: false,
    editItem: false,
    id: "",
    name: "",
    price: "",
    editId: null,
  });

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const total = useSelector((state) => state.total);

  const selectedProduct = useSelector((state) => {
    return state.products.find((product) => product.id === data.editId);
  });

  const handleAddToCart = (id) => {
    dispatch({ type: "ADD_TO_CART", payload: id });
  };

  const handleRemoveFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const handleCheckout = () => {
    dispatch({ type: "CHECKOUT" });
  };

  const handleEditItem = (id) => {
    setData((value) => ({ ...value, editItem: true, editId: Number(id) }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    if (!(data.id && data.name && data.price)) return alert("Fill all Input");
    dispatch({
      type: "EDIT_ITEM",
      payload: {
        id: Number(data.id),
        name: data.name,
        price: Number(data.price),
      },
    });

    setData((value) => ({ ...value, id: "", name: "", price: "" }));
    setData((value) => ({ ...value, editItem: false }));
  };

  const handleRemoveItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const ShowItem = () => {
    return products.map((p) => (
      <tr key={p.id}>
        <td>
          <Button onClick={() => handleEditItem(p.id)}>Edit</Button>{" "}
        </td>
        <td>{p.id}</td>
        <td>{p.name}</td>
        <td>${p.price}</td>
        <td>
          <Button onClick={() => handleAddToCart(p.id)}>Add to Cart</Button>
        </td>
        <td>
          <Button onClick={() => handleRemoveItem(p.id)}>Remove</Button>
        </td>
      </tr>
    ));
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    setData((value) => ({ ...value, addItem: true }));
  };

  const HandleSubmitItem = (e) => {
    e.preventDefault();
    let flag = false;

    if (!(data.id && data.name && data.price)) return alert("Fill all Input");

    products.map((item) => {
      if (item.id === Number(data.id)) flag = true;
    });

    if (flag) return alert("ID Exitst, Change it!");
    dispatch({ type: "ADD_ITEM", payload: [data.id, data.name, data.price] });

    setData((value) => ({ ...value, id: "", name: "", price: "" }));
    setData((value) => ({ ...value, addItem: false }));
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setData((values) => ({ ...values, [name]: value }));
  };

  return (
    <>
      <Container>
        <h1 className="d-flex justify-content-center me-5 m-3 ">Cashier APP</h1>
        <Row>
          <Col md={8}>
            <h2>Products</h2>
            <Button onClick={(e) => handleAddItem(e)} className="mb-2">
              Add Item
            </Button>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th></th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <ShowItem></ShowItem>
              </tbody>
            </Table>
          </Col>
          <Col md={4}>
            <h2>Cart</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.name}</td>
                      <td>${p.price}</td>
                      <td>
                        <Button onClick={() => handleRemoveFromCart(p.id)}>
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <h3>Total: ${total}</h3>
            <Button onClick={handleCheckout}>Checkout</Button>
          </Col>
          {data.addItem ? (
            <div>
              ADD Item
              <form onSubmit={HandleSubmitItem}>
                <Button
                  onClick={() => {
                    setData((value) => ({ ...value, addItem: false }));
                  }}
                  className="m-1"
                >
                  X
                </Button>
                <input
                  onChange={handleChange}
                  value={data.id}
                  name="id"
                  placeholder="id"
                ></input>
                <input
                  onChange={handleChange}
                  value={data.name}
                  name="name"
                  placeholder="name"
                ></input>
                <input
                  onChange={handleChange}
                  value={data.price}
                  name="price"
                  placeholder="price"
                ></input>
                <Button type="submit" className="m-2">
                  Submit
                </Button>
              </form>
            </div>
          ) : null}
          {data.editItem ? (
            <>
              <div>
                Edit Item
                <form onSubmit={handleEditSubmit}>
                  <Button
                    onClick={() => {
                      setData((value) => ({ ...value, editItem: false }));
                    }}
                    className="m-1"
                  >
                    X
                  </Button>
                  <input
                    onChange={handleChange}
                    value={data.id}
                    name="id"
                    placeholder={selectedProduct.id}
                  />
                  <input
                    onChange={handleChange}
                    value={data.name}
                    name="name"
                    placeholder={selectedProduct.name}
                  ></input>
                  <input
                    onChange={handleChange}
                    value={data.price}
                    name="price"
                    placeholder={selectedProduct.price}
                  ></input>
                  <Button type="submit" className="m-2">
                    Submit
                  </Button>
                </form>
              </div>
            </>
          ) : null}
        </Row>
      </Container>
    </>
  );
}

export default App;
