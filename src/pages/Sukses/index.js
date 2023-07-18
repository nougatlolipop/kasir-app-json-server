import React, { useEffect } from "react";
import { Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import axios from "axios";
import { API_URL } from "../../utils/constant";

const Sukses = () => {

  useEffect(() => {
    getKeranjang();
  }, []);

  const getKeranjang = async () => {
    await axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        res.data.map(async (item) => {
          return await axios
            .delete(API_URL + "keranjangs/" + item.id)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="mt-4 text-center">
      <Player
        autoplay
        loop
        src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
        style={{ height: "700px", width: "700px" }}
      >
      </Player>
      <h2>Sukses Pesan</h2>
      <p>Terima Kasih Telah Memesan</p>
      <Button bg="primary" as={Link} to="/">
        Kembali
      </Button>
    </div>
  );
}

export default Sukses