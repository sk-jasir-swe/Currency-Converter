import { useId } from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectedCurrency = "usd",
  amountDisabled = false,
  currrencyDisabled = false,
  className = "",
}) {
  const id = useId();
  const selectId = `${id}-currency`;
  const isLoading = currencyOptions.length === 0;

  return (
    <div className={`flex rounded-lg bg-white p-3 text-sm ${className}`}>
      <div className="w-1/2">
        <label htmlFor={id} className="mb-2 inline-block text-black/40">{label}</label>
        <input
          id={id}
          type="number"
          className="w-full bg-transparent py-1.5 outline-none"
          placeholder="Amount"
          disabled={amountDisabled}
          value={amount}
          onChange={(event) => onAmountChange && onAmountChange(event.target.value === "" ? "" : Number(event.target.value))}
        />
      </div>

      <div className="flex w-1/2 flex-wrap justify-end text-right">
        <label htmlFor={selectId} className="mb-2 w-full text-black/40">Currency Type</label>
        <select
          id={selectId}
          className="cursor-pointer rounded-lg bg-gray-100 px-1 py-1 outline-none"
          value={selectedCurrency}
          onChange={(event) => onCurrencyChange && onCurrencyChange(event.target.value)}
          disabled={currrencyDisabled || isLoading}
        >
          {isLoading ? (
            <option value={selectedCurrency}>Loading...</option>
          ) : (
            currencyOptions.map((currency) => <option key={currency} value={currency}>{currency}</option>)
          )}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
