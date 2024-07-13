"use client";
import { Formik, Form, Field } from "formik";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { loginSchema } from "@/validations/LoginValidations";
import { ErrorMessage } from "formik";
import Modal from "@/components/Modal";
import { useState } from "react";
import GlowingButton from "@/components/GlowingButton";

export default function Login() {
  interface UserCredentials {
    username: string;
    password: string;
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const tryLogin = (formValues: UserCredentials) => {
    //TODO: Pegarle al endpoint de logeo aca
    // Si hay un error abre el modal de error
    setIsModalOpen(true);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={tryLogin}
      >
        {({ errors, touched, resetForm }) => (
          <div className="sm:w-[300px] xl:w-[400px] h-[525px] relative">
            <Modal
              title="Credenciales incorrectas"
              icon="DANGER"
              message="Credenciales incorrectas. Por favor, verifique que tanto su usuario como contraseña sean correctos."
              buttonText="Entendido"
              isOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />

            <div className="w-full h-full absolute bg-black rounded-md blur-xl"></div>

            <Form className="bg-dark-300 p-6 rounded-md h-full z-10 relative">
              <div className=" w-full flex justify-center">
                <Image src={logo} alt="vagosLogo.png" className="w-2/6" />
              </div>

              <div className="text-center">
                <h2 className="font-semibold text-2xl">Ingresá a tu cuenta</h2>
              </div>

              <div className="py-8">
                {/* Username field */}
                <div className="flex flex-col py-3 relative">
                  <label htmlFor="username" className="font-medium mb-1">
                    Nombre de usuario
                  </label>
                  <Field
                    name="username"
                    type="text"
                    className={`bg-dark-200 h-[35px] rounded-sm p-1 border-[1px] outline-none focus:border-green-500 ${
                      errors.username && touched.username
                        ? "border-red-600"
                        : "border-gray-600"
                    }`}
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-600 absolute bottom-0"
                  />
                  <div className="h-[15px]" />
                </div>
                {/* Password field */}
                <div className="flex flex-col py-3 relative">
                  <label htmlFor="password" className="font-medium mb-1">
                    Contraseña
                  </label>
                  <Field
                    name="password"
                    type="password"
                    className={`bg-dark-200 h-[35px] rounded-sm p-1 border-[1px] outline-none focus:border-green-500 ${
                      errors.password && touched.password
                        ? "border-red-600"
                        : "border-gray-600"
                    }`}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 absolute bottom-0"
                  />
                  <div className="h-[15px]" />
                </div>
              </div>

              {/* Send button */}
              <div className="flex justify-center mb-2 group">
                <GlowingButton text="Conectarse" type="submit" />
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}
