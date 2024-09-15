import { Form, Formik, Field, ErrorMessage } from "formik";
import GlowingButton from "../GlowingButton/GlowingButton";
import { MdClose } from "react-icons/md";
import { Dispatch, SetStateAction, useState } from "react";
import { createResourceTypeSchema } from "@/validations/CreateResourceTypeValidation";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { ApiResponse } from "@/interfaces";
import { ApiResourceType } from "@/apiInterfaces";
import Modal from "../Modal/Modal";

type ResourceTypesFormValues = {
  name: string;
};

interface ResourceTypesFormProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  validationSchema: typeof createResourceTypeSchema;
  onFormSendPromise: (
    newResourceTypeName: string
  ) => Promise<ApiResponse<ApiResourceType | null> | string>;
  initialValues?: ResourceTypesFormValues;
}

export default function ResourceTypeForm({
  setModalOpen,
  validationSchema,
  onFormSendPromise,
  initialValues: initialValues = { name: "" },
}: ResourceTypesFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const SUCCESSFULL_RESOURCE_TYPE_CREATION_MESSAGE =
    "El tipo de recurso fue creado exitosamente.";

  const onFormSubmit = (formValues: ResourceTypesFormValues) => {
    setIsLoading(true);

    onFormSendPromise(formValues.name)
      .then((_response) => {
        setPopUpMessage(SUCCESSFULL_RESOURCE_TYPE_CREATION_MESSAGE);
        setSuccessModalOpen(true);
      })
      .catch((err: string) => {
        setPopUpMessage(err);
        setErrorModalOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleModalClose = () => {
    document.body.classList.remove("no-scroll");
    setModalOpen(false);
  };

  return (
    <div
      className={`fixed h-full w-full left-0 top-0 pointer-events-auto ${
        (!isLoading || !successModalOpen || !errorModalOpen) &&
        "bg-white/10 backdrop-blur-sm"
      }  z-50 flex justify-center items-center`}
    >
      <Modal
        title="Exito"
        icon="SUCCESS"
        message={popUpMessage}
        buttonText="Entendido"
        isOpen={successModalOpen}
        setIsModalOpen={setSuccessModalOpen}
        onClose={() => window.location.reload()}
      />

      <Modal
        title="Error"
        icon="DANGER"
        message={popUpMessage}
        buttonText="Entendido"
        isOpen={errorModalOpen}
        setIsModalOpen={setErrorModalOpen}
      />

      {(!isLoading && (
        <div className="bg-dark-100 p-6 rounded-md relative">
          <div
            className="absolute right-3 top-3 rounded-full p-1 cursor-pointer"
            onClick={() => handleModalClose()}
          >
            <MdClose className="text-xl" />
          </div>

          <Formik
            onSubmit={onFormSubmit}
            validationSchema={validationSchema}
            initialValues={initialValues}
          >
            {({ errors, touched, setFieldValue, values }) => (
              <Form>
                <h2 className="text-2xl font-semibold">
                  Nuevo tipo de recurso
                </h2>

                <div className="relative mt-4">
                  <label htmlFor="name" className="font-semibold">
                    Nombre
                  </label>

                  <Field
                    name="name"
                    type="text"
                    placeholder="IMAGE"
                    className={`bg-dark-200 h-[35px] rounded-sm p-1 border-[1px] outline-none ${
                      (errors.name && "border-red-500") ||
                      "border-gray-600 focus:border-green-500"
                    } w-full mt-1`}
                  />

                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600 absolute bottom-0 text-sm"
                  />
                  <div className="sm:h-[25px] h-[30px]" />
                </div>

                <div className="mt-4">
                  <GlowingButton text="Crear" type="submit" />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )) || <LoadingScreen />}
    </div>
  );
}
