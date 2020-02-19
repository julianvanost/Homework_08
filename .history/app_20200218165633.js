const prompt = require('inquirer').createPromptModule()
const express = require('express')
const fs = require('fs')
const path = require('path')

function DigitalPal(hungry, sleepy, bored, age, outside, houseCondition) {

  this.hungry = hungry
  this.sleepy = sleepy
  this.bored = bored
  this.age = age
  this.outside = outside
  this.houseCondition = houseCondition
  this.feed = function () {
    if (this.hungry) {
      console.log('That was yummy!')
      this.hungry = false
      this.sleepy = true
    } else {
      console.log(`No thanks! I'm full.`)
    }
  }
  this.sleep = function () {
    if (this.sleepy) {
      console.log('Zzzzzzzz')
      this.sleepy = false
      this.bored = true
      this.increaseAge()
    } else {
      console.log(`No way! I'm not tired.`)
    }
  }
  this.play = function () {
    if (this.bored) {
      console.log(`Yay! Let's play!`)
      this.bored = false
      this.hungry = true
    } else {
      console.log('Not right now. Later?')
    }
  }
  this.increaseAge = function () {
    this.age = this.age + 1
    console.log(`Happy Birthday to me! I am ${this.age} years old!`)
  }
  this.bark = function () {
    console.log('Woof! Woof!')
  }
  this.goOutside = function () {
    if (!this.outside) {
      console.log('Yay! I love the outdoors!')
      this.outside = true
      this.bark()
    } else {
      console.log(`We're already outside though...`)
    }
  }
  this.goInside = function () {
    if (this.outside) {
      console.log('Do we have to? Fine...')
      this.outside = false
    } else {
      console.log(`I'm already inside...`)
    }
  }
  this.meow = function () {
    console.log('Meow! Meow!')
  }
  this.destroyFurniture = function () {
    if (this.houseCondition > 0) {
      this.houseCondition = this.houseCondition - 10
      console.log('MUAHAHAHAHA! TAKE THAT FURNITURE!')
      this.bored = false
      this.sleepy = true
    }
  }
  this.buyNewFurniture = function () {
    this.houseCondition = this.houseCondition + 50
    console.log('Are you sure about that?')
  }
}

const dog = new DigitalPal(true, false, true, 12, false, 100)
const cat = new DigitalPal(false, true, false, 9, true, 100)
dog.feed()
dog.sleep()
cat.sleep()


// let conetstant = ''
// let panelists = []
// let questions = ['What\'s my favorite food dish?', 'If I had a snake, what would I name it?', 'Guess my grandmother\'s name.', 'Guess my age!', 'how much u luv me?']
// let panelistPoints = []
// let numOfPanelists
// async function getUserInput(message, type) {
//   try {
//     const { response } = await prompt({
//       type: type,
//       name: 'response',
//       message: message
//     })
//     return response
//   } catch (e) { console.log(e) }
// }
// function validateAnswers(answer, panAnswers) {
//   console.log(`${conetstant}'s Answer: ${answer}`)
//   for (let i = 0; i < panAnswers.length; i++) {
//     console.log(`${panelists[i].name} guessed: ${panAnswers[i]}`)
//     if (answer === panAnswers[i]) {
//       panelists[i].points++
//     }
//   }
// }
// function sortPanelistsPoints() {
//   panelists.sort((a, b) => {
//     if (a.points > b.points) {
//       return -1
//     } else if (a.points < b.points) {
//       return 1
//     }
//     return 0
//   })
// }
// function runEndOfGame() {
//   let matches = 0
//   for (let i = 0; i < panelists.length; i++) {
//     if (panelists[i].points === questions.length) {
//       matches++
//     }
//   }
//   console.log(`${conetstant} had ${matches}!`)
//   for (let i = 0; i < panelists.length; i++) {
//     console.log(`${panelists[i].name} has ${panelists[i].points} points!`)
//   }
// }
// async function runMatchGame() {
//   try {
//     conetstant = await getUserInput('Please enter contestants name:', 'input')
//     numOfPanelists = await getUserInput('Please enter number of panelists:', 'number')
//     for (let i = 0; i < numOfPanelists; i++) {
//       let pan = await getUserInput(`Please enter pnaelist #${i + 1}'s name:`, 'input')
//       panelists.push({ name: pan, points: 0 })
//     }
//     for (let i = 0; i < questions.length; i++) {
//       const answer = await getUserInput(`${questions[i]}\nContestants Answer:`, 'password')
//       let panAnswers = []
//       for (let j = 0; j < panelists.length; j++) {
//         panAnswers.push(await getUserInput(`Panelist #${j + 1} (${panelists[j].name}) Answer:`, 'password'))
//       }
//       validateAnswers(answer, panAnswers)
//     }
//     sortPanelistsPoints()
//     runEndOfGame()
//   } catch (e) {
//   }
// }
// runMatchGame()