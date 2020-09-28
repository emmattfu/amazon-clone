import React from 'react'
import {useSelector} from 'react-redux'
import "../Styles/Checkout.css"
import {CheckoutProduct, Subtotal} from '../Components'
import FlipMove from 'react-flip-move';


function CheckOut() {
    const {basket, user} = useSelector(state => state)

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__ad" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"  alt=""/>

                <div>
                <h2 className="checkout__title greetings">Hello, {user?.email}</h2>
                <h2 className="checkout__title">Your shoppitng Basket</h2>
                <FlipMove>
                  {basket.map((el, i) => <CheckoutProduct key={i} id={el.id} price={el.price} image={el.image} title={el.title} rating={el.rating} index={i}/>)}
                </FlipMove>
            </div>
            </div>

           <div className="checkout__right">
               <Subtotal />
           </div>


        </div>
    )
}

export default CheckOut
