import React from 'react'
import useCart from '../../hooks/useCart'

const Cart = () => {
    const [cart] = useCart()
    console.log('cart page', cart)
  return (
    <div className='py-24'>This is cart</div>
  )
}

export default Cart