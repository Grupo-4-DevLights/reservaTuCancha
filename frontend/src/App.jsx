import AppRoutes from "./AppRoutes"
import { NavBar } from "./Components/NavBar"
import UserProvider from "./Services/Authentication"

function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>

  )
}

export default App
