import { useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hook/usecurrencyinfo";

function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState("");
  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = () => {
    if (amount === "" || !currencyInfo[to]) {
      setConvertedAmount("");
      return;
    }

    setConvertedAmount(Number(amount) * currencyInfo[to]);
  };

  return (
    <div
      className="relative flex min-h-screen w-full flex-wrap items-center justify-center bg-cover bg-center bg-no-repeat px-4"
      style={{ backgroundImage: "url(https://images.pexels.com/photos/16886249/pexels-photo-16886249.jpeg)" }}
    >
      <div className="absolute inset-0 bg-slate-950/35" />
      <div className="relative w-full max-w-md rounded-lg border border-gray-300 bg-white/35 p-5 backdrop-blur-sm">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            convert();
          }}
        >
          <div className="mb-1 w-full">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={setFrom}
              onAmountChange={setAmount}
              selectedCurrency={from}
            />
          </div>

          <div className="relative h-0.5 w-full">
            <button
              type="button"
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md border-2 border-white bg-blue-600 px-2 py-0.5 text-white"
              onClick={swap}
            >
              Swap
            </button>
          </div>

          <div className="mb-1 w-full">
            <InputBox
              label="To"
              currencyOptions={options}
              amount={convertedAmount}
              onCurrencyChange={setTo}
              selectedCurrency={to}
              amountDisabled
            />
          </div>

          <button type="submit" className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white">
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>

      <footer className="absolute bottom-5 w-full text-center text-xs font-medium tracking-wide text-white/80 drop-shadow">
        © {new Date().getFullYear()} Made by Shaikh Jasir &#10084;
      </footer>
    </div>
  );
}

export default App;
