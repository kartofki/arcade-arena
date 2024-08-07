import React from 'react'

const StartButton = ({callback}) => {
  return (
    <button className="startGameBtn" onClick={callback}>StartButton</button>
  )
}

export default StartButton