import { useState } from "react";
import { Form,Button,Row } from "react-bootstrap";
import Swal from "sweetalert2";

const Transfer=({gestion,permisos})=>{
    const [loading,setLoading]=useState(false);
    const [serialNumber,setSerialNumber]=useState(null);
    const [newOwner,setnewOwner]=useState(null);
    const [idseller,setidseller]=useState(null);

    const _vender= async()=>{
        try{
          setLoading(true);
          await gestion.Firstsell(serialNumber,newOwner,idseller);
          Swal.fire({
            icon: 'success',
            title: 'Clock sold correctly',
            width: 800,
            padding: '3em',
            text: `You have correctly sold the clock with serial number${serialNumber}`,
            backdrop: 'rgba(15, 238, 168, 0.2) left top no-repeat'
          });
        }catch{
          Swal.fire({
            icon: 'error',
            title: 'Clock has not been sold ',
            width: 800,
            padding: '3em',
            backdrop: 'rgba(255, 38, 68, 0.2) left top no-repeat'
          });

        }finally{
          setLoading(false);
        }
        
    }
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
            <h3>Seller Form</h3>
          </div>
          <div className="row">
            <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
              <div className="form-container-transfer">
                <Form.Group as={Row} className="g-4">
                  <Form.Label htmlFor="serialNumber" className="label-transfer">Id Seller</Form.Label>
                  <Form.Control
                    id="serialNumber"
                    onChange={(e) => setidseller(e.target.value)}
                    size="lg"
                    required
                    type="text"
                    placeholder="Your Id"
                    className="form-control-transfer"
                  />
                </Form.Group>
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
                    {loading ? 'Loading...' : 'Transfer'}
                </Button>
              </div>
            </main>
          </div>
        </div>
      );
}
export default Transfer;