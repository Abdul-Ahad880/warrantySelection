// import { useEffect, useState } from "react";
// import {
//   submitSelectedWarranty,
//   getBrands,
//   getModelCategories,
//   getEngineNotes,
//   getCodes,
// } from "./api/selectWarranty.js";

// const WarrantyForm = () => {
//   const [brand, setBrand] = useState("");
//   const [modelCategory, setModelCategory] = useState("");
//   const [engineNotes, setEngineNotes] = useState("");
//   const [selectedCodes, setSelectedCodes] = useState([]);
//   const [result, setResult] = useState(null);

//   const [brands, setBrands] = useState([]);
//   const [modelCategories, setModelCategories] = useState([]);
//   const [engineNotesList, setEngineNotesList] = useState([]);
//   const [codes, setCodes] = useState([]);

//   // Loading States
//   const [loadingBrands, setLoadingBrands] = useState(false);
//   const [loadingModels, setLoadingModels] = useState(false);
//   const [loadingEngines, setLoadingEngines] = useState(false);
//   const [loadingCodes, setLoadingCodes] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     setLoadingBrands(true);
//     getBrands()
//       .then(setBrands)
//       .finally(() => setLoadingBrands(false));
//   }, []);

//   useEffect(() => {
//     setModelCategory("");
//     setEngineNotes("");
//     setSelectedCodes([]);
//     setModelCategories([]);
//     if (brand) {
//       setLoadingModels(true);
//       getModelCategories(brand)
//         .then(setModelCategories)
//         .finally(() => setLoadingModels(false));
//     }
//   }, [brand]);

//   useEffect(() => {
//     setEngineNotes("");
//     setSelectedCodes([]);
//     setEngineNotesList([]);
//     if (brand && modelCategory) {
//       setLoadingEngines(true);
//       getEngineNotes(brand, modelCategory)
//         .then(setEngineNotesList)
//         .finally(() => setLoadingEngines(false));
//     }
//   }, [modelCategory]);

//   useEffect(() => {
//     setSelectedCodes([]);
//     setCodes([]);
//     if (brand && modelCategory && engineNotes) {
//       setLoadingCodes(true);
//       getCodes(brand, modelCategory, engineNotes)
//         .then(setCodes)
//         .finally(() => setLoadingCodes(false));
//     }
//   }, [engineNotes]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setSubmitting(true);
//       const data = { brand, modelCategory, engineNotes, selectedCodes };
//       const response = await submitSelectedWarranty(data);
//       setResult(response);
//     } catch (err) {
//       alert("Error submitting warranty selection.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-gray-800 to-indigo-700 text-white p-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-4xl space-y-6"
//       >
//         <h2 className="text-3xl font-bold text-center text-indigo-300">
//           Warranty Selection
//         </h2>

//         {/* Horizontal Form Fields */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {/* Brand Select */}
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-1">
//               Brand
//             </label>
//             <select
//               value={brand}
//               onChange={(e) => setBrand(e.target.value)}
//               className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
//             >
//               <option value="">Select Brand</option>
//               {loadingBrands ? (
//                 <option disabled>Loading...</option>
//               ) : (
//                 brands.map((b, idx) => (
//                   <option key={idx} value={b}>
//                     {b}
//                   </option>
//                 ))
//               )}
//             </select>
//           </div>

//           {/* Model Category Select */}
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-1">
//               Model Category
//             </label>
//             <select
//               value={modelCategory}
//               onChange={(e) => setModelCategory(e.target.value)}
//               disabled={!modelCategories.length || loadingModels}
//               className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
//             >
//               <option value="">
//                 {loadingModels ? "Loading..." : "Select Model Category"}
//               </option>
//               {modelCategories.map((m, idx) => (
//                 <option key={idx} value={m}>
//                   {m}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Engine Notes Select */}
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-1">
//               Engine Notes
//             </label>
//             <select
//               value={engineNotes}
//               onChange={(e) => setEngineNotes(e.target.value)}
//               disabled={!engineNotesList.length || loadingEngines}
//               className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
//             >
//               <option value="">
//                 {loadingEngines ? "Loading..." : "Select Engine Notes"}
//               </option>
//               {engineNotesList.map((e, idx) => (
//                 <option key={idx} value={e}>
//                   {e}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Codes Checkbox List */}
//         <div className="space-y-3">
//           <p className="font-medium text-gray-200">
//             {loadingCodes ? "Loading Codes..." : "Select Codes:"}
//           </p>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto pr-2">
//             {!loadingCodes &&
//               codes.map((item, idx) => (
//                 <label
//                   key={item._id}
//                   className="flex items-center justify-between p-3 bg-gray-700 rounded-lg border border-gray-600 hover:border-indigo-500 transition-all duration-200"
//                 >
//                   <div className="flex items-center gap-3">
//                     <input
//                       type="checkbox"
//                       value={item.code}
//                       checked={selectedCodes.includes(item.code)}
//                       onChange={(e) => {
//                         if (e.target.checked) {
//                           setSelectedCodes([...selectedCodes, item.code]);
//                         } else {
//                           setSelectedCodes(
//                             selectedCodes.filter((c) => c !== item.code)
//                           );
//                         }
//                       }}
//                       className="form-checkbox h-5 w-5 text-indigo-500 rounded focus:ring-indigo-500"
//                     />
//                     <div>
//                       <p className="text-sm font-semibold text-white">
//                         Code: {item.code}
//                       </p>
//                       <p className="text-xs text-gray-400">
//                         Subsystem: {item.subSystem}
//                       </p>
//                     </div>
//                   </div>
//                 </label>
//               ))}
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={submitting}
//           className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 px-4 py-2 rounded-lg font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {submitting ? "Submitting..." : "Submit"}
//         </button>

