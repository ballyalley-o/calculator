class Calculator {
    constructor(previousOandTextElement, currentOandTextElement) {
        this.previousOandTextElement = previousOandTextElement
        this.currentOandTextElement = currentOandTextElement
        this.clear()
    }



clear() {
    this.currentO = ''
    this.previousO = ''
    this.operation = undefined
}

delete() {
    this.currentO = this.currentO.toString().slice(0, -1)

}

appendNumber(number) {
    if (number === '.' && this.currentO.includes('.')) return
    this.currentO = this.currentO.toString() + number.toString()

}

chooseOperation(operation) {
    if (this.currentO === '') return
    if (this.previousO !== '') {
        this.compute
    }
    this.operation = operation
    this.previousO = this.currentO
    this.currentO = ''

}

compute() {
    let computation
    const prev = parseFloat(this.previousO)
    const current = parseFloat(this.currentO)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
        case '+':
            computation = prev + current
            break
        case '-':
            computation = prev - current
            break
        case '*':
            computation = prev * current
            break
        case '÷':
            computation = prev / current
            break
        default:
            return
    }   
    this.currentO = computation
    this.operation = undefined
    this.previousO = ''

}

getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
        integerDisplay = ''
    } else {
        integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        
        }
    }
    


updateDisplay() {
    this.currentOandTextElement.innerText = 
        this.getDisplayNumber(this.currentO)
    if (this.operation != null) {
    this.previousOandTextElement.innerText = 
        `${this.getDisplayNumber(this.previousO)} ${this.operation}`

} else {
    this.previousOandTextElement.innerText = ''

}

}
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-allclear]')
const previousOandTextElement = document.querySelector('[data-previousO]')
const currentOandTextElement = document.querySelector('[data-currentO]')

const calculator = new Calculator(previousOandTextElement, currentOandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    } )
})


operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    } )
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})