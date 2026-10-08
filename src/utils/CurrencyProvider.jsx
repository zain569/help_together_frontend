import { useEffect, useState } from 'react';
import CurrencyConverter from '../apis/currency/getCurrencyRates';
import { CurrencyContext } from './CurrencyContext';
import { currencies } from './currencies';

function getSavedCurrencyCode() {
    const savedCurrency = localStorage.getItem('preferredCurrency');
    return currencies.find(({ code, symbol }) => code === savedCurrency || symbol === savedCurrency)?.code || 'PKR';
}

function getSavedRate(currencyCode) {
    if (currencyCode === 'PKR') return 1;

    try {
        const rates = JSON.parse(localStorage.getItem('currencyRates') || '{}');
        const cachedRate = Number(rates[currencyCode]);
        if (Number.isFinite(cachedRate) && cachedRate > 0) return cachedRate;
    } catch {
        // Ignore malformed cached rates and fall back to the single saved rate.
    }

    const savedRate = Number(localStorage.getItem('currencyRate'));
    const savedRateCode = localStorage.getItem('currencyRateCode');
    return Number.isFinite(savedRate) && savedRate > 0
        && (savedRateCode === currencyCode || (!savedRateCode && getSavedCurrencyCode() === currencyCode))
        ? savedRate
        : 1;
}

export function CurrencyProvider({ children }) {
    const [currencyCode, setCurrencyCode] = useState(getSavedCurrencyCode);
    const [rateState, setRateState] = useState(() => {
        const code = getSavedCurrencyCode();
        return { currencyCode: code, rate: getSavedRate(code) };
    });
    const selectedCurrency = currencies.find(({ code }) => code === currencyCode) || currencies[0];
    const exchangeRate = rateState.currencyCode === currencyCode
        ? rateState.rate
        : getSavedRate(currencyCode);

    useEffect(() => {
        localStorage.setItem('preferredCurrency', selectedCurrency.symbol);
    }, [selectedCurrency]);

    useEffect(() => {
        let isCurrent = true;

        CurrencyConverter(currencyCode)
            .then((data) => {
                const rate = Number(data?.rate);
                if (!Number.isFinite(rate) || rate <= 0) throw new Error('Invalid currency rate response');
                if (!isCurrent) return;

                const rates = JSON.parse(localStorage.getItem('currencyRates') || '{}');
                rates[currencyCode] = rate;
                localStorage.setItem('currencyRates', JSON.stringify(rates));
                localStorage.setItem('currencyRate', String(rate));
                localStorage.setItem('currencyRateCode', currencyCode);
                setRateState({ currencyCode, rate });
            })
            .catch((error) => {
                if (isCurrent) console.error('Currency rate lookup failed:', error);
            });

        return () => { isCurrent = false; };
    }, [currencyCode]);

    const formatCurrency = (amount) => {
        const numericAmount = Number(amount || 0);
        const value = (Number.isFinite(numericAmount) ? numericAmount : 0) * exchangeRate;
        const formattedValue = value.toLocaleString(currencyCode === 'PKR' ? 'en-PK' : 'en-US', {
            maximumFractionDigits: 2,
        });
        return `${selectedCurrency.symbol} ${formattedValue}`;
    };

    return (
        <CurrencyContext.Provider value={{ currencyCode, currencySymbol: selectedCurrency.symbol, exchangeRate, setCurrencyCode, formatCurrency }}>
            {children}
        </CurrencyContext.Provider>
    );
}