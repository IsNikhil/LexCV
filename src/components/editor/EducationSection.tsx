"use client";

import CollapsibleSection from "./CollapsibleSection";
import AddItemButton from "./AddItemButton";
import EducationCard from "./EducationCard";
import { Education } from "@/app/types/resume";

interface Props {
  items: Education[];
  onAdd: () => void;
  onUpdate: (id: string, field: keyof Omit<Education, "id">, value: string) => void;
  onRemove: (id: string) => void;
}

export default function EducationSection({ items, onAdd, onUpdate, onRemove }: Props) {
  return (
    <CollapsibleSection title="Education">
      {items.map((edu) => (
        <EducationCard
          key={edu.id}
          data={edu}
          onUpdate={(field, value) => onUpdate(edu.id, field, value)}
          onRemove={() => onRemove(edu.id)}
        />
      ))}
      <AddItemButton label="Add Education" onClick={onAdd} />
    </CollapsibleSection>
  );
}
