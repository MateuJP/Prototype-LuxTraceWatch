import React, { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { Buffer } from 'buffer';

import Swal from 'sweetalert2';
import {create as ipfsHttpClient} from 'ipfs-http-client';

const Crear = ({ gestion, permisos }) => {
  const [loading, setLoading] = useState(false);
  const [idCreator, setIdCreator] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [creationDate,setCreationDate]=useState('');
  const [materials, setMaterials] = useState([]);
  const [fabricationPlace, setFabricationPlace] = useState('');
  const [image, setImage]=useState('');
  const [video, setVideo]=useState('');
  const projectId = '2SQDBT82TDPavw2GQJLMJFGBxQ4';
const projectSecret = 'c288ea36ec4ee892dfa7a57cba1dc6df';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const client = ipfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  apiPath: '/api/v0',
  headers: {
    authorization: auth
  }
});

  const uploadToIpfs = async (event, setState) => {

    event.preventDefault();
    const file = event.target.files[0];
    if (typeof file !== 'undefined') {
      try {
        const result = await client.add(file);
        setState(`https://luxwines.infura-ipfs.io/ipfs/${result.path}`);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'An error occurred while uploading information to IPFS',
          width: 800,
          padding: '3rem',
          text: `The following error occurred during file upload : ${error}`,
          backdrop: 'rgba(255, 38, 68, 0.2) left top'
        });
      }
    }
  };

  const handleCrearReloj = async () => {
    setLoading(true);
    try {
      if (serialNumber === ''|| creationDate==='' || fabricationPlace === '' || materials === '' || image === '' || video === '') {
        return;
      }
      await gestion.crearReloj(idCreator, serialNumber,creationDate ,materials, fabricationPlace,image,video);
      Swal.fire('Clock created! ', ' The clock has been created successfully. ', 'success');
    } catch (error) {
      Swal.fire('Error', 'There was an error when creating the clock.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!permisos) {
    return (
      <main style={{ padding: '1rem 0' }}>
        <h2 style={{color :'red'}}>You are not authorized to be here</h2>
      </main>
    );
  }

  const handleMaterialsChange = (e) => {
    const { value } = e.target;
    // Divide el valor por comas y elimina los espacios en blanco alrededor de cada elemento
    const materialArray = value.split(',').map((material) => material.trim());
    setMaterials(materialArray);
  };

  return (
    <div className='container'>
      <div className="container-form-creator">
        <Row className="form-creator">
          <h2 style={{ fontWeight: 'bold', color: 'white'}}>Creation Form</h2>

          <fieldset className="form-creator-data">
            <legend style={{ color: 'white', fontFamily:"'Edu SA Beginner', cursive", }}>Watch Data</legend>
            <Form.Group>
            <Form.Control type="text" placeholder="Creator's id" onChange={(e) => setIdCreator(e.target.value)} />
            </Form.Group>

            <Form.Group>
            <Form.Control type="text" placeholder="Serial number" onChange={(e) => setSerialNumber(e.target.value)} />
            </Form.Group>
            <Form.Group>
            <Form.Control type="date" placeholder="Creation Date" onChange={(e) => setCreationDate(e.target.value)} />
            </Form.Group>

            <Form.Group>
            <Form.Control type="text" placeholder="Materials" onChange={handleMaterialsChange} />
            </Form.Group>

            <Form.Group>
            <Form.Control type="text" placeholder="Fabrication place" onChange={(e) => setFabricationPlace(e.target.value)}
            />            
            </Form.Group>
          </fieldset>
          <div className='form-creator-files'>
            <fieldset className="files-inputs">
              <legend style={{ color: 'white' }}>Watch Files</legend>
              <Form.Group>
                <Form.Label style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  Watch Image
                </Form.Label>
                <Form.Control
                  type="file"
                  required
                  name="certificate"
                  onChange={(e) => uploadToIpfs(e, setImage)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>Video</Form.Label>
                <Form.Control
                  type="file"
                  required
                  name="analisis"
                  onChange={(e) => uploadToIpfs(e, setVideo)}
                />
              </Form.Group>
            </fieldset>
          </div>
          <div className="g-grid px-0">
            <button className='boton-crear' onClick={handleCrearReloj} variant="primary" size="lg" disabled={loading}>
              {loading ? 'Loading Data...' : 'Create'}
            </button>
          </div>
        </Row>
      </div>
    </div>
  );
};

export default Crear;
