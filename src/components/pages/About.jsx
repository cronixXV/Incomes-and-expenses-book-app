import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export default function About() {
  const [isOnElement, setIsOnElement] = useState(false)
  const count = useSelector((state) => state.counter.count)

  const handleClick = (event, data) => {
    console.info(event, data)
    setIsOnElement(!!data)
  }

  return (
    <div
      style={{
        backgroundColor: isOnElement ? '#ffe5cf' : 'inherit',
        userSelect: 'none',
      }}
      // onMouseMove={(event) => {
      //   console.info('onMouseMove:', event)
      // }}
      onMouseEnter={(event) => {
        console.info('onMouseEnter:', event)
        setIsOnElement(true)
      }}
      onMouseLeave={(event) => {
        console.info('onMouseLeave:', event)
        setIsOnElement(false)
      }}
      onClick={(event) => handleClick(event, false)}
      onDoubleClick={(event) => handleClick(event, true)}
    >
      <h2>О нас</h2>
      <p>Count: {count}</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum ea
        expedita tempore eos vero. Blanditiis deleniti tempore repellat
        cupiditate molestias, aspernatur tempora eaque modi assumenda et vel
        magnam recusandae. Vero.
      </p>
      <p>
        Id consequuntur cupiditate rerum odio eaque earum possimus officia
        reiciendis! Harum, praesentium deserunt soluta laborum tempore aut,
        aspernatur quibusdam vel eos corrupti et optio rem veritatis earum.
        Nesciunt, maiores error.
      </p>
    </div>
  )
}
