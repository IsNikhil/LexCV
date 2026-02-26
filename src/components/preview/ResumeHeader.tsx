import { PersonalInfo } from "@/app/types/resume";

interface Props {
  personalInfo: PersonalInfo;
}

function normalizeUrl(raw: string): string {
  if (!raw) return "";
  if (/^https?:\/\//i.test(raw)) return raw;
  return "https://" + raw;
}

export default function ResumeHeader({ personalInfo }: Props) {
  const { name, email, phone, location, linkedin, github, website } = personalInfo;

  const plainContacts = [email, phone, location].filter(Boolean);
  const linkContacts = [
    linkedin ? { label: linkedin, href: normalizeUrl(linkedin) } : null,
    github ? { label: github, href: normalizeUrl(github) } : null,
    website ? { label: website, href: normalizeUrl(website) } : null,
  ].filter(Boolean) as { label: string; href: string }[];

  const hasSeparator = plainContacts.length > 0 && linkContacts.length > 0;

  return (
    <div className="text-center mb-4">
      <h1 className="text-2xl font-bold text-gray-900 tracking-wide">{name || "Your Name"}</h1>
      {(plainContacts.length > 0 || linkContacts.length > 0) && (
        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
          {plainContacts.join(" · ")}
          {hasSeparator && " · "}
          {linkContacts.map((lc, i) => (
            <span key={lc.href}>
              {i > 0 && " · "}
              <a
                href={lc.href}
                data-pdf-link={lc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-indigo-600 underline-offset-2 hover:underline"
              >
                {lc.label}
              </a>
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
