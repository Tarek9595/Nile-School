"use client";

import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useFormik } from "formik";
import * as Yup from "yup";
import { domain, useTsData } from "@/store/index";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Login() {
  const { token, setToken, systemRole, setSystemRole, setUserData } =
    useTsData();
  const router = useRouter();
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
    rememberMe: "",
  };

  const handleLogin = async (values) => {
    const data = {
      identifier: values.identifier,
      password: values.password,
    };
    const loginUrl = domain + "api/auth/local";

    try {
      const loginRes = await axios.post(loginUrl, data);
      const jwt = loginRes.data.jwt;

      setToken(jwt);

      const userUrl =
        domain + "api/users/me?populate[ts_teacher]=*&populate[ts_student]=*";
      const userRes = await axios.get(userUrl, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      <div className="hidden w-full flex-col justify-between bg-main-color p-12 text-white md:flex md:w-[35%] lg:w-[30%"></div>
      <div className="flex w-full flex-1 items-center justify-center bg-background px-6 py-12 md:px-12 lg:px-24">
        <div className="w-full max-w-md" dir="rtl">
          <div className="mb-8 text-center md:text-right">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              تسجيل الدخول
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              مرحباً بك مجدداً، يرجى إدخال بياناتك للوصول إلى حسابك
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="flex flex-col gap-5">
                <Field
                  name="identifier"
                  type="text"
                  className={`w-full rounded-lg border-2 px-4 py-3 text-sm outline-none transition-all ${
                    touched.identifier && errors.identifier
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-300 focus:border-blue-500"
                  }`}
                />
                <ErrorMessage
                  name="identifier"
                  component="p"
                  className="text-xs text-red-500"
                />
                <Field
                  name="password"
                  type="password"
                  className={`w-full rounded-lg border-2 px-4 py-3 text-sm outline-none transition-all ${
                    touched.identifier && errors.identifier
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-300 focus:border-blue-500"
                  }`}
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-xs text-red-500"
                />
                <div className="flex items-center gap-2 self-start">
                  <Field
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="text-xs font-semibold text-slate-600 select-none"
                  >
                    تذكرني على هذا الجهاز
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
// const loginSchema = Yup.object().shape({
//   identifier: Yup.string()
//     .required("هذا الحقل مطلوب")
//     .test(
//       "emailOrNationalId",
//       "يجب إدخال بريد إلكتروني صحيح أو رقم قومي مكون من 14 رقم",
//       (value) => {
//         if (!value) return false;
//         const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
//         const isNationalId = /^\d{14}$/.test(value);
//         return isEmail || isNationalId;
//       },
//     ),
//   password: Yup.string()
//     .required("كلمة المرور مطلوبة")
//     .min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل")
//     .matches(/[A-Z]/, "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل")
//     .matches(/[0-9]/, "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل")
//     .matches(
//       /[!@#$%^&*(),.?":{}|<>]/,
//       "يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل",
//     ),
//   rememberMe: Yup.boolean(),
// });

// export default function LoginPage() {
//   const formik = useFormik({
//     initialValues: {
//       identifier: "",
//       password: "",
//       rememberMe: false,
//     },
//     validationSchema: loginSchema,
//     onSubmit: (values, { setSubmitting }) => {
//       console.log(values);
//       setSubmitting(false);
//     },
//   });

//   return (
//     <div className="flex min-h-screen w-full flex-col md:flex-row">
//       <div className="hidden w-full flex-col justify-between bg-main-color p-12 text-white md:flex md:w-[35%] lg:w-[30%]">
//         {/* <div className="flex flex-col gap-12">
//           <div className="flex items-center gap-3 self-start">
//             <span className="text-xl font-bold">مدرسة النيل الحديثة</span>
//             <div className="h-10 w-10 rounded-xl bg-blue-600"></div>
//           </div>

//           <div className="flex flex-col gap-4">
//             <h1 className="text-3xl font-extrabold leading-snug lg:text-4xl">
//               بوابة المعرفة <br /> والتواصل الرقمي
//             </h1>
//             <p className="text-sm leading-relaxed text-slate-300">
//               نظام متكامل يربط أطراف العملية التعليمية لضمان مستقبل أفضل
//               لأبنائنا الطلاب.
//             </p>
//           </div>
//         </div>

//         <div className="flex flex-col gap-6">
//           <div className="flex items-center gap-4">
//             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800/50">
//               <span className="h-2 w-2 rounded-full bg-blue-500"></span>
//             </div>
//             <div>
//               <h4 className="font-bold text-sm">تحديثات فورية</h4>
//               <p className="text-xs text-slate-400">
//                 متابعة حية للدرجات والغياب
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800/50">
//               <span className="h-2 w-2 rounded-full bg-blue-500"></span>
//             </div>
//             <div>
//               <h4 className="font-bold text-sm">أمان البيانات</h4>
//               <p className="text-xs text-slate-400">
//                 تشفير كامل لبيانات الطلاب
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="text-xs text-slate-500">
//           © ٢٠٢٤ مدرسة النيل الحديثة • النسخة ١.٢.٠
//         </div> */}
//       </div>

//       <div className="flex w-full flex-1 items-center justify-center bg-background px-6 py-12 md:px-12 lg:px-24">
//         <div className="w-full max-w-md">
//           <div className="mb-8 text-center md:text-right">
//             <h2 className="text-2xl font-bold text-foreground md:text-3xl">
//               تسجيل الدخول
//             </h2>
//             <p className="mt-2 text-sm text-slate-500">
//               مرحباً بك مجدداً، يرجى إدخال بياناتك للوصول إلى حسابك
//             </p>
//           </div>

//           <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
//             <div className="flex flex-col gap-2">
//               <label
//                 htmlFor="identifier"
//                 className="text-xs font-semibold text-slate-700"
//               >
//                 الرقم القومي أو البريد الإلكتروني
//               </label>
//               <input
//                 id="identifier"
//                 name="identifier"
//                 type="text"
//                 placeholder="مثال: ٢٩٥٠١٠١١٢٣٤٥٦٧"
//                 className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition-all ${
//                   formik.touched.identifier && formik.errors.identifier
//                     ? "border-red-500 focus:border-red-500"
//                     : "border-slate-200 focus:border-blue-500"
//                 }`}
//                 value={formik.values.identifier}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//               />
//               {formik.touched.identifier && formik.errors.identifier && (
//                 <span className="text-xs text-red-500">
//                   {formik.errors.identifier}
//                 </span>
//               )}
//             </div>

//             <div className="flex flex-col gap-2">
//               <div className="flex items-center justify-between">
//                 <label
//                   htmlFor="password"
//                   className="text-xs font-semibold text-slate-700"
//                 >
//                   كلمة المرور
//                 </label>
//                 <a
//                   href="#"
//                   className="text-xs font-semibold text-blue-600 hover:underline"
//                 >
//                   نسيت كلمة المرور؟
//                 </a>
//               </div>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 placeholder="••••••••"
//                 className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition-all ${
//                   formik.touched.password && formik.errors.password
//                     ? "border-red-500 focus:border-red-500"
//                     : "border-slate-200 focus:border-blue-500"
//                 }`}
//                 value={formik.values.password}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//               />
//               {formik.touched.password && formik.errors.password && (
//                 <span className="text-xs text-red-500">
//                   {formik.errors.password}
//                 </span>
//               )}
//             </div>

//             <div className="flex items-center gap-2 self-start">
//               <input
//                 id="rememberMe"
//                 name="rememberMe"
//                 type="checkbox"
//                 className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
//                 checked={formik.values.rememberMe}
//                 onChange={formik.handleChange}
//               />
//               <label
//                 htmlFor="rememberMe"
//                 className="text-xs font-semibold text-slate-600 select-none"
//               >
//                 تذكرني على هذا الجهاز
//               </label>
//             </div>

//             <button
//               type="submit"
//               disabled={formik.isSubmitting}
//               className="mt-2 w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
//             >
//               {formik.isSubmitting ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
//             </button>
//           </form>

//           <div className="mt-8 text-center text-xs">
//             <span className="text-slate-500">ليس لديك حساب؟ </span>
//             <a href="#" className="font-semibold text-blue-600 hover:underline">
//               إنشاء حساب جديد الآن
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
