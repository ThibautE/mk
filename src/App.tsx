import Home from "./components/HomePage";
import { QueryClient, QueryClientProvider } from 'react-query'
import { Routes, Route } from "react-router-dom";
import CreativePage from "./components/CreativePage";

 const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/creative/:creativeId" element={<CreativePage />} />
		</Routes>
    </QueryClientProvider>
  );
}

export default App;
