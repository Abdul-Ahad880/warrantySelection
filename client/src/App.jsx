import { useEffect, useState } from "react";
import {
  submitSelectedWarranty,
  getBrands,
  getModelCategories,
  getEngineNotes,
  getCodes,
} from "./api/selectWarranty.js";

const WarrantyForm = () => {
  const [brand, setBrand] = useState("");
  const [modelCategory, setModelCategory] = useState("");
  const [engineNotes, setEngineNotes] = useState("");
  const [selectedCodes, setSelectedCodes] = useState([]);
  const [result, setResult] = useState(null);

  const [brands, setBrands] = useState([]);
  const [modelCategories, setModelCategories] = useState([]);
  const [engineNotesList, setEngineNotesList] = useState([]);
  const [codes, setCodes] = useState([]);

  // Loading States
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);
  const [loadingEngines, setLoadingEngines] = useState(false);
  const [loadingCodes, setLoadingCodes] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoadingBrands(true);
    getBrands()
      .then(setBrands)
      .finally(() => setLoadingBrands(false));
  }, []);

  useEffect(() => {
    setModelCategory("");
    setEngineNotes("");
    setSelectedCodes([]);
    setModelCategories([]);

    if (brand) {
      setLoadingModels(true);
      getModelCategories(brand)
        .then(setModelCategories)
        .finally(() => setLoadingModels(false));
    }
  }, [brand]);

  useEffect(() => {
    setEngineNotes("");
    setSelectedCodes([]);
    setEngineNotesList([]);

    if (brand && modelCategory) {
      setLoadingEngines(true);
      getEngineNotes(brand, modelCategory)
        .then(setEngineNotesList)
        .finally(() => setLoadingEngines(false));
    }
  }, [modelCategory]);

  useEffect(() => {
    setSelectedCodes([]);
    setCodes([]);

    if (brand && modelCategory && engineNotes) {
      setLoadingCodes(true);
      getCodes(brand, modelCategory, engineNotes)
        .then(setCodes)
        .finally(() => setLoadingCodes(false));
    }
  }, [engineNotes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const data = { brand, modelCategory, engineNotes, selectedCodes };
      const response = await submitSelectedWarranty(data);
      setResult(response);
    } catch (err) {
      alert("Error submitting warranty selection.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-700 p-8 rounded-xl shadow-lg w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center">Warranty Form</h2>

        {/* Brand Select */}
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Brand</option>
          {loadingBrands ? (
            <option disabled>Loading...</option>
          ) : (
            brands.map((b, idx) => (
              <option key={idx} value={b}>
                {b}
              </option>
            ))
          )}
        </select>

        {/* Model Category Select */}
        <select
          value={modelCategory}
          onChange={(e) => setModelCategory(e.target.value)}
          disabled={!modelCategories.length || loadingModels}
          className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">
            {loadingModels ? "Loading..." : "Select Model Category"}
          </option>
          {modelCategories.map((m, idx) => (
            <option key={idx} value={m}>
              {m}
            </option>
          ))}
        </select>

        {/* Engine Notes Select */}
        <select
          value={engineNotes}
          onChange={(e) => setEngineNotes(e.target.value)}
          disabled={!engineNotesList.length || loadingEngines}
          className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">
            {loadingEngines ? "Loading..." : "Select Engine Notes"}
          </option>
          {engineNotesList.map((e, idx) => (
            <option key={idx} value={e}>
              {e}
            </option>
          ))}
        </select>

        {/* Codes Checkbox List */}
        <div className="space-y-2">
          <p className="font-medium">
            {loadingCodes ? "Loading Codes..." : "Select Codes:"}
          </p>
          {!loadingCodes &&
            codes.map((code, idx) => (
              <label key={idx} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={code}
                  checked={selectedCodes.includes(code)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCodes([...selectedCodes, code]);
                    } else {
                      setSelectedCodes(selectedCodes.filter((c) => c !== code));
                    }
                  }}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span>{code}</span>
              </label>
            ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-md font-semibold disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>

        {/* Result Section */}
        {result && (
          <div className="bg-gray-800 mt-6 p-4 rounded-lg border border-gray-600">
            <h3 className="text-xl font-semibold mb-2">Selected Subsystems:</h3>
            <ul className="space-y-1">
              {result.selectedSubsystems.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.subSystem}</span>
                  <span className="text-green-400">${item.price}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-bold text-lg">
              Total: <span className="text-green-300">${result.total}</span>
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default WarrantyForm;
