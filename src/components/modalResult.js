import React, { useState, useContext } from "react";
import { Modal, Button, Container, Row, Col, Image } from "react-bootstrap";
import NULL_CONSTANTS from "../nullConstants";
import { DataContext } from "../context/dataContext";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
export default function ModalResult({ updatedArr, resultArr }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const { colorList } = useContext(DataContext);

  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Submit
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Re-upload products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            {updatedArr.map((product) => (
              <Row key={product.id}>
                <Col xs={2}>
                  {" "}
                  <Image
                    src={
                      product.image
                        ? product.image
                        : NULL_CONSTANTS.PRODUCT_IMAGE
                    }
                    height={100}
                    width={100}
                  ></Image>
                </Col>
                <Col xs={8} className="ms-5">
                  <h5>{product.name}</h5>
                  <p>{"ID: " + product.id}</p>
                  <p>{"SKU: " + product.sku}</p>
                  <p>{"Color: " + colorList[product.color - 1].name}</p>
                </Col>
                <hr />
              </Row>
            ))}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              toast.success("Thay đổi thành công", {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose: 3000,
              });
              localStorage.setItem("productlist", JSON.stringify(resultArr));
              setShow(false);
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
