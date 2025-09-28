require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit"); 

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Configurar o transporte SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Testar conexão SMTP
transporter.verify((error) => {
  if (error) {
    console.error("Erro na conexão SMTP:", error);
  } else {
    console.log("SMTP conectado com sucesso!");
  }
});

// Função para gerar o PDF como buffer
function gerarPdfBuffer({ nome, email, telefone, pedido, total }) {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    doc
      .fontSize(20)
      .text("Resumo do Pedido - Consultoria JP", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Nome: ${nome}`);
    doc.text(`Email: ${email}`);
    doc.text(`Telefone: ${telefone}`);
    doc.moveDown();

    pedido.forEach((item, idx) => {
      doc.text(
        `${idx + 1}. ${item.nome} - Quantidade: ${
          item.quantidade
        } - Subtotal: R$ ${item.preco.toFixed(2)}`
      );
    });

    doc.moveDown();
    doc.fontSize(16).text(`Total: R$ ${total.toFixed(2)}`, { bold: true });

    doc.end();
  });
}

// Endpoint para receber os dados
app.post("/api/enviar-pedido", async (req, res) => {
  const { nome, email, telefone, pedido, total } = req.body;

  if (!nome || !email || !telefone || !pedido || !total) {
    return res
      .status(400)
      .json({ status: "erro", message: "Campos obrigatórios ausentes." });
  }

  const emailDoJP = process.env.SMTP_CC;

  const corpoPedido = pedido
    .map(
      (item, i) =>
        `${i + 1}. ${item.nome} - Qtd: ${
          item.quantidade
        } - R$ ${item.preco.toFixed(2)}`
    )
    .join("\n");

  const corpoEmail = `
Olá ${nome},

Recebemos seu pedido! Aqui estão os detalhes:

📞 Telefone: ${telefone}
📧 Email: ${email}

🛒 Pedido:
${corpoPedido}

💰 Total: R$ ${total.toFixed(2)}

Entraremos em contato em breve!

Atenciosamente,
Consultoria JP
`;

  try {
    // 🔥 Gerar PDF antes de enviar
    const pdfBuffer = await gerarPdfBuffer({
      nome,
      email,
      telefone,
      pedido,
      total,
    });

    // Enviar e-mail com anexo
    await transporter.sendMail({
      from: `"Consultoria JP" <${process.env.SMTP_USER}>`,
      to: email,
      cc: emailDoJP,
      subject: "Confirmação do seu pedido - Consultoria JP",
      text: corpoEmail,
      attachments: [
        {
          filename: "resumo-pedido.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    res.json({ status: "sucesso", message: "Email enviado com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    res.status(500).json({ status: "erro", message: "Erro ao enviar e-mail." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
