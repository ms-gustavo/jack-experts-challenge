/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Gerenciamento de tarefas
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retorna todas as tarefas do usuário autenticado
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tarefas do usuário autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "Comprar pão"
 *                   description:
 *                     type: string
 *                     example: "Comprar pão na padaria perto de casa"
 *                   completed:
 *                     type: boolean
 *                     example: false
 *                   userId:
 *                     type: integer
 *                     example: 1
 *       204:
 *         description: Nenhuma tarefa encontrada para o usuário
 *       500:
 *         description: Erro ao buscar tarefas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao buscar tarefas: [detalhes do erro]"
 */

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Retorna uma tarefa específica do usuário autenticado
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Dados da tarefa específica
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Comprar pão"
 *                 description:
 *                   type: string
 *                   example: "Comprar pão na padaria perto de casa"
 *                 completed:
 *                   type: boolean
 *                   example: false
 *                 userId:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Tarefa não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tarefa não encontrada"
 *       403:
 *         description: Acesso negado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Acesso negado"
 *       500:
 *         description: Erro ao buscar tarefa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao buscar tarefa: [detalhes do erro]"
 */

/**
 * @swagger
 * /tasks/create:
 *   post:
 *     summary: Cria uma nova tarefa para o usuário autenticado
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título da tarefa
 *                 example: "Comprar pão"
 *               description:
 *                 type: string
 *                 description: Descrição da tarefa
 *                 example: "Comprar pão na padaria perto de casa"
 *               completed:
 *                 type: boolean
 *                 description: Status de conclusão da tarefa
 *                 example: false
 *     responses:
 *       200:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Atividade criada com sucesso"
 *                 task:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "Comprar pão"
 *                     description:
 *                       type: string
 *                       example: "Comprar pão na padaria perto de casa"
 *                     completed:
 *                       type: boolean
 *                       example: false
 *                     userId:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro de validação"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         description: Campo onde ocorreu o erro de validação
 *                         example: "title"
 *                       errors:
 *                         type: array
 *                         description: Lista de erros de validação para o campo
 *                         items:
 *                           type: string
 *                           example: "O título da tarefa é obrigatório."
 *       500:
 *         description: Erro ao criar tarefa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao criar atividade: [detalhes do erro]"
 */

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Atualiza uma tarefa específica do usuário autenticado
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título da tarefa
 *                 example: "Comprar pão"
 *               description:
 *                 type: string
 *                 description: Descrição da tarefa
 *                 example: "Comprar pão na padaria perto de casa"
 *               completed:
 *                 type: boolean
 *                 description: Status de conclusão da tarefa
 *                 example: true
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Atividade atualizada com sucesso"
 *                 task:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "Comprar pão"
 *                     description:
 *                       type: string
 *                       example: "Comprar pão na padaria perto de casa"
 *                     completed:
 *                       type: boolean
 *                       example: true
 *                     userId:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro de validação"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         description: Campo onde ocorreu o erro de validação
 *                         example: "title"
 *                       errors:
 *                         type: array
 *                         description: Lista de erros de validação para o campo
 *                         items:
 *                           type: string
 *                           example: "O campo título é obrigatório."
 *       403:
 *         description: Acesso negado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Acesso negado"
 *       404:
 *         description: Tarefa não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tarefa não encontrada"
 *       500:
 *         description: Erro ao atualizar tarefa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao atualizar atividade: [detalhes do erro]"
 */

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Deleta uma tarefa específica do usuário autenticado
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da tarefa
 *     responses:
 *       204:
 *         description: Tarefa deletada com sucesso
 *       403:
 *         description: Acesso negado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Acesso negado"
 *       404:
 *         description: Tarefa não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tarefa não encontrada"
 *       500:
 *         description: Erro ao deletar tarefa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao deletar tarefa: [detalhes do erro]"
 */
