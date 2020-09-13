import React, { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Styles/CheckoutProduct.css";
import { removeFromBasket } from "../redux/actions";

const CheckoutProduct = forwardRef(
  ({ id, image, title, price, rating, index }, ref) => {
    const dispatch = useDispatch();
    const basket = useSelector((state) => state.basket);

    function onClickHandler(e) {
      const index = +e.target.dataset.index;
      const newBasket = basket.filter((_,i) => i !== index);
    
      localStorage.setItem('basket', JSON.stringify(newBasket))

      dispatch(removeFromBasket(index));
    }

    return (
      <div className="checkoutProduct" ref={ref}>
        <img className="checkoutProduct__image" src={image} alt="" />

        <div className="checkoutProduct__info">
          <p className="checkoutProduct__title">{title}</p>
          <p className="checkoutProduct__price">
            <small>$</small>
            <strong>{price}</strong>
          </p>
          <div className="checkoutProduct__rating">
            {Array(rating)
              .fill()
              .map((_, i) => {
                return (
                  <span role="img" aria-label="star" key={i}>
                    ⭐
                  </span>
                );
              })}
          </div>

          <button onClick={onClickHandler} data-index={index} data-id={id}>
            Remove from Basket
          </button>
        </div>
      </div>
    );
  }
);

export default CheckoutProduct;
