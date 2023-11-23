import React from 'react'
import { Navbar, Container, FormControl, Badge, Nav, Dropdown, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { CartState } from '../Context/Context';
import { AiFillDelete } from 'react-icons/ai';
const Header = () => {
  const {state: {cart}, dispatch, productDispatch} = CartState();

  return (
    <Navbar bg="dark" variant='dark' style={{height: 80}}>
        <Container>
            <Navbar.Brand>
                <Link to="/">Shopping Cart</Link>
            </Navbar.Brand>
            <Navbar.Text className='search'>
                <FormControl style={{width: 500}} placeholder="Search a product" 
                className="m-auto"
                onChange={(e) => {
                  productDispatch({
                    type: "FILTER_BY_SEARCH",
                    payload: e.target.value,
                  });
                }}
                />
            </Navbar.Text>
            <Nav>
              <Dropdown style={{position:'absolute' ,left:'1050px', top: '20px'}}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <FaShoppingCart color='white' fontSize='25px' />
                    <Badge pill bg="success">{cart.length}</Badge>
                </Dropdown.Toggle>

                <Dropdown.Menu style={{minWidth: 370, position: 'relative', left:'-280px'}} >
                  {
                    cart.length > 0 ? (
                      <>
                         {cart.map((prod) => (
                          <span className='cartitem' key={prod.id}>
                            <img src={prod.image} 
                            className="cartItemImg" 
                            alt={prod.name} 
                            />
                            <div className='cartItemDetail'>
                              <span>{prod.name}</span>
                              <span>₹ {prod.price.split(".")[0]}</span>     
                            </div>
                            <AiFillDelete
                              fontSize="20px"
                              style={{ cursor : "pointer" }}
                              onClick={() => 
                                dispatch({
                                type: "REMOVE_FROM_CART",
                                payload: prod,
                              })
                              }/>
                          </span>
                         ))}
                         <Link to="/cart">
                           <Button style={{ width: "95%", margin: "0 10px"}}>
                             Go To Cart
                           </Button>
                         </Link>
                      </>
                    ):(
                      <span style={{padding: 10}}>Cart is Empty!</span>
                    )
                  }
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
        </Container>
    </Navbar>
  )
}

export default Header