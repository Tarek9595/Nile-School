"use client";

import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { domain, useTsData, useLoader } from "@/store/index";
import { useRouter } from "next/navigation";
import { FaBell, FaRegEye, FaRegEyeSlash, FaSchool } from "react-icons/fa6";
import { GoShieldCheck } from "react-icons/go";
import { useState } from "react";

interface LoginFormValues {
  identifier: string;
  password: string;
  rememberMe: boolean;
}

export default function Login() {
  const { startLoadingNavigation } = useLoader();
  const { setToken, setSystemRole, setUserData } = useTsData();
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);

  const loginSchema = Yup.object().shape({
    identifier: Yup.string().required("هذا الحقل مطلوب"),
    password: Yup.string()
      .required("كلمة المرور مطلوبة")
      .min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل")
      .matches(/[0-9]/, "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل"),
    rememberMe: Yup.boolean(),
  });

  const initialValues = {
    identifier: "",
    password: "",
    rememberMe: false,
  };

  const handleLogin = (values: LoginFormValues) => {
    startLoadingNavigation(async () => {
      const data = {
        identifier: values.identifier,
        password: values.password,
      };

      const loginUrl = domain + `api/auth/local`;

      const loginRes = await axios.post(loginUrl, data);
      const jwt = loginRes.data.jwt;
      setToken(jwt);

      const userUrl = `${domain}api/users/me?populate[ts_teacher][populate]=*&populate[ts_student][populate]=*`;
      const userRes = await axios.get(userUrl, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      let currentUserData = null;
      let role = null;

      if (userRes.data.ts_teacher) {
        currentUserData = userRes.data.ts_teacher;
        role = userRes.data.ts_teacher.tsRole;
      } else if (userRes.data.ts_student) {
        currentUserData = userRes.data.ts_student;
        role = userRes.data.ts_student.tsRole;
      }

      if (role && currentUserData) {
        setUserData(currentUserData);
        setSystemRole(role);
        router.push(`/${role.toLowerCase()}`);
      }
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      <div
        className="bg-main-color w-full lg:w-[35%] xl:w-[30%] p-5 sm:p-8 md:p-12 text-white flex flex-col justify-between gap-6 lg:gap-0"
        dir="rtl"
      >
        <div className="flex flex-col gap-4 sm:gap-10">
          <div className="w-full flex items-center gap-2.5 sm:gap-3">
            <span className="p-2 sm:p-2.5 rounded-lg bg-secondry-color flex justify-center items-center text-base sm:text-lg">
              <FaSchool />
            </span>
            <h1 className="font-bold text-lg sm:text-2xl">
              مدرسة النيل الحديثة
            </h1>
          </div>

          <div className="flex flex-col gap-2 sm:gap-3">
            <p className="text-xl sm:text-3xl lg:text-4xl font-bold leading-tight sm:leading-snug">
              بوابة المعرفة والتواصل الرقمي
            </p>
            <p className="text-[11px] sm:text-sm font-medium text-second-texty-color leading-relaxed">
              نظام متكامل يربط أطراف العملية التعليمية لضمان مستقبل أفضل
              لأبنائنا الطلاب.
            </p>
          </div>
        </div>

        <div className="hidden lg:flex flex-col gap-8">
          <div className="flex flex-col gap-4 sm:gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex shrink-0 justify-center items-center text-xl rounded-full bg-[#50A2FF]/20 text-[#50A2FF]">
                <FaBell />
              </div>
              <div className="flex flex-col">
                <h2 className="text-sm sm:text-base font-bold">
                  تحديثات فورية
                </h2>
                <p className="text-xs sm:text-sm font-medium text-second-texty-color">
                  متابعة حية للدرجات والغياب
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex shrink-0 justify-center items-center text-xl rounded-full bg-[#00D492]/20 text-[#00D492]">
                <GoShieldCheck />
              </div>
              <div className="flex flex-col">
                <h2 className="text-sm sm:text-base font-bold">
                  أمان البيانات
                </h2>
                <p className="text-xs sm:text-sm font-medium text-second-texty-color">
                  تشفير كامل لبيانات الطلاب
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs font-medium text-second-texty-color">
            © ٢٠٢٦ مدرسة النيل الحديثة · النسخة ١.٢.٠
          </p>
        </div>
      </div>

      <div className="flex grow lg:w-[65%] xl:w-[70%] items-center justify-center bg-background px-4 py-6 sm:px-6 md:px-12 lg:px-24">
        <div className="w-full max-w-md" dir="rtl">
          <div className="mb-5 sm:mb-8 text-center lg:text-right">
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-foreground">
              تسجيل الدخول
            </h2>
            <p className="mt-1 sm:mt-2 text-[11px] sm:text-sm text-slate-500">
              مرحباً بك مجدداً، يرجى إدخال بياناتك للوصول إلى حسابك
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="flex flex-col gap-3.5 sm:gap-5">
                <div className="flex flex-col gap-1 sm:gap-1.5">
                  <label className="text-[11px] sm:text-sm text-texty-color font-bold">
                    البريد الإلكتروني
                  </label>
                  <Field
                    name="identifier"
                    type="text"
                    placeholder="example@domain.com"
                    className={`w-full rounded-lg border-2 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm outline-none transition-all ${
                      touched.identifier && errors.identifier
                        ? "border-red-500 focus:border-red-500"
                        : "border-slate-300 focus:border-blue-500"
                    }`}
                  />
                  <ErrorMessage
                    name="identifier"
                    component="p"
                    className="text-[10px] sm:text-xs text-red-500 mt-0.5"
                  />
                </div>

                <div className=" flex flex-col gap-1 sm:gap-1.5">
                  <label className="text-[11px] sm:text-sm text-texty-color font-bold">
                    كلمة المرور
                  </label>
                  <div className="relative">
                    <Field
                      name="password"
                      type={`${showPass ? "text" : "password"}`}
                      placeholder="••••••••"
                      className={`w-full rounded-lg border-2 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm outline-none transition-all ${
                        touched.password && errors.password
                          ? "border-red-500 focus:border-red-500"
                          : "border-slate-300 focus:border-blue-500"
                      }`}
                    />
                    <div
                      className="absolute left-2.5 bottom-2.75 sm:bottom-4 text-main-color/50 cursor-pointer"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? <FaRegEye /> : <FaRegEyeSlash />}
                    </div>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-[10px] sm:text-xs text-red-500 mt-0.5"
                  />
                </div>

                <div className="flex items-center gap-2 self-start my-0.5 sm:my-1">
                  <Field
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    className="h-3.5 w-3.5 sm:h-4 sm:w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="text-[11px] sm:text-xs font-semibold text-slate-600 select-none cursor-pointer"
                  >
                    تذكرني على هذا الجهاز
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-1 w-full rounded-lg bg-blue-600 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div
        className="bg-main-color w-full p-5 sm:p-8 text-white flex lg:hidden flex-col gap-6"
        dir="rtl"
      >
        <div className="flex flex-col gap-3.5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex shrink-0 justify-center items-center text-lg rounded-full bg-[#50A2FF]/20 text-[#50A2FF]">
              <FaBell />
            </div>
            <div className="flex flex-col">
              <h2 className="text-xs sm:text-base font-bold">تحديثات فورية</h2>
              <p className="text-[11px] sm:text-sm font-medium text-second-texty-color">
                متابعة حية للدرجات والغياب
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex shrink-0 justify-center items-center text-lg rounded-full bg-[#00D492]/20 text-[#00D492]">
              <GoShieldCheck />
            </div>
            <div className="flex flex-col">
              <h2 className="text-xs sm:text-base font-bold">أمان البيانات</h2>
              <p className="text-[11px] sm:text-sm font-medium text-second-texty-color">
                تشفير كامل لبيانات الطلاب
              </p>
            </div>
          </div>
        </div>

        <p className="text-[10px] sm:text-xs font-medium text-second-texty-color">
          © ٢٠٢٦ مدرسة النيل الحديثة · النسخة ١.٢.٠
        </p>
      </div>
    </div>
  );
}
