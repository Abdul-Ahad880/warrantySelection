import Systems from "../models/systems.js";

export const getSystem = async (req, res) => {
  try {
    const { tier } = req.query;

    if (!tier) {
      return res
        .status(400)
        .json({ message: "Tier is required in query params." });
    }

    // If tier is "Custom", return all systems without filtering
    if (tier.trim() === "Custom") {
      const allSystems = await Systems.find({});
      if (!allSystems.length) {
        return res.status(404).json({ message: "No systems found." });
      }

      const response = allSystems.map((sys) => ({
        _id: sys._id,
        code: sys.code,
        label: sys.label,
      }));

      return res.status(200).json({ systems: response });
    }

    // Convert tier name to field name in schema
    const tierFieldMap = {
      "Eng-Only": "engOnly",
      "Eng+Trans": "engTrans",
      Powertrain: "powertrain",
      "Powertrain Plus": "powertrainPlus",
      Comfort: "comfort",
      Comprehensive: "comprehensive",
    };

    const field = tierFieldMap[tier.trim()];
    if (!field) {
      return res.status(400).json({ message: `Unknown tier '${tier}'` });
    }

    // Query systems where that field is true
    const systems = await Systems.find({ [field]: true });

    if (!systems.length) {
      return res
        .status(404)
        .json({ message: `No systems found for tier '${tier}'` });
    }

    const response = systems.map((sys) => ({
      _id: sys._id,
      code: sys.code,
      label: sys.label,
    }));

    res.status(200).json({ systems: response });
  } catch (error) {
    console.error("Error fetching systems by tier:", error);
    res.status(500).json({ message: "Server error" });
  }
};
