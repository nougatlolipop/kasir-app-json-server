import React from 'react'
import { Modal, Button, Form } from "react-bootstrap";
import { numberWithCommas } from '../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const ModalKeranjang = ({ changeHandler, handleSubmit, ...props }) => {
  if (props.keranjangDetail) {
    return (
      <Modal show={props.showModal} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.keranjangDetail.product.nama}
            <strong>{` (Rp. ${numberWithCommas(
              props.keranjangDetail.product.harga
            )})`}</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Total Harga :</Form.Label>
              <p>
                <strong>{`Rp. ${numberWithCommas(props.totalHarga)}`}</strong>
              </p>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Jumlah :</Form.Label>
              <br />
              <Button
                variant="primary"
                size="sm"
                className="m-2"
                onClick={props.kurang}
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              <strong>{props.jumlah}</strong>
              <Button
                variant="primary"
                size="sm"
                className="m-2"
                onClick={props.tambah}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Keterangan :</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="keterangan"
                placeholder="Contoh : Pedas, Nasi setengah"
                value={props.keterangan}
                onChange={(event) => changeHandler(event)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
            >
              Simpan 
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={()=>props.hapusPesanan(props.keranjangDetail.id)}>
            <FontAwesomeIcon icon={faTrash} /> Hapus Pesanan
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <Modal show={props.showModal} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Kosong</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default ModalKeranjang;