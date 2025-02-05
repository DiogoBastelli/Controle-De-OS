document.addEventListener('DOMContentLoaded', function () {
    
    const formulario = document.getElementById('cadastroClienteF')
    const todosClientes = document.getElementById('TodosClientes')
    const telaPesquisaCliente = document.getElementById('telaPesquisaCliente')

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
                   <td colspan="4">
                    <div class="shadow rounded-4 mb-2 mt-2 border border-black p-4 letras d-flex align-items-center">
                        <div class="me-5"> 
                            <span class="ms-3">${cliente.id}</span>
                            <span class="ms-5">${cliente.nome}</span>
                            <span class="ms-5">${cliente.cpf}</span>
                            <span class="ms-5">${cliente.endereco}</span>
                            <span class="ms-5">${cliente.telefone}</span>
                        </div>
                    </div>
                </td>
                `;
                tabelaResultPesquCliente.appendChild(novaLinhaPesquisa);
            
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Ocorreu um erro ao carregar os dados do produto.');
            });
    }

    //botao para aparecer o formulario de cadastro do cliente
    const btnAparecerFormCliente = document.getElementById('abrirFormCadastroCliente');
    if(btnAparecerFormCliente){
        btnAparecerFormCliente.addEventListener('click' , function(event){
            formulario.style.display = 'block';
            todosClientes.style.display = 'none';
            telaPesquisaCliente.style.display = 'none'
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
                todosClientes.style.display = 'block'
                formulario.style.display = 'none';
                carregarClientes();
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Ocorreu um erro ao cadastrar o cliente.'); // Mensagem de erro
            });   
        });
    }

    //icone de pesquisa
    const iconePesquisa = document.getElementById('iconePesquisarCliente');
    if (iconePesquisa) {
        iconePesquisa.addEventListener('click', function(event) {
            const idPesquisaCliente = document.getElementById('inputIdCliente').value;
            console.log(idPesquisaCliente);

            pesquisarCliente(idPesquisaCliente); 

            const clienteEncontrado = true; 
            if (clienteEncontrado) {
                telaPesquisaCliente.style.display = 'block';
                todosClientes.style.display = 'none';
            } else {
                alert("Cliente não encontrado!");
            }
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
                <td colspan="4">
                    <div class="shadow rounded-4 mb-2 mt-2 border border-black p-4 letras d-flex align-items-center">
                        <div class="me-5"> 
                            <span class="ms-3">${cliente.id}</span>
                            <span class="ms-5">${cliente.nome}</span>
                            <span class="ms-5">${cliente.cpf}</span>
                            <span class="ms-5">${cliente.endereco}</span>
                            <span class="ms-5">${cliente.telefone}</span>
                        </div>
                    </div>
                </td>
                    
                `;
                tabelaClientes.appendChild(novaLinha);
            });
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao carregar a lista de clientes.');
        });
}




document.addEventListener('DOMContentLoaded', carregarClientes);

