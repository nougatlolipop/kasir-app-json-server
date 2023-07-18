import React, { useEffect, useState } from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../../utils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils,faCoffee,faCheese } from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama==="Makanan") return <FontAwesomeIcon icon={faUtensils} className="me-2"/>;
  if (nama==="Minuman") return <FontAwesomeIcon icon={faCoffee} className="me-2"/>;
  if (nama === "Cemilan") return <FontAwesomeIcon icon={faCheese} className="me-2"/>;
  
  return <FontAwesomeIcon icon={faUtensils} className="me-2"/>;
}
const ListCategories = ( props ) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    await axios
      .get(API_URL + "categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Col md={2} className="mt-3">
      <h4>
        <strong>Daftar Kategori</strong>
      </h4>
      <hr />
      <ListGroup>
        {categories &&
          categories.map((category) => (
            <ListGroup.Item
              key={category.id}
              onClick={() => props.changeCategories(category.nama)}
              className={
                props.selectedCategories === category.nama && "category-active"
              }
              style={{ cursor: "pointer" }}
            >
              <h5>
                <Icon nama={category.nama} />
                {category.nama}
              </h5>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Col>
  );
};

export default ListCategories

