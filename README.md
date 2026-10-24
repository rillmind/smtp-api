# API que envia email

API simples que utiliza da biblioteca nodemailer para enviar emails utilizando do SMTP (simple mails tranfer protocol).

## O que faz

Sobe uma API com [Elysia](https://elysiajs.com) na porta `3000` com uma rota, `POST /mail/send`,
que recebe `{"to", "subject", "text"}` e envia o e-mail pelo SMTP do Gmail
(`smtp.gmail.com:465`). Responde `{"success": true, ...}` ou `{"success": false, "error": ...}`.
O corpo é validado: faltando campo, a resposta é 422. A documentação OpenAPI fica em
`http://localhost:3000/openapi`.

O remetente (`raulzc00@gmail.com`) está fixo em `src/index.ts`. Para usar outra conta, troque
`auth.user` e `from` ali.

## Por que existe

Foi um estudo para experimentar o envio de e-mail por SMTP com Bun e nodemailer.

## Getting Started

To get started with this template, simply paste this command into your terminal:

```bash
bun start
```

Open http://localhost:3000/ with your browser to see the result.

Obs: O PASS que está no .env não é senha da conta do google ou email. Precisa gerar um app-password. Para contas do google o app-password é gerado nesse link: https://myaccount.google.com/apppasswords

## Instalação

Pré-requisitos: [Bun](https://bun.sh) 1.3+ e uma senha de app da conta Gmail do remetente (veja a
observação acima).

```bash
git clone https://github.com/rillmind/smtp-api.git
cd smtp-api
bun install
echo 'PASS=sua-senha-de-app' > .env
bun start
```

A raiz `http://localhost:3000/` responde 404, porque não há rota nela; use `/openapi` ou a rota de
envio.

## Como testar

Não há testes automatizados (`bun run test` só imprime "no test specified"). Com a API rodando:

```bash
curl -X POST localhost:3000/mail/send -H 'content-type: application/json' \
  -d '{"to":"voce@exemplo.com","subject":"Teste","text":"Olá!"}'
```

Com uma senha de app válida, a resposta é `{"success":true,"message":"Email enviado com sucesso!"}`
e o e-mail chega ao destinatário. Com a senha errada, a resposta é `"success": false` com
`Invalid login: 535-5.7.8 Username and Password not accepted`. Enviar `{}` devolve 422.
