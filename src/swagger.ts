import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentação da API",
      version: "1.0.0",
      description:
        "API desenvolvida para o desafio da Jack Experts - Gerenciamento de tarefas",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID do usuário",
              example: 1,
            },
            name: {
              type: "string",
              description: "Nome do usuário",
              example: "João Silva",
            },
            email: {
              type: "string",
              description: "Email do usuário",
              example: "joao.silva@example.com",
            },
            password: {
              type: "string",
              description: "Senha do usuário (criptografada)",
              example: "$2b$10$abcdefghijklmnopqrstuv",
            },
            tasks: {
              type: "array",
              description: "Lista de tarefas associadas ao usuário",
              items: {
                $ref: "#/components/schemas/Task",
              },
            },
          },
          required: ["name", "email", "password"],
        },
        Task: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID da tarefa",
              example: 1,
            },
            title: {
              type: "string",
              description: "Título da tarefa",
              example: "Comprar móveis novos",
            },
            description: {
              type: "string",
              description: "Descrição detalhada da tarefa",
              example:
                "Comprar uma nova mesa de jantar e cadeiras para a sala de estar.",
            },
            completed: {
              type: "boolean",
              description: "Status de conclusão da tarefa",
              example: false,
            },
            userId: {
              type: "integer",
              description: "ID do usuário a quem a tarefa pertence",
              example: 1,
            },
            user: {
              $ref: "#/components/schemas/User",
              description: "Usuário a quem a tarefa pertence",
            },
          },
          required: ["title", "description", "userId"],
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/docs/*.ts"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  console.log("Swagger rodando em http://localhost:5000/api-docs");
};
