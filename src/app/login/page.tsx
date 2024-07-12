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
        <Form className="bg-dark-300 p-6 rounded-md sm:w-[300px] xl:w-[400px] shadow-black shadow-2xl">
          <div className=" w-full flex justify-center">
            <Image src={logo} alt="vagosLogo.png" className="w-2/6" />
          </div>

          <div className="text-center">
            <h2 className="font-semibold text-2xl">Ingresá a tu cuenta</h2>
          </div>

          <div className="py-8">
            {/* Username field */}
            <div className="flex flex-col py-3">
              <label htmlFor="username" className="font-medium mb-1">
                Nombre de usuario
              </label>
              <Field
                name="username"
                type="text"
                className="bg-dark-200 h-[35px] rounded-sm p-1 border-[1px] outline-none border-gray-600 focus:border-green-500"
              />
            </div>
            {/* Password field */}
            <div className="flex flex-col py-3">
              <label htmlFor="password" className="font-medium mb-1">
                Contraseña
              </label>
              <Field
                name="password"
                type="password"
                className="bg-dark-200 h-[35px] rounded-sm p-1 border-[1px] outline-none border-gray-600 focus:border-green-500"
              />
            </div>
          </div>

          {/* Send button */}
          <div className="flex justify-center mb-2">
            <button className="bg-orange-400 text-dark-100 rounded-full p-2 w-5/6">
              Conectarse
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
