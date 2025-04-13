"use client";
import React, { useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import NeurotoxinsForm from "./Forms/NeurotoxinsForm";
import Confidential from "./Forms/Confidential";
import WeightProgramForm from "./Forms/WeightManagementForm";
import ChemicalPeelForm from "./Forms//ChemicalPeelsForm";
import DermaFillerForm from "./Forms/DermalFillersForm";
import ClientTreatmentForm from "./Forms/ClientTreatment";
import HIPAAForm from "./Forms/HIPAA";
import SurgeryForm from "./Forms/Surgery";
import MicroNeedling from "./Forms/MicroNeedlingForm";
import { generatePDF } from "../utils/pdfGenerator";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { services } from "./services";

/**
 * Dynamic Form Props
 */
interface DynamicFormProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (formData: Blob) => void; // Collect and pass form data
  formKey: string;
  formHeader: string;
  clientName: string;
  getConsentText: (clientName: string, ...args: any[]) => string;
  sharedData: Record<string, string>;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  isOpen,
  onClose,
  onComplete,
  formKey,
  formHeader,
  clientName,
  sharedData,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({}); // from forms
  const canvasRef = useRef<any>(null);
  // const [otherarea, setOtherArea] = useState("");
  const [initial, setInitial] = useState("");
  const handleFormChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value })); // Update form data
  };
  const renderFormContent = () => {
    switch (formKey) {
      // 이건 필러에
      case "surgery":
        return <SurgeryForm />;
      // 이건 제오민에 있는거임
      case "treatment":
        return <ClientTreatmentForm />;
      case "confidential":
        return <Confidential onChange={handleFormChange} formData={formData} />;
      case "Weight Management":
        return <WeightProgramForm />;
      case "Chemical Peels":
        return (
          <div>
            <ChemicalPeelForm />
            <Input
              isRequired
              className="max-w-xs"
              placeholder="Print your initials here"
              label="Initials"
              type="text"
              value={initial}
              onChange={(e) => setInitial(e.target.value)}
            />
          </div>
        );
      case "hipaa":
        return <HIPAAForm />;
      case "clientTreatment":
        return <ClientTreatmentForm />;
      case "Fillers":
        return <DermaFillerForm />;
      case "Neurotoxins":
        return (
          <>
            <NeurotoxinsForm />
            {/* <Input 
                label="Other areas if applies"
                 type="text" variant="flat" 
                onChange={(e) => setOtherArea(e.target.value)}
              />    */}
          </>
        );
      case "Micro Needling":
        return <MicroNeedling />;
      default:
        return (
          <div className="text-red-500 p-4">
            No form found. Please ask your professional to print out hard copies
          </div>
        );
    }
  };
  const handleSave = async () => {
    try {
      const paths = await canvasRef.current.exportPaths();
      if (paths.length === 0) {
        alert("Signature is required. Please sign before submitting.");
        return;
      }

      const combinedData = { ...sharedData, ...formData };
      const service = services.find((form) => form.name === formKey);

      let consentText = "";

      if (service?.getConsentText) {
        if (formKey === "confidential") {
          consentText = service.getConsentText(
            clientName,
            combinedData.address || "",
            combinedData.city || "",
            combinedData.state || "",
            combinedData.zip || "",
            combinedData.phone || "",
            combinedData.dob || "",
            combinedData.email || "",
            combinedData.coldSores_Yes || "",
            combinedData.coldSores_No || "",
            combinedData.neuroMuscularDisease_Yes || "",
            combinedData.neuroMuscularDisease_No || "",
            combinedData.specialEvent_Yes || "",
            combinedData.specialEvent_No || "",
            combinedData.travelPlans_Yes || "",
            combinedData.travelPlans_No || "",
            combinedData.allergies || "",
            combinedData.previousTreatments || "",
            combinedData.medicalConditions || "",
            combinedData.facialScarring || "",
          );
        } else if (formKey === "Neurotoxins") {
          consentText = service.getConsentText(
            clientName,
            // otherarea
          );
        } else if (formKey === "Chemical Peels") {
          consentText = service.getConsentText(clientName, initial);
        } else {
          consentText = service.getConsentText(clientName);
        }
      } else {
        consentText = "No consent text available for this form.";
      }

      const signatureData = await canvasRef.current.exportImage("png");

      const pdfBlob = generatePDF({
        headerTitle: formHeader,
        subTitle: "Client Informed Consent Form",
        consentText,
        clientName,
        performedBy: "Hyeyeon Park",
        signatureData,
        currentDate: new Date(),
      });

      onComplete(pdfBlob);
      onClose();
    } catch (error) {
      console.error("Error in handleSave:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader> {formHeader} </ModalHeader>
        <ModalBody>
          {renderFormContent()}
          {/* Signature Canvas */}
          <div className="pt-7">
            <ReactSketchCanvas
              strokeColor="black"
              ref={canvasRef}
              style={{ border: "1px solid black", height: "200px" }}
            />
          </div>
          <div className="py-1">
            <Button
              variant="flat"
              onPress={() => canvasRef.current.clearCanvas()}
            >
              Clear Signature
            </Button>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onPress={onClose}>Cancel</Button>
          <Button onPress={handleSave} color="danger">
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DynamicForm;
