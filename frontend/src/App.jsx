import AppRoutes from "./AppRoutes"
import UserProvider from "./context/userContext"

function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  )
}

export default App
