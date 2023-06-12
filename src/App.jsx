import React, { useRef, useState, useEffect } from "react";
import nota10 from "./assets/images/10.jpg";
import nota20 from "./assets/images/20.jpg";
import nota50 from "./assets/images/50.jpg";
import nota100 from "./assets/images/100.jpg";
import linkedin from "./assets/images/linkedin.png";
import github from "./assets/images/github.png";
import instagram from "./assets/images/instagram.png";

import "./App.css";

function App() {
  const containerRef = useRef(null);
  const [valorTela, setValorTela] = useState("");
  const [contadorClick, setContadorClick] = useState(0);
  const [quantidadeNotasIniciais, setQuantidadeNotasIniciais] = useState([
    5, 8, 6, 9,
  ]);
  const [quantidadeNotas, setQuantidadeNotas] = useState([0, 0, 0, 0]);
  const [valorSaque, setValorSaque] = useState(0);
  const [total, setTotal] = useState(
    quantidadeNotasIniciais[0] * 100 +
      quantidadeNotasIniciais[1] * 50 +
      quantidadeNotasIniciais[2] * 20 +
      quantidadeNotasIniciais[3] * 10
  );
  const [error, setError] = useState("");

  const handleKeyPress = (event) => {
    switch (event.key) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
        handleButtonClick(event.key);
        break;
      case "Backspace":
        limpar();
        break;
      case "Escape":
        reiniciar();
        break;
      case "Enter":
        handleConfirmClick();
        break;
      default:
        break;
    }
  };

  const handleButtonClick = (value) => {
    setContadorClick(contadorClick + 1);
    setValorTela((prevState) => prevState + value);
    setQuantidadeNotas([0, 0, 0, 0]);
    if (
      contadorClick >= 5 ||
      valorTela === "Error" ||
      valorTela === "Sucesso"
    ) {
      setValorTela("");
      setContadorClick(0);
    }
  };

  const handleConfirmClick = () => {
    contabilizarSaque();
    setContadorClick(0);
  };

  function contabilizarSaque() {
    let saque = parseInt(valorTela);
    setValorSaque(saque);
    setError("");
    if (!(saque % 10) && saque <= total) {
      setTotal(total - saque);
      while (saque !== 0) {
        if (saque >= 100 && quantidadeNotasIniciais[0] > 0) {
          quantidadeNotas[0]++;
          quantidadeNotasIniciais[0]--;
          saque -= 100;
          setValorTela("");
        } else if (saque >= 50 && quantidadeNotasIniciais[1] > 0) {
          quantidadeNotas[1]++;
          quantidadeNotasIniciais[1]--;
          saque -= 50;

          setValorTela("");
        } else if (saque >= 20 && quantidadeNotasIniciais[2] > 0) {
          quantidadeNotas[2]++;
          quantidadeNotasIniciais[2]--;
          saque -= 20;

          setValorTela("");
        } else if (saque >= 10 && quantidadeNotasIniciais[3] > 0) {
          quantidadeNotas[3]++;
          quantidadeNotasIniciais[3]--;
          saque -= 10;
          setValorTela("");
        }
      }
      setValorTela("Sucesso");
    } else {
      setValorTela("Error");
      setError("* Valor inválido ou não há cédulas disponíveis");
      setValorSaque(0);
    }
  }

  function reiniciar() {
    setValorTela("");
    setQuantidadeNotas([0, 0, 0, 0]);
    setQuantidadeNotasIniciais([5, 8, 6, 9]);
    setValorSaque(0);
    setTotal(1110);
    setError("");
  }

  function limpar() {
    const novoValor = valorTela.slice(0, -1);
    setValorTela(novoValor);
  }

  useEffect(() => {
    containerRef.current.focus();
  }, []);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyPress}
      style={{ outline: "none" }}
    >
      <header>
        <div className="container">
          <a href="#" id="logo">
            LuawynBank
          </a>
          <nav>
            <ul className="navbar">
              <li className="card">
                <img src={nota10} alt="nota de 10 reais" />
                <span id="nota10">{quantidadeNotasIniciais[3]}</span>
              </li>
              <li className="card">
                <img src={nota20} alt="nota de 20 reais" />
                <span id="nota20">{quantidadeNotasIniciais[2]}</span>
              </li>
              <li className="card">
                <img src={nota50} alt="nota de 50 reais" />
                <span id="nota50">{quantidadeNotasIniciais[1]}</span>
              </li>
              <li className="card">
                <img src={nota100} alt="nota de 100 reais" />
                <span id="nota100">{quantidadeNotasIniciais[0]}</span>
              </li>
              <li className="card">
                Total: <span id="total">{total},00</span>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <p id="error">{error === "" ? "" : error}</p>
        <div className="container" id="atm">
          <input type="text" value={valorTela} readOnly id="input" />
          <div className="btn">
            <button className="btn-1" onClick={() => handleButtonClick("1")}>
              1
            </button>
            <button className="btn-1" onClick={() => handleButtonClick("2")}>
              2
            </button>
            <button className="btn-1" onClick={() => handleButtonClick("3")}>
              3
            </button>
            <button className="btn-2" onClick={() => reiniciar()}>
              CANCELAR
              <span id="delete">X</span>
            </button>
          </div>
          <div className="btn">
            <button className="btn-1" onClick={() => handleButtonClick("4")}>
              4
            </button>
            <button className="btn-1" onClick={() => handleButtonClick("5")}>
              5
            </button>
            <button className="btn-1" onClick={() => handleButtonClick("6")}>
              6
            </button>
            <button className="btn-2" onClick={() => limpar()}>
              LIMPAR
              <span id="clear">﹤</span>
            </button>
          </div>
          <div className="btn">
            <button className="btn-1" onClick={() => handleButtonClick("7")}>
              7
            </button>
            <button className="btn-1" onClick={() => handleButtonClick("8")}>
              8
            </button>
            <button className="btn-1" onClick={() => handleButtonClick("9")}>
              9
            </button>
            <button className="btn-2" onClick={() => handleConfirmClick()}>
              CONFIRMAR
              <span id="confirm">O</span>
            </button>
          </div>
          <div className="btn">
            <button className="btn-1">*</button>
            <button className="btn-1" onClick={() => handleButtonClick("0")}>
              0
            </button>
            <button className="btn-1">#</button>
          </div>
        </div>
        <div className="container" id="remove-dinheiro">
          <p style={{ textAlign: "center", paddingBottom: "1rem" }}>Saldo: ∞</p>
          <nav>
            <ul className="navbar">
              <li className="card">
                <img src={nota10} alt="nota de 10 reais" />
                <span id="nota10">{quantidadeNotas[3]}</span>
              </li>
              <li className="card">
                <img src={nota20} alt="nota de 20 reais" />
                <span id="nota20">{quantidadeNotas[2]}</span>
              </li>
              <li className="card">
                <img src={nota50} alt="nota de 50 reais" />
                <span id="nota50">{quantidadeNotas[1]}</span>
              </li>
              <li className="card">
                <img src={nota100} alt="nota de 100 reais" />
                <span id="nota100">{quantidadeNotas[0]}</span>
              </li>
              <li className="card">
                Saque: <span id="total">{valorSaque},00</span>
              </li>
            </ul>
          </nav>
        </div>
      </main>

      <footer>
        <div className="container">
          <div className="social">
            <a href="https://www.instagram.com/luawyn/" target="_blank">
              <img src={instagram} alt="" />
            </a>
            <a href="https://github.com/luawyn" target="_blank">
              <img src={github} alt="" />
            </a>
            <a href="https://www.linkedin.com/in/luawyn/" target="_blank">
              <img src={linkedin} alt="" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
