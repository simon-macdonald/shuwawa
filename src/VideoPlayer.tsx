import YouTube from "react-youtube";
import { Button } from "./components/ui/button";
import type { QuizItem } from "./quiz/quizItem";
import { sample, shuffle } from "lodash";
import { allVideos } from "./quiz/allCategories";

function findWrongAnswer(correctAnswer: string) {
  const maybe = sample(allVideos)?.vocab;
  if (correctAnswer !== maybe) {
    return maybe;
  }

  return findWrongAnswer(correctAnswer);
}

function VideoPlayer(props: {
  quizItem: QuizItem;
  success: () => void;
  failure: () => void;
}) {
  const { quizItem, success, failure } = props;

  const correctAnswer = <Button onClick={success}>{quizItem.vocab}</Button>;
  const wrongAnswer1 = (
    <Button onClick={failure}>{findWrongAnswer(quizItem.vocab)}</Button>
  );
  const wrongAnswer2 = (
    <Button onClick={failure}>{findWrongAnswer(quizItem.vocab)}</Button>
  );
  const wrongAnswer3 = (
    <Button onClick={failure}>{findWrongAnswer(quizItem.vocab)}</Button>
  );
  const shuffledAnswers = shuffle([
    correctAnswer,
    wrongAnswer1,
    wrongAnswer2,
    wrongAnswer3,
  ]);

  return (
    <div
      className="w-full max-w-3xl aspect-video mx-auto"
      style={{ position: "relative" }}
    >
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
        className="w-full h-full"
        iframeClassName="w-full h-full"
      />
      <div
        className={`
          absolute top-0 left-0 w-full 
          h-[clamp(30px,6vw,56px)] 
        bg-black pointer-events-none z-10
        `}
      />
      {quizItem.hideBottom &&
      <div
        className={`
          absolute bottom-0 left-0 w-full h-[25%]
          bg-black pointer-events-none z-10
        `}
      />
      }
      {shuffledAnswers}
    </div>
  );
}

export default VideoPlayer;
