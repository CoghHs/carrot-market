import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

interface SubmitForm {
  department: string;
  why: string;
  money: string;
  introduction: string;
  dreams: string;
  email: string;
}

export default function Joppage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitForm>();
  const [submit, setSubmit] = useState(false);
  const [formData, setFormData] = useState<SubmitForm | null>(null);

  const onSubmit = (data: SubmitForm) => {
    setSubmit(true);
    console.log(data);
    setFormData(data);
  };

  const onInValid = (errors: FieldErrors) => {
    console.log(errors);
  };
  return (
    <div className="w-full h-screen flex justify-center items-center  bg-teal-50">
      <form onSubmit={handleSubmit(onSubmit, onInValid)}>
        <div className="w-[500px] bg-pink-100 px-10 py-4 rounded-2xl border-black border-2 ">
          <header className="text-3xl font-bold py-5 flex justify-center items-center">
            Jop Application Form
          </header>
          <div className="py-4">
            <span className="font-bold">
              What department do you want to work for?
              <span className="text-red-600">{errors.department?.message}</span>
            </span>
            <div className="mt-2 font-semibold text-sm">
              <input
                type="radio"
                id="sales"
                value="Sales"
                {...register("department", {
                  required: "*required",
                })}
              />
              <label htmlFor="sales"> Sales</label>
            </div>
            <div className="font-semibold text-sm">
              <input
                {...register("department")}
                value="Marketing"
                type="radio"
                id="marketing"
              />
              <label htmlFor="marketing"> Marketing</label>
            </div>
            <div className="font-semibold text-sm">
              <input
                {...register("department")}
                value="Accounting"
                type="radio"
                id="accounting"
              />
              <label htmlFor="accounting"> Accounting</label>
            </div>
            <div className="font-semibold text-sm">
              <input
                {...register("department")}
                value="Customer"
                type="radio"
                id="customer"
              />
              <label htmlFor="customer"> Customer Service</label>
            </div>
          </div>
          <div>
            <span className="font-bold">
              Why do you want to join this company?
              <span className="text-red-600">{errors.why?.message}</span>
            </span>
            <div className="mt-2 font-semibold text-sm">
              <input
                type="radio"
                id="money"
                value="Money"
                {...register("why", {
                  required: "*required",
                })}
              />
              <label htmlFor="money"> I want money !</label>
            </div>
            <div className="font-semibold text-sm">
              <input
                {...register("why")}
                value="Company"
                type="radio"
                id="company"
              />
              <label htmlFor="company"> I love this company</label>
            </div>
            <div className="font-semibold text-sm">
              <input
                {...register("why")}
                value="Learn"
                type="radio"
                id="learn"
              />
              <label htmlFor="learn"> I want to learn</label>
            </div>
            <div className="font-semibold text-sm">
              <input {...register("why")} value="Why" type="radio" id="why" />
              <label htmlFor="why"> I don't know why</label>
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <label className="font-bold" htmlFor="salary">
              Salary
            </label>
            <select
              id="salary"
              className="rounded-xl border mt-2"
              {...register("money")}
            >
              <option value="$50K">$50K</option>
              <option value="$100K">$100K</option>
              <option value="$150K">$150K</option>
              <option value="$200K">$200K</option>
            </select>
          </div>
          <div className="flex flex-col mt-4">
            <label className="font-bold" htmlFor="into">
              Intoduce yourself
            </label>
            <input
              {...register("introduction", {
                required: "Please write down your introduction.",
              })}
              className={`rounded-xl border border-black mt-2 ${
                errors.introduction &&
                "border-red-500 focus:border-red-600 border-2 outline-none" // 에러가 있을 때 빨간색 보더 적용
              }`}
              id="into"
              type="text"
            />
            <span className="text-red-600 text-sm font-bold">
              {errors.introduction?.message}
            </span>
          </div>
          <div className="flex flex-col mt-4">
            <label className="font-bold" htmlFor="tell">
              Tell us what your dreams are
            </label>
            <textarea
              {...register("dreams", {
                required: "Please tell us what your dreams are.",
                minLength: {
                  message: "Please write more then 10 characters.",
                  value: 10,
                },
              })}
              className={`rounded-xl resize-none mt-2 border border-black h-24 ${
                errors.dreams &&
                "border-red-500 focus:border-red-600 border-2 outline-none" // 에러가 있을 때 빨간색 보더 적용
              }`}
              id="tell"
            />
            <span className="text-red-600 text-sm font-bold">
              {errors.dreams?.message}
            </span>
          </div>
          <div className="flex flex-col mt-4">
            <label className="font-bold" htmlFor="email">
              Email
            </label>
            <input
              {...register("email", {
                required: "Please write down your email.",
                validate: {
                  onlyNaver: (value) =>
                    value.includes("@naver.com") || "Only @naver.com allowed",
                },
              })}
              className={`mt-2 rounded-xl border border-black mb-3 ${
                errors.email &&
                "border-red-500 focus:border-red-600 border-2 outline-none" // 에러가 있을 때 빨간색 보더 적용
              }`}
              id="email"
              type="email"
            />
            <span className="text-red-600 text-sm font-bold">
              {errors.email?.message}
            </span>
          </div>
          <div className="flex flex-col py-7">
            <button className="w-full bg-yellow-300 py-3 border border-black rounded-xl">
              Give me this job
            </button>
            <div>
              {submit && (
                <div className="text-center mt-4">
                  {formData && <span>{JSON.stringify(formData, null, 2)}</span>}
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
