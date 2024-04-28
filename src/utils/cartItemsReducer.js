function cartItemsReducer(cartItems, action) {
  switch (action.type) {
    case 'add_item': {
      const targetItem = cartItems.find((item) => item.id === action.item.id);
      if (targetItem) {
        const newCartItems = cartItems.filter(
          (item) => item.id !== action.item.id,
        );
        const newItem = { ...targetItem, quantity: targetItem.quantity + 1 };

        return [...newCartItems, newItem];
      }

      return [...cartItems, action.item];
    }

    case 'delete_item': {
      return cartItems.filter((item) => item.id !== action.targetId);
    }

    case 'plus_item': {
      const targetItem = cartItems.find((item) => item.id === action.targetId);
      const newCartItems = cartItems.filter(
        (item) => item.id !== action.targetId,
      );
      const newItem = { ...targetItem, quantity: targetItem.quantity + 1 };

      return [...newCartItems, newItem];
    }

    case 'minus_item': {
      const targetItem = cartItems.find((item) => item.id === action.targetId);
      const newCartItems = cartItems.filter(
        (item) => item.id !== action.targetId,
      );

      if (targetItem.quantity !== 1) {
        const newItem = { ...targetItem, quantity: targetItem.quantity - 1 };
        return [...newCartItems, newItem];
      }

      return newCartItems;
    }

    default: {
      throw new Error(`Unknown action: ${action.type}`);
    }
  }
}

export default cartItemsReducer;
