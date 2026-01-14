import { toast } from "sonner";

export const showToast = (
  message: string,
  type: "success" | "error" | "regular" | "warning",
  options: React.CSSProperties = {}
) => {
  const toastStyles = {
    "--border-radius": "var(--radius-2xl)",
    ...options,
  };

  if (type === "success") {
    toast.success(message, {
      style: {
        ...toastStyles,
        "--normal-bg": "var(--color-green-500)",
        "--normal-text": "var(--color-green-50)",
        "--normal-border": "var(--color-green-500)",
      } as React.CSSProperties,
    });
  } else if (type === "error") {
    toast.error(message, {
      style: {
        ...toastStyles,
        "--normal-bg": "var(--color-red-500)",
        "--normal-text": "var(--color-red-50)",
        "--normal-border": "var(--color-red-500)",
      } as React.CSSProperties,
    });
  } else if (type === "warning") {
    toast.warning(message, {
      style: {
        ...toastStyles,
        "--normal-bg": "var(--color-orange-500)",
        "--normal-text": "var(--color-orange-50)",
        "--normal-border": "var(--color-orange-500)",
      } as React.CSSProperties,
    });
  } else {
    // Default to "regular"
    toast(message, {
      style: {
        ...toastStyles,
        "--normal-bg": "var(--color-popover)",
        "--normal-text": "var(--color-foreground)",
        "--normal-border": "var(--color-border)",
      } as React.CSSProperties,
    });
  }
};
