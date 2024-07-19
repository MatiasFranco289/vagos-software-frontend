import ProtectedRoute from "@/components/ProtectedRoute";

export default function CreateBlog() {
  return (
    <ProtectedRoute requiredRole="ADMIN">
      <div>
        <h2>Yo soy la pagina de crear blogs</h2>
      </div>
    </ProtectedRoute>
  );
}
