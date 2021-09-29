import React from "react";

export default function FormSelect({ title, array, register, callback }) {
  return (
    <div className="form-elem">
      <label htmlFor={title}>{title}</label>
      <select
        id={title}
        {...register(title, { required: true })}
        onChange={(e) => {
          e.preventDefault();
          callback(e.target.value);
        }}
      >
        {array.map((obj) => {
          return (
            <option key={obj.code} value={obj.code}>
              {obj.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
