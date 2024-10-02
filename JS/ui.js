// Obtém a referência ao corpo da tabela de compras e ao elemento do resumo
const purchaseList = document.getElementById('purchaseList').getElementsByTagName('tbody')[0];
const summary = document.getElementById('summary');

// Carrega as compras armazenadas e atualiza a lista, o resumo e os filtros
let purchases = loadPurchases();
updatePurchaseList();
updateSummary();
updateLocationFilter();

// Função para atualizar a lista de compras
function updatePurchaseList(filteredPurchases = purchases) {
    // Limpa o conteúdo atual da tabela
    purchaseList.innerHTML = '';
    
    // Adiciona cada compra na tabela
    filteredPurchases.forEach((purchase, index) => {
        const row = purchaseList.insertRow(); // Insere uma nova linha na tabela
        row.innerHTML = `
            <td>${purchase.item}</td>
            <td>R$ ${purchase.value.toFixed(2)}</td>
            <td>${purchase.location}</td>
            <td>${new Date(purchase.date).toLocaleDateString()}</td>
            <td>${purchase.paymentMethod}</td>
            <td><button class="button-excluir" onclick="deletePurchase(${index})">Excluir</button></td>
        `;
    });
}

// Função para excluir uma compra com base no índice
function deletePurchase(index) {
    purchases.splice(index, 1); // Remove a compra do array
    savePurchases(purchases); // Salva o array atualizado no armazenamento local
    updatePurchaseList(); // Atualiza a lista de compras
    updateSummary(); // Atualiza o resumo
    updateLocationFilter(); // Atualiza os filtros de localização
}

// Função para atualizar o resumo das compras
function updateSummary(filteredPurchases = purchases) {
    const totalItems = filteredPurchases.length; // Conta o número total de compras
    const totalValue = filteredPurchases.reduce((sum, purchase) => sum + purchase.value, 0); // Soma o valor total das compras
    
    // Atualiza o texto do resumo com a quantidade e o valor total
    summary.innerText = `Total de Itens: ${totalItems} | Valor Total: R$ ${totalValue.toFixed(2)}`;
}

// Função para atualizar o filtro de localização com locais únicos das compras
function updateLocationFilter() {
    const locationFilter = document.getElementById('locationFilter');
    
    // Cria um conjunto de locais únicos usando um Set
    const uniqueLocations = [...new Set(purchases.map(p => p.location))];

    // Adiciona a opção padrão ao filtro
    locationFilter.innerHTML = '<option value="">Todos os locais</option>';
    
    // Adiciona cada local único como uma opção no filtro
    uniqueLocations.forEach(location => {
        const option = document.createElement('option');
        option.value = location; // Define o valor da opção
        option.textContent = location; // Define o texto da opção
        locationFilter.appendChild(option); // Adiciona a opção ao filtro
    });
}
