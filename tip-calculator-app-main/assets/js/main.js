const inputBill = document.querySelector('#bill')
const inputNumberPeople = document.querySelector('#number-people')
const tipPorcentageButtons = document.querySelector('.tip-buttons')

const tipAmountResult = document.querySelector('#tip-amount-result')
const totalPerPersonResult = document.querySelector('#total-person-result')
const resetTipCalculationButton = document.querySelector('#reset-tip-calculation')

let tipPorcentageText; 

const handleBillChange = () => {
    const inputBillIsValid = validateInputElement(inputBill) 
    const errorMessage = document.querySelector('.invalid-message.bill')

    if(!inputBillIsValid) {
        inputBill.classList.add('error')
        errorMessage.style.display = 'block'
        return
    }

    inputBill.classList.remove('error')
    errorMessage.style.display = 'none'

    const bill = Number(inputBill.value)
    return bill
}

const handleNumberPeopleChange = () => {
    const inputNumberPeopleIsValid = validateInputElement(inputNumberPeople)
    const errorMessage = document.querySelector('.invalid-message.people')
    
    if(!inputNumberPeopleIsValid) {
        inputNumberPeople.classList.add('error')
        errorMessage.style.display = 'block'
        return
    }

    inputNumberPeople.classList.remove('error')
    errorMessage.style.display = 'none'

    const numberOfPeople = Number(inputNumberPeople.value)
    return numberOfPeople
}

const validateInputElement = input => Number(input.value) > 0


const handleTipPorcentageButtons = (el) => {
    const tipButtons = tipPorcentageButtons.children
    
    for (let tipButton of tipButtons) {
        tipButton.classList.remove('active')
        const tipButtonIsBeingClicked = tipButton === el
        if(tipButtonIsBeingClicked) {
            tipButton.classList.add('active')
            tipPorcentageText = tipButton.innerText.replace('%', '')
            if (tipButton.classList.contains('custom')) {
                const tipInputCustomIsValid = validateInputElement(tipButton)
                if(!tipInputCustomIsValid) return tipButton.classList.add('error')
                tipButton.classList.remove('error')
                tipPorcentageText = tipButton.value
            } 
        }
    }

    calculateTip()
}

const calculateTip = () => {
    const bill = handleBillChange()
    const numberOfPeople = handleNumberPeopleChange()
    const tipPorcentage = Number(tipPorcentageText)/100

    if(!bill || !numberOfPeople || !tipPorcentage) return
    
    const tipAmountPerPerson = (bill * tipPorcentage) / numberOfPeople
    const totalPerPerson = (bill + bill * tipPorcentage) / numberOfPeople 

    updateTipResult(tipAmountPerPerson, totalPerPerson)
}

const updateTipResult = (tipAmountPerPerson, totalPerPerson) => {
    tipAmountResult.innerText = `$${tipAmountPerPerson.toFixed(2)}`
    totalPerPersonResult.innerText = `$${totalPerPerson.toFixed(2)}`
}

const resetTipCalculation = () => {
    inputBill.value = ''
    inputNumberPeople.value = ''

    inputBill.classList.remove('error')
    inputNumberPeople.classList.remove('error')

    const errorMessage = document.querySelectorAll('.invalid-message')
    for (let message of errorMessage) {
        message.style.display = 'none'
    }

    const tipButtons = tipPorcentageButtons.children
    for (let tipButton of tipButtons) {
        tipButton.classList.remove('active')
    }

    updateTipResult(0, 0)
}


inputBill.addEventListener('change', () => {
    handleBillChange()
})
inputNumberPeople.addEventListener('change', () => {
    handleNumberPeopleChange()
    calculateTip()
})
tipPorcentageButtons.addEventListener('click', (e) => {
    const el = e.target
    handleTipPorcentageButtons(el)
})
tipPorcentageButtons.addEventListener('change', (e) => {
    const el = e.target
    handleTipPorcentageButtons(el)
})
resetTipCalculationButton.addEventListener('click', () => resetTipCalculation())


