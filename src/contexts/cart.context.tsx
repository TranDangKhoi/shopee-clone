import React, { createContext, useState } from "react";
import { TExtendedPurchases } from "src/types/purchase.type";

interface AuthContextInterface {
  extendedPurchases: TExtendedPurchases[];
  setExtendedPurchases: React.Dispatch<React.SetStateAction<TExtendedPurchases[]>>;
}

const initialAuthContext: AuthContextInterface = {
  extendedPurchases: [],
  setExtendedPurchases: () => null,
};

export const CartContext = createContext<AuthContextInterface>(initialAuthContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [extendedPurchases, setExtendedPurchases] = useState<TExtendedPurchases[]>(
    initialAuthContext.extendedPurchases,
  );
  return <CartContext.Provider value={{ extendedPurchases, setExtendedPurchases }}>{children}</CartContext.Provider>;
};
