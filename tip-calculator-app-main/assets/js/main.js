const inputBill = document.querySelector('#bill')
const inputNumberPeople = document.querySelector('#number-people')
const inputTipPorcentage = document.querySelector('.custom')
const tipPorcentageButtons = document.querySelector('.tip-buttons')
const tipResetButton = document.querySelector('#reset-tip-calculation')
let tipPorcentageText; 

const handleBillInputChange = () => {
    const inputBillIsValid = validateInputElement(inputBill) 
    const errorMessage = document.querySelector('.invalid-message.bill')

    if(!inputBillIsValid) {
        inputBill.classList.add('error')
        errorMessage.style.display = 'block'
        return
    }

    inputBill.classList.remove('error')
    errorMessage.style.display = 'none'

    calculateTip()
}

const handleNumberPeopleInputChange = () => {
    const inputNumberPeopleIsValid = validateInputElement(inputNumberPeople)
    const errorMessage = document.querySelector('.invalid-message.people')
    
    if(!inputNumberPeopleIsValid) {
        inputNumberPeople.classList.add('error')
        errorMessage.style.display = 'block'
        return
    }

    inputNumberPeople.classList.remove('error')
    errorMessage.style.display = 'none'

    calculateTip()
}

const handleTipPorcentageInputChange = () => {
    const customTipInputIsValid = validateInputElement(inputTipPorcentage)
    if(!customTipInputIsValid) return inputTipPorcentage.classList.add('error')
    inputTipPorcentage.classList.remove('error')
    tipPorcentageText = inputTipPorcentage.value

    calculateTip()
}

const validateInputElement = input => Number(input.value) > 0


const handleTipPorcentageButtonClick = (el) => {
    const tipButtons = tipPorcentageButtons.children
    
    for (let tipButton of tipButtons) {
        tipButton.classList.remove('active')
        const tipButtonIsBeingClicked = tipButton === el
        if(tipButtonIsBeingClicked) {
            tipButton.classList.add('active')
            tipPorcentageText = tipButton.innerText.replace('%', '')
        }
    }

    calculateTip()
}

const calculateTip = () => {
    const bill = Number(inputBill.value)
    const numberOfPeople = Number(inputNumberPeople.value)
    const tipPorcentage = Number(tipPorcentageText)/100

    if(!bill || !numberOfPeople || !tipPorcentage) return
    
    const tipAmountPerPerson = (bill * tipPorcentage) / numberOfPeople
    const totalPerPerson = (bill + bill * tipPorcentage) / numberOfPeople 

    updateTipResult(tipAmountPerPerson, totalPerPerson)
}

const updateTipResult = (tipAmountPerPerson, totalPerPerson) => {
    const tipAmountResult = document.querySelector('#tip-amount-result')
    const totalPerPersonResult = document.querySelector('#total-person-result')

    tipAmountResult.innerText = `$${tipAmountPerPerson.toFixed(2)}`
    totalPerPersonResult.innerText = `$${totalPerPerson.toFixed(2)}`
}

const handleTipResetButtonClick = () => {
    inputBill.value = ''
    inputNumberPeople.value = ''
    inputTipPorcentage.value = ''

    inputBill.classList.remove('error')
    inputNumberPeople.classList.remove('error')
    inputTipPorcentage.classList.remove('error')

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


inputBill.addEventListener('change', () => handleBillInputChange())
inputNumberPeople.addEventListener('change', () => handleNumberPeopleInputChange())
inputTipPorcentage.addEventListener('change', () => handleTipPorcentageInputChange())
tipPorcentageButtons.addEventListener('click', (e) => {
    const el = e.target
    handleTipPorcentageButtonClick(el)
})
tipResetButton.addEventListener('click', () => handleTipResetButtonClick())


