document.getElementById('insertButton').addEventListener('click', function(event) {
    event.preventDefault(); // Evita o comportamento padrão do botão

    const nome = document.getElementById('inputNome').value;
    const email = document.getElementById('inputEmail3').value;
    const endereco = document.getElementById('inputEndereco').value;
    const bairro = document.getElementById('inputBairro').value;

    // Chamada à API para enviar os dados
    fetch('http://localhost:3000/api/cliente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, endereco, bairro })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na resposta da rede');
        }
        return response.json();
    })
    .then(data => {
        console.log('Sucesso:', data);
        alert('Cliente cadastrado com sucesso!'); // Mensagem de sucesso

        // Limpar o formulário
        document.getElementById('cadastro-form').reset();

        // Recarregar a tabela com todos os clientes
        carregarClientes();
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao cadastrar o cliente.'); // Mensagem de erro
    });
});

document.getElementById('deleteButton').onclick = async function() {
    const clienteId = prompt("Digite o ID do cliente que deseja deletar:"); // Solicita o ID do cliente
    if (clienteId) {
        const confirmDelete = confirm('Tem certeza que deseja deletar este cliente?');
        if (confirmDelete) {
            await deleteCliente(clienteId); // Chama a função para deletar o cliente
            carregarClientes();
        }
    }
};

async function deleteCliente(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/cliente/${id}`, {
            method: 'DELETE', // Método para deletar
        });

        if (response.ok) {
            alert('Cliente deletado com sucesso!');
            // Aqui você pode adicionar lógica para atualizar a interface, se necessário
        } else {
            alert('Erro ao deletar cliente');
        }
    } catch (error) {
        console.error('Erro ao deletar cliente:', error);
    }
}

// Função para carregar todos os clientes ao carregar a página
function carregarClientes() {
    fetch('http://localhost:3000/api/cliente') // Rota que devolve todos os clientes
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar clientes');
            }
            return response.json();
        })
        .then(clientes => {
            const tabelaClientes = document.getElementById('clientes-list');
            tabelaClientes.innerHTML = ''; // Limpa a tabela antes de preenchê-la

            clientes.forEach(cliente => {
                const novaLinha = document.createElement('tr');
                novaLinha.innerHTML = `
                    <td>${cliente.id}</td>
                    <td>${cliente.nome}</td>
                    <td>${cliente.email}</td>
                    <td>${cliente.endereco}</td>
                    <td>${cliente.bairro}</td>
                    <td><button class="btn btn-info" onclick="preencherFormulario(${cliente.id})">Selecionar</button></td>
                `;
                tabelaClientes.appendChild(novaLinha);
            });
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao carregar a lista de clientes.');
        });
}

// Função para preencher o formulário com os dados do cliente selecionado
function preencherFormulario(clienteId) {
    fetch(`http://localhost:3000/api/cliente/${clienteId}`) // Supondo que essa rota retorne um cliente específico pelo ID
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar cliente');
            }
            return response.json();
        })
        .then(cliente => {
            // Preenche os campos do formulário com os dados do cliente
            document.getElementById('inputNome').value = cliente.nome;
            document.getElementById('inputEmail3').value = cliente.email;
            document.getElementById('inputEndereco').value = cliente.endereco;
            document.getElementById('inputBairro').value = cliente.bairro;

            // Adiciona um atributo de ID ao formulário para saber que cliente está sendo editado
            document.getElementById('cadastro-form').setAttribute('data-cliente-id', cliente.id);
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao carregar os dados do cliente.');
        });
}

// Chama a função para carregar os clientes quando a página for carregada
document.addEventListener('DOMContentLoaded', carregarClientes);

