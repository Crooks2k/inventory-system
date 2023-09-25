import React from "react";
import "./Home.css";
import AsideMenu from "../../core/layout/Aside/AsideMenu";
import MediaQuery from "react-responsive";
import Product from "./Product/Product";
import { AllProducts } from "../../core/service/HomeService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import onTheWay from "../../assets/images/OnTheWay.png";
import Quantity from "../../assets/images/Quantity.png";
import Skeleton from "../../core/common/Skeleton/Skeleton";
import { AiOutlineSearch } from "react-icons/ai";
import { VscListFilter } from "react-icons/vsc";
import Dropdown from "react-bootstrap/Dropdown";

const Home = () => {
  const [allProducts, setallProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const [AvailableProducts, setAvailableProducts] = useState(0);

  const fetchData = async () => {
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

    try {
      const response = await AllProducts("api/products/", authToken);
      const productData = response.data;
      setallProducts(productData);

      const activateProducts = productData.filter((product) => {
        return product.availability == true;
      });
      setAvailableProducts(activateProducts.length);
    } catch (error) {
      console.error("Error al cargar los productos", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const filtered = allProducts.filter((product) =>
      product.nameProducts.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [allProducts, searchTerm]);

  return (
    <div className="d-flex">
      <aside>
        <AsideMenu />
      </aside>
      <main className="w-100">
        <MediaQuery minWidth={320}>
          {/* Navs */}
          <>
            <MediaQuery minWidth={768}>
              <div className="home-bar py-4 px-4 w-100 text-bg-light shadow-sm d-flex justify-content-between">
                <div className="ms-4">
                  <AiOutlineSearch className="search-icon" />
                  <input
                    type="search"
                    placeholder="Search Product..."
                    className="search shadow-sm py-1"
                    onChange={handleSearchChange}
                  />
                </div>
                <div>
                  <Dropdown>
                    <Dropdown.Toggle className="filter-togler">
                      <VscListFilter className="filter-icon mt-1" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Something else
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </MediaQuery>

            <MediaQuery minWidth={320} maxWidth={767}>
              <div className="home-bar-m d-flex flex-row py-3 ps-5 w-100 text-bg-light shadow-sm ms-2">
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="search shadow-sm px-3 py-2"
                  onChange={handleSearchChange}
                />
                <div>
                  <Dropdown>
                    <Dropdown.Toggle className="filter-togler">
                      <VscListFilter className="filter-icon mt-2 ms-3" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Something else
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </MediaQuery>
          </>

          {/* Stats */}

          <MediaQuery minWidth={320} maxWidth={767}>
            <div className="d-flex justify-content-center flex-column w-100 mt-1 py-3 ms-2 text-bg-light shadow-sm">
              <h3 className="title text-center mb-3">Inventory Summary</h3>
              <div className="d-flex mx-auto gap-5">
                <div className="inv-stats">
                  <img
                    src={Quantity}
                    style={{ width: "50px", height: "50px" }}
                    className="mb-1"
                  />
                  {!allProducts ? (
                    <Skeleton
                      width={"50px"}
                      height={"10px"}
                      marginTop={"7px"}
                    />
                  ) : (
                    <p>{allProducts.length}</p>
                  )}
                  <p className="movil-text">Quantity in Inventory</p>
                </div>
                <div className="inv-stats">
                  <img
                    src={onTheWay}
                    style={{ width: "50px", height: "50px" }}
                    className="mb-1"
                  />
                  {!AvailableProducts ? (
                    <Skeleton
                      width={"50px"}
                      height={"10px"}
                      marginTop={"7px"}
                    />
                  ) : (
                    <p>{AvailableProducts}</p>
                  )}
                  <p className="movil-text">Available products</p>
                </div>
              </div>
            </div>
          </MediaQuery>

          <MediaQuery minWidth={768} maxWidth={1199}>
            <div className="d-flex justify-content-center flex-column w-100 mt-3 mx-auto text-bg-light shadow-sm pt-3 pb-2">
              <h3 className="title text-center mb-3">Inventory Summary</h3>
              <div className="d-flex mx-auto gap-5">
                <div className="inv-stats">
                  <img
                    src={Quantity}
                    style={{ width: "50px", height: "50px" }}
                    className="mb-1"
                  />
                  {!allProducts ? (
                    <Skeleton
                      width={"50px"}
                      height={"10px"}
                      marginTop={"7px"}
                    />
                  ) : (
                    <p>{allProducts.length}</p>
                  )}
                  <p>Quantity in Inventory</p>
                </div>
                <div className="inv-stats">
                  <img
                    src={onTheWay}
                    style={{ width: "50px", height: "50px" }}
                    className="mb-1"
                  />
                  {!AvailableProducts ? (
                    <Skeleton
                      width={"50px"}
                      height={"10px"}
                      marginTop={"7px"}
                    />
                  ) : (
                    <p>{AvailableProducts}</p>
                  )}
                  <p>Available products</p>
                </div>
              </div>
            </div>
          </MediaQuery>

          <MediaQuery minWidth={1200}>
            <div className="inv-stats-main d-flex justify-content-center flex-column w-50 mx-auto text-bg-light shadow pt-4">
              <h3 className="title text-center mb-3">Inventory Summary</h3>
              <div className="d-flex mx-auto gap-5">
                <div className="inv-stats">
                  <img
                    src={Quantity}
                    style={{ width: "50px", height: "50px" }}
                    className="mb-1"
                  />
                  {allProducts.length == 0 ? (
                    <Skeleton
                      width={"50px"}
                      height={"10px"}
                      marginTop={"7px"}
                    />
                  ) : (
                    <p>{allProducts.length}</p>
                  )}
                  <p>Quantity in Inventory</p>
                </div>
                <div className="inv-stats">
                  <img
                    src={onTheWay}
                    style={{ width: "50px", height: "50px" }}
                    className="mb-1"
                  />
                  {!AvailableProducts ? (
                    <Skeleton
                      width={"50px"}
                      height={"10px"}
                      marginTop={"7px"}
                    />
                  ) : (
                    <p>{AvailableProducts}</p>
                  )}
                  <p>Available products</p>
                </div>
              </div>
            </div>
          </MediaQuery>
        </MediaQuery>

        {/* Dashboard Body */}
        <div className="product-list gap-4 mt-md-3 mt-xl-4 mx-xl-5 mx-0 px-0 mt-1">
          {filteredProducts.map((product) => {
            return (
              <div className="" key={product?._id}>
                <Product product={product} fetchData={fetchData} />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Home;
