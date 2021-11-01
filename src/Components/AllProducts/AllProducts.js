import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import prdImage from "../../Assets/images/5.png";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  console.log(allProducts[0]);

  useEffect(() => {
    fetch("http://localhost:4000/product/getAll")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      });
  }, []);
  return (
    <div>
      <Container>
        <Row>
          <h2>All Products</h2>
          {allProducts.map((prd) => (
            <Col lg={4}>
              <Link
                to={`/singleProduct/${prd._id}`}
                style={{ textDecoration: "none", color: "#555" }}
              >
                <div className="products">
                  <img src={prdImage} className="w-100 img-fluid" alt="" />
                  <h2>{prd.name}</h2>
                  <div className="d-flex justify-content-around">
                    <div className="price">
                      <p>Price : {prd.price}</p>
                    </div>
                    <div className="category">
                      <p>Category : {prd.category}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default AllProducts;
