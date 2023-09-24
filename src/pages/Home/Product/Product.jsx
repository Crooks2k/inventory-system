import React from "react";
import MediaQuery from "react-responsive";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "./Product.css";
import Form from "react-bootstrap/Form";
import { RiEditBoxLine } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";
import {
  ChangeAvailability,
  DeleteProduct,
} from "../../../core/service/HomeService";
import Swal from "sweetalert2";
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
import Skeleton from "../../../core/common/Skeleton/Skeleton";

const Product = ({ product, fetchData }) => {
  const [imageLoaded, setImageLoaded] = useState(true);
  const [changedValue, setchangedValue] = useState(product.availability);
  const handleImageError = () => {
    setImageLoaded(false);
  };

  const authToken = localStorage.getItem("token");
  if (!authToken) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "There was an error validating your session, please log in again!",
    });
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }

  const HandleAvailability = () => {
    setchangedValue(!changedValue);
    product.availability = changedValue;
    ChangeAvailability("api/products/", authToken, product._id, {
      availability: changedValue,
    });
  };

  const HandleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const del = DeleteProduct("api/products/", authToken, product._id);
          if(del.msg = "Deleted"){fetchData()}
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
        } catch (error) {
          Swal.fire(
            "Failed!",
            "Something went wrong while deleting the product.",
            "error"
          );
        }
      }
    });
  };

  return (
    <>
      <MediaQuery maxWidth={767}>
        <MDBRow>
          <MDBCard className="text-black">
            {imageLoaded ? (
              <MDBCardImage
                src={product?.imgProduct}
                position="top"
                alt={"Product Image " + product?.nameProducts}
                onError={handleImageError}
                className="mt-3 mb-2 card-images-m px-3 pt-2"
              />
            ) : (
              <Skeleton
                width={"330px"}
                height={"180px"}
                marginTop={"34px"}
                me={"1rem"}
                ms={"1rem"}
              />
            )}
            <MDBCardBody>
              <div className="text-center">
                <MDBCardTitle className="product-title fs-2">
                  {product?.nameProducts}
                </MDBCardTitle>
                {changedValue ? (
                  <p className="available">Available</p>
                ) : (
                  <p className="no-available">Not Available</p>
                )}
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
                <ButtonGroup aria-label="Basic example" className="card-butts">
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
                      onClick={() => HandleAvailability()}
                    />
                  </Button>
                  <Button
                    variant="primary"
                    className="fs-5"
                    onClick={() => HandleDelete()}
                  >
                    <AiOutlineDelete className="mb-1 icon" />
                  </Button>
                </ButtonGroup>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBRow>
      </MediaQuery>

      <MediaQuery minWidth={768}>
        <MDBCol md="12">
          <MDBCard className="text-black d-flex flex-row tablet-card">
            {imageLoaded ? (
              <MDBCardImage
                src={product?.imgProduct}
                position="top"
                alt={"Product Image " + product?.nameProducts}
                onError={handleImageError}
                className="card-images mt-5 pt-3 me-3"
                style={{"marginLeft": "-20px"}}
              />
            ) : (
              <Skeleton
                width={"250px"}
                height={"180px"}
                marginTop={"65px"}
                me={"2rem"}
                ms={"-1.2rem"}
              />
            )}

            <MDBCardBody>
              <div className="text-center">
                <MDBCardTitle className="product-title fs-2 mt-2">
                  {product?.nameProducts}
                </MDBCardTitle>
                {changedValue ? (
                  <p className="available">Available</p>
                ) : (
                  <p className="no-available">Not Available</p>
                )}
                <p className="text-muted category">
                  {product?.category.filter} | {product?.measures}CM |{" "}
                  {product?.quantity} In Stock
                </p>
              </div>

              <div className="">
                <Accordion defaultActiveKey="1" className="tablet-acordion">
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

              <div className="">
                <div className="text-center mb-2 mt-2">
                  <Accordion defaultActiveKey="1" className="tablet-acordion">
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
                <ButtonGroup aria-label="Basic example" className="card-butts">
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
                      onClick={() => HandleAvailability()}
                    />
                  </Button>
                  <Button
                    variant="primary"
                    className="fs-5"
                    onClick={() => HandleDelete()}
                  >
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
