import email from "infra/email";
import orchestrator from "tests/orchestrator";

beforeAll(async () => await orchestrator.waitForAllServices);

describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmails();

    await email.send({
      from: "Muxta <contato@muxta.com.br>",
      to: "contato@test.com",
      subject: "Teste de assunto",
      text: "Teste de corpo.",
    });

    await email.send({
      from: "Muxta <contato@muxta.com.br>",
      to: "contato@test.com",
      subject: "Último email enviado",
      text: "Corpo do último email enviado.",
    });

    const lastEmail = await orchestrator.getLastEmail();
    expect(lastEmail.sender).toBe("<contato@muxta.com.br>");
    expect(lastEmail.recipients[0]).toBe("<contato@test.com>");
    expect(lastEmail.subject).toBe("Último email enviado");
    expect(lastEmail.text).toBe("Corpo do último email enviado.\r\n");
  });
});
