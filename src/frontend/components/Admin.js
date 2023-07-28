import React, { useState } from "react";
import { Row, Form, Col, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Admin = ({ gestion, account, owner, isAdmin }) => {
    console.log("PPPPPPPP");
  let permisos = false;
  if (account && owner) {
    let acc = account.toString();
    let ow = owner.toString();
    acc = acc.toLowerCase();
    ow = ow.toLowerCase();
    console.log(ow);
    console.log(acc);
    if (acc === ow || isAdmin) {
      permisos = true;
    }
  }
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(false);
  const [idAdmin, setIdAdmin] = useState(null);
  const [addressAdmin, setAddressAdmin] = useState(null);
  const [idSellerAdmin, setIdSellerAdmin] = useState(null);
  const [idSeller, setIdSeller] = useState(null);
  const [addressSeller, setAddressSeller] = useState(null);
  const [idCreatorAdmin, setIdCreatorAdmin] = useState(null);
  const [idCreator, setIdCreator] = useState(null);
  const [addressCreator, setAddressCreator] = useState(null);
  const [removeAdminId, setRemoveAdminId] = useState(null);
  const [removeSellerAdminId, setRemoveSellerAdminId] = useState(null);
  const [removeSellerId, setRemoveSellerId] = useState(null);
  const [removeCreatorAdminId, setRemoveCreatorAdminId] = useState(null);
  const [removeCreatorId, setRemoveCreatorId] = useState(null);

  const handleAddAdmin = async (id, idAdmin, addressAdmin) => {
    try {
      setLoading(true);
      await gestion.addAdmin(id, idAdmin, addressAdmin);
      Swal.fire({
        icon: 'success',
        title: 'Administrator added correctly',
        width: 800,
        padding: '3em',
        text: `You have added to ${addressAdmin} as admin`,
        backdrop: 'rgba(15, 238, 168, 0.2) left top no-repeat'
      });

    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Administrator could not be added',
        width: 800,
        padding: '3em',
        backdrop: 'rgba(215, 138, 68, 0.2) left top no-repeat'
      });

    } finally {
      setLoading(false);

    }

  };

  const handleAddSeller = async (idSellerAdmin, idSeller, addressSeller) => {
    try {
      setLoading(true);
      await gestion.addSeller(idSellerAdmin, idSeller, addressSeller);
      Swal.fire({
        icon: 'success',
        title: 'Seller added correctly',
        width: 800,
        padding: '3em',
        text: `You have added to ${addressSeller} as a salesman`,
        backdrop: 'rgba(15, 238, 168, 0.2) left top no-repeat'
      });

    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Seller could not be added',
        width: 800,
        padding: '3em',
        backdrop: 'rgba(215, 138, 68, 0.2) left top no-repeat'
      });

    } finally {
      setLoading(false);
    }

  };

  const handleAddCreator = async () => {
    try {
      setLoading(true);
      await gestion.addCreator(idCreatorAdmin, idCreator, addressCreator);
      Swal.fire({
        icon: 'success',
        title: 'Creator added correctly',
        width: 800,
        padding: '3em',
        text: `You have added to ${addressCreator} as createdr`,
        backdrop: 'rgba(15, 238, 168, 0.2) left top no-repeat'
      });

    } catch {
      Swal.fire({
        icon: 'error',
        title: 'The creator could not add',
        width: 800,
        padding: '3em',
        backdrop: 'rgba(215, 138, 68, 0.2) left top no-repeat'
      });

    } finally {
      setLoading(false);

    }

  };

  const handleRemoveAdmin = async () => {
    try {
      setLoading(true);
      await gestion.removeadmin(removeAdminId);
      Swal.fire({
        icon: 'success',
        title: 'Administrator properly eliminated',
        width: 800,
        padding: '3em',
        text: `You have eliminated the administrator ${removeAdminId}`,
        backdrop: 'rgba(15, 238, 168, 0.2) left top no-repeat'
      });

    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Administrator could not be eliminated',
        width: 800,
        padding: '3em',
        backdrop: 'rgba(15, 238, 168, 0.2) left top no-repeat'
      });

    } finally {
      setLoading(false);

    }

  };

  const handleRemoveSeller = async () => {
    try {
      setLoading(true);
      await gestion.removeSeller(removeSellerAdminId, removeSellerId);
      Swal.fire({
        icon: 'success',
        title: 'Seller correctly removed',
        width: 800,
        padding: '3em',
        text: `You have eliminated the seller ${removeSellerAdminId}`,
        backdrop: 'rgba(15, 238, 168, 0.2) left top no-repeat'
      });

    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Seller could not be eliminated',
        width: 800,
        padding: '3em',
        backdrop: 'rgba(215, 138, 68, 0.2) left top no-repeat'
      });

    } finally {
      setLoading(false);
    }

  };

  const handleRemoveCreator = async () => {
    try{
      setLoading(true);
    await gestion.removeCreator(removeCreatorAdminId, removeCreatorId);
    Swal.fire({
      icon: 'success',
      title: 'Creator properly eliminated',
      width: 800,
      padding: '3em',
      text: `You have eliminated the Creator ${removeCreatorAdminId}`,
      backdrop: 'rgba(15, 238, 168, 0.2) left top no-repeat'
    });

    }catch{
      Swal.fire({
        icon: 'error',
        title: 'Creator could not be eliminated',
        width: 800,
        padding: '3em',
        text: `You have eliminated the Creator ${removeCreatorAdminId}`,
        backdrop: 'rgba(215, 138, 68, 0.2) left top no-repeat'
      });

    }finally{
      setLoading(false);

    }
    
  };


  console.log("Permisos", permisos);
  if (!permisos) return (
    <main style={{ padding: "1rem 0" }}>
      <h2 style={{color : 'red'}}>You have no permissions to be here</h2>
    </main>
  );
  return (
    <div className="container">
      &nbsp;
      &nbsp;
      &nbsp;
      <h3>Administration panel</h3>
      <Row>
        <Col md={6}>
          <Form className="form-admin">
            <Form.Group className="mb-3" controlId="formAddAdmin">
              <Form.Label>Add administrator</Form.Label>
              <Form.Control type="text" placeholder="Your id" onChange={(e) => setId(e.target.value)} />
              <Form.Control type="text" placeholder="New administrator id" onChange={(e) => setIdAdmin(e.target.value)} />
              <Form.Control type="text" placeholder="Administrator addres" onChange={(e) => setAddressAdmin(e.target.value)} />
            </Form.Group>
          <Button onClick={() => handleAddAdmin(id, idAdmin, addressAdmin)} disabled={loading}>
            {loading ? 'Loading...' : 'Add administrator'}
          </Button>
          </Form>

        </Col>

        <Col md={6}>
          <Form className="form-admin">
            <Form.Group className="mb-3" controlId="formAddSeller">
              <Form.Label>Add seller</Form.Label>
              <Form.Control type="text" placeholder="Your Id" onChange={(e) => setIdSellerAdmin(e.target.value)} />
              <Form.Control type="text" placeholder="New seller id" onChange={(e) => setIdSeller(e.target.value)} />
              <Form.Control type="text" placeholder="Seller address" onChange={(e) => setAddressSeller(e.target.value)} />
            </Form.Group>
          <Button onClick={() => handleAddSeller(idSellerAdmin, idSeller, addressSeller)} disabled={loading}>
            {loading ? 'Loading...' : 'Add Seller'}
          </Button>
          </Form>

        </Col>
      </Row>
      &nbsp;
      <Row>
        <Col md={6}>
          <Form className="form-admin">
            <Form.Group className="mb-3" controlId="formAddCreator">
              <Form.Label>Add creator</Form.Label>
              <Form.Control type="text" placeholder="Your id" onChange={(e) => setIdCreatorAdmin(e.target.value)} />
              <Form.Control type="text" placeholder="New creator ir" onChange={(e) => setIdCreator(e.target.value)} />
              <Form.Control type="text" placeholder="Creator Address" onChange={(e) => setAddressCreator(e.target.value)} />
            </Form.Group>
          <Button onClick={() => handleAddCreator(idCreatorAdmin, idCreator, addressCreator)} disabled={loading}>
            {loading ? 'Loading...' : 'Add Creator'}
          </Button>
          </Form>

        </Col>
        <Col md={6}>
          <Form className="form-admin">
            <Form.Group className="mb-3" controlId="formRemoveSeller">
              <Form.Label>Remove seller</Form.Label>
              <Form.Control type="text" placeholder="Your id" onChange={(e) => setRemoveSellerAdminId(e.target.value)} />
              <Form.Control type="text" placeholder="Seller id" onChange={(e) => setRemoveSellerId(e.target.value)} />
            </Form.Group>
          <Button onClick={handleRemoveSeller} disabled={loading}>
            {loading ? 'Loading...' : 'Remove seller'}
          </Button>
          </Form>

        </Col>

      </Row>
      &nbsp;
      <Row>
        <Col md={6}>
          <Form className="form-admin">
            <Form.Group className="mb-3" controlId="formRemoveCreator">
              <Form.Label>Remove Creator</Form.Label>
              <Form.Control type="text" placeholder="Your id" onChange={(e) => setRemoveCreatorAdminId(e.target.value)} />
              <Form.Control type="text" placeholder="Creator id" onChange={(e) => setRemoveCreatorId(e.target.value)} />
            </Form.Group>
          <Button onClick={handleRemoveCreator} disabled={loading}>
            {loading ? 'Loading...' : 'Remove creator'}
          </Button>
          </Form>

        </Col>
        <Col md={6}>
          <Form className="form-admin">
            <Form.Group className="mb-3" controlId="formRemoveAdmin">
              <Form.Label>Remove Administrator</Form.Label>
              <Form.Control type="text" placeholder="Administrator id" onChange={(e) => setRemoveAdminId(e.target.value)} />
            </Form.Group>
          <Button onClick={handleRemoveAdmin} disabled={loading}>
            {loading ? 'Loading...' : 'Remove Administrator'}
          </Button>
          </Form>

        </Col>
      </Row>
    </div>
  );

};

export default Admin;
