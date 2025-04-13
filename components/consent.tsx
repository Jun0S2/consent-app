"use client";

// support android app file save 
import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
import JSZip from "jszip";
import { Buffer } from "buffer"; // Capacitor 앱에선 문제 없음


import { title, subtitle } from "@/components/primitives";
import React, { useState, useEffect } from "react";
import { services } from "./services"; // Import services
import { states } from "./states"; // Import states array
import DynamicForm from "./DynamicForm";

import FileSaver from "file-saver";
import EmailAutocomplete from "./EmailAutoComplete";
import SearchableDropdown from "./SearchableDropdown";
import {
  Card,
  Input,
  Checkbox,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  Divider,
} from "@heroui/react";

const Index: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [completedForms, setCompletedForms] = useState<string[]>([]);
  const [savedForms, setSavedForms] = useState<{ key: string; blob: Blob }[]>(
    [],
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false);
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const { saveAs } = FileSaver;
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "Pensylvania",
    zip: "",
    country: "United States",
    phone: "",
    dob: "",
    email: "",
  });
  //   const isFormInputComplete = Object.values(userData).every((value) => value.trim() !== "");
  //   const canOpenForms = isFormInputComplete;
  const canSubmitAll = isAgreed && completedForms.length === selectedKeys.size;
  /** Phone Number Formatter */
  const handlePhoneNumberChange = (value: string) => {
    // Format the phone number as (XXX) XXX-XXXX
    const cleaned = value.replace(/\D/g, ""); // Remove non-numeric characters
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
  };

  /** Handle Which services are being Clicked (it used to be services!) */
  const handleServiceSelection = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((name) => name !== serviceName)
        : [...prev, serviceName],
    );
  };
  /** Open Modal */
  const openFormModal = (formKey: string) => {
    setActiveForm(formKey);
    setIsModalOpen(true);
  };

  const handleFormCompletion = (formKey: string, pdfBlob: Blob) => {
    console.log(`✅ Form Completed: ${formKey}`);
    setSavedForms((prev) => [...prev, { key: formKey, blob: pdfBlob }]);
    setCompletedForms((prev) => [...prev, formKey]);
    console.log("✅ Updated savedForms:", savedForms);
    setIsModalOpen(false);
  };

  const handleSubmitAll = async () => {
    setIsSubmitButtonLoading(true);
  
    if (savedForms.length === 0) {
      alert("🚨 다운로드할 폼이 없습니다. 먼저 폼을 작성해주세요.");
      setIsSubmitButtonLoading(false);
      return;
    }
  
    try {
      const zip = new JSZip();
      savedForms.forEach(({ key, blob }) => {
        zip.file(`${key}_form.pdf`, blob);
      });
  
      console.log("✅ ZIP 파일 생성 중...");
      const zipBlob = await zip.generateAsync({ type: "blob" });
  
      const platform = Capacitor.getPlatform();
      console.log(`📱 Platform: ${platform}`);
  
      if (platform === "web") {
        // ✅ 웹에서는 <a download> 방식
        const url = URL.createObjectURL(zipBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "completed_forms.zip";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
  
        alert("✅ ZIP 파일이 웹에서 다운로드되었습니다!");
      } else {
        // ✅ 앱 (Android/iOS)
        const arrayBuffer = await zipBlob.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString("base64");
  
        // 저장 시도 순서: Documents → External → Data
        const tryDirs = [Directory.Documents, Directory.External, Directory.Data];
        let saved = false;
        let lastError = null;
  
        for (const dir of tryDirs) {
          try {
            const now = new Date();
            const yyyy = now.getFullYear();
            const MM = String(now.getMonth() + 1).padStart(2, "0");
            const dd = String(now.getDate()).padStart(2, "0");
            const hh = String(now.getHours()).padStart(2, "0");
            const mm = String(now.getMinutes()).padStart(2, "0");

            const safeName = `${userData.firstName}_${userData.lastName}`.replace(/\s+/g, "_");
            const fileName = `consent_${yyyy}-${MM}-${dd}_${hh}${mm}_${safeName}.zip`;

            await Filesystem.writeFile({
              path: fileName, // ✅ 동적으로 생성된 파일명 사용
              data: base64,
              directory: dir,
            });
            alert(`✅ Consent Form Saved: ${fileName} (${dir})`);
            console.log(`✅ 저장 성공: ${dir}`);
            saved = true;
            break;
          } catch (err) {
            console.warn(`⚠️ 저장 실패 in ${dir}:`, err);
            lastError = err;
          }
        }
  
        if (!saved) {
          throw lastError ?? new Error("No directory succeeded");
        }
      }
    } catch (error: unknown) {
      let msg = "Unknown error";
    
      if (typeof error === "string") {
        msg = error;
      } else if (error instanceof Error) {
        msg = error.message;
      } else if (typeof error === "object" && error !== null) {
        msg = JSON.stringify(error);
      }
    
      alert(`❌ Failed to Save Consent Form: ${msg}`);
      alert("📂 Failed to Save zip file. Please check your auth or file storage.");
    }
    
  
    setIsSubmitButtonLoading(false);
  };

  const isRowHighlighted = (formKey: string): boolean => {
    const formServiceMap: Record<string, string[]> = {
      confidential: [
        "Neurotoxins",
        "Fillers",
        "Weight Management",
        "Chemical Peels",
        "Micro Needling",
      ],
      hipaa: [
        "Neurotoxins",
        "Fillers",
        "Weight Management",
        "Chemical Peels",
        "Micro Needling",
      ],
      surgery: ["Fillers"],
      treatment: ["Neurotoxins"],
      Fillers: ["Fillers"],
      "Weight Management": ["Weight Management"],
      Neurotoxins: ["Neurotoxins"],
      "Chemical Peels": ["Chemical Peels"],
      "Micro Needling": ["Micro Needling"],
    };

    // Get the services that should highlight the row for the given formKey
    const relatedServices = formServiceMap[formKey] || [];

    // Check if any selected service matches the related services
    return relatedServices.some((service) =>
      selectedServices.includes(service),
    );
  };
  /**
   * Added Parts
   * Monitor which checkboxes are selected and update the selected keys
   */
  React.useEffect(() => {
    updateSelectedKeys(); // Update selected keys whenever services are updated
  }, [selectedServices]);

  const updateSelectedKeys = () => {
    const keys = new Set<string>();
    services.forEach((form) => {
      if (isRowHighlighted(form.name)) {
        keys.add(form.name);
      }
    });
    setSelectedKeys(keys);
  };

  /** PWA */
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("Service Worker Registered"))
        .catch((err) => console.log("Service Worker Registration Failed", err));
    }
  }, []);

  return (
    <div>
      {/* Title */}
      <section className="flex flex-col items-center justify-center gap-4 py-5">
        <div className="inline-block text-center justify-center">
          <span className={title({ color: "pink" })}>K-GLOE&nbsp;</span>
          <span className={title()}>Medical Consent Forms&nbsp;</span>
          <br />
          <div className={subtitle({ class: "mt-2" })}>
            All personal health information will remain strictly confidential.
          </div>
        </div>
      </section>

      <Card className="w-full max-w-[95vw] sm:max-w-2xl px-4 py-6 sm:p-10 mx-auto">
        {/* <Card className="p-10 max-w-4xl mx-auto"> */}
        <h2 className="text-2xl font-semibold pt-2">Personal Information</h2>
        <h1 className="text-md mb-7 ">Please Provide the Following Details</h1>

        <form className="space-y-4">
          <Input
            size="sm"
            label="First Name*"
            value={userData.firstName}
            onChange={(e) =>
              setUserData({ ...userData, firstName: e.target.value })
            }
          />
          <Input
            size="sm"
            label="Last Name*"
            value={userData.lastName}
            onChange={(e) =>
              setUserData({ ...userData, lastName: e.target.value })
            }
          />
          {/* Additional inputs for address, state, etc. */}
          {/* <div className="grid grid-cols-2 gap-4"> */}
          {/* 반응형으로 수정 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <Input
              size="sm"
              label="Address*"
              placeholder="Street Address"
              value={userData.address}
              onChange={(e) =>
                setUserData({ ...userData, address: e.target.value })
              }
            />
            <Input
              size="sm"
              label="City*"
              placeholder="City"
              value={userData.city}
              onChange={(e) =>
                setUserData({ ...userData, city: e.target.value })
              }
            />
            <SearchableDropdown
              label="State*"
              options={states}
              selectedValue={userData.state}
              onChange={(value) => setUserData({ ...userData, state: value })}
            />
            <Input
              size="sm"
              label="Zip Code*"
              placeholder="Zip Code"
              value={userData.zip}
              onChange={(e) =>
                setUserData({ ...userData, zip: e.target.value })
              }
            />
          </div>
          <Input
            size="sm"
            label="Country"
            placeholder="Country"
            value={userData.country}
            onChange={(e) =>
              setUserData({ ...userData, country: e.target.value })
            }
          />
          <Input
            size="sm"
            label="Phone*"
            placeholder="Enter your phone number"
            value={handlePhoneNumberChange(userData.phone)}
            onChange={(e) =>
              setUserData({
                ...userData,
                phone: e.target.value.replace(/\D/g, ""),
              })
            }
          />
          <Input
            size="sm"
            label="Date of Birth*"
            placeholder="Enter your date of birth (MM/DD/YYYY)"
            value={userData.dob}
            onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
          />
          {/* <Input
            size="sm"
            label="Email Address*"
            placeholder="Enter your Email Address"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })} */}
          {/* /> */}
          <EmailAutocomplete
            label="Email Address*"
            value={userData.email}
            onChange={(email) => setUserData({ ...userData, email })}
          />

          <Divider />
          <h2 className="text-2xl font-semibold pt-2">Select Services</h2>
          <p>Please select all services that apply</p>
          <div className="flex flex-wrap gap-2">
            {services
              .filter((service) =>
                [
                  "Neurotoxins",
                  "Fillers",
                  "Chemical Peels",
                  "Weight Management",
                  "Micro Needling",
                ].includes(service.name),
              )
              .map((service) => (
                <Checkbox
                  color="danger"
                  key={service.name}
                  isSelected={selectedServices.includes(service.name)}
                  onChange={() => handleServiceSelection(service.name)}
                >
                  {service.name}
                </Checkbox>
              ))}
          </div>
          <h2 className="text-2xl font-semibold pt-4">Form Status</h2>
          <p>Please fill out the highlighted forms</p>

          <Table
            aria-label="Consent Forms Table"
            selectionMode="multiple"
            selectedKeys={selectedKeys} // Bind selected keys
            color="warning"
          >
            <TableHeader>
              <TableColumn>Form Name</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Action</TableColumn>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.name}>
                  <TableCell>{service.headerTitle}</TableCell>
                  <TableCell>
                    <Chip
                      color={
                        completedForms.includes(service.name)
                          ? "success"
                          : "default"
                      }
                      size="sm"
                      //   variant="ghost"
                    >
                      {completedForms.includes(service.name)
                        ? "Completed"
                        : "Incomplete"}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      isDisabled={
                        completedForms.includes(service.name) ||
                        !selectedKeys.has(service.name)
                      } // Disable if not selected or completed
                      color={
                        completedForms.includes(service.name)
                          ? "default"
                          : "danger"
                      }
                      onClick={() => openFormModal(service.name)}
                    >
                      {completedForms.includes(service.name)
                        ? "Done"
                        : "Fill Form"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Checkbox
            isSelected={isAgreed}
            onChange={(e) => setIsAgreed(e.target.checked)}
            size="md"
            color="danger"
          >
            I have read and agreed to all consent forms.
          </Checkbox>
          <Button
            color="danger"
            className="w-full mt-4"
            isDisabled={!canSubmitAll}
            onClick={handleSubmitAll}
            isLoading={isSubmitButtonLoading}
          >
            Submit All Forms
          </Button>
        </form>
      </Card>
      {isModalOpen && activeForm && (
        <DynamicForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onComplete={(blob) => handleFormCompletion(activeForm, blob)}
          formKey={activeForm}
          formHeader={
            services.find((service) => service.name === activeForm)
              ?.headerTitle || ""
          }
          clientName={`${userData.firstName}, ${userData.lastName}`}
          sharedData={{
            address: userData.address,
            city: userData.city,
            state: userData.state,
            zip: userData.zip,
            phone: userData.phone,
            dob: userData.dob,
            email: userData.email,
          }}
          getConsentText={
            services.find((service) => service.name === activeForm)
              ?.getConsentText!
          }
        />
      )}
    </div>
  );
};

export default Index;
