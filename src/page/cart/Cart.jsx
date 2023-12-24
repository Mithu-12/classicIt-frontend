
import React from 'react';
import useCart from '../../hooks/useCart';

const Cart = () => {
  const [cart] = useCart();
  console.log('cart page', cart);

  return (
    <div className="py-20 px-4 sm:px-8 lg:px-16 xl:px-20">
      <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>

      {cart.map((item) => (
        <div
          key={item._id}
          className="bg-white rounded-lg shadow-md p-4 mb-4 sm:mb-8"
        >

          {item.productData && (
            <div className='flex flex-row justify-between items-center'>
              <div className="flex items-center mb-4">
                
                <img
                  src={item.productData.image.src}
                  alt={item.productData.image.color}
                  className="w-16 h-16 object-cover mr-4"
                />
                
              </div>
              <div>
                  <h2 className="text-lg font-semibold">{item.productData.name}</h2>
                  <p className="text-gray-500">{item.productData.image.color}</p>
                </div>

              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">${item.productData.price}</p>
              
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Cart;
