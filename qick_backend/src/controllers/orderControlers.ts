import { Request, Response } from "express";
import { AppDataSource } from "../dbConnection";
import { ordertypes } from "./types/orderTypes";
import Joi from "joi";
import { Order } from "../models /ordersModel";
import { In } from "typeorm";

const orderSchemma = Joi.object({
  order_name: Joi.string().min(4).required(),
  order_description: Joi.string().min(10).max(1000).required(),
  order_value: Joi.number().min(10).required(),
  delivery_date: Joi.date().required(),
  order_status: Joi.string().valid(
    "pickup awaiting",
    "pickedup",
    "warehouse",
    "delivery attempt tried",
    "delivered",
    "delayed"
  ),
});

export const generate_Order = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { error, value } = orderSchemma.validate(req.body);
    if (error) {
      return res.status(404).json({
        success: false,
        message: error.details.map((details) => details.message),
      });
    }
    const {
      order_name,
      order_description,
      order_value,
      order_status,
      delivery_date,
    }: ordertypes = value;

    const currentDate = new Date();
    if (new Date(delivery_date) < currentDate) {
      return res.status(400).json({
        success: false,
        message: "Delivery date cannot be in the past.",
      });
    }
    const orderRepositery = AppDataSource.getRepository(Order);
    const neworder = orderRepositery.create({
      order_name,
      order_description,
      order_value,
      order_status,
      delivery_date,
    });

    if (!neworder) {
      return res.status(401).json({
        success: false,
        message: "Order not created !",
      });
    }
    const saveOrder = await orderRepositery.save(neworder);

    if (!saveOrder) {
      return res.status(422).json({
        success: true,
        message: "Order not created",
      });
    }
    const order = await orderRepositery.findOne({
      where: { id: saveOrder.id },
    });
    if (order) {
      return res.status(201).json({
        success: true,
        message: "Order created Successfuly",
        order,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `internal server error: ${error}`,
    });
  }
};

// get all orders

export const getAllOrders = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const orderRepositery = AppDataSource.getRepository(Order);

    const orders = await orderRepositery.find();
    const orderCount = orders.length;
    if (!orders) {
      return res.status(404).json({
        success: false,
        message: "something went wrong to get orders",
      });
    }
    if (orders.length === 0) {
      return res.status(200).json({
        success: false,
        message: " Order Not available",
      });
    }

    return res.status(200).json({
      success: true,
      message: "orders successfuly fetched",
      orders,
      count: orderCount,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `internal server error: ${error}`,
    });
  }
};

export const OrdersByStatus = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const orderRepositery = AppDataSource.getRepository(Order);
    const { status } = req.query as any;

    let orders;

    if (status === "live_orders") {
      // Fetch orders for multiple statuses
      orders = await orderRepositery.find({
        where: {
          order_status: In([
            "pickup awaiting",
            "pickedup",
            "warehouse",
            "delivery attempt tried",
          ]),
        },
      });
    } else if (["delivered", "delayed"].includes(status)) {
      // Fetch orders for a single status
      orders = await orderRepositery.find({
        where: { order_status: status },
      });
    } else {
      orders = await orderRepositery.find();
    }

    const orderCount = orders.length;
    if (!orders) {
      return res.status(404).json({
        success: false,
        message: "something went wrong to get orders",
      });
    }
    if (orders.length === 0) {
      return res.status(200).json({
        success: false,
        message: "Orders Not available",
      });
    }

    return res.status(200).json({
      success: true,
      message: "orders successfuly fetched",
      orders,
      count: orderCount,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `internal server error: ${error}`,
    });
  }
};

// update order function

export const updateOrder = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const orderRepositery = AppDataSource.getRepository(Order);

    const Id: number = parseInt(req.params.id);
    const order = await orderRepositery.findOne({ where: { id: Id } });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `order with this id:${Id} not found !`,
      });
    }

    const { order_status } = req.body;

    if (
      !order_status ||
      !["active", "delayed", "delivered"].includes(order_status)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid order status provided. Please use 'active', 'delayed', or 'delivered'.",
      });
    }
    order.order_status = order_status;
    orderRepositery.save(order);

    return res.status(200).json({
      success: true,
      message: "Order status updated Successfuly",
      order,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `internal server error : ${error}`,
    });
  }
};
