import React from "react";
import MediaQuery from "react-responsive";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "./Product.css";
import Form from "react-bootstrap/Form";
import { RiEditBoxLine } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBIcon,
} from "mdb-react-ui-kit";

const Product = ({ product }) => {
  return (
    <>
      <MediaQuery maxWidth={767}>
        <MDBRow>
          <MDBCol md="12">
            <MDBCard className="text-black">
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/3.webp"
                position="top"
                alt="Apple Computer"
              />
              <MDBCardBody>
                <div className="text-center">
                  <MDBCardTitle className="product-title fs-2">
                    {product?.nameProducts}
                  </MDBCardTitle>
                  <p className="text-muted category">
                    {product?.category.filter} | {product?.measures}CM |{" "}
                    {product?.quantity} In Stock
                  </p>
                </div>

                <div>
                  <Accordion defaultActiveKey="1">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Product Description</Accordion.Header>
                      <Accordion.Body>
                        {product?.description?.trim() == ""
                          ? "No description has been assigned to the product"
                          : product?.description}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>

                <div>
                  <div className="text-center mb-2 mt-2">
                    <Accordion defaultActiveKey="1">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Prices by city</Accordion.Header>
                        <Accordion.Body>
                          <div className="d-flex justify-content-between">
                            <span>West Palm Beach:</span>
                            <span>
                              {product?.price == 0
                                ? "undefined price"
                                : "$ " + product?.price}
                            </span>
                          </div>
                          <hr></hr>
                          <div className="d-flex justify-content-between">
                            <span>Stuart:</span>
                            <span>
                              {product?.price2 == 0
                                ? "undefined price"
                                : "$ " + product?.price2}
                            </span>
                          </div>
                          <hr></hr>
                          <div className="d-flex justify-content-between">
                            <span>Daytona Beach:</span>
                            <span>
                              {product?.price3 == 0
                                ? "undefined price"
                                : "$ " + product?.price3}
                            </span>
                          </div>
                          <hr></hr>
                          <div className="d-flex justify-content-between">
                            <span>Jacksonville:</span>
                            <span>
                              {product?.price4 == 0
                                ? "undefined price"
                                : "$ " + product?.price4}
                            </span>
                          </div>
                          <hr></hr>
                          <div className="d-flex justify-content-between">
                            <span>Houston:</span>
                            <span>
                              {product?.price5 == 0
                                ? "undefined price"
                                : "$ " + product?.price5}
                            </span>
                          </div>
                          <hr></hr>
                          <div className="d-flex justify-content-between">
                            <span>Dallas:</span>
                            <span>
                              {product?.price6 == 0
                                ? "undefined price"
                                : "$ " + product?.price6}
                            </span>
                          </div>
                          <hr></hr>
                          <div className="d-flex justify-content-between">
                            <span>Beaumont:</span>
                            <span>
                              {product?.price7 == 0
                                ? "undefined price"
                                : "$ " + product?.price7}
                            </span>
                          </div>
                          <hr></hr>
                          <div className="d-flex justify-content-between">
                            <span>New Orleans:</span>
                            <span>
                              {product?.price8 == 0
                                ? "undefined price"
                                : "$ " + product?.price8}
                            </span>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </div>

                <div className="d-flex justify-content-center total font-weight-bold mt-4">
                  <ButtonGroup
                    aria-label="Basic example"
                    className="card-butts"
                  >
                    <Button variant="primary fs-5">
                      <RiEditBoxLine className="mb-1 icon" />
                    </Button>
                    <Button variant="primary">
                      <Form.Check
                        className={`${
                          product?.availability == true ? "fs-5" : ""
                        }`}
                        type={"checkbox"}
                        id={`default-${product?.nameProducts}`}
                        defaultChecked={product?.availability}
                      />
                    </Button>
                    <Button variant="primary" className="fs-5">
                      <AiOutlineDelete className="mb-1 icon" />
                    </Button>
                  </ButtonGroup>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MediaQuery>
      
      <MediaQuery minWidth={768} maxWidth={1199}>

      </MediaQuery>

      <MediaQuery minWidth={1200}>
          <MDBCol md="12" className="shadow">
            <MDBCard className="text-black">
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/3.webp"
                position="top"
                alt="Apple Computer"
              />
              <MDBCardBody>
                <div className="text-center">
                  <MDBCardTitle className="product-title fs-3">
                    {product?.nameProducts}
                  </MDBCardTitle>
                  <p className="text-muted category">
                    {product?.category.filter} | {product?.measures}CM |{" "}
                    {product?.quantity} In Stock
                  </p>
                </div>

                <div>
                  <Accordion defaultActiveKey="1">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Product Description</Accordion.Header>
                      <Accordion.Body>
                        {product?.description?.trim() == ""
                          ? "No description has been assigned to the product"
                          : product?.description}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>

                <div>
                  <div className="text-center mb-2 mt-2">
                    <Accordion defaultActiveKey="1">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Prices by city</Accordion.Header>
                        <Accordion.Body>
                          <div className="d-flex justify-content-between">
                            <span>West Palm Beach:</span>
                            <span>
                              {product?.price == 0
                                ? "undefined price"
                                : "$ " + product?.price}
                            </span>
                          </div>
                          <hr></hr>
                          <div className="d-flex justify-content-between">
                            <span>Stuart:</span>
                            <span>
                              {product?.price2 == 0
                                ? "undefined price"
                                : "$ " + product?.price2}
                            </span>
                          </div>
                          <hr></hr>
                          <div className="d-flex justify-content-between">
                            <span>Daytona Beach:</span>
                            <span>
                              {product?.price3 == 0
                                ? "undefined price"
                                : "$ " + product?.price3}
                            </span>
                          </div>
                          <hr></hr>
                          <div className="d-flex justify-content-between">
                            <span>Jacksonville:</span>
                            <span>
                              {product?.price4 == 0
                                ? "undefined price"
                                : "$ " + product?.price4}
                            </span>
                          </div>
                          <hr></hr>
                          <div className="d-flex justify-content-between">
                            <span>Houston:</span>
                            <span>
                              {product?.price5 == 0
                                ? "undefined price"
                                : "$ " + product?.price5}
                            </span>
                          </div>
                          <hr></hr>
                          <div className="d-flex justify-content-between">
                            <span>Dallas:</span>
                            <span>
                              {product?.price6 == 0
                                ? "undefined price"
                                : "$ " + product?.price6}
                            </span>
                          </div>
                          <hr></hr>
                          <div className="d-flex justify-content-between">
                            <span>Beaumont:</span>
                            <span>
                              {product?.price7 == 0
                                ? "undefined price"
                                : "$ " + product?.price7}
                            </span>
                          </div>
                          <hr></hr>
                          <div className="d-flex justify-content-between">
                            <span>New Orleans:</span>
                            <span>
                              {product?.price8 == 0
                                ? "undefined price"
                                : "$ " + product?.price8}
                            </span>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </div>

                <div className="d-flex justify-content-center total font-weight-bold mt-4">
                  <ButtonGroup
                    aria-label="Basic example"
                    className="card-butts"
                  >
                    <Button variant="primary fs-5">
                      <RiEditBoxLine className="mb-1 icon" />
                    </Button>
                    <Button variant="primary">
                      <Form.Check
                        className={`${
                          product?.availability == true ? "fs-5" : ""
                        }`}
                        type={"checkbox"}
                        id={`default-${product?.nameProducts}`}
                        defaultChecked={product?.availability}
                      />
                    </Button>
                    <Button variant="primary" className="fs-5">
                      <AiOutlineDelete className="mb-1 icon" />
                    </Button>
                  </ButtonGroup>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

      </MediaQuery>
    </>
  );
};

export default Product;
