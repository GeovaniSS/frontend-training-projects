const adviceDice = document.querySelector('.advice-dice')

const requestRandomAdvice = async() => {
  try {
    const url = 'https://api.adviceslip.com/advice'
    const response = await fetch(url)

    if(!response.ok) throw new Error(`${response.status}: ${response.statusText}`)

    const randomAdvice = await response.json()
    loadRandomAdvice(randomAdvice)
  } catch(error) {
    console.log(error)
  }
}

const loadRandomAdvice = randomAdvice => {
  const { slip: { advice, id } } = randomAdvice

  const adviceId = document.querySelector('.advice-id')
  adviceId.innerText = `Advice #${id}`

  const adviceText = document.querySelector('.advice-text')
  adviceText.innerText = advice
}

adviceDice.addEventListener('click', requestRandomAdvice)