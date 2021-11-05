import Home from "./components/Home";
import { QueryClient, QueryClientProvider } from 'react-query'
 
 const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <header
        style={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src="/mediakeys.png" width="100" alt="logo" />
      </header>
      <Home />
    </QueryClientProvider>
  );
}

export default App;
