import clsx from 'clsx'

import { React, useEffect } from 'react'
import ReactPlayer from 'react-player'

export function Video({ url }) {
  return (
    <div className="relative">
      <ReactPlayer
        className="react-player"
        url={url}
        config={{
          file: {
            attributes: {
              playsInline: true,
              forceVideo: true,
              forceAudio: true,
              controls: true,
              controlslist: 'nofullscreen nodownload',
            },
          },
        }}
      />
    </div>
  )
}
