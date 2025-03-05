import { notification } from "antd";
import { setCookie } from "nookies";

export const handleAuthSuccess = (token: string) => {
  notification.success({
    message: "Success!",
    description: "Redirecting to admin panel...",
    duration: 2,
  });

  setCookie(null, "_token", token, {
    path: "/",
  });

  location.href = "/dashboard";
};

export const handleAuthError = () => {
  notification.error({
    message: "Error!",
    description: "Error during registration",
    duration: 2,
  });
};
