
import React, { useEffect } from "react";
import { Input, RadioGroup, Radio } from "@heroui/react";

interface ConfidentialProps {
  onChange: (key: string, value: string) => void;
  formData: Record<string, string>; // Pass the form data to maintain the state
}

const Confidential: React.FC<ConfidentialProps> = ({ onChange, formData }) => {
  useEffect(() => {
    // Initialize default values only if not set
    if (!formData.coldSores_No && !formData.coldSores_Yes) {
      onChange("coldSores_No", "X");
      onChange("coldSores_Yes", "");
    }
    if (
      !formData.neuroMuscularDisease_No &&
      !formData.neuroMuscularDisease_Yes
    ) {
      onChange("neuroMuscularDisease_No", "X");
      onChange("neuroMuscularDisease_Yes", "");
    }
    if (!formData.specialEvent_No && !formData.specialEvent_Yes) {
      onChange("specialEvent_No", "X");
      onChange("specialEvent_Yes", "");
    }
    if (!formData.travelPlans_No && !formData.travelPlans_Yes) {
      onChange("travelPlans_No", "X");
      onChange("travelPlans_Yes", "");
    }
  }, [formData, onChange]);

  const handleRadioChange = (key: string, value: string) => {
    const yesKey = `${key}_Yes`;
    const noKey = `${key}_No`;

    if (value === "Yes") {
      onChange(yesKey, "X");
      onChange(noKey, "");
    } else {
      onChange(yesKey, "");
      onChange(noKey, "X");
    }
  };

  const handleInputChange = (key: string, value: string) => {
    onChange(key, value);
  };

  return (
    <>
      <p className="font-bold text-xl">Confidential Patient Information</p>
      <p className="font-bold">
        Do you have any of the following CONTRAINDICATIONS? If so we cannot
        proceed with the treatment today.
      </p>

      <RadioGroup
        onValueChange={(value) => handleRadioChange("coldSores", value)}
        label="Cold sores"
        isRequired
        value={formData.coldSores_Yes === "X" ? "Yes" : "No"} // Reflect current state
      >
        <Radio value="Yes">Yes</Radio>
        <Radio value="No">No</Radio>
      </RadioGroup>

      <RadioGroup
        onValueChange={(value) =>
          handleRadioChange("neuroMuscularDisease", value)
        }
        label="Neuro Muscular Disease (e.g., Myasthenia Gravis, ALS)"
        isRequired
        value={formData.neuroMuscularDisease_Yes === "X" ? "Yes" : "No"}
      >
        <Radio value="Yes">Yes</Radio>
        <Radio value="No">No</Radio>
      </RadioGroup>

      <RadioGroup
        onValueChange={(value) => handleRadioChange("specialEvent", value)}
        label="Special event in the next 2 weeks?"
        isRequired
        value={formData.specialEvent_Yes === "X" ? "Yes" : "No"}
      >
        <Radio value="Yes">Yes</Radio>
        <Radio value="No">No</Radio>
      </RadioGroup>

      <RadioGroup
        onValueChange={(value) => handleRadioChange("travelPlans", value)}
        label="Travelling out of town?"
        isRequired
        value={formData.travelPlans_Yes === "X" ? "Yes" : "No"}
      >
        <Radio value="Yes">Yes</Radio>
        <Radio value="No">No</Radio>
      </RadioGroup>

      <br />

      <p>Do you have any allergies to medications?</p>
      <Input
        label="Allergies"
        placeholder="List allergies"
        value={formData.allergies || ""}
        onChange={(e) => handleInputChange("allergies", e.target.value)}
      />

      <p>Have you had collagen, Botox, or other dermal filler injections?</p>
      <Input
        label="Previous Treatments"
        placeholder="Enter all treatments"
        value={formData.previousTreatments || ""}
        onChange={(e) =>
          handleInputChange("previousTreatments", e.target.value)
        }
      />

      <p>
        List any medical conditions (autoimmune disorders, heart/lung problems,
        skin conditions).
      </p>
      <Input
        label="Medical Conditions"
        placeholder="Enter conditions"
        value={formData.medicalConditions || ""}
        onChange={(e) => handleInputChange("medicalConditions", e.target.value)}
      />

      <p>Do you have any facial scars or keloidal scarring?</p>
      <Input
        label="Facial Scarring"
        placeholder="Yes / No"
        value={formData.facialScarring || ""}
        onChange={(e) => handleInputChange("facialScarring", e.target.value)}
      />
    </>
  );
};

export default Confidential;
