import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: "erro", message: "Método não permitido." });
  }

  const { nome, email, telefone, pedido, total } = req.body;

  if (!nome || !email || !telefone || !pedido || !total) {
    return res.status(400).json({ status: "erro", message: "Campos obrigatórios ausentes." });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Testar conexão SMTP opcionalmente aqui (pode ser removido em produção)
  // await transporter.verify();

  const gerarPdfBuffer = ({ nome, email, telefone, pedido, total }) => {
    return new Promise((resolve) => {
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      const buffers = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => resolve(Buffer.concat(buffers)));

      doc.fontSize(20).text("Resumo do Pedido - Consultoria JP", { align: "center" });
      doc.moveDown();
      doc.fontSize(14).text(`Nome: ${nome}`);
      doc.text(`Email: ${email}`);
      doc.text(`Telefone: ${telefone}`);
      doc.moveDown();

      pedido.forEach((item, idx) => {
        doc.text(`${idx + 1}. ${item.nome} - Quantidade: ${item.quantidade} - Subtotal: R$ ${item.preco.toFixed(2)}`);
      });

      doc.moveDown();
      doc.fontSize(16).text(`Total: R$ ${total.toFixed(2)}`, { bold: true });

      doc.end();
    });
  };

  try {
    const pdfBuffer = await gerarPdfBuffer({ nome, email, telefone, pedido, total });

    const emailDoJP = process.env.SMTP_CC;

    const corpoPedido = pedido.map(
      (item, i) =>
        `${i + 1}. ${item.nome} - Qtd: ${item.quantidade} - R$ ${item.preco.toFixed(2)}`
    ).join("\n");

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

    return res.status(200).json({ status: "sucesso", message: "Email enviado com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return res.status(500).json({ status: "erro", message: "Erro ao enviar e-mail." });
  }
}
