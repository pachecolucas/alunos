import mysql from "mysql2/promise";

// export const dynamic = "force-dynamic"; // testa a cada requisição, sem cache

export default async function Home() {
  console.log("Olá");
  let alunos = [];

  let resultado: string;

  try {
    const conn = await mysql.createConnection({
      host: "db.eliti.com.br",
      port: 3306,
      database: "db_seunome",
      user: "db_seunome",
      password: "SUA_SENHA_AQUI",
      connectTimeout: 10_000,
    });

    const [rows] = await conn.query("SELECT id, nome, idade FROM `aluno`");
    await conn.end();

    alunos = rows as any[];
    console.log(alunos);
    resultado = JSON.stringify(alunos);
    console.log("Conexão OK:", alunos);
  } catch (err: any) {
    resultado = `Erro: ${err?.code ?? ""} ${err?.message ?? err}`;
    console.error("Falha na conexão:", err);
  }

  return (
    <div>
      <p>Hello world!</p>
      <p>{resultado}</p>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>nome</th>
            <th>idade</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.nome}</td>
              <td>{a.idade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
