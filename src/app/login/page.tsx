"use client";
import { Formik, Form, Field } from "formik";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { loginSchema } from "@/validations/LoginValidations";
import { ErrorMessage } from "formik";

export default function Login() {
  interface UserCredentials {
    username: string;
    password: string;
  }

  const tryLogin = (formValues: UserCredentials) => {};

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
                <div className="w-5/6 relative">
                  <button
                    className="text-white rounded-md p-2 w-full border-[1px] duration-200 relative z-10
                 bg-dark-100 group-hover:text-orange-500 group-hover:border-orange-500 hover:glow-text"
                  >
                    Conectarse
                  </button>

                  <button
                    className="rounded-md w-full absolute top-0 left-0 h-full z-0 blur-sm bg-gradient-to-r
                 from-red-500 to-orange-600 opacity-30 group-hover:opacity-100 duration-300 group-hover:blur-md animate-tilt"
                  />
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}
