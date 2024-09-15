import ProtectedRoute from "@/components/ProtectedRoute";
import { ROLENAME_ADMIN } from "@/constants";

export default function CreateResourceType() {
  return (
    <ProtectedRoute requiredRole={ROLENAME_ADMIN}>
      <div>
        <h1>Crear tipo de recurso</h1>
      </div>
    </ProtectedRoute>
  );
}
