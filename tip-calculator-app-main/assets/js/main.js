const inputBill = document.querySelector('#bill')
const inputNumberPeople = document.querySelector('#number-people')
const inputTipPorcentage = document.querySelector('.custom')
const tipPorcentageButtons = document.querySelector('.tip-buttons')
const tipResetButton = document.querySelector('#reset-tip-calculation')
let tipPorcentageText = null; 
const invalidInputMessages = document.querySelectorAll('.invalid-message')

const handleBillInputChange = () => {
    const inputBillIsValid = validateInputElement(inputBill) 
    const invalidMessage = invalidInputMessages[0]

    if(!inputBillIsValid) {
        inputBill.classList.add('error')
        invalidMessage.style.display = 'block'
        return
    }

    invalidMessage.style.display = 'none'
    inputBill.classList.remove('error')
    calculateTip()
}

const handleTipPorcentageInputChange = () => {
    const customTipInputIsValid = validateInputElement(inputTipPorcentage)
    
    if(!customTipInputIsValid) {
        return inputTipPorcentage.classList.add('error')
    }

    inputTipPorcentage.classList.remove('error')
    tipPorcentageText = inputTipPorcentage.value
    calculateTip()
}

const handleNumberPeopleInputChange = () => {
    const inputNumberPeopleIsValid = validateInputElement(inputNumberPeople)
    const invalidMessage = invalidInputMessages[1]
    
    if(!inputNumberPeopleIsValid) {
        inputNumberPeople.classList.add('error')
        invalidMessage.style.display = 'block'
        return
    }

    invalidMessage.style.display = 'none'
    inputNumberPeople.classList.remove('error')
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
    changeTipResetButtonActiveState(true)

    const bill = Number(inputBill.value)
    const numberOfPeople = Number(inputNumberPeople.value)
    const tipPorcentage = Number(tipPorcentageText)/100

    if(!bill || !numberOfPeople || !tipPorcentage) return
    
    const tipAmountPerPerson = (bill * tipPorcentage) / numberOfPeople
    const totalPerPerson = (bill + bill * tipPorcentage) / numberOfPeople 

    updateTipResult(tipAmountPerPerson, totalPerPerson)
}

const changeTipResetButtonActiveState = (active) => {
    active ? tipResetButton.classList.add('active') : tipResetButton.classList.remove('active')
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

    tipPorcentageText = null

    for (let invalidMessage of invalidInputMessages) {
        invalidMessage.style.display = 'none'
    }

    const tipButtons = tipPorcentageButtons.children
    for (let tipButton of tipButtons) {
        tipButton.classList.remove('active')
    }

    changeTipResetButtonActiveState(false)
    updateTipResult(0, 0)
}

inputBill.addEventListener('change', () => handleBillInputChange())
inputTipPorcentage.addEventListener('change', () => handleTipPorcentageInputChange())
inputNumberPeople.addEventListener('change', () => handleNumberPeopleInputChange())
tipPorcentageButtons.addEventListener('click', (e) => {
    const el = e.target
    if (el.classList.contains('custom')) return
    handleTipPorcentageButtonClick(el)
})
tipResetButton.addEventListener('click', () => handleTipResetButtonClick())


