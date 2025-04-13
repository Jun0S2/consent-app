
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@heroui/react";

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
  // 키보드 이벤트 핸들러 추가 (접근성 위반 수정)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && suggestions[highlightedIndex]) {
      handleSelect(suggestions[highlightedIndex]);
    }
  };

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
        // status={validationError ? "error" : "default"} // Display error styling if validation fails
        // helperText={validationError} // Show error message
      />
      {isOpen && suggestions.length > 0 && (
        <div
          id="email-suggestions"
          role="listbox"
          tabIndex={-1}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 1000,
            border: "1px solid #ddd",
            borderRadius: "8px", // Rounded corners for dropdown
            backgroundColor: "white",
            maxHeight: "200px",
            overflowY: "auto",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
          onKeyDown={handleKeyDown} // Handle keyboard events for accessibility
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              role="option"
              aria-selected={index === highlightedIndex}
              tabIndex={0} // Make suggestions focusable
              style={{
                padding: "8px",
                cursor: "pointer",
                backgroundColor:
                  index === highlightedIndex ? "#f0f0f0" : "white",
                borderRadius:
                  index === 0
                    ? "8px 8px 0 0"
                    : index === suggestions.length - 1
                      ? "0 0 8px 8px"
                      : "0", // Rounded edges for first and last item
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => handleSelect(suggestion)}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(suggestion)}
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
