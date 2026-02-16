"use client";

import CollapsibleSection from "./CollapsibleSection";
import AddItemButton from "./AddItemButton";
import ExperienceCard from "./ExperienceCard";
import { Experience } from "@/app/types/resume";

interface Props {
  items: Experience[];
  onAdd: () => void;
  onUpdate: (id: string, field: keyof Omit<Experience, "id" | "bullets">, value: string) => void;
  onUpdateBullet: (id: string, index: number, value: string) => void;
  onAddBullet: (id: string) => void;
  onRemoveBullet: (id: string, index: number) => void;
  onRemove: (id: string) => void;
}

export default function ExperienceSection({
  items,
  onAdd,
  onUpdate,
  onUpdateBullet,
  onAddBullet,
  onRemoveBullet,
  onRemove,
}: Props) {
  return (
    <CollapsibleSection title="Experience">
      {items.map((exp) => (
        <ExperienceCard
          key={exp.id}
          data={exp}
          onUpdate={(field, value) => onUpdate(exp.id, field, value)}
          onUpdateBullet={(index, value) => onUpdateBullet(exp.id, index, value)}
          onAddBullet={() => onAddBullet(exp.id)}
          onRemoveBullet={(index) => onRemoveBullet(exp.id, index)}
          onRemove={() => onRemove(exp.id)}
        />
      ))}
      <AddItemButton label="Add Experience" onClick={onAdd} />
    </CollapsibleSection>
  );
}
