/**
 * @openapi
 * /document/unlink-document/{documentTypeId}:
 *   delete:
 *     summary: Unlink (delete) a document by its ID
 *     tags:
 *       - Document
 *     description: Deletes a document by its MongoDB ObjectId.
 *     parameters:
 *       - in: path
 *         name: documentTypeId
 *         required: true
 *         schema:
 *           type: string
 *           pattern: "^[a-f\\d]{24}$"
 *         description: MongoDB ObjectId of the document to delete
 *         example: 688a4c3b39415621342c1e9a
 *     responses:
 *       200:
 *         description: Document unlinked (deleted) successfully
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
 *                     acknowledged:
 *                       type: boolean
 *                       example: true
 *                     deletedCount:
 *                       type: integer
 *                       example: 1
 *       404:
 *         description: Document not found
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
 *                   example: Document not found
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
