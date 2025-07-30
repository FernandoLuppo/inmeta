/**
 * @openapi
 * /document/documents-status-by-employee/{employeeId}:
 *   get:
 *     summary: Get all documents of an employee with their statuses
 *     tags:
 *       - Document
 *     description: Retrieve all documents linked to a specific employee, sorted by status. Returns name, status, and documentTypeId.
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         schema:
 *           type: string
 *           pattern: "^[a-f\\d]{24}$"
 *         description: MongoDB ObjectId of the employee
 *         example: 688a4943f1f9a44d773b7e85
 *     responses:
 *       200:
 *         description: Documents found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 document:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 688a5c3b39415621342c1e9b
 *                       name:
 *                         type: string
 *                         example: CNH
 *                       status:
 *                         type: string
 *                         enum: [pending, completed]
 *                         example: completed
 *                       documentTypeId:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: 688a4c3b39415621342c1e9a
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
 *                   example: Employee not found
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
