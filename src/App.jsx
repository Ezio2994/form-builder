import "./App.scss";
import FormGenerator from "./components/FormGenerator";

export const jsonForm = {
  title: "PayRoll Enquiry",
  description: "Please use this form for any Payroll related enquiries",
  fields: [
    {
      label: "What does your enquiry relate to?",
      id: "enquiryAbout",
      HTMLElement: "select",
      options: [
        "Incorrect Pay",
        "Missing Expences",
        "Change of Bank Details",
        "Change of Address",
        "Others",
      ],
      required: true,
    },
    {
      label: "Date of payslip being queried (if applicable)",
      id: "payslipDate",
      HTMLElement: "input",
      type: "date",
      required: {
        relatedIdField: "enquiryAbout",
        condition: ["Incorrect Pay", "Missing Expences"],
      },
    },
    {
      label: "Query",
      id: "query",
      HTMLElement: "textarea",
      required: true,
    },
  ],
};

function App() {
  return (
    <div className="App">
      <FormGenerator jsonForm={jsonForm} />
    </div>
  );
}

export default App;
