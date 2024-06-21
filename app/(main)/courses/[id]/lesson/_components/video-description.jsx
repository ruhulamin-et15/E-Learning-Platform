import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function VideoDescription({ description }) {
  return (
    <div className="mt-4">
      <Tabs defaultValue="details">
        <TabsList className="bg-transparent p-0 border-b border-border w-full justify-start h-auto rounded-none">
          <TabsTrigger className="capitalize" value="quiz">
            Quiz
          </TabsTrigger>
        </TabsList>
        <div className="pt-3">
          <TabsContent value="details">{description}</TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default VideoDescription;

