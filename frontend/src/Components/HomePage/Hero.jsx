export function Hero(){
    return(
        <div>
        <div className="bg-color1 h-[80vh] grid grid-cols-2 items-center">
        <div className="flex justify-center items-center flex-col">
          <div className="w-[60%]">
            <h1 className="text-6xl text-color2 mb-8">Reserva tu cancha</h1>
            <h1 className="text-2xl text-color2 mb-8">
              Busca tu deporte, selecciona tu cancha favorita, tus horarios y reservala for free!😎
            </h1>
            <div className="flex">
              <button className=" bg-color3 p-3 rounded-lg hover:bg-color5 mr-2">
                Ver canchas
              </button>
              <button className=" bg-color3 p-3 rounded-lg hover:bg-color5">
                Ver canchas
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center  items-center">
          <img className="h-[80vh] w-[40vw] mr-24" src="logo_hp.svg" alt="logo" />
        </div>
      </div>
        </div>
    )
}