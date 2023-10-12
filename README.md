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



## Passo a Passo para Executar os Microserviços:

### 1. Preparativos Iniciais:

- **Docker & Docker Compose**: Certifique-se de que o Docker e o Docker Compose estão instalados em sua máquina.
  
- **Diretório Raiz**: Certifique-se de estar no diretório raiz do projeto, onde o `docker-compose.yml` e o `up_docker_compose.sh` estão localizados.

### 2. Configuração de Variáveis de Ambiente:

- Garanta que o arquivo `.env` está no mesmo diretório do `docker-compose.yml` e que ele possui todas as variáveis de ambiente necessárias, como `API_GATEWAY_PORT`, `ITEMS_SERVICE_PORT` e assim por diante.

### 3. Concessão de Permissões de Execução:

- Dê permissão de execução ao script `up_docker_compose.sh` com o seguinte comando:

  ```bash
  chmod +x up_docker_compose.sh
   ```
### 4. Execução do Script:

- Execute o script up_docker_compose.sh para iniciar os microserviços:

   ```bash
   ./up_docker_compose.sh
   ```

### 5. Verifique os Serviços em Execução:

- Verifique se todos os microserviços estão em execução:

   ```bash
   docker-compose ps
   ```

### 7. Documentação Swagger:
- Acesse a documentação da API (se configurada) navegando até /api na porta apropriada.

### 8. Parando os Microserviços:
- Use o seguinte comando para parar os microserviços:
   ```bash
   docker-compose down
   ```