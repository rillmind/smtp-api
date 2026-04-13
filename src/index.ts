import { Elysia, t } from "elysia";
import nodemailer from "nodemailer";
import "dotenv/config";
import openapi from "@elysiajs/openapi";
import logixlysia from "logixlysia";

const app = new Elysia();

app.use(logixlysia());
app.use(openapi());

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "raulzc00@gmail.com",
    pass: process.env.PASS,
  },
});

app.post(
  "/mail/send",
  async ({ body }) => {
    try {
      await transporter.sendMail({
        from: "raulzc00@gmail.com",
        to: body.to,
        subject: body.subject,
        text: body.text,
      });

      return { success: true, message: "Email enviado com sucesso!" };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  },
  {
    body: t.Object({
      to: t.String(),
      subject: t.String(),
      text: t.String(),
    }),
  },
);

app.listen(3000);
