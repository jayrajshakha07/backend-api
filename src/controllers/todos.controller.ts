import { Request, Response, RequestHandler } from "express";
import { prisma } from "../utils/prisma";
import { AuthRequest } from "../middlewares/authMiddleware";

type AuthRequestHandler = RequestHandler<any, any, any, any, { user?: any }>;

export const createTodo: AuthRequestHandler = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { title } = req.body;
    const userId = req.user?.userId;

    if (!title || !userId) {
      res.status(400).json({ message: "Title and userId are required" });
      return;
    }

    const todo = await prisma.todo.create({
      data: { title, userId }
    });

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error creating todo", error });
  }
};

export const getTodos: AuthRequestHandler = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const todos = await prisma.todo.findMany({
      where: { userId: req.user?.userId },
      orderBy: {
        createdAt: "desc" // Change "createdAt" to the appropriate timestamp field
      }
    });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error });
  }
};

export const updateTodo: AuthRequestHandler = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const updatedTodo = await prisma.todo.update({
      where: { id, userId: req.user?.userId },
      data: { title, completed }
    });

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error });
  }
};

export const deleteTodo: AuthRequestHandler = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    await prisma.todo.delete({
      where: { id, userId: req.user?.userId }
    });

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
};
