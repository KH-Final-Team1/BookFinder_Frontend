import React, { useState } from "react";

export default function PriceInput({ value, onChange, onFreeChange }) {
  const [isFree, setIsFree] = useState(false);

  const formattedValue = value
      ? `₩ ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
      : "";

  const handleChange = (event) => {
    let inputValue = event.target.value.replace(/[^\d]/g, "");
    const numericValue = inputValue === "" ? 0 : parseInt(inputValue, 10);
    if (numericValue >= 0 && numericValue <= 100000) {
      onChange(numericValue);
    } else {
      alert("금액은 0원 ~ 100,000사이의 값만 입력 가능합니다.");
    }
  };

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setIsFree(checked);
    if (checked) {
      onChange(0);
    }
    onFreeChange(checked);
  };

  return (
      <div className={'input-price'}>
        <input
            className={"trade-price"}
            placeholder={"금액을 입력해주세요"}
            value={isFree ? "₩ 0" : formattedValue}
            onChange={handleChange}
            disabled={isFree}
        />
        <div className={'free-field'}>
          <input
              type={"checkbox"}
              checked={isFree}
              onChange={handleCheckboxChange}
          />{" "}
          <div>무료</div>
        </div>
      </div>
  );
}
