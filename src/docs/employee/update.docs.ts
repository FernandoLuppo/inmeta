/**
 * @openapi
 * /employee/update:
 *   patch:
 *     summary: Update an existing employee's name
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
 *               - _id
 *             properties:
 *               name:
 *                 type: string
 *                 example: João da Silva
 *               _id:
 *                 type: string
 *                 description: MongoDB ObjectId (24 hex characters)
 *                 example: 688a482e739415821342c1e4
 *     responses:
 *       200:
 *         description: Employee updated successfully
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
 *                     _id:
 *                       type: string
 *                       example: 688a482e739415821342c1e4
 *                     name:
 *                       type: string
 *                       example: João da Silva
 *                     cpf:
 *                       type: string
 *                       example: 123.456.789-00
 *                     hiredAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-07-30T13:26:33.000Z
 *       400:
 *         description: Validation error in request body
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
 *                     - _id field is required.
 *                     - "Invalid format: _id must be a valid ObjectId (24 hex characters)."
 *       404:
 *         description: Employee not found
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
 *                   example: Employee not found for update
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
