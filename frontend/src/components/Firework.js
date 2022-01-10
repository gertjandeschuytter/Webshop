import React from 'react'
import { Fireworks } from 'fireworks/lib/react'

const Firework = () => {
    const fxProps = {
        count: 3,
        interval: 200,
        colors: ['#cc3333', '#4CAF50', '#2196F3', '#FF9800'],
        calc: (props, i) => ({
          ...props,
          x: (i + 1) * (window.innerWidth / 3) - (i + 1) * 100,
          y: 200 + Math.random() * 100 - 50 + (i === 2 ? -80 : 0)
        })
      }
    return (
        <Fireworks {...fxProps} />
    )
}

export default Firework