//         {/* Result Section */}
//         {result && (
//           <div className="bg-gray-700 mt-6 p-5 rounded-xl border border-gray-600 shadow-lg">
//             <h3 className="text-xl font-semibold mb-3 text-indigo-300">
//               Selected Subsystems
//             </h3>
//             <ul className="space-y-3">
//               {result.selectedSubsystems.map((item, index) => (
//                 <li
//                   key={index}
//                   className="flex justify-between items-center bg-gray-600 p-3 rounded-lg shadow-sm border border-gray-500"
//                 >
//                   <div>
//                     <p className="font-medium text-white">
//                       <span className="text-indigo-400">Code:</span> {item.code}
//                     </p>
//                     <p className="text-sm text-gray-300">
//                       <span className="text-indigo-400">Subsystem:</span>{" "}
//                       {item.subSystem}
//                     </p>
//                   </div>
//                   <span className="text-green-400 font-semibold">
//                     ${item.price}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//             <p className="mt-4 font-bold text-lg text-right">
//               Total: <span className="text-green-300">${result.total}</span>
//             </p>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default WarrantyForm;

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

  const [loadingBrands, setLoadingBrands] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);
  const [loadingEngines, setLoadingEngines] = useState(false);
  const [loadingCodes, setLoadingCodes] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch brands on mount
  useEffect(() => {
    setLoadingBrands(true);
    getBrands()
      .then(setBrands)
      .finally(() => setLoadingBrands(false));
  }, []);

  // Fetch model categories when brand changes
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

  // Fetch engine notes when model category changes
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

  // Fetch codes when engine notes change
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

  // Automatically submit when selectedCodes change
  useEffect(() => {
    const submitData = async () => {
      if (brand && modelCategory && engineNotes && selectedCodes.length > 0) {
        try {
          setSubmitting(true);
          const data = { brand, modelCategory, engineNotes, selectedCodes };
          const response = await submitSelectedWarranty(data);
          setResult(response);
        } catch (err) {
          alert("Error calculating warranty selection.");
        } finally {
          setSubmitting(false);
        }
      } else {
        setResult(null); // Clear result if no codes are selected
      }
    };

    submitData();
  }, [brand, modelCategory, engineNotes, selectedCodes]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-gray-800 to-indigo-700 text-white p-4">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-4xl space-y-6">
        <h2 className="text-3xl font-bold text-center text-indigo-300">
          Warranty Selection
        </h2>

        {/* Horizontal Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Brand Select */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Brand
            </label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
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
          </div>

          {/* Model Category Select */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Model Category
            </label>
            <select
              value={modelCategory}
              onChange={(e) => setModelCategory(e.target.value)}
              disabled={!modelCategories.length || loadingModels}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
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
          </div>

          {/* Engine Notes Select */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Engine Notes
            </label>
            <select
              value={engineNotes}
              onChange={(e) => setEngineNotes(e.target.value)}
              disabled={!engineNotesList.length || loadingEngines}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
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
          </div>
        </div>

        {/* Codes Checkbox List */}
        <div className="space-y-3">
          <p className="font-medium text-gray-200">
            {loadingCodes ? "Loading Codes..." : "Select Codes:"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto pr-2">
            {!loadingCodes &&
              codes.map((item, idx) => (
                <label
                  key={item._id}
                  className="flex items-center justify-between p-3 bg-gray-700 rounded-lg border border-gray-600 hover:border-indigo-500 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      value={item.code}
                      checked={selectedCodes.includes(item.code)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCodes([...selectedCodes, item.code]);
                        } else {
                          setSelectedCodes(
                            selectedCodes.filter((c) => c !== item.code)
                          );
                        }
                      }}
                      className="form-checkbox h-5 w-5 text-indigo-500 rounded focus:ring-indigo-500"
                    />
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Code: {item.code}
                      </p>
                      <p className="text-xs text-gray-400">
                        Subsystem: {item.subSystem}
                      </p>
                    </div>
                  </div>
                </label>
              ))}
          </div>
        </div>

        {/* Result Section */}
        {submitting && (
          <div className="bg-gray-700 mt-6 p-5 rounded-xl border border-gray-600 shadow-lg text-center">
            <p className="text-gray-300">Calculating...</p>
          </div>
        )}
        {result && !submitting && (
          <div className="bg-gray-700 mt-6 p-5 rounded-xl border border-gray-600 shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-indigo-300">
              Selected Subsystems
            </h3>
            <ul className="space-y-3">
              {result.selectedSubsystems.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-600 p-3 rounded-lg shadow-sm border border-gray-500"
                >
                  <div>
                    <p className="font-medium text-white">
                      <span className="text-indigo-400">Code:</span> {item.code}
                    </p>
                    <p className="text-sm text-gray-300">
                      <span className="text-indigo-400">Subsystem:</span>{" "}
                      {item.subSystem}
                    </p>
                  </div>
                  <span className="text-green-400 font-semibold">
                    ${item.price}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-bold text-lg text-right">
              Total: <span className="text-green-300">${result.total}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WarrantyForm;
