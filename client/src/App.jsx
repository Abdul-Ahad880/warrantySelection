import { useEffect, useState } from "react";
import {
  submitSelectedWarranty,
  getBrands,
  getModelCategories,
  getEngineNotes,
  getSystemsByTier,
  getTierDiscount,
} from "./api/selectWarranty.js";

import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";

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

  const [tiers, setTiers] = useState([]);
  const [tier, setTier] = useState("Custom");
  const [tierDiscount, setTierDiscount] = useState(0);

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

    getTierDiscount()
      .then((data) => {
        let tierList = data.tier || [];
        if (!tierList.find((t) => t.tier === "Custom")) {
          tierList = [{ tier: "Custom", discount: "0%" }, ...tierList];
        }
        setTiers(tierList);
        const selected = tierList.find((t) => t.tier === tier);
        setTierDiscount(selected ? parseFloat(selected.discount) : 0);
      })
      .catch(() => alert("Error fetching tiers."));
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
    const selectedTier = tiers.find((t) => t.tier === tier);
    if (selectedTier) {
      setTierDiscount(parseFloat(selectedTier.discount));
    } else {
      setTierDiscount(0);
    }

    if (tier) {
      setLoadingCodes(true);
      getSystemsByTier(tier)
        .then((data) => {
          if (data && Array.isArray(data.systems)) {
            setCodes(data.systems);
            setSelectedCodes(tier === "Custom" ? [] : data.systems.map((item) => item.code));
          } else {
            alert("Unexpected system code response format.");
            setCodes([]);
            setSelectedCodes([]);
          }
        })
        .catch(() => {
          alert("Error fetching systems for selected tier.");
          setCodes([]);
          setSelectedCodes([]);
        })
        .finally(() => setLoadingCodes(false));
    } else {
      setCodes([]);
      setSelectedCodes([]);
    }
  }, [tier]);

  const handleCheckboxChange = (code) => {
    setSelectedCodes((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  useEffect(() => {
    const submitData = async () => {
      if (
        brand &&
        modelCategory &&
        engineNotes &&
        tier &&
        selectedCodes.length
      ) {
        setSubmitting(true);
        try {
          const payload = {
            brand,
            modelCategory,
            engineNotes,
            tier,
            selectedCodes,
          };
          const resp = await submitSelectedWarranty(payload);
          setResult(resp);
        } catch (err) {
          console.error(err);
          alert("Error calculating warranty.");
        } finally {
          setSubmitting(false);
        }
      } else {
        setResult(null);
      }
    };
    submitData();
  }, [brand, modelCategory, engineNotes, tier, selectedCodes]);

  const calculateDiscountedTotal = () => {
    if (!result || !result.total) return null;
    const discount = tierDiscount || 0;
    const total = parseFloat(result.total);
    const discountedTotal = total - (total * discount) / 100;
    return discountedTotal.toFixed(2);
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-4xl p-6 bg-white rounded-2xl shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-center text-blue-900">
            Warranty Selection
          </h2>

          {/* Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Brand */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Brand
              </label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-sky-400 bg-white"
              >
                <option value="">Select Brand</option>
                {loadingBrands ? (
                  <option disabled>Loading...</option>
                ) : (
                  brands.map((b, i) => (
                    <option key={i} value={b}>
                      {b}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Model Category */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Model Category
              </label>
              <select
                value={modelCategory}
                onChange={(e) => setModelCategory(e.target.value)}
                disabled={!modelCategories.length || loadingModels}
                className="w-full px-4 py-2 rounded-lg border border-sky-400 bg-white"
              >
                <option value="">
                  {loadingModels ? "Loading..." : "Select Model Category"}
                </option>
                {modelCategories.map((m, i) => (
                  <option key={i} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Engine Notes */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Engine Notes
              </label>
              <select
                value={engineNotes}
                onChange={(e) => setEngineNotes(e.target.value)}
                disabled={!engineNotesList.length || loadingEngines}
                className="w-full px-4 py-2 rounded-lg border border-sky-400 bg-white"
              >
                <option value="">
                  {loadingEngines ? "Loading..." : "Select Engine Notes"}
                </option>
                {engineNotesList.map((en, i) => (
                  <option key={i} value={en}>
                    {en}
                  </option>
                ))}
              </select>
            </div>

            {/* Tier */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Tier
              </label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-sky-400 bg-white"
              >
                <option value="">Select Tier</option>
                {tiers.map((t, i) => (
                  <option key={i} value={t.tier}>
                    {t.tier} – {t.discount}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Subsystem Checkboxes */}
          <div className="space-y-3">
            <p className="text-blue-900 font-medium">
              {loadingCodes ? "Loading subsystems..." : "Select Subsystems"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto pr-2">
              {!loadingCodes &&
                codes.map((item) => (
                  <label
                    key={item.code}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-sky-400"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedCodes.includes(item.code)}
                        onChange={() => handleCheckboxChange(item.code)}
                        className="form-checkbox h-5 w-5 text-sky-500"
                      />
                      <div>
                        <p className="font-semibold text-blue-900">{item.code}</p>
                        <p className="text-xs text-gray-600">
                          Subsystem: {item.label || "N/A"}
                        </p>
                      </div>
                    </div>
                  </label>
                ))}
            </div>
          </div>

          {/* Results */}
          {submitting && (
            <div className="p-5 bg-gray-50 rounded-xl border border-sky-400 text-center">
              <p className="text-gray-600">Calculating...</p>
            </div>
          )}

          {result && (
            <div className="bg-gray-50 p-5 rounded-xl border border-sky-400 space-y-3">
              <h3 className="text-xl font-semibold text-blue-900">
                Selected Subsystems
              </h3>
              <ul className="space-y-3">
                {result.selectedSubsystems.map((item, i) => (
                  <li
                    key={i}
                    className="flex justify-between bg-white p-3 rounded-lg border border-sky-400"
                  >
                    <div>
                      <p className="font-medium text-blue-900">{item.code}</p>
                      <p className="text-sm text-gray-600">
                        Subsystem: {item.subSystem}
                      </p>
                    </div>
                    <span className="text-green-600 font-semibold">
                      AED {item.price}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between mt-4 font-bold text-lg text-blue-900">
                <p>Total:</p>
                <span className="text-green-600">AED {result.total}</span>
              </div>

              <div className="flex justify-between text-lg text-blue-900">
                <p>Total After Discount:</p>
                <span className="text-green-600">AED {calculateDiscountedTotal()}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WarrantyForm;
