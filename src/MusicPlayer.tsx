import React, { useState, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { faPauseCircle } from "@fortawesome/free-solid-svg-icons";

interface Props {
  src: string
}

export const MusicPlayer = (props: Props) => {
  const [play, setPlay] = useState(false)
  const audioEl = useRef<null | HTMLAudioElement>(null);

  const onPlay = () => {
    if (audioEl.current) {
      if (play) {
        audioEl.current.pause();
        setPlay(false);
      } else {
        audioEl.current.play();
        setPlay(true);
      }
    }
  }
  return (
    <>
      <button onClick={onPlay}>
        {play ? (
          <FontAwesomeIcon icon={faPauseCircle} />
        ) : (
          <FontAwesomeIcon icon={faPlayCircle} />
        )}
        <audio src={props.src} ref={audioEl}></audio>
      </button>
    </>
  );
}
