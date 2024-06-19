import { Separator } from "@/components/ui/separator";
import VideoDescription from "./_components/video-description";
import { VideoPlayer } from "./_components/video-player";

const Course = () => {
  const url = "https://www.youtube.com/embed/nB_7xH6lt38";
  return (
    <div>
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4 w-full">
          <VideoPlayer url={url} />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
          </div>
          <Separator />
          <VideoDescription />
        </div>
      </div>
    </div>
  );
};
export default Course;

