import React from "react";
import "../Styles/Product.css";

function Product({ title, price, rating, image, id, onClickHandle }) {
 
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

      <button onClick={() => onClickHandle(title, price, rating, image, id)}>Add to Basket</button>
    </div>
  );
}

export default Product;
