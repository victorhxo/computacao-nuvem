# Computação em Nuvem - GCC180

Trabalho prático da disciplina de Computação em Nuvem com o objetivo de implementar um sistema básico de CRUD e subir a aplicação para a nuvem utilizando a Amazon Web Services (AWS). Era necessário utilizar o serviço de banco de dados RDS e o serviço de computação EC2. O serviço de banco de dados deveria ser acessado apenas pela instância EC2, enquanto o serviço de computação deveria ser acessado pela internet.

---

## Criar uma instância do EC2

Para iniciar uma instância do EC2:

1. **Acesse o AWS Management Console**:

   - Abra o console do Amazon EC2 em [https://console.aws.amazon.com/ec2/](https://console.aws.amazon.com/ec2/).

2. **Escolha a Região da AWS**:

   - No canto superior direito, selecione a Região onde deseja criar a instância do EC2.

3. **Inicie a instância**:

   - No painel do EC2, clique em **"Executar instância"**.

4. **Configure as opções**:

   - **Nome e etiquetas**: No campo "Nome", insira `nome-da-sua-instancia`.
   - **Imagens de aplicações e sistemas operacionais**: Selecione "Amazon Linux" e, depois, "AMI do Amazon Linux 2023". Mantenha as opções padrão nas outras seções.
   - **Tipo de instância**: Escolha `t2.micro`.
   - **Par de chaves (login)**: Selecione um par de chaves existente ou crie um novo, se necessário.
   - **Configurações de rede**: Defina os valores conforme abaixo e mantenha os outros valores padrão:
     - Para "Permitir tráfego SSH de", escolha "Meu IP".
     - Ative "Permitir tráfego HTTPs da Internet".
     - Ative "Permitir tráfego HTTP da Internet".

5. **Finalize a criação**:

   - Revise o resumo da configuração e clique em **"Iniciar instância"**.

6. **Anote o identificador da instância**:

   - Na página de status, anote o identificador da nova instância (por exemplo: `i-1234567890abcdef0`).

7. **Verifique os detalhes da instância**:

   - Selecione a instância e anote o "DNS IPv4 público" e o nome do par de chaves.

8. **Aguarde a instância estar "Em execução"**.

---

## Criar uma instância de banco de dados do Amazon RDS

Para criar uma instância de banco de dados no Amazon RDS:

1. **Acesse o AWS Management Console**:

   - Abra o console do Amazon RDS em [https://console.aws.amazon.com/rds/](https://console.aws.amazon.com/rds/).

2. **Escolha a Região da AWS**:

   - No canto superior direito, verifique se é a mesma em que você criou a instância do EC2.

3. **Inicie a criação do banco de dados**:

   - No painel de navegação, escolha **"Bancos de dados"** e clique em **"Criar banco de dados"**.

4. **Configure o banco de dados**:

   - **Criação padrão**: Selecione esta opção.
   - **Opções do mecanismo**: Escolha `seu-banco-de-dados` (MariaDB, MySQL ou PostgreSQL).
   - **Modelos**: Escolha "Nível gratuito".
   - **Disponibilidade e durabilidade**: Mantenha as opções padrão.

5. **Defina as configurações**:

   - **Identificador da instância de banco de dados**: Digite `nome-do-seu-db`.
   - **Nome de usuário principal**: Digite `nome-do-seu-user`.
   - **Senha principal**: Desative a geração automática e digite a senha desejada.
   - **Confirmar senha**: Digite a senha novamente.

6. **Configuração da instância**:

   - **Classes com capacidade de intermitência**: Selecione `db.t3.micro`.

7. **Armazenamento**:

   - Remova a opção de autoescala e mantenha as configurações padrão.

8. **Conectividade**:

   - **Recurso de computação**: Escolha "Conectar-se a um recurso de computação do EC2".
   - **Instância do EC2**: Selecione a instância criada anteriormente (`nome-da-sua-instancia`).

9. **Autenticação de banco de dados**:

   - Verifique se a autenticação de senha está selecionada.

10. **Configuração adicional**:

    - **Nome do banco de dados inicial**: Insira `sample`.

11. **Finalize a criação**:

    - Clique em **"Criar banco de dados"** e aguarde o status ser "Disponível".

12. **Anote o Endpoint e a Porta**:
    - Na seção "Conectividade e segurança", anote essas informações para conectar o servidor web.

---

## Configurar o servidor web

Para configurar o servidor web:

1. **Conecte-se à instância do EC2 via SSH**:

   - Conecte-se usando o console do EC2 no AWS Management Console ou via terminal.

2. **Atualize o sistema operacional**:

   ```bash
   sudo yum update -y
   ```

3. **Instale o Git**:

   ```bash
   sudo yum install git -y
   ```

4. **Instale o Node.js ou outras dependências necessárias**:

   ```bash
   sudo yum install nodejs -y
   sudo yum install yarn -y
   ```

5. **Clone o repositório**:

   ```bash
   git clone "https://github.com/usuario/repositorio.git"
   ```

6. **Entre no diretório do projeto**:

   ```bash
   cd repositorio
   ```

7. **Instale as dependências**:

   ```bash
   yarn install
   ```

8. **Configure as variáveis de ambiente**:

   ```bash
   cp .env.example .env
   ```

9. **Edite o arquivo `.env` e insira as informações necessárias**.

10. **Inicie o servidor**:

    ```bash
    yarn start
    ```

11. **Acesse o servidor web via navegador**:

    - Utilize o DNS IPv4 público da instância do EC2.

12. **Verifique a conexão com o banco de dados e o funcionamento da aplicação**.

---

## Rodar a aplicação mesmo após fechar a conexão SSH

Para garantir que a aplicação continue rodando após fechar a conexão SSH, use o `systemd`:

1. **Crie um arquivo de serviço**:

   ```bash
   sudo nano /etc/systemd/system/nome-do-servico.service
   ```

2. **Insira o conteúdo**:

   ```ini
   [Unit]
   Description=Nome do serviço
   After=network.target

   [Service]
   User=ec2-user
   WorkingDirectory=/home/ec2-user/repositorio
   ExecStart=/usr/bin/yarn start
   Restart=always
   Environment=NODE_ENV=production
   EnvironmentFile=/home/ec2-user/repositorio/.env
   StandardOutput=syslog
   StandardError=syslog
   SyslogIdentifier=backend

   [Install]
   WantedBy=multi-user.target
   ```

3. **Recarregue o `systemd`**:

   ```bash
   sudo systemctl daemon-reload
   ```

4. **Inicie o serviço**:

   ```bash
   sudo systemctl start nome-do-servico
   ```

5. **Ative o serviço para iniciar na inicialização**:

   ```bash
   sudo systemctl enable nome-do-servico
   ```

6. **Verifique o status do serviço**:

   ```bash
   sudo systemctl status nome-do-servico
   ```

7. **Verifique se a aplicação está rodando corretamente**.

---

## Referências

- [Deploying Full-Stack Apps to AWS EC2](https://www.sammeechward.com/deploying-full-stack-js-to-aws-ec2)
- [Crie um servidor Web e uma instância de banco de dados do Amazon RDS](https://docs.aws.amazon.com/pt_br/AmazonRDS/latest/UserGuide/TUT_WebAppWithRDS.html)
