const copyToCSV = () => {
    const button = document.querySelector('#copy-csv');
    const results = JSON.parse(button.dataset.results || '[]');

    if (results.length === 0) {
        alert("No data to copy!");
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,Period,Amount\n";
    results.forEach(row => {
        csvContent += `${row.period},${row.amount}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "compound_interest.csv");
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
}

document.querySelector('#copy-csv').addEventListener('click', copyToCSV);