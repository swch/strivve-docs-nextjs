import clsx from 'clsx'

import { React, useEffect } from 'react'
import ReactPlayer from 'react-player'

export function Video({ url }) {
  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="relative"
        url={url}
        config={{
          file: {
            attributes: {
              playsInline: true,
              forceVideo: true,
              forceAudio: true,
              controls: '',
              controlslist: 'nofullscreen nodownload',
            },
          },
        }}
      />
    </div>
  )
}
