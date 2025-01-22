//botao para cadastrar o Os
const btnCadastrarOs = document.getElementById('cadastrarOs')
if(btnCadastrarOs){
    btnCadastrarOs.addEventListener('click', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do botão]
        const idCliente = document.getElementById('inputIdCliente').value
        const idProduto = document.getElementById('inputIdProd').value
        pesquisarProduto(idProduto)
        pesquisarCliente(idCliente)
    });
}

function pesquisarCliente(idCliente) {
    fetch(`http://localhost:3000/api/cliente/${idCliente}`) 
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao adicionar cliente');
            }
            return response.json();
        })
        .then(Os => {
            console.log("cliente retornado da API:", Os); 
            const cliente = Os[0];
        
            const tabelaResultPesquCliente = document.getElementById('os-list');
            if (!tabelaResultPesquCliente) {
                console.error("Tabela 'os-list' não encontrada.");
                return;
            }

            const novaLinhaPesquisa = document.createElement('tr');
            novaLinhaPesquisa.innerHTML = `
                <td>${cliente.id}</td>
                <td>${cliente.nome}</td>
                
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

function pesquisarProduto(idProduto) {
    fetch(`http://localhost:3000/api/produto/${idProduto}`) 
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao adicionar produto');
            }
            return response.json();
        })
        .then(produtos => {
            console.log("Produto retornado da API:", produtos); 
            const produto = produtos[0];
        
            const tabelaResultadoPesquisa = document.getElementById('os-list');
            if (!tabelaResultadoPesquisa) {
                console.error("Tabela 'os-list' não encontrada.");
                return;
            }

            const novaLinhaPesquisa = document.createElement('tr');
            novaLinhaPesquisa.innerHTML = `
                <td>${produto.id}</td>
                <td>${produto.modelo}</td>
            `;
            tabelaResultadoPesquisa.appendChild(novaLinhaPesquisa);
    
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao carregar os dados do produto.');
        });
    }
