import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Uint8Array(props.anecdotes.length))

  const generateAnecdote = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length))
  }

  const voteHandler = () => {
    const copy = [...vote]
    copy[selected]++
    setVote(copy)
  }

  return (
    <div>
      <DisplayTitle text="Anecdote of the day" />
      {props.anecdotes[selected]}
      <br />
      <Button text="vote" handleClick={voteHandler} />
      <Button text="next anecdote" handleClick={generateAnecdote} />
      <br />
      <p>has {vote[selected]} votes</p>
      <DisplayTitle text="Anecdote with the most votes" />
      <DisplayMostVotes vote={vote} anecdotes={props.anecdotes}/>

    </div>
  )
}

const DisplayMostVotes = ({ vote, anecdotes }) => {
  
  let max = 0
  let index = 0


  for(let i = 0; i < vote.length; i++){
    if(vote[i] > max){
      max = vote[i]
      index = i
    }
  }
  return (
    <>
      {anecdotes[index]}
      <br />
      <p>has {vote[index]} votes</p>
    </>
  )
}

const DisplayTitle = ({ text }) => {
  return (
    <>
      <h1>{text}</h1>
    </>
  )
}

const Button = ({ text, handleClick }) => {
  return (
    <>
      <button type="button" onClick={handleClick}>{text}</button>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)