import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import prdImg from "../../Assets/images/5.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Product = () => {
  let { id } = useParams();

  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:4000/product/get/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const { extrafeature } = data;
  console.log(extrafeature);

  return (
    <div>
      <Container>
        <Row>
          <Col md={7} className="mx-auto">
            <div className="singleProductContainer">
              <Row>
                <Col sm={6}>
                  <img src={prdImg} className="img-fluid w-100" alt="" />
                </Col>

                <Col sm={5} className="offset-1" style={{ textAlign: "left" }}>
                  <h2>{data.name}</h2>
                  <p>Category : {data.category}</p>

                  <p>{data.description}</p>

                  <h3>Price : {data.price}</h3>

                  {data.category === "shoe" && <h4>Abailable Size</h4>}
                  {data.category === "watch" && <h4>Strape Type</h4>}
                  {data.category === "bag" && <h4>Abailable Dimension</h4>}

                  {data.length &&
                    extrafeature.map((feat) => <span>{feat}</span>)}

                  <Link to="/checkout" style={{ textDecoration: "none" }}>
                    <button className="btn bg-danger text-white">
                      Add to cart
                    </button>
                  </Link>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Product;
