const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const result = document.getElementById("result");

async function populateCurrencies() {
  const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
  const data = await res.json();
  const currencies = Object.keys(data.rates);

  currencies.forEach((currency) => {
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");
    option1.value = option2.value = currency;
    option1.text = option2.text = currency;
    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
  });

  fromCurrency.value = "USD";
  toCurrency.value = "INR";
}

async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amount || isNaN(amount)) {
    result.innerText = "Please enter a valid amount.";
    return;
  }

  const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
  const data = await res.json();

  const rate = data.rates[to];
  const converted = (amount * rate).toFixed(2);

  result.innerText = `${amount} ${from} = ${converted} ${to}`;
}

populateCurrencies();
