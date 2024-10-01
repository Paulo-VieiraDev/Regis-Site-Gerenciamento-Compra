const purchaseForm = document.getElementById('purchaseForm');
const purchaseList = document.getElementById('purchaseList').getElementsByTagName('tbody')[0];
const summary = document.getElementById('summary');
const applyFilters = document.getElementById('applyFilters');
const resetFilters = document.getElementById('resetFilters');

let purchases = [];

window.onload = function() {
    const savedPurchases = JSON.parse(localStorage.getItem('purchases'));
    if (savedPurchases) {
        purchases = savedPurchases;
        updatePurchaseList();
        updateSummary();
        updateLocationFilter();
    }
};

purchaseForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const item = this[0].value;
    const value = parseFloat(this[1].value);
    const location = this[2].value;
    const date = this[3].value;
    const paymentMethod = this[4].value;

    const purchaseDate = new Date(date);
    const currentDate = new Date();

    if (purchaseDate > currentDate) {
        alert("A data não pode ser futura. Por favor, insira uma data válida.");
        return;
    }

    const purchase = { item, value, location, date, paymentMethod };
    purchases.push(purchase);
    localStorage.setItem('purchases', JSON.stringify(purchases));
    updatePurchaseList();
    updateSummary();
    updateLocationFilter();
    this.reset();
});

applyFilters.addEventListener('click', function() {
    const filterLocation = document.getElementById('locationFilter').value;
    const filterMonth = document.getElementById('monthFilter').value;
    const filterPayment = document.getElementById('paymentFilter').value;
    const minValue = parseFloat(document.getElementById('minValue').value) || 0;
    const maxValue = parseFloat(document.getElementById('maxValue').value) || Infinity;

    const filteredPurchases = purchases.filter(purchase => {
        const purchaseDate = new Date(purchase.date);
        const purchaseMonth = purchaseDate.getMonth() + 1;
        return (
            (filterLocation === '' || purchase.location === filterLocation) &&
            (filterMonth === '' || purchaseMonth === parseInt(filterMonth)) &&
            (filterPayment === '' || purchase.paymentMethod === filterPayment) &&
            (purchase.value >= minValue && purchase.value <= maxValue)
        );
    });

    updatePurchaseList(filteredPurchases);
    updateSummary(filteredPurchases);
});

resetFilters.addEventListener('click', function() {
    document.getElementById('monthFilter').value = '';
    document.getElementById('locationFilter').value = '';
    document.getElementById('paymentFilter').value = '';
    document.getElementById('minValue').value = '';
    document.getElementById('maxValue').value = '';
    updatePurchaseList();
    updateSummary();
});

function updatePurchaseList(filteredPurchases = purchases) {
    purchaseList.innerHTML = '';
    filteredPurchases.forEach((purchase, index) => {
        const row = purchaseList.insertRow();
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

function deletePurchase(index) {
    purchases.splice(index, 1);
    localStorage.setItem('purchases', JSON.stringify(purchases));
    updatePurchaseList();
    updateSummary();
    updateLocationFilter();
}

function updateSummary(filteredPurchases = purchases) {
    const totalItems = filteredPurchases.length;
    const totalValue = filteredPurchases.reduce((sum, purchase) => sum + purchase.value, 0);
    summary.innerText = `Total de Itens: ${totalItems} | Valor Total: R$ ${totalValue.toFixed(2)}`;
}

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
