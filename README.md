# Documentação da API

## Visão Geral

Esta documentação cobre os endpoints e métodos HTTP disponíveis na API.

## Endpoints Disponíveis

### `/register`

- **Método**: POST
- **Descrição**: Cria uma nova conta de usuário.
- **Payload**: 
  - `email`: [String] O email do usuário desejado.
  - `password`: [String] A senha para a conta.

### `/login`

- **Método**: POST
- **Descrição**: Autentica um usuário e retorna um token.
- **Payload**: 
  - `email`: [String] O email do usuário.
  - `password`: [String] A senha do usuário.

### `/items`

- **Método**: POST
- **Descrição**: Adiciona um novo item.
- **Payload**: 
  - `name`: [String] Nome do item.
  - `description`: [String] Descrição do item.

- **Método**: GET
- **Descrição**: Retorna a lista de todos os itens.

- **Método**: PUT
- **Descrição**: Atualiza um item existente.
- **Payload**: 
  - `id`: [String] ID do item.
  - `name`: [String] Novo nome do item.
  - `description`: [String] Nova descrição do item.

- **Método**: DELETE
- **Descrição**: Remove um item.
- **Payload**: 
  - `id`: [String] ID do item a ser removido.

### `/users`

- **Método**: GET
- **Descrição**: Retorna as informações do usuário criado.

## Por que Escolhi Microserviços?

### Vantagens:

1. **Escalabilidade**: Escalar cada serviço independentemente.
2. **Flexibilidade**: Uso de diferentes tecnologias para cada serviço.
3. **Resiliência**: Falhas em um serviço não derrubam o sistema inteiro.
4. **Implantação Mais Rápida**: Facilita e agiliza desenvolvimento, teste e implantação.
5. **Encapsulamento**: Fronteiras claras e melhor separação de responsabilidades.
6. **Velocidade de Desenvolvimento**: Desenvolvimento de recursos mais rapidamente e resposta eficiente a problemas.

### Visão Geral da Arquitetura:

+---------------------+
| Aplicativo Frontend |
+---------------------+
           |
           v
+---------------------+
|      Gateway        |
+---------------------+
           |
           v
+-------+----+--------+----+---------+----+
| Items | Mailer | Permission | Token| User |
+-------+----+--------+----+---------+----+


### Microserviços:

- **Gateway**: Ponto de entrada para todas as solicitações.
- **Items**: Lida com tudo relacionado a itens.
- **Mailer**: Dedicado ao envio de e-mails e notificações.
- **Permission**: Administra permissões dos usuários.
- **Token**: Autenticação e geração de tokens.
- **User**: Gerencia registro de usuários, login, etc.
- **DB (MongoDB)**: Armazena e recupera dados de vários serviços.

### Redes:

- **Backend**: Permite que todos os serviços se comuniquem entre si.
- **Frontend**: Conecta o aplicativo frontend ao serviço Gateway.
