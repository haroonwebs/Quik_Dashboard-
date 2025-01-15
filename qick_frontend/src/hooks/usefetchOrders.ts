import { ordertypes } from "@/types/ordertypes";

const usefetchOrders = async (url: string) => {
  try {
    const data = await fetch(url);
    if (!data) {
      throw new Error("error while fetching orders");
    }
    const response: any = await data.json();
    const orders: ordertypes[] = response.orders;
    return { orders, error: null };
  } catch (error: any) {
    return { orders: null, error: error.message };
  }
};

export default usefetchOrders;
