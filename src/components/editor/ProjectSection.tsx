"use client";

import CollapsibleSection from "./CollapsibleSection";
import AddItemButton from "./AddItemButton";
import ProjectCard from "./ProjectCard";
import { Project } from "@/app/types/resume";

interface Props {
  items: Project[];
  onAdd: () => void;
  onUpdate: (id: string, field: keyof Omit<Project, "id" | "bullets">, value: string) => void;
  onUpdateBullet: (id: string, index: number, value: string) => void;
  onAddBullet: (id: string) => void;
  onRemoveBullet: (id: string, index: number) => void;
  onRemove: (id: string) => void;
}

export default function ProjectSection({ items, onAdd, onUpdate, onUpdateBullet, onAddBullet, onRemoveBullet, onRemove }: Props) {
  return (
    <CollapsibleSection title="Projects">
      {items.map((proj) => (
        <ProjectCard
          key={proj.id}
          data={proj}
          onUpdate={(field, value) => onUpdate(proj.id, field, value)}
          onUpdateBullet={(index, value) => onUpdateBullet(proj.id, index, value)}
          onAddBullet={() => onAddBullet(proj.id)}
          onRemoveBullet={(index) => onRemoveBullet(proj.id, index)}
          onRemove={() => onRemove(proj.id)}
        />
      ))}
      <AddItemButton label="Add Project" onClick={onAdd} />
    </CollapsibleSection>
  );
}
