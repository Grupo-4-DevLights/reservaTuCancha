export function Hero(){
  return(
      <div>
      <div className="h-[100vh] sm:grid grid-cols-2 items-center bg-gradient-to-tr from-emerald-800 to-emerald-400">
      <div className="flex justify-center items-center flex-col">
        <div className="w-[70%]">
          <h1 className="text-5xl text-white mb-8 hidden sm:flex font-sans font-bold">Reserva tu cancha😎</h1>
          <h1 className="text-2xl text-white mb-8 mt-10 sm:mt-0">
            Busca tu deporte, selecciona tu cancha, y reservala.
          </h1>
          <div className="flex">
            <button className="hover:bg-emerald-600 font-sans bg-emerald-500 p-4 font-bold text-xl rounded-md text-white">
              Ver deportes
            </button>
          </div>
        </div>
      </div>
      <div className="justify-center items-center hidden sm:flex">
        <img className="w-[35vw] h-[50vh] mr-20" src="sports.png" alt="logo" />
      </div>
    </div>
      </div>
  )
}