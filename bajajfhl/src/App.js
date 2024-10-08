import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");
  const [result, setResult]  = useState({});
  const [op, setOp] = useState("");
  const [options, setOptions] = useState([
    "Alphabets",
    "Numbers",
    "Highest lowercase alphabet",
  ]);
  const handleSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOpt(selectedOptions);
  };
  const [selectedOpt, setSelectedOpt] = useState([]);
  // Function to validate JSON
  const isValidJson = (input) => {
    try {
      JSON.parse(input);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Function to handle submit
  const handleSubmit = async () => {
    if (!isValidJson(jsonInput)) {
      setError("Invalid JSON format");
      return;
    }
    setError("");
    try {
      console.log("Parsed Input:", JSON.parse(jsonInput));
      const response = await axios.post(
        "https://bajaj-backend-1-8y4m.onrender.com/bfhl",
        JSON.parse(jsonInput)
      );
      const data = response.data;
      setResult(data);
      console.log(result);
      console.log(selectedOpt);
      let output = ""
      if(selectedOpt.includes("Numbers")){
        output += "Numbers : " + String(result["numbers"])
      }
      if(selectedOpt.includes("Highest lowercase alphabet")){
        output += "Highest Lowercase Aphabet : " + String(result["highest_lowercase_alphabet"])
      }
      if(selectedOpt.includes("Alphabets")){
        output +="\nAlphabets : " +String(result["alphabets"])
      }
      setOp(output);
    } catch (err) {
      console.error("Error details:", err);
      setError("API call failed");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>JSON Input and API Interaction</h1>
      <textarea
        rows="4"
        cols="50"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON here..."
      />
      <br />
     
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
      <select multiple value={selectedOpt} onChange={handleSelectChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div>
        Selected: {selectedOpt.join(', ')}
      </div>
    </div>
    <button onClick={handleSubmit}>Submit</button>
    <div className="RESULTS">
      Filtered Response <br />
      {op}

    </div>
   
    </div>
  );
};

export default App;
