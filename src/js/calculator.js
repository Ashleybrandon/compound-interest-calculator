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