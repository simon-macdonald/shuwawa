import YouTube from "react-youtube";
import type { QuizItem } from "./quiz/quizItem";

function VideoPlayer(props: { quizItem: QuizItem }) {
  const { quizItem } = props;

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
      {quizItem.hideBottom && (
        <div
          className={`
          absolute bottom-0 left-0 w-full h-[25%]
          bg-black pointer-events-none z-10
        `}
        />
      )}
    </div>
  );
}

export default VideoPlayer;
