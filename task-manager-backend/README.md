<h1>Sistema de Gerenciamento de Tarefas</h1>
    <p>
        Este projeto é um sistema de gerenciamento de tarefas que permite aos usuários autenticar-se e realizar
        operações CRUD (Create, Read, Update, Delete) em tarefas. O projeto utiliza <strong>Node.js</strong>,
        <strong>Express</strong>, <strong>TypeScript</strong>, <strong>Prisma</strong>, e <strong>Swagger</strong> para a documentação da API.
    </p>

   <h2>Sumário</h2>
    <ul>
        <li><a href="#características">Características</a></li>
        <li><a href="#tecnologias-utilizadas">Tecnologias Utilizadas</a></li>
        <li><a href="#configuração-do-ambiente">Configuração do Ambiente</a></li>
        <li><a href="#instalação">Instalação</a></li>
        <li><a href="#scripts-disponíveis">Scripts Disponíveis</a></li>
        <li><a href="#estrutura-de-pastas">Estrutura de Pastas</a></li>
        <li><a href="#documentação-da-api">Documentação da API</a></li>
        <li><a href="#autenticação-e-autorização">Autenticação e Autorização</a></li>
        <li><a href="#contribuição">Contribuição</a></li>
        <li><a href="#licença">Licença</a></li>
    </ul>

  <h2 id="características">Características</h2>
    <ul>
        <li><strong>Autenticação de Usuários:</strong> Registro e login de usuários com criptografia de senha.</li>
        <li><strong>Gerenciamento de Tarefas:</strong> Criação, leitura, atualização e exclusão de tarefas.</li>
        <li><strong>Validação de Dados:</strong> Validação de dados de entrada utilizando <code>class-validator</code>.</li>
        <li><strong>Documentação da API:</strong> Documentação interativa com Swagger.</li>
    </ul>
    <h2 id="tecnologias-utilizadas">Tecnologias Utilizadas</h2>
    <ul>
        <li><strong>Backend:</strong> Node.js, Express, TypeScript, Prisma</li>
        <li><strong>Banco de Dados:</strong> Prisma ORM com MySQL</li>
        <li><strong>Autenticação:</strong> JWT para autenticação de usuários</li>
        <li><strong>Validação:</strong> <code>class-validator</code> para validação de dados</li>
        <li><strong>Documentação:</strong> Swagger para documentação da API</li>
    </ul>
    <h2 id="configuração-do-ambiente">Configuração do Ambiente</h2>
    <h3>Variáveis de Ambiente</h3>
    <p>
        Configure as seguintes variáveis de ambiente em um arquivo <code>.env</code> na raiz do projeto:
    </p>
    <pre>
<code>DATABASE_URL=""
DATABASE_TEST_URL=""
JWT_SECRET=""
PORT=""</code>
</pre>
    <h3>Dependências Globais</h3>
    <p>Certifique-se de ter as seguintes ferramentas instaladas globalmente em seu sistema:</p>
    <ul>
        <li><strong>Node.js:</strong> Versão 14.x ou superior</li>
        <li><strong>npm</strong> ou <strong>yarn</strong></li>
    </ul>
    <h2 id="instalação">Instalação</h2>
    <ol>
        <li>
            <p>Clone o repositório:</p>
            <pre><code>git clonegit@github.com:ms-gustavo/jack-experts-challenge.git
cd jack-experts-challenge/</code></pre>
        </li>
        <li>
            <p>Instale as dependências:</p>
            <pre><code>npm install</code></pre>
        </li>
        <li>
            <p>Execute as migrações do banco de dados:</p>
            <pre><code>npx prisma migrate dev</code></pre>
        </li>
        <li>
            <p>Inicie o servidor de desenvolvimento:</p>
            <pre><code>npm run dev</code></pre>
        </li>
    </ol>
    <h2 id="scripts-disponíveis">Scripts Disponíveis</h2>
    <ul>
        <li><code>npm run dev</code>: Inicia o servidor de desenvolvimento.</li>
        <li><code>npm run test</code>: Executa os testes unitários.</li>
        <li><code>npm run test:reset-db</code>: Reseta o banco de dados de testes.</li>
    </ul>
    <h2 id="estrutura-de-pastas">Estrutura de Pastas</h2>
    <pre><code>__tests__/
prisma/
src/
--config/
--controllers/
--docs/
--dtos/
--middlewares/
--routes/</code></pre>
    <h2 id="documentação-da-api">Documentação da API</h2>
    <p>
        A documentação completa está disponível ao iniciar o servidor em <code>localhost:${process.env.PORT || 5000}/api-docs</code>.
    </p>
    <h2 id="autenticação-e-autorização">Autenticação e Autorização</h2>
    <p>
        As rotas de tarefas exigem que o usuário esteja autenticado. O sistema utiliza JWT (JSON Web Token) para autenticação. Após o login, o usuário recebe um token JWT, que deve ser enviado em cada requisição subsequente no header <code>Authorization: Bearer &lt;token&gt;</code>.
    </p>
