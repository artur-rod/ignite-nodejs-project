# Cadastro de carro
### **- Requisitos Funcionais:**

Deve ser possível cadastrar um novo carro

### **- Regras de negócio:**

Não deve ser possível cadastrar um carro com uma placa já existente
O carro deve ser cadastrado, por padrão, com disponibilidade (available = true)
* Somente usuários administradores podem criar carros

# Listagem de carros
### **- Requisitos Funcionais:**

Deve ser possível listar todos os carros disponíveis
Deve ser possível listar todos os carros disponíveis pela categoria
Deve ser possível listar todos os carros disponíveis pelo nome da marca
Deve ser possível listar todos os carros disponíveis pelo nome do carro

### **- Regras de negócio:**

O usuário não precisa estar logado no sistema para acessar a listagem de carros

# Cadastro de especificações do carro
### **- Requisitos Funcionais:**

Deve ser possível cadastrar uma especificação para um carro

### **- Regras de negócio:**

Não deve ser possível cadastrar uma especificação para um carro não cadastrado
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro
Somente usuários administradores podem criar especificações

# Cadastro de imagens do carro
### **- Requisitos Funcionais:**

Deve ser possível cadastrar imagens do carro
Deve ser possível listar todos os carros

### **- Requisitos Não Funcionais:**

Utilizar o multer para upload dos arquivos

### **- Regras de negócio:**

O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
Somente usuários adminstradores podem cadastrar imagens

# Aluguel de carro
### **- Requisitos Funcionais:**

Deve ser possível cadastrar um aluguel

### **- Regras de negócio:**

O aluguel deve ter duração mínima de 24 horas
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro