import { Link,useLocation } from "react-router-dom";
import { Navbar, Nav, Button, Container } from 'react-bootstrap';

const Navigation = ({ web3Handler,account,owner}) => {
    const location = useLocation();

    if(location.pathname==='/'){
        return (
            <Navbar className="mi_nav" expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand>
                    <a href="/" style={{textDecoration : 'none', color : 'white'}}>
                        &nbsp; LuxTrace Watch</a>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar navbar-dark bg-primary" />
                    <Navbar.Collapse id="navbar navbar-dark bg-primary">
                        <Nav className="me-auto">
                            <Nav.Link  style={{color :'#bf895a'}} as={Link} to="/">Home</Nav.Link>
                            <Nav.Link  style={{color :'#bf895a'}} as= {Link} to="/transferWatch">Transfer Watch</Nav.Link>
                            <Nav.Link  style={{color :'#bf895a'}} as = {Link} to="/login">Login</Nav.Link>
                        </Nav>
                      
                        <Nav.Link
                            href={`https://etherscan.io/address/${owner}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button nav-button btn-sm mx-4">
                            <Button variant="outline-light">
                                {owner}
                            </Button>
                        </Nav.Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )

    }else if(location.pathname==='/transferWatch'){
        return (
            <Navbar className="mi_nav" expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand>
                    <a href="/" style={{textDecoration : 'none', color : 'white'}}>
                        &nbsp; LuxTrace Watch</a>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar navbar-dark bg-primary" />
                    <Navbar.Collapse id="navbar navbar-dark bg-primary">
                        <Nav className="me-auto">
                            <Nav.Link  style={{color :'#bf895a'}} as={Link} to="/">Home</Nav.Link>
                            <Nav.Link  style={{color :'#bf895a'}} as = {Link} to="/login">Login</Nav.Link>
                        </Nav>
                        <Nav>
                            <Button onClick={web3Handler} variant="outline-light">
                                Connect Wallet
                            </Button> 
                            {account && 
                                <Nav.Link
                                href={`https://etherscan.io/address/${account}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button nav-button btn-sm mx-4">
                                <Button variant="outline-light">
                                    {account}
                                </Button>
                            </Nav.Link>
                            }
                        </Nav>
                       
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )

    }
    else if(location.pathname === '/administration'){
        return (
            <Navbar className="mi_nav" expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand>
                    <a href="/" style={{textDecoration : 'none', color : 'white'}}>
                        &nbsp;LuxTrace Watch</a>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar navbar-dark bg-primary" />
                    <Navbar.Collapse id="navbar navbar-dark bg-primary">
                        <Nav className="me-auto">
                            <Nav.Link  style={{color :'#bf895a'}} as={Link} to="/">Home</Nav.Link>
                            <Nav.Link  style={{color :'#bf895a'}} as = {Link} to="/approve">Approve Sells</Nav.Link>
                            <Nav.Link  style={{color :'#bf895a'}} as = {Link} to="/create-watch">New Watch</Nav.Link>
                            <Nav.Link  style={{color :'#bf895a'}} as = {Link} to="/sell-watch">Sell Watch</Nav.Link>
                        </Nav>
                        <Nav>
                            <Button onClick={web3Handler} variant="outline-light">
                                Connect Wallet
                            </Button> 
                            {account && 
                                <Nav.Link
                                href={`https://etherscan.io/address/${account}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button nav-button btn-sm mx-4">
                                <Button variant="outline-light">
                                    {account}
                                </Button>
                            </Nav.Link>
                            }
                        </Nav>
                      
                      
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )


    }
    
    else{
        return (
            <Navbar className="mi_nav" expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand>
                    <a href="/" style={{textDecoration : 'none', color : 'white'}}>
                        &nbsp; Prototype LuxTrace </a>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar navbar-dark bg-primary" />
                    <Navbar.Collapse id="navbar navbar-dark bg-primary">
                        <Nav className="me-auto">
                            <Nav.Link  style={{color :'#bf895a'}} as={Link} to="/">Home</Nav.Link>
                            <Nav.Link  style={{color :'#bf895a'}} as = {Link} to="/administration">Admin Panel</Nav.Link>
                            <Nav.Link  style={{color :'#bf895a'}} as = {Link} to="/create-watch">New Watch</Nav.Link>
                            <Nav.Link  style={{color :'#bf895a'}} as = {Link} to="/sell-watch">Sell Watch</Nav.Link>
                        </Nav>
                        <Nav>
                            <Button onClick={web3Handler} variant="outline-light">
                                Connect Wallet
                            </Button> 
                            {account && 
                                <Nav.Link
                                href={`https://etherscan.io/address/${account}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button nav-button btn-sm mx-4">
                                <Button variant="outline-light">
                                    {account}
                                </Button>
                            </Nav.Link>
                            }
                        </Nav>
                      
                      
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )

    }
}

export default Navigation;