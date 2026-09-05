"use client";

import { useState, useRef, ChangeEvent, useMemo } from "react";
import { FaRegUser } from "react-icons/fa6";
import { GoPaperclip } from "react-icons/go";
import { IoBookOutline } from "react-icons/io5";
import { MdOutlineFileUpload, MdOutlineCheckCircle } from "react-icons/md";
import { RiCalendarScheduleLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { useStudentHomework, useTextHelpers, useTsData, domain } from "@/store";

export default function StudentSelfHWorks() {
  const { token } = useTsData();
  const { studentHomework, updateHomeworkAttachment } = useStudentHomework();
  const { toArabicDigits, monthNumberToName } = useTextHelpers();

  const [activeTab, setActiveTab] = useState<"all" | "pending" | "delivered">(
    "all",
  );
  const [loading, setLoading] = useState<Record<number | string, boolean>>({});

  const tabs = [
    { id: "all", label: "الكل" },
    { id: "pending", label: "المعلّقة" },
    { id: "delivered", label: "المُسلّمة" },
  ];

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedHomeworkId, setSelectedHomeworkId] = useState<
    number | string | null
  >(null);

  const [attachedFiles, setAttachedFiles] = useState<
    Record<number | string, File>
  >({});
  const [deliveredHomeworks, setDeliveredHomeworks] = useState<
    Record<number | string, boolean>
  >({});

  const filteredHomeworks = useMemo(() => {
    return studentHomework.filter((item) => {
      const isSubmitted =
        (deliveredHomeworks[item.id] ?? false) || item.attachments.length > 0;

      if (activeTab === "pending") return !isSubmitted;
      if (activeTab === "delivered") return isSubmitted;
      return true;
    });
  }, [studentHomework, activeTab, deliveredHomeworks]);

  const statsData = useMemo(() => {
    const total = studentHomework.length;
    let deliveredCount = 0;

    studentHomework.forEach((item) => {
      const isSubmitted =
        (deliveredHomeworks[item.id] ?? false) || item.attachments.length > 0;
      if (isSubmitted) deliveredCount++;
    });

    const pendingCount = total - deliveredCount;

    return [
      {
        label: "المعلّقة",
        value: toArabicDigits(pendingCount),
        color: "bg-[#FFF4ED] text-[#FF6B00]",
      },
      {
        label: "المُسلّمة",
        value: toArabicDigits(deliveredCount),
        color: "bg-[#E6F9F0] text-[#00B050]",
      },
      {
        label: "الإجمالي",
        value: toArabicDigits(total),
        color: "bg-[#EDF5FF] text-[#0066FF]",
      },
    ];
  }, [studentHomework, deliveredHomeworks, toArabicDigits]);

  const handleAttachmentClick = (homeworkId: number | string) => {
    setSelectedHomeworkId(homeworkId);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && selectedHomeworkId !== null) {
      const chosenFile = files[0];

      setAttachedFiles((prev) => ({
        ...prev,
        [selectedHomeworkId]: chosenFile,
      }));
    }
  };

  const handleSubmitHomework = (homeworkId: number | string) => {
    const fileToUpload = attachedFiles[homeworkId];

    if (!fileToUpload) {
      Swal.fire({
        title: "تنبيه!",
        text: "برجاء اختيار الملف أولاً قبل تسليم الواجب",
        icon: "warning",
        confirmButtonText: "حسناً",
        confirmButtonColor: "#1e3a5f",
      });
      return;
    }

    Swal.fire({
      title: "تأكيد تسليم الواجب",
      text: `هل أنت تأكد من تسليم ملف (${fileToUpload.name})؟`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "نعم، قم بالتسليم",
      cancelButtonText: "إلغاء",
      confirmButtonColor: "#1e3a5f",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading((prev) => ({ ...prev, [homeworkId]: true }));

          const cleanDomain = domain.endsWith("/")
            ? domain.slice(0, -1)
            : domain;
          const formData = new FormData();
          formData.append("files", fileToUpload);

          const uploadRes = await fetch(`${cleanDomain}/api/upload`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          });

          if (!uploadRes.ok) throw new Error("فشل رفع الملف إلى السيرفر");

          const uploadData = await uploadRes.json();
          const uploadedFileId = uploadData[0]?.id;

          const submissionPayload = {
            data: {
              ts_assignment: homeworkId,
              submittedFile: [uploadedFileId],
              statues: "Pending",
              submittedAt: new Date().toISOString(),
            },
          };

          const submitRes = await fetch(`${cleanDomain}/api/ts-submissions`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(submissionPayload),
          });

          if (!submitRes.ok) throw new Error("فشل تسليم الواجب");

          const responseData = await submitRes.json();

          console.log(responseData);

          updateHomeworkAttachment(homeworkId, uploadData[0]);
          setDeliveredHomeworks((prev) => ({
            ...prev,
            [homeworkId]: true,
          }));

          Swal.fire({
            title: "تم التسليم بنجاح!",
            text: "تم رفع الملف وإرسال الواجب للمعلم بنجاح",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          Swal.fire({
            title: "خطأ!",
            text: error.message || "حدث خطأ أثناء التسليم، حاول مرة أخرى",
            icon: "error",
            confirmButtonText: "حسناً",
            confirmButtonColor: "#1e3a5f",
          });
        } finally {
          setLoading((prev) => ({ ...prev, [homeworkId]: false }));
        }
      }
    });
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-8">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="flex flex-col gap-1.5 sm:gap-3">
        <h1 className="text-xl sm:text-2xl font-extrabold text-secondry-color">
          الواجبات اليومية
        </h1>
        <p className="text-xs sm:text-sm text-main-color">
          تتبّع جميع واجباتك المعلّقة والمُسلّمة
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 p-4 bg-white rounded-2xl shadow-sm">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {statsData.map((item, index) => (
            <div
              key={index}
              className={`rounded-xl px-3 sm:px-4 py-2 flex items-center gap-2 flex-1 sm:flex-initial justify-center ${item.color}`}
            >
              <span className="text-xs font-semibold opacity-80 whitespace-nowrap">
                {item.label}
              </span>
              <span className="text-base sm:text-lg font-extrabold">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-full md:w-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(tab.id as "all" | "pending" | "delivered")
                }
                className={`flex-1 md:flex-initial px-3 sm:px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap text-center ${
                  isActive
                    ? "bg-[#1e3a5f] text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {filteredHomeworks.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl text-slate-400">
          <p className="text-base font-semibold">لا توجد واجبات في هذه الفئة</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredHomeworks.map((el) => {
            const attachedFile = attachedFiles[el.id];
            const isSubmitted =
              (deliveredHomeworks[el.id] ?? false) || el.attachments.length > 0;
            const isItemLoading = loading[el.id] ?? false;

            return (
              <div
                key={el.id}
                className="col-span-1 flex flex-col gap-5 bg-white rounded-lg shadow-sm border border-gray-100 p-6"
              >
                <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <div className="w-11 h-11 rounded-xl bg-[#1e3a5f] text-white flex items-center justify-center">
                      <IoBookOutline className="text-2xl text-white" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h1 className="text-[#1e3a5f] text-sm font-extrabold">
                        {el.title}
                      </h1>
                      <h2 className="text-xs text-second-texty-color">
                        {el.subject}
                      </h2>
                    </div>
                  </div>

                  <div
                    className={`px-3 py-1.5 flex justify-center items-center gap-1.5 rounded-xl text-xs font-bold ${
                      isSubmitted
                        ? "text-emerald-600 bg-emerald-100"
                        : "text-rose-600 bg-rose-100"
                    }`}
                  >
                    {isSubmitted ? (
                      <>
                        <span>تم التسليم</span>
                        <MdOutlineCheckCircle className="text-sm" />
                      </>
                    ) : (
                      <span>لم يسلم</span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-second-texty-color font-bold lg:w-3/4 leading-7">
                  {el.description}
                </p>

                <div className="flex flex-col items-start gap-2">
                  <div className="flex justify-center items-center gap-1.5 text-second-texty-color">
                    <FaRegUser />
                    <span>أ/ {el.teacher}</span>
                  </div>
                  <div className="flex justify-center items-center gap-1.5 text-second-texty-color">
                    <RiCalendarScheduleLine />
                    <span>تاريخ التسليم: {monthNumberToName(el.dueDate)}</span>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-2 pt-3 border-t border-slate-100">
                  {isSubmitted ? (
                    <>
                      <button
                        disabled
                        className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-1.5 flex-1 justify-center cursor-not-allowed opacity-80"
                      >
                        <GoPaperclip className="shrink-0" />
                        <span>تحميل المرفقات</span>
                      </button>
                      <button
                        disabled
                        className="bg-emerald-100 text-emerald-600 px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-1.5 flex-1 justify-center cursor-not-allowed"
                      >
                        <MdOutlineCheckCircle className="text-base" />
                        <span>تم التسليم</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        disabled={isItemLoading}
                        onClick={() => handleAttachmentClick(el.id)}
                        title={
                          attachedFile ? attachedFile.name : "اختيار ملف المرفق"
                        }
                        className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-slate-200 transition-colors duration-200 flex items-center gap-1.5 flex-1 justify-center cursor-pointer min-w-0 overflow-hidden disabled:opacity-50"
                      >
                        <GoPaperclip className="shrink-0" />
                        <span className="truncate max-w-37.5 sm:max-w-50">
                          {attachedFile
                            ? attachedFile.name
                            : "اختيار ملف المرفق"}
                        </span>
                      </button>
                      <button
                        disabled={isItemLoading}
                        onClick={() => handleSubmitHomework(el.id)}
                        className="bg-[#1e3a5f] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#162d4a] transition-colors duration-200 flex items-center gap-1.5 flex-1 justify-center cursor-pointer disabled:opacity-50"
                      >
                        <MdOutlineFileUpload />
                        {isItemLoading ? "جاري الرفع..." : "تسليم الواجب"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
