import React from 'react'
import { numberWithCommas } from '../../utils/utils'
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import axios from "axios";
import { API_URL } from "../../utils/constant";
import { useNavigate } from "react-router-dom";

const TotalBayar = ({ keranjangs }) => {

    const navigate = useNavigate();

    const total = keranjangs.reduce(function (result, item) {
        return result + item.total_harga;
    }, 0);

    const submitTotalBayar = async (totalBayar) => {
        const pesanan = {
            total_bayar: totalBayar,
            menus: keranjangs
        }

        await axios
            .post(API_URL + "pesanans", pesanan)
            .then((res) => {
                navigate("/sukses");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            {/* Web */}
            <div className="fixed-bottom d-none d-md-block">
                <Row>
                    <Col md={{ span: 3, offset: 9 }} className="px-4">
                        <h4>
                            {`Total Harga : `}
                            <strong className="float-end me-2">{`Rp. ${numberWithCommas(
                                total
                            )}`}</strong>
                        </h4>
                        <div className="d-grid">
                            <Button
                                variant="primary"
                                size="lg"
                                className="mb-2 mt-2 me-2"
                                onClick={() => submitTotalBayar(total)}
                            >
                                <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                                <strong>BAYAR</strong>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
            {/* Mobile */}
            <div className="d-sm-block d-md-none">
                <Row>
                    <Col md={{ span: 3, offset: 9 }} className="px-4">
                        <h4>
                            {`Total Harga : `}
                            <strong className="float-end me-2">{`Rp. ${numberWithCommas(
                                total
                            )}`}</strong>
                        </h4>
                        <div className="d-grid">
                            <Button
                                variant="primary"
                                size="lg"
                                className="mb-2 mt-2 me-2"
                                onClick={() => submitTotalBayar(total)}
                            >
                                <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                                <strong>BAYAR</strong>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default TotalBayar