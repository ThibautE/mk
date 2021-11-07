import Home from "./components/Home";
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from "react-router-dom";

 const queryClient = new QueryClient()

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <header
			style={{
				marginTop: 10,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
        >
          <img src="/mediakeys.png" width="80" alt="logo" />
        </header>
        <Home />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
