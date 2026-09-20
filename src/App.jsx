import Navbar from "./components/navbar"

function App() {

  const isLoggedIn = true;

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
    </>
  )
}

export default App
