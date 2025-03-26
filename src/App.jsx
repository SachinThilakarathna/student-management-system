import Body from "./Components/Body/Body"
import Header from "./Components/Header/Header"

function App() {
  return (
    <>
    <Header/>

    <div className="min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden"  style={{ backgroundImage: "url('homepage1.png')" }}>

    <div className="content h-screen flex flex-col pt-80 pl-30 overflow-hidden">
          <h1 className="text-4xl font-semibold text-white">Student Management System</h1>
    </div>
      
      
    </div> 
    </>
  )
}

export default App
