# Por que Escolhi Microserviços?

Decidi estruturar minha aplicação usando uma arquitetura de microserviços pelas seguintes razões:

## Vantagens:

1. **Escalabilidade**: Com microserviços, posso escalar cada serviço independentemente, com base em sua própria demanda.
2. **Flexibilidade**: Cada serviço pode ser desenvolvido, implantado e mantido usando diferentes tecnologias, permitindo-me usar a melhor tecnologia para cada tarefa.
3. **Resiliência**: Se um serviço falhar, ele não derruba o sistema inteiro.
4. **Implantação Mais Rápida**: Uma base de código menor para cada serviço facilita e agiliza o desenvolvimento, teste e implantação.
5. **Encapsulamento**: Cada serviço é responsável por uma função específica, o que garante fronteiras claras e uma melhor separação de responsabilidades.
6. **Velocidade de Desenvolvimento**: Com equipes trabalhando de forma independente em cada serviço, posso desenvolver recursos mais rapidamente e responder a problemas mais eficientemente.

## Visão Geral da Arquitetura:

Considerando a configuração do `docker-compose` que elaborei, a arquitetura pode ser representada da seguinte forma:

+---------------------+
| Aplicativo Frontend |
+---------------------+
|
v
+---------------------+
| Gateway |
+---------------------+
|
v
+-------+----+--------+----+---------+----+
| Items | Mailer | Permission | Token| User |
+-------+----+--------+----+---------+----+


### Microserviços:

- **Gateway**: Atua como o principal ponto de entrada para todas as solicitações e as direciona para o microserviço apropriado.
  
- **Items**: Serviço que criei para lidar com tudo relacionado a itens.

- **Mailer**: Este serviço é dedicado ao envio de e-mails e notificações.

- **Permission**: Administra as permissões dos usuários.

- **Token**: Responsável pela autenticação e geração de tokens.

- **User**: Gerencia o registro de usuários, login e outras funcionalidades relacionadas.

- **DB (MongoDB)**: Banco de dados que escolhi para armazenar e recuperar dados de vários serviços. Alguns, como 'items' e 'token', têm dependências diretas deste serviço.

### Redes:

- **Backend**: Uma rede que permite que todos os serviços se comuniquem entre si.
  
- **Frontend**: Uma rede que conecta o aplicativo frontend ao serviço Gateway.

Optei por conterizar cada serviço, garantindo isolamento e que eles tenham tudo o que precisam para funcionar. A utilização do `docker-compose` facilita a orquestração e gestão destes containers.

---