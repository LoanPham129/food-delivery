import React, {
  useContext,
  createContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";

const CartContext = createContext();

//REDUCER HANDLING CART ACT LIKE ADD, REMOVE, UPDATE QUANTITY & ITEM
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const { item, quantity } = action.payload;
      const existingItem = state.find((i) => i.id === item.id);
      if (existingItem) {
        return state.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [...state, { ...item, quantity }];
    }
    case "REMOVE_ITEM": {
      return state.filter((i) => i.id !== action.payload.itemId);
    }
    case "UPDATE_QUANTITY": {
      const { itemId, newQuantity } = action.payload;
      return state.map((i) =>
        i.id === itemId ? { ...i, quantity: Math.max(1, newQuantity) } : i
      );
    }
    default:
      return state;
  }
};

//INITAILISE CART FROM LOCALSTRORAGE
const initializer = () => {
  if (typeof window !== "undefined") {
    const localCart = localStorage.getItem("cart");
    return localCart ? JSON.parse(localCart) : [];
  }
  return [];
};

// const initializer = () => {
//   if (typeof window !== "undefined") {
//     try {
//       const localCart = localStorage.getItem("cart");
//       return localCart ? JSON.parse(localCart) : [];
//     } catch (error) {
//       console.error("Error parsing cart from localStorage:", error);
//       localStorage.removeItem("cart"); // xoá nếu hỏng
//       return [];
//     }
//   }
//   return [];
// };


export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, [], initializer);

  //persist cart state to localstorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  //calculate total cost and total item count
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  //format total items in power form
  const formatTotalItems = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num;
  };

  //dispatcher wrapper with usecallback for performance
  const addToCart = useCallback((item, quantity) => {
    dispatch({ type: "ADD_ITEM", payload: { item, quantity } });
  }, []);

  const removeFromCart = useCallback((itemId) => {
    dispatch({ type: "REMOVE_ITEM", payload: { itemId } });
  }, []);

  const updateQuantity = useCallback((itemId, newQuantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { itemId, newQuantity } });
  }, []);

  return (
    <CartContext.Provider
        value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        totalItems: formatTotalItems(totalItemsCount),
        }}
    >
        {children}
    </CartContext.Provider>
  )
};

export const useCart = () => useContext(CartContext);
