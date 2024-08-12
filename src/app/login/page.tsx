"use client";
import { Formik, Form, Field } from "formik";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { loginSchema } from "@/validations/LoginValidations";
import { ErrorMessage } from "formik";
import Modal from "@/components/Modal/Modal";
import { useEffect, useState } from "react";
import GlowingButton from "@/components/GlowingButton/GlowingButton";
import {
  ROLENAME,
  STATUS_CODE_NOT_FOUND,
  STATUS_CODE_UNAUTHORIZED,
  USERNAME,
} from "@/constants";
import axiosInstance from "@/axios";
import { getEnvironmentVariable } from "@/utils";
import { ApiUser } from "@/apiInterfaces";
import { ApiResponse } from "@/interfaces";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  interface UserCredentials {
    username: string;
    password: string;
  }

  const router = useRouter();
  const apiBaseUrl = getEnvironmentVariable("NEXT_PUBLIC_BACKEND_BASE_URL");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: "",
    message: "",
  });

  const tryLogin = (formValues: UserCredentials) => {
    axiosInstance
      .post(`${apiBaseUrl}/api/auth/login`, formValues)
      .then(
        (response: AxiosResponse<ApiResponse<ApiUser>, UserCredentials>) => {
          localStorage.setItem(USERNAME, response.data.data[0].username);
          localStorage.setItem(ROLENAME, response.data.data[0].role.name);
          router.push("/");
        }
      )
      .catch((err) => {
        const statusCode: number = err.response.status;

        if (
          [STATUS_CODE_NOT_FOUND, STATUS_CODE_UNAUTHORIZED].includes(statusCode)
        ) {
          setModalInfo({
            title: "Credenciales incorrectas",
            message: `Credenciales incorrectas. Por favor, 
            verifique que tanto su usuario como contraseña sean correctos`,
          });
        } else {
          setModalInfo({
            title: "Error inesperado",
            message:
              "Ha ocurrido un error inesperado. Por favor intente nuevamente.",
          });
        }

        console.error(`The following error has ocurred while trying to login:
          ${err.response.data.message || err.message}`);

        setIsModalOpen(true);
      });
  };

  useEffect(() => {
    // If you are already loged in i redirect you to the previous page
    if (localStorage.getItem(USERNAME)) {
      router.back();
    }

    setIsLoaded(true);
  }, []);

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
          <div className="sm:w-[300px] xl:w-[400px] w-[250px] h-[500px] sm:h-[525px] relative">
            <Modal
              title={modalInfo.title}
              icon="DANGER"
              message={modalInfo.message}
              buttonText="Entendido"
              isOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />

            {/* Neon effect */}
            <div
              className="w-[100%] h-[100%]  
            absolute blur-sm overflow-hidden"
            >
              <div
                className={`w-[260%] xl:w-[200%] aspect-square absolute
              bg-gradient-to-b translate from-red-500 to-white via-orange-500
               top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-absolute-spin
               ${isLoaded ? "animate-absolute-spin" : "animate-absolute-unfold"}
              `}
              />
            </div>

            <Form className="bg-dark-300 p-6 rounded-md h-full z-10 relative animate-unfold-step-by-step">
              <div className=" w-full flex justify-center">
                <Image src={logo} alt="vagosLogo.png" className="w-2/6" />
              </div>

              <div className="text-center">
                <h2 className="font-semibold text-2xl">Ingresá a tu cuenta</h2>
              </div>

              <div className="sm:py-8 py-3">
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
                    className="text-red-600 absolute bottom-0 text-sm"
                  />
                  <div className="sm:h-[15px] h-[30px]" />
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
                    className="text-red-600 absolute bottom-0 text-sm"
                  />
                  <div className="sm:h-[15px] h-[30px]" />
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
