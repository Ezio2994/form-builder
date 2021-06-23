import React, { useState } from "react";
import styles from "./FormGenerator.module.scss";

const FormGenerator = (props) => {
  const { jsonForm } = props;
  const [isRequired, setIsRequired] = useState(null);

  const generateFields = jsonForm
    ? jsonForm.fields.map((field) => {
        if (field.HTMLElement === "select") {
          return (
            <div key={field.id}>
              <label htmlFor={field.id}>{field.label}</label>
              <select name={field.id} id={field.id}>
                <option value=""></option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          );
        } else if (field.HTMLElement === "input") {
          return (
            <div key={field.id}>
              <label htmlFor={field.id}>{field.label}</label>
              <input type={field.type} name={field.id} id={field.id} />
            </div>
          );
        } else if (field.HTMLElement === "textarea") {
          return (
            <div key={field.id}>
              <label htmlFor={field.id}>{field.label}</label>
              <textarea
                name={field.id}
                id={field.id}
                cols="30"
                rows="10"
              ></textarea>
            </div>
          );
        }
      })
    : null;

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsRequired(null);

    const checkForm = jsonForm.fields.map((field) => {
      const condition = document.getElementById(field.required.relatedIdField)
        ? document.getElementById(field.required.relatedIdField)
        : null;

      if (typeof field.required === "object") {
        if (
          field.required.condition.includes(condition ? condition.value : null)
        ) {
          if (e.target[field.id]) {
            if (!e.target[field.id].value) {
              setIsRequired(`${field.label} is required`);
              return false;
            } else {
              return true;
            }
          }
        }
      } else {
        if (field.required) {
          if (e.target[field.id]) {
            if (!e.target[field.id].value) {
              setIsRequired(`${[field.label]} is required`);
              return false;
            } else {
              return true;
            }
          } else {
            return true;
          }
        }
      }
    });

    if (!checkForm.includes(false)) {
      const webForm = {};

      jsonForm.fields.forEach((field) => {
        if (e.target[field.id]) {
          return (webForm[field.label] = e.target[field.id].value);
        }
      });

      console.log(webForm);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{jsonForm.title}</h1>
      <h2>{jsonForm.description}</h2>

      {generateFields}

      <p className={styles.requirementMessage}>{isRequired}</p>

      <button aria-label="submit" type="submit">
        Submit
      </button>
    </form>
  );
};

export default FormGenerator;
