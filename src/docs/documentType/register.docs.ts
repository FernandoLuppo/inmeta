/**
 * @openapi
 * /document-type/register:
 *   post:
 *     summary: Register a new document type
 *     tags:
 *       - DocumentType
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Personal documents
 *     responses:
 *       201:
 *         description: Document type created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 documentType:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 688a482e739415821342c1e4
 *                     name:
 *                       type: string
 *                       example: Personal documents
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
 *                     - Please insert your document type correctly.
 *       409:
 *         description: Document type with this name already exists
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
 *                   example: Name already in use.
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
