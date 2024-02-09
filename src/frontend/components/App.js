import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Navigation from './Nav';
import Home from './Home';
import Login from './Login';
import Vender from './Vender';
import Admin from './Admin';
import Crear from './Crear';
import Transfer from './Transfer';
import Aprove from './Approve';
import GestionAbi from '../contractsData/Gestion.json';
import GestionAddress from '../contractsData/Gestion-address.json';
import { useState,useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';
import '../css/login.css'
import '../css/nav.css'
import '../css/home.css'
import '../css/vender.css'
import '../css/admin.css'
import '../css/creator.css'


function App() {

  const [loading, setLoading] = useState(true);
  const [creator,setCreator]=useState(false);
  const [seller,setSeller]=useState(false);
  const [account, setAccount] = useState(null);
  const [gestion, setGestion] = useState({});
  const [owner, setOwner] = useState(null);
  const [provider,setProvider]=useState(null);
  const [signer, setSigner]= useState(null);
  const [admin,setAdmin]=useState(null);



  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts)
    setAccount(accounts[0]);
    localStorage.setItem('wallet',account)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    setSigner(signer);

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0]);
      await web3Handler();
    })

    loadContracts(signer);
  }
  const loadContracts = async (signer) => {
    const gestion = new ethers.Contract(GestionAddress.address, GestionAbi.abi, signer);
    setGestion(gestion);
    setLoading(false);
    const ad=await gestion.isAdmin();
    setAdmin(ad);
    setLoading(false);
    const creator=await gestion.isCreator();
    if(creator|| ad){
      setCreator(true);
    }
    const seller=await gestion.isSeller();
    if(seller || ad) {
      setSeller(true);
    }
  }



  const getOwner=async()=>{
    // En caso de usar Ganache, usar este proveedor, si se usa otra red diferente, se tiene que buscar el proveedor para esa red
    const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');
    setProvider(provider);
    const gestion=new ethers.Contract(GestionAddress.address,GestionAbi.abi,provider);
    setGestion(gestion);
    const owner=await gestion.getOwner();
    setOwner(owner);

  }
  useEffect(() => {
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if (!isChrome) {
      alert('Esta DApp está diseñada para funcionar en Google Chrome. Algunas características pueden no ser compatibles en otros navegadores.');
    }
    if (localStorage.getItem('wallet') && window.location.pathname !== '/' ) {
      web3Handler();
    }
    getOwner();
    
  }, [])
     

  return (
    <BrowserRouter>
      <div className='App'>
            <>
            <Navigation web3Handler={web3Handler}  owner={owner} account={account}/>
            </>
            <Routes>
              <Route path="/" element={
                <Home gestion={gestion} signer={signer} provider={provider} />
              } />
              <Route path='/login' element={
                <Login/>
              }/>
              <Route path='/transferWatch' element={
                <Vender gestion={gestion} signer={signer}/>
              }/>
              <Route path='/administration' element={
                <Admin gestion={gestion} account={account} owner={owner} isAdmin={admin}/>
              }/>
              <Route path='/create-watch' element={
                <Crear gestion={gestion} permisos={creator}/>
              }/>
              <Route path='/sell-watch' element={
                <Transfer gestion={gestion} permisos={seller}/>
              }/>
              <Route path='/approve' element={
                <Aprove gestion={gestion} account={account} owner={owner} signer={signer}/>
              }/>
            </Routes>

            
        </div>
    </BrowserRouter>
  );
}

export default App;
