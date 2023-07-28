import React, { useState, useEffect } from "react";
import { ethers } from 'ethers';
import { Row, Form,Button } from 'react-bootstrap';
import GestionAddress from '../contractsData/Gestion-address.json';
import modeloAbi from '../contractsData/CWNFT.json';
import Swal from "sweetalert2";

const Aprove = ({ gestion, account, owner, signer }) => {
  let permisos = false;
  if (account && owner) {
    let acc = account.toString();
    let ow = owner.toString();
    acc = acc.toLowerCase();
    ow = ow.toLowerCase();
    if (acc == ow) {
      permisos = true;
    }
  }
  const [loading, setLoading] = useState(false);
  const [relojes, setRelojes] = useState([]);
  const [error, seterror]=useState(false);

  const aprovar = async (numerosDeSerie) => {
    setLoading(true);
    seterror(false); // Reiniciar el estado de error
  
    if (relojes.length > 0) {
      for (let i = 0; i < numerosDeSerie.length; i++) {
        const numeroDeSerie = numerosDeSerie[i];
        const address = await gestion.id_nft(numeroDeSerie);
        console.log("address", address);
        if (address.toString() === "0x0000000000000000000000000000000000000000") {
          console.log('error');
          seterror(true);
          break; // Salir del bucle si la dirección es 0
        }
        const nft = new ethers.Contract(address, modeloAbi.abi, signer);
        await nft.approve(GestionAddress.address, numeroDeSerie);
      }
  
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Some of the serial numbers are not valid",
          width: 800,
          padding: "3em",
          backdrop: "rgba(255, 38, 68, 0.2) left top no-repeat",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Permits granted correctly",
          width: 800,
          padding: "3em",
          text: "You have given the smart contract permits correctly",
          backdrop: "rgba(15, 238, 168, 0.2) left top no-repeat",
        });
      }
    }
  
    setLoading(false);
  };


 
  const handleAddNumeroDeSerie = (e) => {
    const { value } = e.target;
    // Divide el valor por comas y elimina los espacios en blanco alrededor de cada elemento
    const relojesArray = value.split(',').map((material) => material.trim());
    setRelojes(relojesArray);
  };

  if (!permisos) {
    return (
      <main style={{ padding: '1rem 0' }}>
        <h2 style={{color : 'red'}}>You are not authorized to be here</h2>
      </main>
    );
  }
  return (
    <div className="container-fluid mt-5">
      <div className="jumbotron">
        <h3>Allow the sales of your watches</h3>
      </div>
      <div className="row">
        <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
          <div className="form-container-transfer">
            <Form.Group as={Row} className="g-4">
              <Form.Label htmlFor="serialNumber" className="label-transfer">Serial numbers</Form.Label>
              <Form.Control type="text" placeholder="Serial numbers" onChange={handleAddNumeroDeSerie} />

            </Form.Group>
            <Button onClick={() => aprovar(relojes)}  size="lg" disabled={loading} className="btn-transfer">
              {loading ? 'Loading...' :"Give permissions"}
            </Button>
          </div>

        </main>
      </div>
    </div>
  );

};



export default Aprove;
