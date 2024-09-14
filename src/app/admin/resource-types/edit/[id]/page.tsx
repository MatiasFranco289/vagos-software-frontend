"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ROLENAME_ADMIN } from "@/constants";

interface EditResourceProps {
  params: {
    id: number;
  };
}

export default function EditResourceType({ params }: EditResourceProps) {
  const resourceId = params.id;

  return (
    <ProtectedRoute requiredRole={ROLENAME_ADMIN}>
      <div>
        <h1>{`Editar tipo de recurso ${resourceId}`}</h1>
      </div>
    </ProtectedRoute>
  );
}
