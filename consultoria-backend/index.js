require("dotenv").config(); // importante para ler o .env

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.post("/api/enviar-pedido", async (req, res) => {
  const { nome, email, telefone, pedido, total } = req.body;

  const pedidoTexto = pedido
    .map((item, index) => {
      return `${index + 1}. ${item.nome} - Quantidade: ${
        item.quantidade
      } - Subtotal: R$ ${item.preco.toFixed(2)}`;
    })
    .join("\n");

  const emailBody = `
Olá ${nome},

Recebemos seu pedido com os seguintes detalhes:

${pedidoTexto}

Total: R$ ${total.toFixed(2)}
Telefone para contato: ${telefone}

Obrigado por escolher a Consultoria JP!
  `;

  const mailOptions = {
    from: `"Consultoria JP" <${process.env.SMTP_USER}>`,
    to: email,
    cc: process.env.SMTP_CC,
    subject: "Confirmação do Pedido - Consultoria JP",
    text: emailBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.json({
      status: "sucesso",
      message: "Pedido enviado com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return res
      .status(500)
      .json({ status: "erro", message: "Erro ao enviar e-mail." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
