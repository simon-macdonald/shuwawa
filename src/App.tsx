import { Button } from "@/components/ui/button"
import VideoPlayer from "./VideoPlayer"
import { useState } from "react"
import { ConfettiBurst } from "./ConfettiBurst";
 
function App() {
  const [index, setIndex] = useState(-1);
  const [showConfetti, setShowConfetti] = useState(false);

  const success = () => {
    setIndex(index + 1);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 500);
  }
  const failure = () => {};

  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      {index < 0 &&
        <Button onClick={() => setIndex(index + 1)}>スタート</Button>
        ||
        <VideoPlayer index={index} success={success} failure={failure} />
      }
      <ConfettiBurst trigger={showConfetti} />
    </div>
  )
}
 
export default App