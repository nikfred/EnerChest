import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Card,
    Col,
    Container,
    Dropdown,
    FormControl,
    Image, InputGroup,
    ListGroup,
    Row
} from "react-bootstrap";
import {Context} from "../index";
import {LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {fetchDispensersWithProduct, fetchOneProduct} from "../http/productAPI";
import {addToCart, fetchCart} from "../http/userAPI";
import {useHistory, useParams} from "react-router-dom"
import {observer} from "mobx-react-lite";
import AddProduct from "../components/modals/addProduct";
import UpdateProduct from "../components/modals/updateProduct";


const Product = observer(() => {
    const {user} = useContext(Context)
    const [product, setProduct] = useState(' ')
    const [dispensers, setDispensers] = useState([])
    const [selectedDispenser, setSelectedDispenser] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [isTrue, setIsTrue] = useState(false)
    const [updateVisible, setUpdateVisible] = useState(false)

    const {id} = useParams()

    const history = useHistory()


    const buy = () => {
        if (!selectedDispenser.dispenser_id) {
            alert("No dispenser selected")
            return
        }
        const cartItem = {
            product_id: id,
            dispenser_id: selectedDispenser.dispenser_id,
            quantity: quantity || 1
        }
        addToCart(cartItem).then(data => {
            console.log("Product added to cart")
            let total = data.total.$numberDecimal
            user.setTotalPrice(total)
        })

        history.push(SHOP_ROUTE)
    }


    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data))
        fetchDispensersWithProduct(id).then(data => setDispensers(data))
        fetchCart().then()
        setIsTrue(false)
    }, [])

    return (
        <Container>
            <Row>
                <Col md={4}>
                    <Card style={{
                        height: '400px', cursor: 'pointer', backgroundColor: '#AB97C2',
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
                    }} className='mt-3'>
                        <div className="d-flex justify-content-center">
                            <Image style={{height: '350px'}} className="mt-2"
                                   src={product.imageUrl || "https://storage.googleapis.com/multi-static-content/previews/artage-io-thumb-38074b7b27e6dbc574938e81868f435d.png"}/>
                        </div>
                    </Card>
                </Col>
                <Col md={4} style={{
                    fontSize: '34px',
                    fontFamily: 'Montserrat Alternates',
                    color: '#508852'
                }}>
                    <div className="d-flex justify-content-center mt-3">
                        {product.brand} {product.name}, {product.size}
                    </div>
                    <div className="d-flex justify-content-center mt-3" style={{
                        color: '#39C829'
                    }}>
                        {product.price * quantity} UAH
                    </div>

                    {user.isAdmin ?
                        <div className="d-grid gap-2 mt-3">
                            <Button className= "mt-2"  variant="danger" style={{
                                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                fontSize: '20px'
                            }}
                                    onClick={() => setUpdateVisible(true)}>
                                Update product info
                            </Button>
                            <UpdateProduct  show={updateVisible} onHide={() => setUpdateVisible(false)}/>
                        </div>
                        :
                        ' '
                    }
                    {dispensers.length !== 0 ?
                        <ListGroup className="mt-3">
                            <Dropdown style={{
                                fontFamily: 'Montserrat Alternates',
                                fontSize: '30px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                width: '100%'
                            }}>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    {selectedDispenser.address || "Selected dispenser"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {dispensers.map(dispenser =>
                                        <Dropdown.Item key={dispenser.dispenser_id}
                                                       onClick={() => {
                                                           setSelectedDispenser(dispenser)
                                                           setIsTrue(true)
                                                       }}
                                                       className="align-self-auto"
                                                       style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
                                            <p>{dispenser.address}  </p>
                                            <b style={{color: 'green'}}>{dispenser.quantityFree}</b>/
                                            <b style={{color: 'grey'}}>{dispenser.quantityAll}</b>
                                        </Dropdown.Item>)}
                                </Dropdown.Menu>
                            </Dropdown>
                            <div>
                                {isTrue ?
                                    <div>
                                        <InputGroup className="mb-3">
                                            <Button variant="success" onClick={() => {
                                                if (quantity > 1) setQuantity(quantity - 1)
                                            }}>-</Button>
                                            <FormControl
                                                onChange={e => {
                                                    setQuantity(e.target.value)
                                                }}
                                                value={quantity}
                                                className="mt-3 align-items-center"
                                                type="number"
                                                max={selectedDispenser.quantityFree}
                                                min={0}
                                                style={{
                                                    textAlign: 'center',
                                                    fontSize: '28px'
                                                }}
                                                readOnly={true}
                                            />
                                            <Button variant="success" onClick={() => {
                                                if (quantity < selectedDispenser.quantityFree) setQuantity(quantity + 1);
                                            }
                                            }>+</Button>

                                        </InputGroup>
                                    </div>
                                    :
                                    ' '
                                }
                            </div>
                            <div>
                                {user.isAuth ?
                                    <div>
                                        {user.isAdmin ?
                                            ' '
                                            :
                                            <div className="d-grid gap-2 mt-3">
                                                <Button variant="success"
                                                        style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}
                                                    // to={BASKET_ROUTE}>Add to Basket</Button>
                                                        onClick={() => {
                                                            buy()
                                                        }}>Add to Basket</Button>
                                            </div>
                                        }
                                    </div>
                                :
                                <div className="d-grid gap-2 mt-3">
                                    <Button variant="success" style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}
                                            onClick={() => history.push(LOGIN_ROUTE)}>Buy now</Button>
                                </div>
                                }
                            </div>
                        </ListGroup>
                        :
                        <div className="d-grid gap-2 mt-3">
                            Not available
                        </div>

                    }

                </Col>
                <Col md={4}>
                    <Card className="mt-3" style={{
                        backgroundColor: '#C4C4C4',
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', fontFamily: 'Open Sans Condensed'
                    }}>
                        <h1>Description: </h1>
                        <h2>{product.description}</h2>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
});

export default Product;

