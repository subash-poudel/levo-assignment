import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

import MyCalendar from "./components/MyCalendar";
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MyCalendar />;
    </QueryClientProvider>
  );
}

export default App;
