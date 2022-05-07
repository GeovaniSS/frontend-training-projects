const url = 'https://api.adviceslip.com/advice'

fetch(url)
  .then(response => response.json())
  .then(randomAdvice => loadAdvice(randomAdvice))
  .catch(error => console.log(error))

const loadAdvice = randomAdvice => {
  const { slip: { advice, id } } = randomAdvice

  const adviceId = document.querySelector('.advice-id')
  adviceId.innerText = `Advice #${id}`

  const adviceText = document.querySelector('.advice-text')
  adviceText.innerText = advice
}