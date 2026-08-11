"use client";

import { useSearchParams } from "next/navigation";
import ProjectForm from "../../ProjectForm";

export default function EditProjectPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  return <ProjectForm projectId={id} />;
}
