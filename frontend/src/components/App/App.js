import React, { useState, useEffect } from "react";
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Login from "../Login/Login";
import Register from "../Register/Register";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import InfoPopup from "../InfoPopup/InfoPopup";
import InfoPopupUpdate from "../infoPopupUpdate/infoPopupUpdate";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import "./App.css";
import * as api from "../../utils/MainApi";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isInfoPopupPopupOpen, setInfoPopupPopupOpen] = useState(false);
  const [isInfoPopupUpdatePopupOpen, setInfoPopupUpdatePopupOpen] =
    useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    console.log(jwt);
    if (jwt) {
      api
        .getContent(jwt)
        .then((res) => {
          if (res) {
            localStorage.removeItem("allMovies");
            setIsLoggedIn(true);
          }
          navigate(path);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserInfo()
        .then((profileInfo) => {
          setCurrentUser(profileInfo);
        })
        .catch((err) => {
          console.log(err);
        });
      api
        .getMovies()
        .then((cardsData) => {
          console.log(cardsData);
          setSavedMovies(cardsData.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  function handleRegistration({ name, email, password }) {
    api
      .register(name, email, password)
      .then(() => {
        setInfoPopupPopupOpen(true);
        setIsSuccess(true);
        handleAuthorization({ email, password });
      })
      .catch((err) => {
        setInfoPopupPopupOpen(true);
        setIsSuccess(false);
        console.log(err);
      });
  }

  function handleAuthorization({ email, password }) {
    setIsLoading(true);
    api
      .authorize(email, password)
      .then((res) => {
        if (res) {
          setInfoPopupPopupOpen(true);
          setIsSuccess(true);
          localStorage.setItem("jwt", res.token);
          navigate("/movies", { replace: true });
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        setInfoPopupPopupOpen(true);
        setIsSuccess(false);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    api
      .addCard(card)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err);
        handleAuthorizationError(err);
      });
  }

  function handleUpdateProfile(newUserInfo) {
    setIsLoading(true);
    api
      .updateProfileUserInfo(newUserInfo)
      .then((data) => {
        setInfoPopupUpdatePopupOpen(true);
        setIsUpdate(true);
        setCurrentUser(data);
      })
      .catch((err) => {
        setInfoPopupUpdatePopupOpen(true);
        setIsUpdate(false);
        console.log(err);
        handleAuthorizationError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setSavedMovies((state) =>
          state.filter((item) => item._id !== card._id)
        );
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err);
        handleAuthorizationError(err);
      });
  }

  function handleAuthorizationError(err) {
    if (err === "Error: 401") {
      handleSignOut();
    }
  }

  function closeOverlayPopups(event) {
    if (event.target === event.currentTarget) {
      closeAllPopups();
    }
  }

  function closeAllPopups() {
    setInfoPopupPopupOpen(false);
    setInfoPopupUpdatePopupOpen(false);
  }

  const isOpen = isInfoPopupPopupOpen || isInfoPopupUpdatePopupOpen;

  useEffect(() => {
    function closeEscapePopups(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeEscapePopups);
      return () => {
        document.removeEventListener("keydown", closeEscapePopups);
      };
    }
  }, [isOpen]);

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("movies");
    localStorage.removeItem("movieSearch");
    localStorage.removeItem("shortMovies");
    localStorage.removeItem("allMovies");
    localStorage.clear();
    navigate("/");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Routes>
            <Route
              path={"/"}
              element={
                <>
                  <Header loggedIn={isLoggedIn} />
                  <Main />
                  <Footer />
                </>
              }
            />
            <Route
              path={"/signin"}
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Login
                    onAuthorization={handleAuthorization}
                    isLoading={isLoading}
                  />
                )
              }
            />
            <Route
              path={"/signup"}
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Register
                    onRegister={handleRegistration}
                    isLoading={isLoading}
                  />
                )
              }
            />
            <Route path={"*"} element={<NotFound />} />
            <Route
              path={"/movies"}
              element={
                <ProtectedRoute
                  path="/movies"
                  component={Movies}
                  loggedIn={isLoggedIn}
                  savedMovies={savedMovies}
                  handleLikeFilm={handleCardLike}
                  onDeleteCard={handleCardDelete}
                />
              }
            />
            <Route
              path={"/saved-movies"}
              element={
                <ProtectedRoute
                  path="/saved-movies"
                  loggedIn={isLoggedIn}
                  savedMovies={savedMovies}
                  onDeleteCard={handleCardDelete}
                  component={SavedMovies}
                />
              }
            />
            <Route
              path={"/profile"}
              element={
                <ProtectedRoute
                  path="/profile"
                  isLoading={isLoading}
                  signOut={handleSignOut}
                  onUpdateUser={handleUpdateProfile}
                  loggedIn={isLoggedIn}
                  component={Profile}
                />
              }
            />
          </Routes>
          <InfoPopup
            isOpen={isInfoPopupPopupOpen}
            isSuccess={isSuccess}
            onClose={closeAllPopups}
            onCloseOverlay={closeOverlayPopups}
          />
          <InfoPopupUpdate
            isOpen={isInfoPopupUpdatePopupOpen}
            isUpdate={isUpdate}
            onClose={closeAllPopups}
            onCloseOverlay={closeOverlayPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
