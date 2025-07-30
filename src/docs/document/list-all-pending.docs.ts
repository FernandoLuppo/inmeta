/**
 * @openapi
 * /document/list-all-pending:
 *   post:
 *     summary: List all pending documents with pagination and optional filtering
 *     tags:
 *       - Document
 *     description: |
 *       Retrieves a paginated list of documents with status "pending".
 *       Optionally filter by `employeeId` or `documentTypeId`.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - page
 *               - limit
 *             properties:
 *               page:
 *                 type: integer
 *                 example: 1
 *               limit:
 *                 type: integer
 *                 example: 3
 *               searchFilter:
 *                 type: object
 *                 description: Filter by either `employeeId` or `documentTypeId` (not both).
 *                 oneOf:
 *                   - required: [employeeId]
 *                     properties:
 *                       employeeId:
 *                         type: string
 *                         example: 68881eda82f9e66445b60479
 *                   - required: [documentTypeId]
 *                     properties:
 *                       documentTypeId:
 *                         type: string
 *                         example: 6889483f40a5181dc759bede
 *     responses:
 *       200:
 *         description: Successfully listed pending documents
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 documents:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60d5ec49f1a4a4a3b1e5c8d1"
 *                       name:
 *                         type: string
 *                         example: "Sample Document"
 *                       status:
 *                         type: string
 *                         example: "pending"
 *                       employee:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "John Doe"
 *                           cpf:
 *                             type: string
 *                             example: "000.000.000-00"
 *                           hiredAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-01-01T12:00:00.000Z"
 *                       documentTypes:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               example: "60d5ec49f1a4a4a3b1e5c8d2"
 *                             name:
 *                               type: string
 *                               example: "Sample Document Type"
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
 *                     - Limit field is required.
 *                     - Limit must be a positive number.
 *                     - Limit must be an integer.
 *                     - Limit must be at most 50.
 *                     - Page field is required.
 *                     - Page must be a positive number.
 *                     - Page must be an integer.
 *       404:
 *         description: No pending documents found
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
 *                   example: Documents not found
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
