"use client";
import CreateEditBlogsForm from "@/components/CreateEditBlogsForm/CreateEditBlogsForm";
import { BlogInfo } from "@/interfaces";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ROLENAME_ADMIN } from "@/constants";

export default function EditBlog() {
  const params = useParams();
  const [blogInfo, setBlogInfo] = useState<BlogInfo | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const blogId = params.id as string;
  // TODO: When the component start attemps to get the info of the blog by its id
  useEffect(() => {
    setBlogInfo({
      title: "default blog",
      relatedProjectId: "1",
      body: "lorem ipsum",
    });
    setIsLoading(false);
  }, []);

  const onFormSend = (formInfo: BlogInfo) => {
    // TODO: Call blog endpoint here
    console.log(formInfo);
  };

  const renderizeFormOrLoading = () => {
    if (isLoading) {
      return <div>Loading ..</div>;
    } else {
      return (
        <CreateEditBlogsForm
          onFormSend={onFormSend}
          defaultValues={blogInfo}
          sendBtnText="Editar"
        />
      );
    }
  };

  return (
    <ProtectedRoute requiredRole={ROLENAME_ADMIN}>
      <div className="w-full min-h-screen mt-24 flex justify-center">
        <div className="flex flex-col w-4/6">
          <h1 className="text-2xl font-light mb-6">{"Admin > Editar blog"}</h1>
          {renderizeFormOrLoading()}
        </div>
      </div>
    </ProtectedRoute>
  );
}
