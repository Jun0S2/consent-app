
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@heroui/react";

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
  // selectedValue,
  onChange,
}) => {
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchText.toLowerCase()),
  );

  // Close dropdown when clicking outside
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

  // Handle dropdown option selection
  const handleSelect = (label: string) => {
    onChange(label);
    setSearchText(label);
    setIsOpen(false);
    setHighlightedIndex(0); // Reset the highlighted index
  };

  // Handle input changes
  const handleInputChange = (value: string) => {
    setSearchText(value);
    setIsOpen(true);
    setHighlightedIndex(0); // Reset highlighted index when filtering
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) =>
        Math.min(prevIndex + 1, filteredOptions.length - 1),
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
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
    <div 
      ref={dropdownRef} 
      style={{ position: "relative" }}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-owns="dropdown-options"
      aria-controls="dropdown-options" // 추가된 속성
    >
      <Input
        label={label}
        placeholder="Type to search..."
        value={searchText}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-autocomplete="list"
        aria-controls="dropdown-options"
      />
      {isOpen && filteredOptions.length > 0 && (
        <div
          id="dropdown-options"
          role="listbox"
          tabIndex={-1} // Make the dropdown focusable
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 1000,
            border: "1px solid #ddd",
            borderRadius: "8px", // Soften border radius
            backgroundColor: "white",
            maxHeight: "200px",
            overflowY: "auto",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          {filteredOptions.map((option, index) => (
            <div
              key={option.key}
              role="option"
              aria-selected={index === highlightedIndex}
              tabIndex={0} // Make options focusable
              style={{
                padding: "8px",
                cursor: "pointer",
                backgroundColor:
                  index === highlightedIndex ? "#f0f0f0" : "white",
                borderRadius:
                  index === 0
                    ? "8px 8px 0 0"
                    : index === filteredOptions.length - 1
                      ? "0 0 8px 8px"
                      : "0", // Rounded edges for the first and last item
              }}
              onMouseEnter={() => setHighlightedIndex(index)} // Highlight item on hover
              onClick={() => handleSelect(option.label)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSelect(option.label);
                }
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
