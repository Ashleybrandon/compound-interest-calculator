//https://github.com/GeorgeHastings/emblem

var Emblem = {
    init: function (el, str) {
        var element = document.querySelector(el);
        var text = str ? str : element.innerHTML;
        element.innerHTML = '';
        for (var i = 0; i < text.length; i++) {
            var letter = text[i];
            var span = document.createElement('span');
            var node = document.createTextNode(letter);
            var r = (360 / text.length) * (i);
            var x = (Math.PI / text.length).toFixed(0) * (i);
            var y = (Math.PI / text.length).toFixed(0) * (i);
            span.appendChild(node);
            span.style.webkitTransform = 'rotateZ(' + r + 'deg) translate3d(' + x + 'px,' + y + 'px,0)';
            span.style.transform = 'rotateZ(' + r + 'deg) translate3d(' + x + 'px,' + y + 'px,0)';
            element.appendChild(span);
        }
    }
};

Emblem.init('.emblem');

const calcInterest = (e) => {
    e.preventDefault();
    const invest = document.querySelector('#initial-investment');
    const rate = document.querySelector('#interest-rate');
    const period = document.querySelector('#time-increments');
    const output = document.querySelector('#output');

    const rateVal = rate.value * 0.01;
    const periodVal = period.value;
    let amount = invest.value;

    output.innerHTML = "";
    const results = [];

    for (let i = 1; i <= periodVal; i++) {
        amount = amount * (1.0 + rateVal);
        const total = amount.toFixed(2);

        output.innerHTML += `
        <tr class="${i % 2 === 0 ? 'bg-[#1b1f3c]' : 'bg-[#0a0f25]'} ">
            <td class="px-6 py-2 whitespace-nowrap text-sm font-medium text-white">${i}</td>
            <td class="text-sm text-white px-6 py-2 whitespace-nowrap">${total}</td>
        </tr>`;

        results.push({ period: i, amount: total });
    }

    document.querySelector('#copy-csv').dataset.results = JSON.stringify(results);
}


document.querySelector('#main-form').addEventListener('submit', calcInterest);

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