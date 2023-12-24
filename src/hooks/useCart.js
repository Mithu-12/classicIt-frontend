
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";

const useCart = () => {
  const { user } = useAuth();
  const userEmail = user?.email;

  console.log(userEmail);

  const {
    refetch,
    data: cart = [],
  } = useQuery({
    queryKey: ["cart", userEmail],
    queryFn: async () => {
        const response = await fetch(
          `https://classicit.onrender.com/api/cart?email=${userEmail}`
        );
console.log('new cart data', response)
        return response.json();
      
    },
  });
  console.log('new cart 2', cart)
  return [cart,  refetch];
};

export default useCart;
