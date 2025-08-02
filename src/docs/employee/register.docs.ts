/**
 * @openapi
 * /employee/register:
 *   post:
 *     summary: Register a new employee
 *     tags:
 *       - Employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - cpf
 *               - hiredAt
 *             properties:
 *               name:
 *                 type: string
 *                 example: João da Silva
 *               cpf:
 *                 type: string
 *                 description: CPF in the format 000.000.000-00 and must be a valid CPF number according to the official Brazilian government calculation.
 *                 example: 145.246.960-16
 *               hiredAt:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-07-30T13:26:33.000Z
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 employee:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: João da Silva
 *                     cpf:
 *                       type: string
 *                       example: 145.246.960-16
 *                     hiredAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-07-30T13:26:33.000Z
 *                     _id:
 *                       type: string
 *                       example: 688a482e739415821342c1e4
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - Name field is required.
 *                     - Name field must have at least 3 characters.
 *                     - Please insert your name correctly.
 *                     - CPF field is required.
 *                     - Invalid format, CPF must be 000.000.000-00.
 *                     - Invalid CPF number.
 *                     - HiredAt field is required.
 *       409:
 *         description: Conflict - Duplicate data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: cpf already in use
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: An error occurred in our system. Please try again later.
 */

export {}
