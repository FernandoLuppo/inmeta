/**
 * @openapi
 * /document/send-document:
 *   post:
 *     summary: Send a document to an employee
 *     tags:
 *       - Document
 *     description: |
 *       This endpoint sends a document to a specific employee.
 *       Both the document and employee must exist in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - documentName
 *               - employeeId
 *               - documentId
 *             properties:
 *               documentName:
 *                 type: string
 *                 description: Name of the document to be sent
 *                 example: "Probation Contract"
 *               employeeId:
 *                 type: string
 *                 description: Employee ID (MongoDB ObjectId)
 *                 pattern: "^[a-f\\d]{24}$"
 *                 example: "60e7bdf9c25e6e4560f6e7b1"
 *               documentId:
 *                 type: string
 *                 description: Document ID (MongoDB ObjectId)
 *                 pattern: "^[a-f\\d]{24}$"
 *                 example: "64c88b3f6e92bb4c788c8a1b"
 *               message:
 *                 type: string
 *                 description: Optional message to accompany the document
 *                 example: "Please sign by Friday"
 *     responses:
 *       200:
 *         description: Document sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 documentName:
 *                   type: string
 *                   example: "Probation Contract"
 *                 document:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64c88b3f6e92bb4c788c8a1b"
 *                     name:
 *                       type: string
 *                       example: "Admission Letter"
 *                     status:
 *                       type: string
 *                       example: "pending"
 *                     documentTypeId:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "64c88b3f6e92bb4c788c8a1c"
 *                         name:
 *                           type: string
 *                           example: "Labor Documents"
 *                 employee:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60e7bdf9c25e6e4560f6e7b1"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     cpf:
 *                       type: string
 *                       example: "123.456.789-00"
 *                     hiredAt:
 *                       type: string
 *                       format: date
 *                       example: "2023-01-01"
 *                 message:
 *                   type: string
 *                   example: "Please sign by Friday"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Validation error - input does not match schema
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
 *                     - "documentName field is required"
 *                     - "employeeId field is required"
 *                     - "documentId field is required"
 *                     - "Invalid format: employeeId must be a valid ObjectId (24 hex characters)"
 *                     - "Invalid format: documentId must be a valid ObjectId (24 hex characters)"
 *       404:
 *         description: Either employee or document was not found
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     message:
 *                       type: string
 *                       example: "Document not found"
 *                 - type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     message:
 *                       type: string
 *                       example: "Employee not found"
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
 *                   example: "An unexpected error occurred. Please try again later."
 */
