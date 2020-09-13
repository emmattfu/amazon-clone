import React from 'react'
import "../Styles/Subtotal.css"
import CurrencyFormat from 'react-currency-format' 
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

function Subtotal() {
    const [sum, setSum] = React.useState(0)
    const basket = useSelector(state => state.basket)
    const history = useHistory()
    

    React.useEffect(() => {
        let sum = 0 
        
        if (basket.length) {
            basket.forEach(el => {
                sum += +el.price
            })
        }

        setSum(sum)
    }, [basket])


    return (
        <div className="subtotal">
            <CurrencyFormat 
                renderText={(value) => {
                   return <>
                    <p>Subtotal ({basket.length} items) : <strong>{value}</strong></p>
                    <small className="subtotal__gift">
                        <input type="checkbox"/> This order contains a gift
                    </small>
                    </>
                }}
                decimalScale={2}
                value={sum || 0}
                displayType={'text'}
                thousandSeparator={true}
                prefix={"$"}
            />

            <button className="subtotal__button" onClick={e => history.push('/payment')}>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal
