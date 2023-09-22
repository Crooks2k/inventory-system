import React from "react";
import "./Home.css";
import AsideMenu from "../../core/layout/Aside/AsideMenu";
import MediaQuery from "react-responsive";
import Product from "./Product/Product";
import { AllProducts } from "../../core/service/HomeService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Home = () => {
  const [allProducts, setallProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem("token");
      if (!authToken) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'There was an error validating your session, please log in again!',
        })
        setTimeout(() => {
          navigate("/")
        }, 5000)
      }
  
      try {
        const response = await AllProducts('api/products/', authToken)
        const productData = response.data;
        setallProducts(productData);
      } catch (error) {
        console.error("Error al cargar los productos", error)
      }
    }

    fetchData()
  }, [])
  

  console.log(allProducts)

  const simulatedData = [
    {
      img: "asd",
      name: "ddd",
      quantity: "35"
    },
    {
      img: "asd",
      name: "ddd",
      quantity: "35"
    },
    {
      img: "asd",
      name: "ddd",
      quantity: "35"
    },
    {
      img: "asd",
      name: "ddd",
      quantity: "35"
    },
    {
      img: "asd",
      name: "ddd",
      quantity: "35"
    },
    {
      img: "asd",
      name: "ddd",
      quantity: "35"
    },
  ]
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
                <div>
                  <input type="search" placeholder="Search Product..." className="search shadow-sm px-2 py-1" />
                </div>
                <div>
                  <p>Filter Icon</p>
                </div>
              </div>
            </MediaQuery>

            <MediaQuery minWidth={320} maxWidth={767}>
              <div className="home-bar-m py-3 w-100 text-bg-light shadow-sm">
                  <input type="search" placeholder="Search Product..." className="search shadow-sm px-3 py-2" />
              </div>
            </MediaQuery>
          </>

          {/* Stats */}

          <MediaQuery minWidth={320} maxWidth={767}>
            <div className="d-flex justify-content-center flex-column w-100 mt-1 py-3 mx-auto text-bg-light shadow-sm">
              <h3 className="title text-center mb-3">Inventory Summary</h3>
              <div className="d-flex mx-auto gap-5">
                <div className="inv-stats">
                  <p>icon</p>
                  <p>868</p>
                  <p>Quantity in Inventory</p>
                </div>
                <div className="inv-stats">
                  <p>icon</p>
                  <p>200</p>
                  <p>Available products</p>
                </div>
              </div>
            </div>
          </MediaQuery>

          <MediaQuery minWidth={768} maxWidth={1199}>
            <div className="d-flex justify-content-center flex-column w-75 mt-1 mx-auto text-bg-light shadow-sm pt-3 pb-2">
              <h3 className="title text-center mb-3">Inventory Summary</h3>
              <div className="d-flex mx-auto gap-5">
                <div className="inv-stats">
                  <p>icon</p>
                  <p>868</p>
                  <p>Quantity in Inventory</p>
                </div>
                <div className="inv-stats">
                  <p>icon</p>
                  <p>200</p>
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
                  <p>icon</p>
                  <p>868</p>
                  <p>Quantity in Inventory</p>
                </div>
                <div className="inv-stats">
                  <p>icon</p>
                  <p>200</p>
                  <p>Available products</p>
                </div>
              </div>
            </div>
          </MediaQuery>
        </MediaQuery>

        {/* Dashboard Body */}
        <div className="product-list gap-4 mt-md-3 mt-xl-5 mx-xl-5 mx-0 mt-1 text-bg-light">
          {
            simulatedData.map((item, index) =>{
              return(
                <Product item={item} key={index}/>
              )
            })
          }
        </div>
      </main>
    </div>
  );
};

export default Home;
