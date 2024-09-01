/* import { Formik, Form, Field, ErrorMessage } from "formik";
import GlowingButton from "../GlowingButton/GlowingButton";
import { createResourceSchema } from "@/validations/CreateResourceValidation";

export default function ResourcesForm() {
  const DefaultField = () => {
    return (
      <div className="flex justify-between mt-2">
        <div className="w-9/12">
          <Field
            name="url"
            type="text"
            placeholder="www.drive.com"
            className="bg-dark-200 h-[35px] rounded-sm p-1 border-[1px] outline-none focus:border-green-500 w-full mt-1"
          />

          <ErrorMessage
            name="url"
            component="div"
            className="text-red-600 absolute bottom-0 text-sm"
          />
          <div className="sm:h-[25px] h-[30px]" />
        </div>

        <div className="w-2/12 flex justify-around">
          <div className="w-1/2  mr-2">
            <GlowingButton text="Agregar" type="submit" />
          </div>

          <div className="w-1/2 ">
            <GlowingButton text="Eliminar" />
          </div>
        </div>
      </div>
    );
  };
  return (
    <Formik
      onSubmit={() => {
        console.log("");
      }}
      initialValues={{
        url: "",
        type_id: "",
        project_id: "",
      }}
      validationSchema={createResourceSchema}
    >
      <Form>{DefaultField()}</Form>
    </Formik>
  );
}
 */
