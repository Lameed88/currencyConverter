const getCurrencyOptions = async () => {
    const apiUrl = 'https://api.exchangerate.host/symbols';
    const response = await fetch(apiUrl)
    const json = await response.json()
    // console.log(json.symbols)
    return json.symbols
}


// const getCurrencyOptions = () => {
//     const apiUrl = "https://api.exchangerate.host/symbols"
//     return fetch(apiUrl)
//     .then((response) =>response.json())
//     .then((data) => data.symbols)
// }

const getCurrencyRate = async ( fromCurrency, toCurrency) => {
    const apiUrl = 'https://api.exchangerate.host/convert'
    const currencyConvertUrl = new URL (apiUrl)
    currencyConvertUrl.searchParams.append('from', fromCurrency)
    currencyConvertUrl.searchParams.append('to', toCurrency)
    // console.log(currencyConvertUrl)
    const response = await fetch (currencyConvertUrl)
    const json = await response.json()
    console.log(json)
    return json.result

}

// const getCurrencyRates = async(fromCurrency, toCurrency) => {
//     const apiUrl = 'https://api.exchangerate.host/convert'
//     const currencyConvertUrl = new URL(apiUrl)
//     currencyConvertUrl.searchParams.append('from', fromCurrency)
//     currencyConvertUrl.searchParams.append('to', toCurrency)

//     const response = fetch(currencyConvertUrl)
//     .then((response) => response.json())
//     .then((data) => data.result)
//     return response;
// }

const appendOptionElToSelectEl = (optionItems, selectEl) => {
    const optionEl = document.createElement('option');
    optionEl.value = optionItems.code
    optionEl.textContent = optionItems.description
    selectEl.appendChild(optionEl)
}

    const populateSelectEl = (selectEl, optionItems) => {
    optionItems.forEach(optionItem => appendOptionElToSelectEl(optionItem, selectEl))
        
    };
    const setUpCurrencies = async () => {
        const fromCurrency = document.querySelector('#fromCurrency')
        const toCurrency = document.querySelector('#toCurrency')

        const currencyOptions = await getCurrencyOptions()
        const currencies = Object.keys(currencyOptions).map(currencyKeys => 
            currencyOptions [currencyKeys])
        // console.log(currencies)

        populateSelectEl(fromCurrency, currencies)
        populateSelectEl(toCurrency, currencies)
    }
    setUpCurrencies()

 
    const setUpEventListner = () => {
        const formEl = document.querySelector("#converter")
        formEl.addEventListener('submit', async (event) => {
            event.preventDefault()


            const fromCurrency = document.querySelector('#fromCurrency')
            const toCurrency = document.querySelector('#toCurrency')
            const amount = document.querySelector('#amount')
            const convertResultEl = document.querySelector('#result')

            try{
            const rate = await getCurrencyRate(fromCurrency.value, toCurrency.value)
            const amountValue = Number(amount.value)
            const conversionRate = Number(amountValue * rate).toFixed(2)
            convertResultEl.textContent = `${amountValue} ${fromCurrency.value} =
             ${conversionRate} ${toCurrency.value}`

             
            }
             catch (err) {
                convertResultEl.textContent = `There is an erro : ${err.message}`
                convertResultEl.classList.add('error')

             }
           
        })
    }

    setUpEventListner()





   




// 



