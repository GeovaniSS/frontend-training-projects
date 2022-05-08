const adviceDice = document.querySelector('.advice-dice')
const adviceDivider = document.querySelector('.advice-divider')

const changeAdviceDivider = () => {
  adviceDivider.src = ''

  if(window.innerWidth <= 500) 
    return adviceDivider.src = 'assets/images/pattern-divider-mobile.svg'

  adviceDivider.src = 'assets/images/pattern-divider-desktop.svg'
}

const requestRandomAdviceApi = async() => {
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
  adviceText.innerText = `“${advice}”`
}

requestRandomAdviceApi()

window.addEventListener('load', changeAdviceDivider)
window.addEventListener('resize', changeAdviceDivider)
adviceDice.addEventListener('click', requestRandomAdviceApi)