import React from "react";
import { useState, useContext } from "react";
import NULL_CONSTANTS from "../nullConstants";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table, Image, Form } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import ModalResult from "./modalResult";
import { DataContext } from "../context/dataContext";

export default function ProductList() {
  const diff = require("diff-arrays-of-objects");
  const { originalProductList, colorList } = useContext(DataContext);
  const [productList, setProductList] = useState(
    JSON.parse(JSON.stringify(originalProductList))
  );
  const [pageNumber, setPageNumber] = useState(0);
  const productPerPage = 10;
  const pageVisited = pageNumber * productPerPage;

  const displayProduct =
    productList?.length &&
    productList
      .slice(pageVisited, pageVisited + productPerPage)
      .map((product) => (
        <tr key={product.id}>
          <td>{product.id}</td>
          <td>{product.errorDescription}</td>
          <td>
            <Image
              src={product.image ? product.image : NULL_CONSTANTS.PRODUCT_IMAGE}
              height={100}
              width={100}
            ></Image>
          </td>
          <td>
            <input
              type="text"
              required
              maxLength={50}
              className="form-control"
              placeholder="Input text here"
              value={product.name}
              onChange={(e) => {
                let _productList = [...productList];
                _productList[product.id - 1].name = e.target.value;
                setProductList(_productList);
              }}
            />
          </td>
          <td>
            <input
              required
              maxLength={20}
              type="text"
              className="form-control"
              placeholder="Input text here"
              value={product.sku}
              onChange={(e) => {
                let _productList = [...productList];
                _productList[product.id - 1].sku = e.target.value;
                setProductList(_productList);
              }}
            />
          </td>
          <td>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                let _productList = [...productList];
                _productList[product.id - 1].color = e.target.value;
                setProductList(_productList);
              }}
            >
              <option>
                {product.color ? colorList[product.color - 1].name : "null"}
              </option>
              {colorList.map((color) => (
                <option value={color.id} key={color.id}>
                  {color.name}
                </option>
              ))}
            </Form.Select>
          </td>
        </tr>
      ));

  const pageCount = Math.ceil(productList.length / productPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <Container className="d-flex justify-content-between mt-3">
        <h5>Jason - Re-upload Error Products</h5>
        <ModalResult
          updatedArr={diff(originalProductList, productList).updated}
        ></ModalResult>
      </Container>
      <Container className="mt-3">
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Error Description</th>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>SKU</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>{displayProduct}</tbody>
        </Table>
        <Container className="d-flex justify-content-center">
          <ReactPaginate
            breakLabel="..."
            previousLabel="Trước"
            nextLabel="Sau"
            pageCount={pageCount}
            onPageChange={changePage}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          ></ReactPaginate>
        </Container>
      </Container>
    </div>
  );
}
