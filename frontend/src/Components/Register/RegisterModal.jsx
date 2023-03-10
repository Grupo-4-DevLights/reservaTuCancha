import React from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

function RegisterModal({ isOpen, onClose}) {
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Lógica para enviar el formulario y registrar al usuario
    onClose(); // Cerrar la modal después de registrar al usuario
    navigate("/ingresar"); // Redireccionar a la página de registro
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="flex w-screen justify-center bg-green-800 mt-[40vh] text-white">
      <div className="flex flex-col items-center p-6">
        <h2 className="text-xl font-bold mb-4">Registro completo</h2>
        <button
          className="rounded-lg px-6 py-3 bg-gradient-to-r from-black text-white hover:to-black"
          onClick={handleFormSubmit}
        >
          Iniciar Sesion
        </button>
      </div>
    </Modal>
  );
}

export default RegisterModal;