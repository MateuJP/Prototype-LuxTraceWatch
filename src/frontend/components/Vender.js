import { ethers } from "ethers";
import { useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
import modeloAbi from '../contractsData/CWNFT.json';
import Swal from "sweetalert2";

const Vender = ({ gestion, signer }) => {
  const [loading, setLoading] = useState(false);
  const [serialNumber, setSerialNumber] = useState(null);
  const [newOwner, setnewOwner] = useState(null);

  const _vender = async () => {
    try {
      setLoading(true);
      const address = await gestion.id_nft(serialNumber);
      const nft = new ethers.Contract(address, modeloAbi.abi, signer)
      console.log(nft);
      await nft.transfer(serialNumber, newOwner);
      console.log('He Salido');
      Swal.fire({
        icon: 'success',
        title: 'Clock sold correctly',
        width: 800,
        padding: '3em',
        text: `You have correctly sold the clock with serial number ${serialNumber} to ${newOwner}`,
        backdrop: 'rgba(15, 238, 168, 0.2) left top no-repeat'
      });

    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Clock has not been sold',
        width: 800,
        padding: '3em',
        backdrop: 'rgba(255, 38, 68, 0.2) left top no-repeat'
      });

    } finally {
      setLoading(false);
    }

  }


  return (
    <div className="container-fluid mt-5">
      <div className="jumbotron">
        <h3>Transfer the property of one of your watches</h3>
        <p className="lead text-center">This operation has a cost and its status is irreversible</p>
      </div>
      <div className="row">
        <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
          <div className="form-container-transfer">
            <Form.Group as={Row} className="g-4">
              <Form.Label htmlFor="serialNumber" className="label-transfer">Serial number</Form.Label>
              <Form.Control
                id="serialNumber"
                onChange={(e) => setSerialNumber(e.target.value)}
                size="lg"
                required
                type="text"
                placeholder="Clock serial number"
                className="form-control-transfer"
              />
            </Form.Group>
            <Form.Group as={Row} className="g-4">
              <Form.Label htmlFor="newOwner" className="label-transfer">Destination Address</Form.Label>
              <Form.Control
                id="newOwner"
                onChange={(e) => setnewOwner(e.target.value)}
                size="lg"
                required
                type="text"
                placeholder="Destination Address"
                className="form-control-transfer"
              />
            </Form.Group>
            <Button onClick={_vender} variant="primary" size="lg" disabled={loading} className="btn-transfer">
              Transfer watch
            </Button>
          </div>

        </main>
      </div>
    </div>
  );
}
export default Vender;