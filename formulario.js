const formulario = document.getElementById('formulario');

// ── Máscaras ──────────────────────────────────────────────

document.getElementById('cpf').addEventListener('input', (e) => {
  let v = e.target.value.replace(/\D/g, '');
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  e.target.value = v;
});

document.getElementById('telefone').addEventListener('input', (e) => {
  let v = e.target.value.replace(/\D/g, '');
  v = v.replace(/^(\d{2})(\d)/, '($1) $2');
  v = v.replace(/(\d{5})(\d{1,4})$/, '$1-$2');
  e.target.value = v;
});

document.getElementById('cep').addEventListener('input', (e) => {
  let v = e.target.value.replace(/\D/g, '');
  v = v.replace(/(\d{5})(\d{1,3})$/, '$1-$2');
  e.target.value = v;
});

// ── API ViaCEP ────────────────────────────────────────────

document.getElementById('cep').addEventListener('blur', function () {
  const cep = document.getElementById('cep').value.replace(/\D/g, '');
  if (cep.length !== 8) return;

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((response) => response.json())
    .then((data) => {
      if (data.erro) {
        alert('CEP não encontrado!');
        return;
      }
      // ✅ preenche os campos aqui dentro
      document.getElementById('rua').value = data.logradouro;
      document.getElementById('bairro').value = data.bairro;
      document.getElementById('cidade').value = data.localidade;
      document.getElementById('estado').value = data.uf;
    });
});

// ── Checkbox S/N ──────────────────────────────────────────

const snCheckbox = document.getElementById('sn');
const numeroInput = document.getElementById('numero');

snCheckbox.addEventListener('change', () => {
  if (snCheckbox.checked) {
    numeroInput.value = 'S/N';
    numeroInput.disabled = true;
  } else {
    numeroInput.value = '';
    numeroInput.disabled = false;
  }
});

// ── Validações ────────────────────────────────────────────

function ValidarNome(nome) {
  return /^[a-zA-ZÀ-ÿ\s]+$/.test(nome);
}

function ValidarCPF(cpf) {
  return cpf.replace(/\D/g, '').length === 11;
}

function ValidarTelefone(telefone) {
  return telefone.replace(/\D/g, '').length === 11;
}

function ValidarCEP(cep) {
  return cep.replace(/\D/g, '').length === 8;
}

function ValidarEstado(estado) {
  if (estado.length !== 2) return false;
  for (let i = 0; i < estado.length; i++) {
    let char = estado[i];
    if (!((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z'))) {
      return false;
    }
  }
  return true;
}

// ── Submit ────────────────────────────────────────────────

function mostrarErro(id, mensagem) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = mensagem;
  el.style.display = 'block';
}

function esconderErro(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = 'none';
}

function validarEGuardarFormulario(event) {
  event.preventDefault();

  // ✅ apenas LENDO os valores dos campos
  const nome = document.getElementById('nome').value.trim();
  const cpf = document.getElementById('cpf').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const cep = document.getElementById('cep').value.trim();
  const rua = document.getElementById('rua').value.trim();
  const numero = document.getElementById('numero').value.trim();
  const complemento = document.getElementById('complemento').value.trim();
  const bairro = document.getElementById('bairro').value.trim();
  const cidade = document.getElementById('cidade').value.trim();
  const estado = document.getElementById('estado').value.trim();

  if (
    !nome ||
    !cpf ||
    !telefone ||
    !cep ||
    !rua ||
    (!snCheckbox.checked && !numero) ||
    !complemento ||
    !bairro ||
    !cidade ||
    !estado
  ) {
    alert('Preencha todos os campos!');
    return;
  }

  if (!ValidarNome(nome)) {
    mostrarErro('nome-error', 'Insira um nome válido!');
    return;
  } else esconderErro('nome-error');
  if (!ValidarCPF(cpf)) {
    mostrarErro('cpf-error', 'Insira um CPF válido!');
    return;
  } else esconderErro('cpf-error');
  if (!ValidarTelefone(telefone)) {
    mostrarErro('telefone-error', 'Insira um telefone válido!');
    return;
  } else esconderErro('telefone-error');
  if (!ValidarCEP(cep)) {
    mostrarErro('cep-error', 'Insira um CEP válido!');
    return;
  } else esconderErro('cep-error');
  if (!ValidarEstado(estado)) {
    mostrarErro('estado-error', 'Insira uma sigla válida! Ex: GO');
    return;
  } else esconderErro('estado-error');

  const dadosFormulario = {
    nome,
    cpf: cpf.replace(/\D/g, ''), // ✅ remove pontuação
    telefone: telefone.replace(/\D/g, ''), // ✅ remove pontuação
    cep: cep.replace(/\D/g, ''), // ✅ remove pontuação
    rua,
    numero: snCheckbox.checked ? 'S/N' : numero, // ✅ S/N se checkbox ativo
    complemento,
    bairro,
    cidade,
    estado,
  };
  localStorage.setItem('dadosFormulario', JSON.stringify(dadosFormulario));

  formulario.reset();
  alert('Formulário enviado com sucesso!');
}

formulario.addEventListener('submit', validarEGuardarFormulario);
