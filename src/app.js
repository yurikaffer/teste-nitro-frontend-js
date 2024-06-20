document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');
    const messageDiv = document.getElementById('message');
    const submitButton = document.getElementById('submit-button');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nome = form.nome.value;
        const email = form.email.value;
        const senha = form.senha.value;
        const confirmacaoSenha = form.confirmacaoSenha.value;

        // Limpa as mensagens
        clearValidationMessages();
        clearMessage(messageDiv);

        if (!validateFields(nome, email, senha, confirmacaoSenha)) {
            return;
        }

        try {
            
            // Exibe o loading
            showLoading(messageDiv);
            //Desabilita o botão de submit para evitar mais de uma requisição
            disableButton(submitButton);

            const payload = { nome, email, senha, confirmacaoSenha };

            const response = await fetch('/api', {
                method: 'POST',
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            // Remove o loading e habilita o botão
            removeLoading(messageDiv);
            enableButton(submitButton);

            if (data.erro) {
                handleError(data);
            } else {
                showSuccess(messageDiv)
                clearFormValues(form)
            }

        } catch (error) {
            removeLoading(messageDiv);
            enableButton(submitButton);
            console.error(error)
        }
    });
});

function validateFields(nome, email, senha, confirmacaoSenha) {
    let isValid = true;

    // Validação do nome
    if (!nome) {
        showError('nome', 'Insira seu nome completo');
        isValid = false;
    }

    // Validação do email
    if (!email || !validateEmail(email)) {
        showError('email', 'Insira um e-mail válido');
        isValid = false;
    }

    // Validação da senha
    if (!validatePassword(senha)) {
        showError('senha', 'A senha deve ter pelo menos 8 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 número.');
        isValid = false;
    }

    // Validação da confirmação da senha
    if (confirmacaoSenha !== senha) {
        showError('confirmacaoSenha', 'A confirmação de senha deve corresponder à senha.');
        isValid = false;
    }

    return isValid
}

// Pelo menos 8 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 número
function validatePassword(senha) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(senha);
}

// Verifica se o email é válido
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function showSuccess(messageDiv) {
    messageDiv.style.display = 'block';
    messageDiv.textContent = 'Usuário registrado com sucesso!';
    messageDiv.style.color = '#28a745';
}

function showError(field, message) {
    const input = document.getElementById(field);
    const messageDiv = document.getElementById(`message-${field}`);
    input.style.borderColor = '#dc3545';
    messageDiv.textContent = message;
    messageDiv.style.color = '#dc3545';
}

function clearValidationMessages() {
    const fields = ['nome', 'email', 'senha', 'confirmacaoSenha'];
    fields.forEach(field => {
        const input = document.getElementById(field);
        const messageDiv = document.getElementById(`message-${field}`);
        input.style.borderColor = '';
        messageDiv.textContent = '';
    });
}

function clearMessage(messageDiv) {
    messageDiv.textContent = '';
}

function clearFormValues(form) {
    form.reset();
}

function handleError(data) {
    if (data.tipoErro === 'USUARIO_EXISTENTE') {
        showError('email', 'E-mail já cadastrado.');
    } else {
        showError(data.nomeCampo, 'Campo inválido.');
    }
}

function showLoading(messageDiv) {
    messageDiv.style.display = 'block';
    messageDiv.innerHTML = '<div class="loading"></div>';
}

function removeLoading(messageDiv) {
    messageDiv.innerHTML = '';
}

function disableButton(button) {
    button.disabled = true;
    button.style.background = 'gray'
}

function enableButton(button) {
    button.disabled = false;
    button.style.background = '#3a6fe9'
}