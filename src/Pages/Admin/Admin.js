import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import "./Admin.css";
import { Link } from "react-router-dom";

const Admin = () => {
  const [users, setUsers] = useState([]);
  console.log(users);

  useEffect(() => {
    fetch(`http://localhost:4000/user/getAll`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    imageUrl: "",
    extrafeature: [],
  });

  const deleteUser = (obj) => {
    console.log(obj);
    const { _id } = obj;
    fetch(`http://localhost:4000/user/delete/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          const newUsers = users.filter((user) => user._id !== _id);
          setUsers(newUsers);
        }
      });
  };

  const handleSetInfo = (e) => {
    e.preventDefault();
    if (e.target.name !== "features") {
      setProduct(([e.target.name] = e.target.value));
    }
    if (e.target.name === "features") {
      const val = e.target.value;
      const array = val.split(",");
      console.log(array);
      setProduct(([e.target.name] = array));
    }
  };

  const handleSubmit = () => {
    const { name, description, price, extrafeature, imageUrl, category } =
      product;

    if (name && description && price && extrafeature && imageUrl && category) {
      fetch(`http://localhost:4000/product/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result) {
            alert("Product Uploaded Successfully");
          } else {
            alert("Fill Up Everything Carefully");
          }
        });
    }
  };

  return (
    <div>
      <Container style={{ marginTop: "50px" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <p style={{ textAlign: "left" }}>{`<= Back To Home`}</p>
        </Link>

        <Row>
          <Col sm={8}>
            <h3>All The Users</h3>
            <div className="allUsers">
              {users.map((user) => (
                <Row
                  style={{
                    padding: "20px auto",
                    background: "#333",
                    color: "#fff",
                    margin: "10px 0",
                  }}
                >
                  <Col xs={3}>
                    <p>{user.name}</p>
                  </Col>
                  <Col xs={6}>
                    <p>{user.email}</p>
                  </Col>
                  <Col xs={3}>
                    <p
                      style={{
                        cursor: "pointer",
                        color: "orange",
                      }}
                      onClick={() => deleteUser(user)}
                    >
                      <FaTrashAlt />
                    </p>
                  </Col>
                </Row>
              ))}
            </div>
          </Col>

          <Col sm={4}>
            <h3>Upload A Product</h3>
            <div className="uploadProduct">
              <form action="" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Product name"
                  required
                />
                <input
                  type="text"
                  name="category"
                  placeholder="Product category"
                  required
                />
                <label htmlFor="features">Use host url for image</label>
                <input
                  type="text"
                  name="image"
                  placeholder="Product image"
                  required
                />
                <input
                  type="text"
                  name="price"
                  placeholder="Product price"
                  required
                />
                <label htmlFor="features">Use Comma to seperate features</label>
                <input
                  id="features"
                  type="text"
                  name="features"
                  placeholder="Product Specefic features"
                  onBlur={handleSetInfo}
                  required
                />
                <textarea
                  name="description"
                  cols="30"
                  rows="10"
                  placeholder="Product description"
                ></textarea>

                <button type="submit">Upload Product</button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Admin;
