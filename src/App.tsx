import { Translator } from "./components/Translator";
import { InstallPWA } from "./components/InstallPWA";
import { OfflineIndicator } from "./components/OfflineIndicator";

export function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 safe-area-inset">
      <OfflineIndicator />
      <Translator />
      <InstallPWA />
    </div>
  );
}
