import YouTube from "react-youtube";
import { Button } from "./components/ui/button";
import type { QuizItem } from "./quiz/quizItem";
import allVideos from "./quiz/allCategories";
import { sample } from "lodash";

function VideoPlayer(props: {
  quizItem: QuizItem;
  success: () => void;
  failure: () => void;
}) {
  const { quizItem, success, failure } = props;

  const correctAnswer = <Button onClick={success}>{quizItem.vocab}</Button>;
  const wrongAnswer1 = (
    <Button onClick={failure}>{sample(allVideos)?.vocab}</Button>
  );
  const wrongAnswer2 = (
    <Button onClick={failure}>{sample(allVideos)?.vocab}</Button>
  );
  const wrongAnswer3 = (
    <Button onClick={failure}>{sample(allVideos)?.vocab}</Button>
  );
  const shuffledAnswers = [
    correctAnswer,
    wrongAnswer1,
    wrongAnswer2,
    wrongAnswer3,
  ].sort(() => Math.random() - 0.05);

  return (
    <div style={{ position: "relative" }}>
      <YouTube
        videoId={quizItem.youtubeId}
        onReady={(e) => {
          e.target.mute();
        }}
        opts={{
          // https://developers.google.com/youtube/player_parameters
          playerVars: {
            autoplay: 1,
            ...(quizItem.start && { start: quizItem.start }),
            ...(quizItem.end && { end: quizItem.end }),
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
      {shuffledAnswers}
    </div>
  );
}

export default VideoPlayer;
