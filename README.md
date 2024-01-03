# Bem vindo ao Chat With Anyone!

Olá seja bem vindo(a) ao meu projeto Chat With Anyone, o projeto é um modelo SAAS que permite falar em um chat em diversas linguas com tradução imediata.

---

# Sumário

- [Versões Necessárias](#versões-necessárias)
- [Ferramentas](#ferramentas)
- [Aprendizados](#aprendizados)
- [Instruções para acessar o projeto localmente](#instruções-para-acessar-o-projeto-localmente)
- [A aplicação](#a-aplicação)

# Versões Necessárias
- Node 18.12

# Ferramentas

- Next JS 14.
  - Server Actions
- Firebase
  - Firebase Client
  - Firebase Admin
  - Firebase Translation Extension
  - Firestore
  - Authentication
- Next Auth
- Shadcn UI
- Tailwind CSS
- Stripe
- Zustand
- React Firebase Hooks
- Zod
  
---

# Aprendizados
- Proteção de páginas com middleware no Next JS.
- Conversores do firebase firestore (`withConverter`)
- Dark/Light modes
- Gerenciamento de estados com Zustand
- `Server Actions` são usados em `Server Components`, para ser usado num `Client component` deve ser passado via props.
- Delete recursivo no Firestore (`recursiveDelete`)

## Instruções para acessar o projeto localmente:

1. Clone o repositório
  * `git clone git@github.com:LeoFuna/chat-with-anyone.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd chat-with-anyone`

2. Instale as dependências:
  * `npm install`

3. Crie um arquivo `.env.local` na raiz da aplicação e insira os dados baseando-se no modelo `.env.local.sample`

4. Inicie a aplicação:
  * `npm run dev`

---

# A aplicação

Ela pode ser vista em: [Acessar aplicação](https://chat-with-anyone-two.vercel.app/)

PS: Importante observar que caso queira `simular` uma conta `PRO`, basta no momento de cadastrar o cartão de crédito como:
  1 - Um número inválido como: 4242424242424 (até o máximo)
  2 - Adicionar o resto dos dados com valores válidos mas não necessitando serem reais.

#### Home

![image](https://github.com/LeoFuna/chat-with-anyone/assets/80538553/7cbb7b45-7081-4813-a25e-ab92ddeb2c6e)


