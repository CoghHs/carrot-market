import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

interface LoginForm {
  username: string;
  email: string;
  password: string;
}

export default function Forms() {
  const [isSubmit, setIsSubmit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const onValid = (data: LoginForm) => {
    console.log(data);
    setIsSubmit(true);
  };
  const onInValid = (errors: FieldErrors) => {
    console.log(errors);
  };
  console.log(errors);
  return (
    <form onSubmit={handleSubmit(onValid, onInValid)}>
      <div>
        Name:
        <input
          {...register("username", {
            required: "Please write down your username",
          })}
          type="text"
          placeholder="Username"
        />
        {errors.username?.message}
      </div>
      <div>
        Email:
        <input
          {...register("email", {
            required: "Please write down your email",
            validate: {
              notNaver: (value) =>
                value.includes("@naver.com") || "Only @naver.com allowed",
            },
          })}
          type="email"
          placeholder="Only @naver emails allowed "
        />
        {errors.email?.message}
      </div>

      <div>
        Password
        <input
          {...register("password", {
            required: "Please write down your password",
            minLength: {
              message: "the password should be longer than 10 chars.",
              value: 10,
            },
          })}
          type="password"
          placeholder="min 10 characters"
        />
        {errors.password?.message}
      </div>
      <div>
        {isSubmit ? (
          <div>
            <input type="submit" placeholder="Login" />
            Thank you!
          </div>
        ) : (
          <input type="submit" placeholder="Login" />
        )}
      </div>
    </form>
  );
}
