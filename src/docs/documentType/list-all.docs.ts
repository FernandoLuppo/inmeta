/**
 * @openapi
 * /document-type/list-all:
 *   get:
 *     summary: List all document types
 *     tags:
 *       - DocumentType
 *     description: Retrieve all registered document types.
 *     responses:
 *       201:
 *         description: Document types successfully listed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 documentType:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 688a482e739415821342c1e4
 *                       name:
 *                         type: string
 *                         example: Personal documents
 *       404:
 *         description: No document types found
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
 *                   example: No document types found. Please make sure there are documents registered.
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
