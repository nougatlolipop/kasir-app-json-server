import { Col, Row, Container } from "react-bootstrap";
import { ListCategories, Hasil, Menu } from "../../components";
import { useEffect, useState } from "react";
import { API_URL } from "../../utils/constant";
import axios from "axios";
import swal from "sweetalert";

function Home({ ...props }) {
  const [menus, setMenus] = useState([]);
  const [keranjangs, setKeranjangs] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState("Makanan");

  useEffect(() => {
    getMenus(selectedCategories);
    getKeranjang();
  });

  const getMenus = async (value) => {
    await axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        setMenus(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addKeranjangs = async (value) => {
    await axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then(async (res) => {
        if (res.data.length === 0) {
          const item = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };
          await axios
            .post(API_URL + "keranjangs", item)
            .then((res) => {
              swal({
                title: "Sukses",
                text: item.product.nama + " Berhasil Masuk Ke Keranjang!",
                icon: "success",
                button: false,
                timer: 1000,
              });
              getKeranjang();  
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          const item = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };
          await axios
            .put(API_URL + "keranjangs/" + res.data[0].id, item)
            .then((res) => {
              swal({
                title: "Sukses",
                text: item.product.nama + " Berhasil Masuk Ke Keranjang!",
                icon: "success",
                button: false,
                timer: 1000,
              });
              getKeranjang();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getKeranjang = async () => {
    await axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        setKeranjangs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeCategories = async (value) => {
    setSelectedCategories(value);
    getMenus(value);
  };

  return (
    <div className="mt-3">
      <Container fluid>
        <Row>
          <ListCategories
            changeCategories={changeCategories}
            selectedCategories={selectedCategories}
          />
          <Col className="mt-3">
            <h4>
              <strong>Daftar Product</strong>
              <hr />
              <Row className="overflow-auto menu">
                {menus &&
                  menus.map((menu) => (
                    <Menu
                      menu={menu}
                      key={menu.id}
                      addKeranjangs={addKeranjangs}
                    />
                  ))}
              </Row>
            </h4>
          </Col>
          <Hasil keranjangs={keranjangs} getKeranjang={getKeranjang} />
        </Row>
      </Container>
    </div>
  );
}

export default Home;
