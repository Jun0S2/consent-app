import React, { useState, useEffect, useRef } from "react";
import { Input } from "@heroui/react";
import { useTheme } from "next-themes";


interface Option {
  key: string;
  label: string;
}

interface SearchableDropdownProps {
  label: string;
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  label,
  options,
  selectedValue,
  onChange,
}) => {
  const [searchText, setSearchText] = useState(selectedValue || "");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchText.toLowerCase())
  );

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

  const handleSelect = (label: string) => {
    onChange(label);
    setSearchText(label);
    setIsOpen(false);
    setHighlightedIndex(0);
  };

  const handleInputChange = (value: string) => {
    setSearchText(value);
    setIsOpen(true);
    setHighlightedIndex(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        Math.min(prev + 1, filteredOptions.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredOptions[highlightedIndex]) {
        handleSelect(filteredOptions[highlightedIndex].label);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} style={{ position: "relative" }}>
      <Input
        label={label}
        placeholder="Type to search..."
        value={searchText}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {isOpen && filteredOptions.length > 0 && (
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
          {filteredOptions.map((option, index) => (
            <div
              key={option.key}
              role="option"
              tabIndex={0}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => handleSelect(option.label)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleSelect(option.label)
              }
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
                    : index === filteredOptions.length - 1
                    ? "0 0 8px 8px"
                    : "0",
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
