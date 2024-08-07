import React from 'react'

const StartButton = ({callback}) => {
  return (
    <button className="startGameBtn" onClick={callback}>Start</button>
  )
}

export default StartButton