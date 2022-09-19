# Váriaveis de ambiente:

As váriaveis de ambiente estão definidas dentro do .env utilizando as credenciais das minhas contas do mongo e aws. Sendo elas: MONGO_URL, AWS_ACCESS_KEY_ID e AWS_SECRET_ACCESS_KEY.

# Para fazer deploy:

serverless deploy

# Para rodar os testes:

npm test

# Organização do diretório:

O schema da entidade funcionário(employee) está definida dentro de src/models/Employee.
As rotas de inserção, deleção, recuperação e alteração do banco estão definidas dentro de src/routes/employees.
Os testes estão definidos dentro de src/tests.
A função de conexão do banco está definida dentro de src/handler.js.
As configurações dos lambdas serverless AWS estão dentro do serverless.yml.

