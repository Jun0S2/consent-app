"use client";
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@heroui/react";
import { useTheme } from "next-themes";

const emailDomains = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "icloud.com",
  "hotmail.com",
];

interface EmailAutocompleteProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  validationError?: string;
}

const EmailAutocomplete: React.FC<EmailAutocompleteProps> = ({
  label,
  value,
  onChange,
  validationError,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);

    if (inputValue.includes("@")) {
      const [localPart, domainPart] = inputValue.split("@");
      const filteredSuggestions = emailDomains
        .filter((domain) => domain.startsWith(domainPart))
        .map((domain) => `${localPart}@${domain}`);
      setSuggestions(filteredSuggestions);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (suggestion: string) => {
    onChange(suggestion);
    setSuggestions([]);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      style={{ position: "relative", marginBottom: "1rem" }}
    >
      <Input
        label={label}
        placeholder="Enter your email"
        value={value}
        onChange={handleInputChange}
        errorMessage={validationError ? "Invalid email" : undefined}
      />
      {isOpen && suggestions.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 1000,
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: isDark ? "#1f2937" : "white",
            color: isDark ? "#f9fafb" : "#111827",
            maxHeight: "200px",
            overflowY: "auto",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              role="option"
              aria-selected={index === highlightedIndex}
              tabIndex={0}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => handleSelect(suggestion)}
              onKeyDown={(e) => e.key === "Enter" && handleSelect(suggestion)}
              style={{
                padding: "8px",
                cursor: "pointer",
                backgroundColor:
                  index === highlightedIndex
                    ? isDark
                      ? "#374151"
                      : "#f0f0f0"
                    : isDark
                      ? "#1f2937"
                      : "white",
                color: isDark ? "#f9fafb" : "#111827",
                borderRadius:
                  index === 0
                    ? "8px 8px 0 0"
                    : index === suggestions.length - 1
                      ? "0 0 8px 8px"
                      : "0",
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmailAutocomplete;
