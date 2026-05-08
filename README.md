# 🛒 SellerOS — Sistema de Gestão de Mini Mercado

Sistema completo para sellers gerenciarem produtos, estoque, vendas e relatórios com autenticação segura e dashboard analítico.

---

## 🧱 Tecnologias

**Backend**
- Python + Flask (API REST)
- SQLAlchemy (ORM)
- JWT Authentication
- Twilio (WhatsApp)
- SQLite

**Frontend**
- React.js + Vite
- React Router DOM
- Fetch API

---

## ⚙️ Como rodar o projeto

### Pré-requisitos
- Python 3.10+
- Node.js 18+
- Conta no [Twilio](https://www.twilio.com)

---

### 🔧 Backend

**1. Clone o repositório**
```bash
[git clone https://github.com/seu-usuario/Projeto-Mini-Mercado-Full-Stack.git](https://github.com/viniciuzff/Projeto-Mini-Mercado-FrontEnd.git)
cd Projeto-Mini-Mercado-FrontEnd
```

**2. Instale as dependências**
```bash
pip install -r requirements.txt
```

**3. Crie o arquivo `.env` na raiz do projeto**
SECRET_KEY=sua_chave_secreta
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_FROM=whatsapp:+14155238886
TWILIO_TO=whatsapp:+55119XXXXXXXX

**4. Inicie o servidor**
```bash
python run.py
```

API disponível em: `http://127.0.0.1:5000`

---

### 🎨 Frontend

**1. Entre na pasta do frontend**
```bash
cd Projeto-Mini-Mercado-FrontEnd
```

**2. Instale as dependências**
```bash
npm install
```

**3. Inicie o servidor**
```bash
npm run dev
```

Frontend disponível em: `http://localhost:5173`

---

## 📡 Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/sellers` | Cadastrar seller |
| POST | `/api/sellers/activate` | Ativar conta |
| POST | `/api/auth/login` | Login |
| GET | `/api/products` | Listar produtos |
| POST | `/api/products` | Criar produto |
| PUT | `/api/products/:id` | Editar produto |
| PATCH | `/api/products/:id/inactivate` | Inativar produto |
| PATCH | `/api/products/:id/activate` | Ativar produto |
| GET | `/api/sales` | Listar vendas |
| POST | `/api/sales` | Registrar venda |
| GET | `/api/dashboard` | Métricas do dashboard |

---

## 🔄 Fluxo do Sistema

1. Seller se cadastra
2. Recebe código via WhatsApp
3. Ativa a conta com o código
4. Faz login e recebe token JWT
5. Cadastra produtos com imagem
6. Registra vendas
7. Visualiza dashboard com métricas

---

## 📊 Regras de Negócio

- Seller só acessa seus próprios dados
- Produto inativo não pode ser vendido
- Estoque nunca pode ficar negativo
- Preço da venda é fixado no momento da venda
- Seller inativo não pode fazer login

---

## 👨‍💻 Desenvolvido por

Vinicius Ferreira, Murillo Souza, Tulio Costa.
