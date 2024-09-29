const purchaseForm = document.getElementById('purchaseForm');
const purchaseList = document.getElementById('purchaseList').getElementsByTagName('tbody')[0];
const summary = document.getElementById('summary');
const applyFilters = document.getElementById('applyFilters');

let purchases = [];

// Adiciona uma compra ao formulário
purchaseForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const item = this[0].value;
    const value = parseFloat(this[1].value);
    const location = this[2].value;
    const date = this[3].value;

    const purchase = { item, value, location, date };
    purchases.push(purchase);
    updatePurchaseList();
    updateSummary();
    updateLocationFilter();
    this.reset();
});

// Aplica os filtros
applyFilters.addEventListener('click', function() {
    const filterLocation = document.getElementById('locationFilter').value;
    const filterMonth = document.getElementById('monthFilter').value;
    const minValue = parseFloat(document.getElementById('minValue').value) || 0;
    const maxValue = parseFloat(document.getElementById('maxValue').value) || Infinity;

    const filteredPurchases = purchases.filter(purchase => {
        const purchaseDate = new Date(purchase.date);
        const purchaseMonth = purchaseDate.getMonth() + 1; // Mês 0-11, então adiciona 1
        return (
            (filterLocation === '' || purchase.location === filterLocation) &&
            (filterMonth === '' || purchaseMonth === parseInt(filterMonth)) &&
            (purchase.value >= minValue && purchase.value <= maxValue)
        );
    });

    updatePurchaseList(filteredPurchases);
    updateSummary(filteredPurchases);
});

// Atualiza a lista de compras na tabela
function updatePurchaseList(filteredPurchases = purchases) {
    purchaseList.innerHTML = '';
    filteredPurchases.forEach(purchase => {
        const row = purchaseList.insertRow();
        row.innerHTML = `
            <td>${purchase.item}</td>
            <td>R$ ${purchase.value.toFixed(2)}</td>
            <td>${purchase.location}</td>
            <td>${new Date(purchase.date).toLocaleDateString()}</td>
        `;
    });
}

// Atualiza o resumo
function updateSummary(filteredPurchases = purchases) {
    const totalItems = filteredPurchases.length;
    const totalValue = filteredPurchases.reduce((sum, purchase) => sum + purchase.value, 0);
    summary.innerText = `Total de Itens: ${totalItems} | Valor Total: R$ ${totalValue.toFixed(2)}`;
}

// Atualiza o filtro de locais com base nas compras
function updateLocationFilter() {
    const locationFilter = document.getElementById('locationFilter');
    const uniqueLocations = [...new Set(purchases.map(p => p.location))];

    locationFilter.innerHTML = '<option value="">Todos os locais</option>';
    uniqueLocations.forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        option.textContent = location;
        locationFilter.appendChild(option);
    });
}
