import {ButtonHTMLAttributes} from "react";
import cls from "./AppButton.module.css";
import {classNames} from "../../helpers/classnames";

export type AppButtonVariant = "success" | "danger" | "warning";

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: AppButtonVariant;
}

const AppButton = ({
  children,
  className,
  variant = "success",
  ...buttonProps
}: AppButtonProps) => {
  return (
    <button
      className={classNames({
        className: cls["button"],
        additional: [className, cls[variant]],
      })}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default AppButton;
