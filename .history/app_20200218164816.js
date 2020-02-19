const prompt = require('inquirer').createPromptModule()
let conetstant = ''
let panelists = []
let questions = ['What\'s my favorite food dish?', 'If I had a snake, what would I name it?', 'Guess my grandmother\'s name.', 'Guess my age!', 'how much u luv me?']
let panelistPoints = []
let numOfPanelists
async function getUserInput(message, type) {
  try {
    const { response } = await prompt({
      type: type,
      name: 'response',
      message: message
    })
    return response
  } catch (e) { console.log(e) }
}
function validateAnswers(answer, panAnswers) {
  console.log(`${conetstant}'s Answer: ${answer}`)
  for (let i = 0; i < panAnswers.length; i++) {
    console.log(`${panelists[i].name} guessed: ${panAnswers[i]}`)
    if (answer === panAnswers[i]) {
      panelists[i].points++
    }
  }
}
function sortPanelistsPoints() {
  panelists.sort((a, b) => {
    if (a.points > b.points) {
      return -1
    } else if (a.points < b.points) {
      return 1
    }
    return 0
  })
}
function runEndOfGame() {
  let matches = 0
  for (let i = 0; i < panelists.length; i++) {
    if (panelists[i].points === questions.length) {
      matches++
    }
  }
  console.log(`${conetstant} had ${matches}!`)
  for (let i = 0; i < panelists.length; i++) {
    console.log(`${panelists[i].name} has ${panelists[i].points} points!`)
  }
}
async function runMatchGame() {
  try {
    conetstant = await getUserInput('Please enter contestants name:', 'input')
    numOfPanelists = await getUserInput('Please enter number of panelists:', 'number')
    for (let i = 0; i < numOfPanelists; i++) {
      let pan = await getUserInput(`Please enter pnaelist #${i + 1}'s name:`, 'input')
      panelists.push({ name: pan, points: 0 })
    }
    for (let i = 0; i < questions.length; i++) {
      const answer = await getUserInput(`${questions[i]}\nContestants Answer:`, 'password')
      let panAnswers = []
      for (let j = 0; j < panelists.length; j++) {
        panAnswers.push(await getUserInput(`Panelist #${j + 1} (${panelists[j].name}) Answer:`, 'password'))
      }
      validateAnswers(answer, panAnswers)
    }
    sortPanelistsPoints()
    runEndOfGame()
  } catch (e) {
  }
}
runMatchGame()