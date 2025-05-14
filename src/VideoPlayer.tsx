import YouTube from "react-youtube";
import { quizData } from "./quiz/chapter13";
import { Button } from "./components/ui/button";
import { useMemo } from "react";

function VideoPlayer(props: {
  index: number,
  success: () => void,
  failure: () => void,
}) {
  const {index, success, failure} = props;
  const quizItem = quizData[index];

  const answers = [0, 3, 5, 7];
  const shuffledAnswers = useMemo(() => {
    return [...answers].sort(() => Math.random() - 0.5);
  }, [index]);

  return (
    <div style={{ position: "relative" }}>
      <YouTube
        videoId={quizItem.youtubeId}
        onReady={(e) => {e.target.mute()}}
        opts={{
          // https://developers.google.com/youtube/player_parameters
          playerVars: {
            autoplay: 1,
            ...(quizItem.start && {start: quizItem.start}),
            ...(quizItem.end && {end: quizItem.end}),
          },
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "56px",
          width: "100%",
          background: "#000",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      {shuffledAnswers.map((answer) =>(
        <Button onClick={answer == 0 ? success : failure}>
          {quizData[(index + answer) % quizData.length].vocab}
        </Button>
      ))}
    </div>
  )
}

export default VideoPlayer