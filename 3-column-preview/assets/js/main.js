const learnButtons = document.querySelectorAll('.learn-buttons')

for (let button of learnButtons) {
    button.addEventListener('click', () => {
        for (let button of learnButtons) {
            button.classList.remove('active')
        }
        button.classList.add('active')
    })
}
