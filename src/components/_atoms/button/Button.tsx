import type { MyFC } from "@/types"
import type { ButtonProps } from "./Button.types"
import clsx from "clsx"
import styles from "./Button.module.css"

const Button: MyFC<ButtonProps> = ({
  variant = "default",
  isSelected,
  children,
  disabled,
  className,
  ...rest
}) => {
  return (
    <button
      className={clsx(styles.button, className, {
        [styles[variant]]: variant,
        [styles.card_selected]: isSelected,
        [styles.disabled]: disabled,
      })}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
