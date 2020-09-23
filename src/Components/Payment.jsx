import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../Styles/Payment.css";
import CheckoutProduct from "./CheckoutProduct";
import { useElements, useStripe, CardElement, Elements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import axios from "../axios";
import { clearBasket } from "../redux/actions";
import {db} from '../firebase'

function Payment() {
  const [sum, setSum] = useState(0);
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true)
  const { basket, user } = useSelector((state) => state);
  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    let sum = 0;

    if (basket.length) {
      basket.forEach((el) => {
        sum += +el.price;
      });
    }

    setSum(sum);
  }, [basket]);

  useEffect(() => {
    const getClientSecret = async () => {
      const resp = await axios({
        method: 'post',
        url: `/payments/create?total=${sum * 100}`
      });

      setClientSecret(resp.data.clientSecret)
    }
    
    getClientSecret()
  }, [basket, sum])

  async function handleSubmit(e) {
    e.preventDefault()
    setProcessing(true)

    
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    }).then(({paymentIntent}) => {
      db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created
        })

      setSucceeded(true)
      setError(null)
      setProcessing(false)

      dispatch(clearBasket())

      history.replace('/orders')
    })
  }

  function handleChange(e) {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  }

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>){" "}
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((el, index) => (
              <CheckoutProduct
                key={index}
                id={el.id}
                title={el.title}
                image={el.image}
                price={el.price}
                rating={el.rating}
                index={index}
              />
            ))}
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => {
                    return (
                      <>
                        <p>
                          Subtotal ({basket.length} items) :{" "}
                          <strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift">
                          <input type="checkbox" /> This order contains a gift
                        </small>
                      </>
                    );
                  }}
                  decimalScale={2}
                  value={sum || 0}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />

                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* Errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
