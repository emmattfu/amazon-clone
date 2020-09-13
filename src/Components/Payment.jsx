import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../Styles/Payment.css";
import CheckoutProduct from "./CheckoutProduct";

function Payment() {
  const { basket, user } = useSelector((state) => state);

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
        </div>
      </div>
    </div>
  );
}

export default Payment;
