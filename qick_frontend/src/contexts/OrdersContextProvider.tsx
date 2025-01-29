"use client";
import { useState, ReactNode } from "react";
import OrdersContext from "./OrdersContext";

type Props = {
  children: ReactNode;
};

const OrdersContextProvider = ({ children }: Props) => {
  const [Contextorders, setContextOrders] = useState<any[]>([]);

  return (
    <OrdersContext.Provider value={{ Contextorders, setContextOrders }}>
      {children}
    </OrdersContext.Provider>
  );
};

export default OrdersContextProvider;
