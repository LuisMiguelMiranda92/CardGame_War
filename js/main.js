document.querySelector('button').addEventListener('click', drawTwo)

let deckId = ""

if(!localStorage.getItem('deckId')){
fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        deckId = data.deck_id
        localStorage.setItem('deckId', deckId)
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
    } else if(localStorage.getItem('deckId')){
      deckId = localStorage.getItem('deckId')
      }      

      
function drawTwo(){

  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
  
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector('#player1').src = data.cards[0].image
        document.querySelector('#player2').src = data.cards[1].image

        let player1Val = convertToNumber(data.cards[0].value)
        let player2Val = convertToNumber(data.cards[1].value)
        if(player1Val > player2Val){
          document.querySelector('h3').innerText = "Player 1 wins"
        } else if(player2Val > player1Val){
          document.querySelector('h3').innerText = "Player 2 wins"
        } else{
          document.querySelector('h3').innerText = "Time for war"
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

function convertToNumber(val){
  if(val === 'ACE'){
    return 14
  } else if(val === 'KING'){
    return 13
  } else if(val === 'QUEEN'){
    return 12
  } else if(val === 'JACK'){
    return 11
  } else{
    return +val
  }
}

