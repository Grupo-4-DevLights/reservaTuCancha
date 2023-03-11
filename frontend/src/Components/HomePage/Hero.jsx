export function Hero(){
  return(
      <div>
      <div className="sm:grid grid-cols-2 items-center bg-gradient-to-tr from-emerald-800 to-emerald-400 h-[88vh]">
      <div className="flex justify-center items-center flex-col">
        <div className="w-[70%] mt-5 mb-5">
          <h1 className="text-5xl text-white mb-5 hidden sm:flex font-sans font-bold">Reserva tu cancha😎</h1>
          <h1 className="text-2xl text-white sm:mt-0">
            Busca tu deporte, selecciona tu cancha, y reservala.
          </h1>
          <div className="flex">
            <button className="hover:bg-emerald-600 font-sans bg-emerald-500 p-4 font-bold text-xl rounded-md text-white mt-5 mb-5">
              Ver deportes
            </button>
          </div>
        </div>
      </div>
      <div className="justify-center items-center hidden sm:flex">
        <img className="mr-20" src="logo.svg" alt="logo" />
      </div>
    </div>
      </div>
  )
}