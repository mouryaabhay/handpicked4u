import { Toaster } from "sonner";
import { useTheme } from "@/hooks/use-theme";

export default function ThemedToaster() {
  const { theme } = useTheme();
  return <Toaster position="bottom-right" theme={theme || "system"} richColors />;
}
