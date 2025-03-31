import Homepagefooter from "./Components/Footer/Homepagefooter"
import Header from "./Components/Header/Header"

function App() {
  return (
    <>
    <Header/>

    <div className="min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden"  style={{ backgroundImage: "url('homepage1.png')" }}>

    <div className="content flex flex-col pt-60 pl-10 overflow-hidden">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white px-4 md:px-10 lg:px-20">Your Ultimate <br></br>Student Management Solution</h1>
      <p className="text-lg md:text-xl lg:text-2xl text-white mt-4 px-4 md:px-10 lg:px-20">🔍 Track progress, manage records, and simplify student administration—efficiently and effortlessly.</p>
    </div>
      
    </div> 
    <Homepagefooter/>
    </>
  )
}

export default App
