function limparCampos() {
  document.getElementById("logradouro").value = "";
  document.getElementById("bairro").value = "";
  document.getElementById("cidade").value = "";
  document.getElementById("estado").value = "";
}

function mostrarMensagem(msg) {
  document.getElementById("mensagem").innerText = msg;
}

function apenasNumeros(input) {
  input.value = input.value.replace(/\D/g, "");
}

async function buscarCEP() {
  let cep = document.getElementById("cep").value;

  limparCampos();
  mostrarMensagem("");

  if (!/^[0-9]{8}$/.test(cep)) {
    mostrarMensagem("CEP inválido! Digite exatamente 8 números.");
    return;
  }

  try {
    let resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

    if (!resposta.ok) {
      throw new Error("Erro na conexão");
    }

    let dados = await resposta.json();

    if (dados.erro) {
      mostrarMensagem("CEP não encontrado!");
      return;
    }

    document.getElementById("logradouro").value = dados.logradouro;
    document.getElementById("bairro").value = dados.bairro;
    document.getElementById("cidade").value = dados.localidade;
    document.getElementById("estado").value = dados.uf;
  } catch (erro) {
    mostrarMensagem("Falha ao conectar com a API.");
  }
}

document.getElementById("cep").addEventListener("keyup", function () {
  if (this.value.length === 8) {
    buscarCEP();
  }
});

document.getElementById("cep").addEventListener("input", function () {
  apenasNumeros(this);
});
