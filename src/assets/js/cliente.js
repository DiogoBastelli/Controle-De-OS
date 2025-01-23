document.addEventListener('DOMContentLoaded', function () {
    
    const formulario = document.getElementById('cadastroClienteF')

    //botao para realizar a pesquisa de clientes
    const btnPesquisarCliente = document.getElementById('pesquisarCliente')
    if(btnPesquisarCliente){
        btnPesquisarCliente.addEventListener('click' , function(event){
            event.preventDefault(); // Evita o comportamento padrão do botão]
            alert('botao de pesquisaar funcionando')
            const idPesquisaCliente = document.getElementById('inputIdCliente').value
            console.log(idPesquisaCliente)
            pesquisarCliente(idPesquisaCliente);
        })
    }
    //funcao para pesquisar o cliente
    function pesquisarCliente(idPesquisaCliente) {
        fetch(`http://localhost:3000/api/cliente/${idPesquisaCliente}`) 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao adicionar cliente');
                }
                return response.json();
            })
            .then(clientes => {
                console.log("cliente retornado da API:", clientes); 
                const cliente = clientes[0];
            
                const tabelaResultPesquCliente = document.getElementById('resultClientes-list');
                if (!tabelaResultPesquCliente) {
                    console.error("Tabela 'resultClientes-list' não encontrada.");
                    return;
                }
    
                const novaLinhaPesquisa = document.createElement('tr');
                novaLinhaPesquisa.innerHTML = `
                    <td>${cliente.id}</td>
                    <td>${cliente.nome}</td>
                    <td>${cliente.cpf}</td>
                    <td>${cliente.telefone}</td>
                    <td><button class="btn btn-danger btn-sm remover-item">Remover</button></td>
                `;
                tabelaResultPesquCliente.appendChild(novaLinhaPesquisa);
            
                const botaoRemover = novaLinhaPesquisa.querySelector('.remover-item');
                botaoRemover.addEventListener('click', function () {
                    removerItem(botaoRemover);
                });
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Ocorreu um erro ao carregar os dados do produto.');
            });
    }

    //botao para aparecer o formulario de cadastro do cliente
    const btnAparecerFormCliente = document.getElementById('aparecerFormCliente');
    if(btnAparecerFormCliente){
        btnAparecerFormCliente.addEventListener('click' , function(event){
            formulario.style.display = 'block';
        })
    }
    //botao para fechar o formulario
    const btnSumirFormCliente = document.getElementById('fecharFormCliente')
    if(btnSumirFormCliente){
        btnSumirFormCliente.addEventListener('click' , function(event){
            formulario.style.display = 'none';
        })
    }

    //botao para cadastrar o cliente
    const btnCadastrarCliente = document.getElementById('cadastrarCliente')
    if(btnCadastrarCliente){
        btnCadastrarCliente.addEventListener('click', function (event) {
            event.preventDefault(); // Evita o comportamento padrão do botão]
            const nome = document.getElementById('inputNome').value;
            const cpf = document.getElementById('inputCpf').value;
            const endereco = document.getElementById('inputEndereco').value;
            const telefone = document.getElementById('inputTelefone').value;

            // Chamada à API para cadastrar o cliente
            fetch('http://localhost:3000/api/cliente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, cpf, endereco, telefone })
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
                document.getElementById('cadastroClienteF').reset();

                // Recarregar a tabela com todos os clientes
                carregarClientes();
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Ocorreu um erro ao cadastrar o cliente.'); // Mensagem de erro
            });   
        });
    }

});

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
                    <td>${cliente.cpf}</td>
                    <td>${cliente.endereco}</td>
                    <td>${cliente.telefone}</td>
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


// Chama a função para carregar os clientes quando a página for carregada
document.addEventListener('DOMContentLoaded', carregarClientes);

