// Calculadora de Gorjeta 
// 1° - Validações dos inputs Bill e Number of peoples
// 2° - Seleção da porcentagem da gorjeta
// 3° - Cálculo da Gorjeta por pessoa e o Total da Conta

const inputBill = document.querySelector('#bill')
const inputNumberPeople = document.querySelector('#number-people')
const tipButtons = document.querySelector('.tip-buttons')

const tipAmountResult = document.querySelector('#tip-amount-result')
const totalPerPersonResult = document.querySelector('#total-person-result')
const resetTipCalculationButton = document.querySelector('#reset-tip-calculation')


const handleBill = () => {
    const inputBillIsValid = validateInputElement(inputBill)

    if(!inputBillIsValid) {
        return inputBill.classList.add('error')
    }

    inputBill.classList.remove('error')
    const bill = Number(inputBill.value)
    return bill
}

const handleNumberOfPeople = () => {
    const inputNumberPeopleIsValid = validateInputElement(inputNumberPeople)
    
    if(!inputNumberPeopleIsValid) {
        return inputNumberPeople.classList.add('error')
    }

    inputNumberPeople.classList.remove('error')
    const numberOfPeople = Number(inputNumberPeople.value)
    return numberOfPeople
}

const validateInputElement = input => Number(input.value) > 0


const handleTipButtons = (el) => {
    const tipButton = tipButtons.children
    let tipText; 
    
    for (let tip of tipButton) {
        tip.classList.remove('active')
        const tipButtonIsBeingClicked = tip === el
        if(tipButtonIsBeingClicked) {
            tip.classList.add('active')
            tipText = tip.innerText.replace('%', '')

            if (tip.classList.contains('custom')) {
                tipText = tip.value
            }
        }
    }

    calculateTip(tipText)
}

const calculateTip = (tipText) => {
    const bill = handleBill()
    const numberOfPeople = handleNumberOfPeople()
    const tipPorcentage = Number(tipText)
    
    const tipAmountPerPerson = (bill * tipPorcentage/100) / numberOfPeople
    const totalPerPerson = (bill + bill * tipPorcentage/100) / numberOfPeople 

    tipAmountResult.innerText = `$${tipAmountPerPerson.toFixed(2)}`
    totalPerPersonResult.innerText = `$${totalPerPerson.toFixed(2)}`
}

const resetTipCalculation = () => {
    inputBill.value = ''
    inputNumberPeople.value = ''

    inputBill.classList.remove('error')
    inputNumberPeople.classList.remove('error')

    const tipButton = tipButtons.children
    for (let tip of tipButton) {
        tip.classList.remove('active')
    }

    tipAmountResult.innerText = '$0.00'
    totalPerPersonResult.innerText = '$0.00'
}


inputBill.addEventListener('change', () => handleBill())
inputNumberPeople.addEventListener('change', () => handleNumberOfPeople())
tipButtons.addEventListener('click', (e) => {
    const el = e.target
    handleTipButtons(el)
})
tipButtons.addEventListener('change', (e) => {
    const el = e.target
    handleTipButtons(el)
})
resetTipCalculationButton.addEventListener('click', () => resetTipCalculation())


