"use client";
import { jsPDF } from "jspdf";

export const generatePDF = ({
  headerTitle,
  subTitle,
  consentText = "",
  clientName,
  performedBy,
  signatureData,
  currentDate,
}: {
  headerTitle: string;
  subTitle?: string;
  consentText: string;
  clientName: string;
  performedBy: string;
  signatureData: string;
  currentDate: Date;
}) => {
  const pdf = new jsPDF("p", "mm", "a4");
  const marginX = 14; // Left & right margins
  const pageWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const textWidth = pageWidth - marginX * 2; // Usable width for text
  const lineHeight = 7; // Line spacing
  let currentY = 20; // Starting position for content

  // Helper to check and handle page overflow
  const checkPageOverflow = (extraHeight = lineHeight) => {
    if (currentY + extraHeight > pageHeight - 20) {
      pdf.addPage();
      currentY = 20; // Reset Y position for the new page
    }
  };

  const renderTextWithBold = (text: string, x: number) => {
    const parts = text.split(/(\*\*.*?\*\*)/); // Split text into bold and normal parts

    let tempY = currentY; // Temporary Y for inline text

    parts.forEach((part) => {
      const isBold = part.startsWith("**") && part.endsWith("**");
      const cleanText = part.replace(/\*\*/g, ""); // Remove bold markers
      const wrappedLines = pdf.splitTextToSize(cleanText, textWidth);

      pdf.setFont("helvetica", isBold ? "bold" : "normal");

      wrappedLines.forEach((line: string) => {
        checkPageOverflow();
        pdf.text(line, x, tempY);
        tempY += lineHeight;
      });
    });

    currentY = tempY; // Update global Y position
  };

  // Render Header
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.text(headerTitle, marginX, currentY);
  currentY += 10;

  pdf.setFontSize(14);
  if (subTitle) {
    pdf.text(subTitle, marginX, currentY);
    currentY += 10;
  }

  // Render Consent Text
  pdf.setFontSize(10);
  const consentLines = consentText.split("\n"); // Split paragraphs into lines
  consentLines.forEach((line) => {
    checkPageOverflow();
    renderTextWithBold(line, marginX);
  });

  currentY += 10;
  pdf.setFont("helvetica", "bold");
  pdf.text(`Client's Name: ${clientName}`, marginX, currentY);
  currentY += 10;

  pdf.text("Client's Signature:", marginX, currentY);
  if (signatureData) {
    pdf.addImage(signatureData, "PNG", marginX + 60, currentY - 5, 60, 20);
  }
  currentY += 30;

  // Add the date and time on the same row
  // const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  pdf.text(
    `Date: ${formattedDate}         Time: ${formattedTime}`,
    marginX,
    currentY,
  );
  currentY += 10;
  // Return generated PDF blob
  return pdf.output("blob");
};
