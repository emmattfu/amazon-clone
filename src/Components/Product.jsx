import React from "react";
import {useDispatch} from 'react-redux'
import {addToBasket} from '../redux/actions'
import "../Styles/Product.css";

function Product({ title, price, rating, image, id }) {
 
  const dispatch = useDispatch()

  function onClickHandle() {
    dispatch(addToBasket({title, price, rating, image, id}))
  }
  
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <p className="product__rating">
          {Array(rating).fill().map((_, i) => {
           return <span role="img" aria-label="star" key={i}>
              ⭐
            </span>;
          })}
        </p>
      </div>

      <img
        src={image}
        alt=""
      />

      <button onClick={onClickHandle}>Add to Basket</button>
    </div>
  );
}

export default Product;
