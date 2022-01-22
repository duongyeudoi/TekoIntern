import React, { useState } from "react";
import { Modal, Button, Container, Row, Col, Image } from "react-bootstrap";
import NULL_CONSTANTS from "../nullConstants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ModalResult({ updatedArr }) {
  const [show, setShow] = useState(false);
  console.log(updatedArr);
  const handleClose = () => setShow(false);
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
              <Row>
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
                  <p>{"Color: " + product.color}</p>
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
              setShow(false);
              toast.success("Thay đổi thành công", {
                position: toast.POSITION.TOP_LEFT,
                autoClose: 3000,
              });
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
