import React from "react"
import "./InfoPopup.css"

function InfoPopup(props) {
  return (
    <div
      className={`popup popup_type_tooltip ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onClick={props.onCloseOverlay}
    >
      <div className="popup__container">
        {props.isSuccess ? (
          <>
            <p className="popup__signup-title">
              Вы успешно зарегистрировались!
            </p>
          </>
        ) : (
          <>
            <p className="popup__signup-title">
              Что-то пошло не так. Попробуйте ещё раз!
            </p>
          </>
        )}
        <button
          className="popup__close-btn"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  )
}

export default InfoPopup
