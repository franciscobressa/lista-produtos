import "./App.css"
import { Alert, Card, CardBody, CardTitle, CardText, Button } from "reactstrap"
import axios from "axios"
import { useState, useEffect } from "react"

function App() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const formatMoney = value =>
        new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value)

    const sumPrice = () => {
        let sum = 0
        data.map(item => {
            sum += item.items[0].sellers[0].commertialOffer.Price
        })
        return sum
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setError(false)
            try {
                const result = await axios.get(
                    "http://localhost:5000/getProducts"
                )
                console.log(
                    result.data[0].items[0].sellers[0].commertialOffer.Price
                )
                setData(result.data)
            } catch (error) {
                setError(true)
            }
            setLoading(false)
        }
        fetchData()
    }, [])

    return (
        <div className="App vh-100 d-flex justify-content-center align-items-center">
            <Card className="col-10 col-md-4">
                <CardBody className="p-0">
                    <CardTitle className="border-bottom py-3" tag="h5">
                        Meu Carrinho
                    </CardTitle>
                    <CardText className="products-container px-3">
                        {/* list array */}
                        {loading ? (
                            <span>Loading...</span>
                        ) : error ? (
                            <span>Error...</span>
                        ) : (
                            data.map(item => (
                                <ul
                                    className="p-0 product-list"
                                    key={item.productId}
                                >
                                    <li className="product-item d-flex align-items-center justify-content-around">
                                        <img
                                            src={
                                                item.items[0].images[0].imageUrl
                                            }
                                            alt={item.productName}
                                            className="col-3 product-image"
                                        />
                                        <div className="col-9 product-info">
                                            <p className="mb-0">
                                                {item.productName}
                                            </p>
                                            <p className="product-price">
                                                {formatMoney(
                                                    item.items[0].sellers[0]
                                                        .commertialOffer.Price
                                                )}
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            ))
                        )}
                    </CardText>
                    <CardText className="border py-3 px-4 d-flex justify-content-between">
                        <p>Total</p>
                        {formatMoney(sumPrice())}
                    </CardText>
                    <CardText className="px-4 d-flex justify-content-center">
                        {sumPrice() > 10 ? (
                            <Alert class="cart-alert">
                                Parabéns, sua compra tem frete grátis.
                            </Alert>
                        ) : (
                            <p></p>
                        )}
                    </CardText>
                    <div className="px-4 pb-3">
                        <Button color="primary" className="w-100">
                            Finalizar Compra
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default App
