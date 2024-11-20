// Adiciona a numeração na coluna "ID"
const table = document.querySelector("#itemsTable tbody");
const rows = table.querySelectorAll("tr");
rows.forEach((row, index) => {
    row.cells[0].textContent = (index + 1).toString().padStart(2, "0");
});

function normalizeString(str) {
    return str
        .normalize("NFD") // Decomposição dos caracteres acentuados
        .replace(/[\u0300-\u036f]/g, "") // Remove os diacríticos (acentos)
        .toUpperCase(); // Coloca tudo em maiúsculas para comparação uniforme
}

function filterTable() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = normalizeString(input.value); // Normaliza o valor do input
    table = document.getElementById("itemsTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows and hide those that don't match the search query
    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        if (td) {
            var matchFound = false;
            for (var j = 0; j < td.length; j++) {
                if (td[j].textContent || td[j].innerText) {
                    txtValue = normalizeString(td[j].textContent || td[j].innerText); // Normaliza o texto
                    if (txtValue.indexOf(filter) > -1) {
                        matchFound = true;
                    }
                }
            }
            tr[i].style.display = matchFound ? "" : "none";
        }
    }
}
