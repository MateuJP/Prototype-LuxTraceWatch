import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import { Row, Form, Button, Col, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import modeloAbi from '../contractsData/CWNFT.json';

const Home = ({ gestion, provider }) => {
  const [loading, setLoading] = useState(false);
  const [serialNumber, setSerialNumber] = useState("");
  const [contract, setContract] = useState(null);
  const [loadingWatch, setLoadingWatch] = useState(true);
  const [error, setError] = useState(false);
  const [addrSmart, setAddrSmart] = useState(null);
  const [watchInfo, setWatchInfo] = useState([]);

  const buscarReloj = async () => {
    console.log("serial",serialNumber);
    if(serialNumber===''){
      Swal.fire({
        icon: 'error',
        title: 'The Serial number can not be empty',
        width: 800,
        padding: '3em',
        backdrop: 'rgba(255, 38, 68, 0.2) left top no-repeat'
      });

      
    }else{
      try {
        setLoading(true);
        setLoadingWatch(true);
        const addr = await gestion.id_nft(serialNumber);
        console.log('adr', addr);
        if (addr.toString() === "0x0000000000000000000000000000000000000000") {
          console.log("Error");
          Swal.fire({
            icon: 'error',
            title: 'The Watch has not been found',
            width: 800,
            padding: '3em',
            backdrop: 'rgba(255, 38, 68, 0.2) left top no-repeat'
          });          
          setError(true);
        } else {
          setAddrSmart(addr);
          const nft = new ethers.Contract(addr, modeloAbi.abi, provider);
          setContract(nft);
          const watch = await nft.watch();
          const allOwners = await nft.getOwners();
          const materiales = await nft.getMaterials();
          setWatchInfo({
            dateCreation: watch[1],
            materials: materiales,
            fabricationPlace: watch[2],
            owner: watch[3],
            image: watch[4],
            video: watch[5],
            allOwners: allOwners
          });
        }
      } catch {
        Swal.fire({
          icon: 'error',
          title: 'The Watch has not been found',
          width: 800,
          padding: '3em',
          backdrop: 'rgba(255, 38, 68, 0.2) left top no-repeat'
        });
      } finally {
        setLoading(false);
        setLoadingWatch(false);
      }

    }
    
  };

  return (
    <div className="container-fluid mt-5">
      <div className="jumbotron">
        <h3>Intelligent contract search engine</h3>
        <p className="lead text-center">The LuxTrace decentralized application that allows you to track the traceability of luxury products.</p>
      </div>

      <div className="row">
        <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
          {loadingWatch ? (
            <div className="form-container">
              <h4>Follow the traceability</h4>
              <Form.Group as={Row} className="g-4">
                <Form.Control
                  onChange={(e) => setSerialNumber(e.target.value)}
                  size="lg"
                  required
                  type="text"
                  placeholder="Clock serial number"
                  className="form-control"
                />
                <Button onClick={buscarReloj} variant="primary" size="lg" disabled={loading} className="btn-primary">
                  Search watch
                </Button>
              </Form.Group>
            </div>
          ) : (
            <div className="content mx-auto mt-4">
              <h3>
                <a href={`https://mumbai.polygonscan.com/address/${addrSmart}`}>Clock information</a>
              </h3>
              <Row className="g-4">
                <Col md={6}>
                  <Card className="cardHome TextInfo">
                    <Card.Body style={{ marginTop: '1rem' }}>
                      <Card.Text id='text-card'>
                        This watch was created on <b>{watchInfo.dateCreation}</b> in <b>{watchInfo.fabricationPlace}</b>, currently owned by <b>{watchInfo.owner}</b>.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="cardHome materials">
                    <Card.Body>
                      <Card.Title style={{ textDecoration: 'underline' }}>Materials List</Card.Title>
                      <div className="scroll-container">
                        {watchInfo.materials.map((material, index) => (
                          <Card.Text key={index}>{material}</Card.Text>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="cardHome owners">
                    <Card.Body>
                      <Card.Title style={{ textDecoration: 'underline' }}>Owners List</Card.Title>
                      <div className="scroll-container">
                        {watchInfo.allOwners.map((owner, index) => (
                          <Card.Text key={index}>
                            {index + 1}. {owner}
                          </Card.Text>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="cardHome info">
                    <Card.Body>
                      <Card.Title style={{ textDecoration: 'underline' }}>Interesting Information</Card.Title>
                      <p>
                        Click on the following link to watch the video: {' '}
                        <a href={watchInfo.video} target="_blank">
                          Video
                        </a>
                      </p>
                      <p>
                        Click on the following link to view the image: {' '}
                        <a href={watchInfo.image} target="_blank">
                          Image
                        </a>
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Form.Group as={Row} className="g-4">
                <Form.Control
                  onChange={(e) => setSerialNumber(e.target.value)}
                  size="lg"
                  required
                  type="text"
                  placeholder="Serial number"
                  className="form-control"
                />
                <Button onClick={buscarReloj}  size="lg" disabled={loading} className="btn-primary">
                  Search watch
                </Button>
              </Form.Group>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
