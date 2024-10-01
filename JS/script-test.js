// script-test.js

// Função para adicionar compras de teste
function addTestPurchases() {
    const testPurchases = [
        { item: "Camiseta", value: 49.90, location: "Loja A", date: "2024-09-10", paymentMethod: "Cartão de Crédito" },
        { item: "Calça", value: 89.90, location: "Loja B", date: "2024-09-15", paymentMethod: "Dinheiro" },
        { item: "Tênis", value: 150.00, location: "Loja C", date: "2024-09-20", paymentMethod: "Transferência" },
        { item: "Boné", value: 25.00, location: "Loja A", date: "2024-09-12", paymentMethod: "Cartão de Débito" },
        { item: "Relógio", value: 300.00, location: "Loja D", date: "2024-09-25", paymentMethod: "Pix" }
    ];

    const purchaseForm = document.getElementById('purchaseForm');

    testPurchases.forEach(purchase => {
        // Preenche o formulário
        purchaseForm[0].value = purchase.item;
        purchaseForm[1].value = purchase.value;
        purchaseForm[2].value = purchase.location;
        purchaseForm[3].value = purchase.date;
        purchaseForm[4].value = purchase.paymentMethod;

        // Envia o formulário
        purchaseForm.dispatchEvent(new Event('submit'));
    });
}

// Função para aplicar filtros de teste
function applyTestFilters() {
    const monthFilter = document.getElementById('monthFilter');
    const locationFilter = document.getElementById('locationFilter');
    const paymentFilter = document.getElementById('paymentFilter');
    const minValueInput = document.getElementById('minValue');
    const maxValueInput = document.getElementById('maxValue');
    const applyFiltersButton = document.getElementById('applyFilters');

    // Exemplo: filtra por mês de setembro e forma de pagamento "Dinheiro"
    monthFilter.value = "9"; // Setembro
    locationFilter.value = ""; // Todos os locais
    paymentFilter.value = "Dinheiro"; // Filtra por "Dinheiro"
    minValueInput.value = ""; // Sem valor mínimo
    maxValueInput.value = ""; // Sem valor máximo

    // Aplica os filtros
    applyFiltersButton.click();
}

// Testa o sistema
function testSystem() {
    addTestPurchases();
    applyTestFilters();
}

// Chama a função de teste quando a página estiver carregada
document.addEventListener('DOMContentLoaded', testSystem);
