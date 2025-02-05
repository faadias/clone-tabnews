const { exec } = require("node:child_process");

const checkIntervalMillis = 200;

function checkPostgres() {
  //A opção --host localhost força o teste via TCP/IP; do contrário, o teste
  //é feito por Socket UNIX, o que retorna que está pronto, mas a conexão das
  //migrations falha
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);
}
function handleReturn(_error, stdout, _stderr) {
  const postgresIsAcceptingConnections =
    stdout.search("accepting connections") !== -1;

  if (!postgresIsAcceptingConnections) {
    process.stdout.write(".");
    setTimeout(checkPostgres, checkIntervalMillis);
    return;
  }

  console.log("\n\n🟢 PostgreSQL está aceitando conexões!\n");
}

(() => {
  process.stdout.write("\n\n🔴 Aguardando o PostgreSQL aceitar conexões...");
  checkPostgres();
})();
