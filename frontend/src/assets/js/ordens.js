//botao para cadastrar o Os
const btnCadastrarOs = document.getElementById('cadastrarOs')
if(btnCadastrarOs){
    btnCadastrarOs.addEventListener('click', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do botão]
        
        const defeito = document.getElementById('inputDefeitoProd').value;

        // Chamada à API para cadastrar o cliente
        fetch('http://localhost:3000/api/cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ defeito })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta da rede');
            }
            return response.json();
        })
        .then(data => {
            console.log('Sucesso:', data);
            alert('defeito cadastrado com sucesso!'); // Mensagem de sucesso

            // Limpar o formulário
            document.getElementById('cadastroOs').reset();

            // Recarregar a tabela com todos os Os
            carregarOs();
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao cadastrar o defeito.'); // Mensagem de erro
        });   
    });
}

function pesquisarCliente(idPesquisaCliente) {
    fetch(`http://localhost:3000/api/cliente/${idPesquisaCliente}`) 
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao adicionar cliente');
            }
            return response.json();
        })
        .then(Os => {
            console.log("cliente retornado da API:", Os); 
            const cliente = Os[0];
        
            const tabelaResultPesquCliente = document.getElementById('resultOs-list');
            if (!tabelaResultPesquCliente) {
                console.error("Tabela 'resultOs-list' não encontrada.");
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
