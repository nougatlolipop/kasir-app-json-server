import React, { useState } from 'react'
import { Row, Col, ListGroup, Badge, Card } from "react-bootstrap";
import { numberWithCommas } from "../../utils/utils";
import { API_URL } from "../../utils/constant";
import { TotalBayar, ModalKeranjang } from "..";
import axios from "axios";
import swal from "sweetalert";

const Hasil = ({ keranjangs, getKeranjang }) => {
  const [showModal, setShowModal] = useState(false);
  const [keranjangDetail, setKeranjangDetail] = useState(false);
  const [jumlah, setJumlah] = useState(0);
  const [totalHarga, setTotalHarga] = useState(0);
  const [keterangan, setKeterangan] = useState("");

  const handleShow = (keranjang) => {
    setShowModal(true);
    setKeranjangDetail(keranjang);
    setJumlah(keranjang.jumlah);
    setKeterangan(keranjang.keterangan);
    setTotalHarga(keranjang.total_harga);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const tambah = () => {
    setJumlah(jumlah + 1);
    setTotalHarga(keranjangDetail.total_harga * (jumlah + 1));
  };

  const kurang = () => {
    if (jumlah !== 1) {
      setJumlah(jumlah - 1);
      setTotalHarga(keranjangDetail.total_harga * (jumlah - 1));
    }
  };

  const changeHandler = (event) => {
    setKeterangan(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleClose();

    const data = {
      jumlah: jumlah,
      total_harga: totalHarga,
      product: keranjangDetail.product,
      keterangan: keterangan,
    };
    await axios
      .put(API_URL + "keranjangs/" + keranjangDetail.id, data)
      .then((res) => {
        swal({
          title: "Update Pesanan",
          text: data.product.nama + " Berhasil Update Pesanan!",
          icon: "success",
          button: false,
          timer: 1000,
        });
        getKeranjang();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hapusPesanan = async (id) => {
    handleClose();

    await axios
      .delete(API_URL + "keranjangs/" + id)
      .then((res) => {
        swal({
          title: "Hapus Pesanan",
          text: keranjangDetail.product.nama + " Berhasil Hapus Pesanan!",
          icon: "error",
          button: false,
          timer: 1000,
        });
        getKeranjang();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Col md={3} className="mt-3">
      <h4>
        <strong>Hasil</strong>
      </h4>
      <hr />
      {keranjangs.length !== 0 && (
        <Card className="overflow-auto hasil">
          <ListGroup variant="flush">
            {keranjangs.map((keranjang) => (
              <ListGroup.Item
                key={keranjang.id}
                onClick={() => handleShow(keranjang)}
              >
                <Row>
                  <Col xs={2}>
                    <h4>
                      <Badge pill bg="success">
                        {keranjang.jumlah}
                      </Badge>
                    </h4>
                  </Col>
                  <Col>
                    <h5>{keranjang.product.nama}</h5>
                    <p>{`Rp. ${numberWithCommas(keranjang.product.harga)}`}</p>
                  </Col>
                  <Col>
                    <strong className="float-end">
                      {`Rp. ${numberWithCommas(keranjang.total_harga)}`}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}

            <ModalKeranjang
              handleClose={handleClose}
              showModal={showModal}
              keranjangDetail={keranjangDetail}
              jumlah={jumlah}
              keterangan={keterangan}
              totalHarga={totalHarga}
              tambah={tambah}
              kurang={kurang}
              changeHandler={changeHandler}
              handleSubmit={handleSubmit}
              hapusPesanan={hapusPesanan}
            />
          </ListGroup>
        </Card>
      )}
      <TotalBayar keranjangs={keranjangs} />
    </Col>
  );
};

export default Hasil

