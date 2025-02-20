document.addEventListener('DOMContentLoaded', function () {

    const formularioOs = document.getElementById('FormCadastroOS');
    const tabelaOs = document.getElementById('os-list');
    const TodasOs = document.getElementById('TodasOs')
    const status = 'AguardandoAprovacao';
    const telaPesquisaOs = document.getElementById('divPesquisaOs')

    // clicando em cima da os ja cadastrada
    document.addEventListener('click', function (event) {
        let elemento = event.target.closest('.ordemServico'); // Verifica se clicou em uma OS
        if (elemento) {
            let osId = elemento.closest('.ordemServico').querySelector('span').innerText.trim(); 
            alert('ID da OS: ' + osId);
            
            window.location.href = 'detalhes.html?id=' + osId;

        }
    });
     
    

    // Botão para cadastrar uma nova OS
    const btnCadastrarOs = document.getElementById('cadastrarOs');
    if (btnCadastrarOs) {
        btnCadastrarOs.addEventListener('click', function (event) {
            event.preventDefault(); 

            const clienteId = document.getElementById('inputIdCliente').value;
            const produtoId = document.getElementById('inputIdProd').value;
            const defeito = document.getElementById('inputDefeitoProd').value;
            

            // Chamada à API para cadastrar a OS
            fetch('http://localhost:3000/api/os', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ clienteId, produtoId, defeito , status})
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao cadastrar a OS');
                }
                return response.json();
            })
            .then(data => {
                console.log('Sucesso:', data);
                alert('OS cadastrada com sucesso!'); 

                formularioOs.reset();
                formularioOs.style.display = 'none'
                TodasOs.style.display = 'block'

                carregarOs();
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Ocorreu um erro ao cadastrar a OS.'); 
            });
        });
    }

    // Função para carregar todas as OSs ao carregar a página
    function carregarOs() {
    fetch('http://localhost:3000/api/os') 
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar OSs');
        }
        return response.json();
    })
    .then(oss => {
        tabelaOs.innerHTML = ''; 
        oss.forEach(os => {
            const novaLinha = document.createElement('tr');
            novaLinha.innerHTML = `
                <td colspan="4">
                    <div class="  shadow rounded-4 mb-2 mt-2 border border-black  letras d-flex align-items-center">
                        <div class= "ordemServico me-5 p-4" > 
                            <span class="ms-3">${os.id}</span>
                            <span class="ms-5">${os.clienteNome}</span>
                            <span class="ms-5">${os.produtoModelo}</span>
                            <span class="ms-5">${os.produtoId}</span>
                            <span class="ms-5">${os.defeito}</span>
                            <span class="ms-5 status-text">${os.status}</span>
                        </div>

                        <div class="form-group col-3 ms-auto ms-3 p-4">
                            <select class="form-select status-select" data-os-id="${os.id}">
                                <option value="aguardando-orcamento" ${os.status === 'aguardando-orcamento' ? 'selected' : ''}>Aguardando Orçamento</option>
                                <option value="aprovado" ${os.status === 'aprovado' ? 'selected' : ''}>Aprovado</option>
                                <option value="nao-aprovado" ${os.status === 'nao-aprovado' ? 'selected' : ''}>Não Aprovado</option>
                                <option value="aguardando-aprovacao" ${os.status === 'aguardando-aprovacao' ? 'selected' : ''}>Aguardando Aprovação</option>
                            </select>
                        </div>
                    </div>
                </td>
            `;
            tabelaOs.appendChild(novaLinha);
            const selectElement = novaLinha.querySelector('.status-select');

            function aplicarCor(select, status) {
                select.classList.remove('bg-success', 'bg-danger', 'bg-info', 'bg-warning');

                if (status === 'aprovado') {
                    select.classList.add('bg-success');
                } else if (status === 'nao-aprovado') {
                    select.classList.add('bg-danger');
                } else if (status === 'aguardando-orcamento') {
                    select.classList.add('bg-info');
                } else if (status === 'aguardando-aprovacao') {
                    select.classList.add('bg-warning');
                }
            }

            aplicarCor(selectElement, os.status);

            selectElement.addEventListener('change', function() {
                aplicarCor(this, this.value);
                mudarStatus(this);
            });
        });
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao carregar a lista de OSs.');
    });
    }

    //funcao para mudar status da os
    function mudarStatus(select) {
        const osId = select.getAttribute("data-os-id");
        const status = select.value;
    
        console.log("Alterando OS ID:", osId, "para status:", status);
    
        fetch(`http://localhost:3000/api/os/${osId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao atualizar status da OS');
            }
            return response.json();
        })
        .then(data => {
            console.log("Status atualizado com sucesso:", data);

            const statusElement = select.closest('.shadow').querySelector('.ms-5:last-child');
            if (statusElement) {
                statusElement.textContent = status;
            }
    
            select.classList.remove('bg-success', 'bg-danger', 'bg-info', 'bg-warning');
            if (status === 'aprovado') {
                select.classList.add('bg-success');
                select.querySelector('option[value="aprovado"]').textContent = 'Aprovado';
            } else if (status === 'nao-aprovado') {
                select.classList.add('bg-danger');
                select.querySelector('option[value="nao-aprovado"]').textContent = 'Não Aprovado';
            } else if (status === 'aguardando-orcamento') {
                select.classList.add('bg-info');
                select.querySelector('option[value="aguardando-orcamento"]').textContent = 'Aguardando Orçamento';
            } else if (status === 'aguardando-aprovacao') {
                select.classList.add('bg-warning');
                select.querySelector('option[value="aguardando-aprovacao"]').textContent = 'Aguardando Aprovação';
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao atualizar o status da OS.');
        });
    }

    function pesquisarOs(idPesquisaOs) {
    fetch(`http://localhost:3000/api/os/${idPesquisaOs}`) 
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao adicionar OS');
        }
        return response.json();
    })
    .then(os => {
        console.log("OS retornada da API:", os); 
        const tabelaResultadoPesquisa = document.getElementById('resultPesquisa');
        if (!tabelaResultadoPesquisa) {
            console.error("Tabela 'resultPesquisa' não encontrada.");
            return;
        }

        const novaLinhaPesquisa = document.createElement('tr');
        novaLinhaPesquisa.innerHTML = `
         <td colspan="4">
            <div class="shadow rounded-4 mb-2 mt-2 border border-black p-4 letras d-flex align-items-center">
                <div class="me-5"> 
                    <span class="ms-3">${os.id}</span>
                    <span class="ms-5">${os.clienteNome}</span>
                    <span class="ms-5">${os.produtoModelo}</span>
                    <span class="ms-5">${os.produtoId}</span>
                    <span class="ms-5">${os.defeito}</span>
                    <span class="ms-5">${os.status}</span>
                </div>
            </div>
         </td>
        `;
        tabelaResultadoPesquisa.appendChild(novaLinhaPesquisa);

    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao carregar os dados da OS.');
    });
    }
  
    //icone de pesquisa
    const iconePesquisa = document.getElementById('iconePesquisarOs');
    if (iconePesquisa) {
        iconePesquisa.addEventListener('click', function(event) {
        const idPesquisaOs = document.getElementById('inputIdOs').value;
        console.log(idPesquisaOs);

        if(idPesquisaOs === ''){
            alert('Insira o ID da Ordem ')
            return
        }

        pesquisarOs(idPesquisaOs); 

        const osEncontrado = true; 
        if (osEncontrado) {
        telaPesquisaOs.style.display = 'block';
        TodasOs.style.display = 'none';
        } else {
            alert("os não encontrado!");
        }
    });
    }

    // icone para aparecer formulario
    const iconeAparecerForm = document.getElementById('aparecerFormCadastro')
    if (iconeAparecerForm){
    iconeAparecerForm.addEventListener('click' , function(event){
        TodasOs.style.display = 'none'
        formularioOs.style.display = 'block'
        
    })
    }
  
    //botao para fechar formulario
    const btnFecharForm = document.getElementById('btnFecharFormulario')
    if(btnFecharForm){
    btnFecharForm.addEventListener('click' , function(event){
    formularioOs.style.display = 'none'
    TodasOs.style.display = 'block'
    telaPesquisaOs.style.display = 'none'
    })
    }

    carregarOs()
});
