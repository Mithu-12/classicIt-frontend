import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";

const useCart = () => {
  const { user } = useAuth();

  // Check if user is available and has an email property
  const userEmail = user?.email;

  console.log(userEmail);

  const {
    isLoading,
    refetch,
    data: cart = [],
  } = useQuery({
    queryKey: ["cart", userEmail],
    queryFn: async () => {
      try {
        // Check if userEmail is available before making the request
        if (!userEmail) {
          throw new Error("User email is not available.");
        }

        const response = await fetch(
          `https://classicit.onrender.com/api/cart?email=${userEmail}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch cart data: ${response.statusText}`);
        }

        return response.json();
      } catch (error) {
        console.error("Error fetching cart data:", error.message);
        return [];
      }
    },
  });

  return [cart, isLoading, refetch];
};

export default useCart;
