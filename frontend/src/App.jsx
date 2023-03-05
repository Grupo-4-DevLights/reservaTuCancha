import AppRoutes from "./AppRoutes"
import UserProvider from "./Services/Authentication"

function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>

  )
}

export default App
