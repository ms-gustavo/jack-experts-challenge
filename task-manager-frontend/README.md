   <h1>Task Manager Frontend</h1>

   <p>Este é o frontend do projeto <strong>Task Manager</strong>, uma aplicação para gerenciar tarefas. O frontend foi desenvolvido utilizando <strong>React</strong>, com <strong>TypeScript</strong> para tipagem, <strong>Vite</strong> como bundler, <strong>Tailwind CSS</strong> e <strong>Shadcn</strong> para estilização, e <strong>Cypress</strong> para testes.</p>

  <h2>Funcionalidades</h2>
    <ul>
        <li><strong>Autenticação de Usuário</strong>:
            <ul>
                <li>Login e registro utilizando JWT.</li>
                <li>Armazenamento seguro do token no <code>localStorage</code>.</li>
                <li>Proteção de rotas para garantir que apenas usuários autenticados acessem certas páginas.</li>
            </ul>
        </li>
        <li><strong>Gerenciamento de Tarefas</strong>:
            <ul>
                <li>Listagem de tarefas, com suporte à paginação.</li>
                <li>Criação, edição e exclusão de tarefas.</li>
                <li>Marcação de tarefas como concluídas.</li>
            </ul>
        </li>
        <li><strong>Dashboard</strong>:
            <ul>
                <li>Interface intuitiva e responsiva com navegação fácil entre listagem de tarefas e criação de novas tarefas.</li>
                <li>Layout adaptável para dispositivos móveis e desktops.</li>
                <li>Uso de componentes personalizados como <code>TaskCard</code> para exibir as tarefas de forma clara e concisa.</li>
                <li>Expansão de cards para exibição de detalhes completos das tarefas.</li>
            </ul>
        </li>
        <li><strong>Estilização</strong>:
            <ul>
                <li><strong>Tailwind CSS</strong> e <strong>Shadcn</strong> foram utilizados para criar uma interface moderna e responsiva.</li>
                <li>Formulários estilizados para login/registro com layout adaptativo para diferentes tamanhos de tela.</li>
            </ul>
        </li>
        <li><strong>Navegação</strong>:
            <ul>
                <li>Implementação de navegação protegida usando Context API para gerenciamento de autenticação.</li>
                <li>Rotas configuradas para alternar entre listagem de tarefas e criação de novas tarefas dentro do Dashboard.</li>
            </ul>
        </li>
    </ul>

  <h2>Tecnologias Utilizadas</h2>
    <ul>
        <li><strong>React</strong> com <strong>TypeScript</strong>: Biblioteca JavaScript para construção da interface do usuário, utilizando tipagem estática para maior segurança.</li>
        <li><strong>Vite</strong>: Ferramenta de construção rápida para desenvolvimento e bundling do projeto.</li>
        <li><strong>Tailwind CSS</strong>: Framework de CSS utilitário para estilização rápida e eficiente.</li>
        <li><strong>Shadcn</strong>: Conjunto de componentes estilizados para construir uma UI moderna.</li>
        <li><strong>Cypress</strong>: Framework de testes end-to-end, configurado com TypeScript.</li>
        <li><strong>react-hook-form</strong>: Biblioteca para gerenciamento de formulários, com validação usando <strong>Zod</strong>.</li>
        <li><strong>React Router</strong>: Utilizado para roteamento condicional e navegação entre páginas.</li>
        <li><strong>Context API</strong>: Para gerenciamento de estado global, principalmente para autenticação de usuários.</li>
    </ul>

   <h2>Estrutura do Projeto</h2>

  <pre><code>
├── cypress/
├── src/
│   ├── components/
    │   ├── ui/  
│   ├── contexs/
│   ├── interface/
│   ├── lib/      
│   ├── pages/
│   ├── services/
│   ├── utils/
    │   ├── zodSchemas/   
</code></pre>

   <h2>Como Rodar o Projeto</h2>

  <h3>Pré-requisitos</h3>
    <ul>
        <li>Node.js instalado</li>
        <li>NPM ou Yarn como gerenciador de pacotes</li>
    </ul>

  <h3>Instalação</h3>
    <ol>
        <li>Clone o repositório:
            <pre><code>git clone https://github.com/ms-gustavo/jack-experts-challenge.git
cd task-manager-frontend
</code></pre>
        </li>
        <li>Instale as dependências:
            <pre><code>npm install
# ou
yarn install
</code></pre>
        </li>
        <li>Execute o projeto em ambiente de desenvolvimento:
            <pre><code>npm run dev
# ou
yarn dev
</code></pre>
        </li>
        <li>Acesse a aplicação em <a href="http://localhost:5173">http://localhost:5173</a>.</li>
    </ol>

   <h3>Testes</h3>
    <p>Para rodar os testes end-to-end com Cypress (Necessário servidor back-end e front-end rodando):</p>
    <pre><code>npm run cypress:run
# ou
yarn cypress:run
</code></pre>
