import { PersonalInfo } from "@/app/types/resume";

interface Props {
  personalInfo: PersonalInfo;
}

export default function ResumeHeader({ personalInfo }: Props) {
  const { name, email, phone, location, linkedin, github, website } = personalInfo;

  const contacts = [email, phone, location, linkedin, github, website].filter(Boolean);

  return (
    <div className="text-center mb-4">
      <h1 className="text-2xl font-bold text-gray-900 tracking-wide">{name || "Your Name"}</h1>
      {contacts.length > 0 && (
        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
          {contacts.join(" · ")}
        </p>
      )}
    </div>
  );
}
