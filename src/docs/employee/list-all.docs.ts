/**
 * @openapi
 * /employee/list-all:
 *   get:
 *     summary: List all employees
 *     tags:
 *       - Employee
 *     description: Retrieve all registered employees with name, CPF and hiring date.
 *     responses:
 *       200:
 *         description: Successfully listed employees
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 employee:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 688a482e739415821342c1e4
 *                       name:
 *                         type: string
 *                         example: João Silva
 *                       cpf:
 *                         type: string
 *                         example: 123.456.789-00
 *                       hiredAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-07-30T16:28:30.402Z
 *       404:
 *         description: No employee found
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
 *                   example: No employee found. Please make sure there are employee registered.
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
