import express from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
} from "../controllers/todos.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new Todo (Requires Authentication)
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Learn Prisma"
 *     responses:
 *       201:
 *         description: Todo created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, createTodo);

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all Todos (Requires Authentication)
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all todos
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, getTodos);

/**
 * @swagger
 * /todos/{id}:
 *   patch:
 *     summary: Update a Todo (Requires Authentication)
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Todo"
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *       401:
 *         description: Unauthorized
 */
router.patch("/:id", authMiddleware, updateTodo);

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a Todo (Requires Authentication)
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", authMiddleware, deleteTodo);

export default router;
