/**
 * @openapi
 * /document/link-document:
 *   post:
 *     summary: Link a document to an employee
 *     tags:
 *       - Document
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - status
 *               - employeeId
 *               - documentTypeId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Driver's License
 *               status:
 *                 type: string
 *                 enum: [pending, completed]
 *                 example: pending
 *               employeeId:
 *                 type: string
 *                 description: MongoDB ObjectId of the employee
 *                 example: 688a4943f1f9a44d773b7e85
 *               documentTypeId:
 *                 type: array
 *                 description: Array of document type ObjectIds
 *                 items:
 *                   type: string
 *                 example:
 *                   - 688a482e739415821342c1e4
 *                   - 688a4a2f739415821342c1e5
 *     responses:
 *       201:
 *         description: Document linked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 document:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 688a4c3b39415621342c1e9a
 *                     name:
 *                       type: string
 *                       example: Driver's License
 *                     status:
 *                       type: string
 *                       example: pending
 *                     employeeId:
 *                       type: string
 *                       example: 688a4943f1f9a44d773b7e85
 *                     documentTypeId:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example:
 *                         - 688a482e739415821342c1e4
 *                         - 688a4a2f739415821342c1e5
 *       400:
 *         description: Validation errors in request body
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
 *                     - Status field is required.
 *                     - Status must be either 'pending' or 'completed'.
 *                     - EmployeeId field is required.
 *                     - Invalid format: employeeId must be a valid ObjectId (24 hex characters).
 *                     - DocumentTypeId field is required.
 *                     - The documentTypeId array must contain at least one item.
 *                     - Each documentTypeId must be a valid ObjectId (24 hex characters).
 *                     - Each documentTypeId is required.
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
