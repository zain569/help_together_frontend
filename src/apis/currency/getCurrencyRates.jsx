async function CurrencyConverter(selectedCurrency) {
    const url = "https://api.frankfurter.dev/v2/rate/pkr/"

    const response = await fetch(`${url}${selectedCurrency}`);
    if (!response.ok) throw new Error(`Currency rate lookup failed (${response.status})`);

    const data = await response.json();

    return data;
}

export default CurrencyConverter;