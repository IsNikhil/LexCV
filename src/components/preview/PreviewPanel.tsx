import { ResumeData } from "@/app/types/resume";
import ResumeDocument from "./ResumeDocument";

interface Props {
  data: ResumeData;
}

export default function PreviewPanel({ data }: Props) {
  return (
    <div className="flex justify-center py-8 px-4 min-h-full">
      <div className="shadow-xl">
        <ResumeDocument data={data} />
      </div>
    </div>
  );
}
