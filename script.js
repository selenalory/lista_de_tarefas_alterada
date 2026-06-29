/* Seleciona os elementos HTML utilizados pelo sistema. */
const formulario = document.querySelector("#formulario");
const input = document.querySelector("#tarefa");
const lista = document.querySelector("#lista");
const mensagem = document.querySelector("#mensagem");

/* Pede ao servidor a lista de tarefas e desenha na tela. */
async function carregarTarefas() {
  try {
    const resposta = await fetch("/tarefas");
    const tarefas = await resposta.json();

    /* Cria um item na tela para cada tarefa recebida do servidor. */
    tarefas.forEach(function (tarefa) {
      criarItemNaTela(tarefa.texto);
    });
  } catch (erro) {
    /* Se não houver servidor rodando, a lista simplesmente começa vazia. */
    console.log("Servidor não encontrado, a lista começa vazia.");
  }
}

/* Cria visualmente um item de tarefa, com checkbox e botão de remover. */
function criarItemNaTela(texto) {
  const item = document.createElement("li");

  /* Bolinha que marca a tarefa como concluída. */
  const checkbox = document.createElement("span");
  checkbox.classList.add("checkbox");
  checkbox.addEventListener("click", function () {
    item.classList.toggle("concluida");
  });

  /* Texto da tarefa digitado pelo usuário. */
  const textoTarefa = document.createElement("span");
  textoTarefa.classList.add("texto-tarefa");
  textoTarefa.textContent = texto;

  /* Botão para remover a tarefa da lista. */
  const botaoRemover = document.createElement("button");
  botaoRemover.classList.add("btn-remover");
  botaoRemover.textContent = "✕";
  botaoRemover.addEventListener("click", function () {
    item.remove();
  });

  /* Monta o item juntando checkbox, texto e botão de remover. */
  item.appendChild(checkbox);
  item.appendChild(textoTarefa);
  item.appendChild(botaoRemover);

  lista.appendChild(item);
}

/* Executa quando o usuário envia o formulário de cadastro. */
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  /* Lê o texto digitado e remove espaços das extremidades. */
  const texto = input.value.trim();

  /* Não deixa cadastrar tarefa vazia. */
  if (texto === "") {
    mensagem.textContent = "Digite uma tarefa.";
    return;
  }

  mensagem.textContent = "";

  /* Cria o novo item na tela. */
  criarItemNaTela(texto);

  /* Limpa o campo de texto depois do envio. */
  input.value = "";
});

/* Busca a lista assim que a página abre. */
carregarTarefas();