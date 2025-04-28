import React from 'react';
import Card from './Card';
import SearchInput from './SearchInput';
import DatePicker from './DatePicker';
import Counter from './Counter';
import Button from './Button';

interface UniversalSearchSectionProps {
  title: string;
  searchInputLabel: string;
  searchInputPlaceholder: string;
  onSearchInputChange: (value: string) => void;
  showCheckIn?: boolean;
  checkInLabel?: string;
  checkInValue?: string;
  onCheckInChange?: (value: string) => void;
  showCheckOut?: boolean;
  checkOutLabel?: string;
  checkOutValue?: string;
  onCheckOutChange?: (value: string) => void;
  showGuests?: boolean;
  guestsLabel?: string;
  guestsValue?: number;
  onGuestsChange?: (value: number) => void;
  showRooms?: boolean;
  roomsLabel?: string;
  roomsValue?: number;
  onRoomsChange?: (value: number) => void;
  searchButtonLabel: string;
  onSearch: () => void;
}

const UniversalSearchSection: React.FC<UniversalSearchSectionProps> = ({
  title,
  searchInputLabel,
  searchInputPlaceholder,
  onSearchInputChange,
  showCheckIn = false,
  checkInLabel = '',
  checkInValue = '',
  onCheckInChange = () => {},
  showCheckOut = false,
  checkOutLabel = '',
  checkOutValue = '',
  onCheckOutChange = () => {},
  showGuests = false,
  guestsLabel = '',
  guestsValue = 1,
  onGuestsChange = () => {},
  showRooms = false,
  roomsLabel = '',
  roomsValue = 1,
  onRoomsChange = () => {},
  searchButtonLabel,
  onSearch,
}) => {
  return (
    <div className="bg-primary-900 text-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">{title}</h1>
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <SearchInput
                label={searchInputLabel}
                placeholder={searchInputPlaceholder}
                onSearch={onSearchInputChange}
              />
            </div>
            {showCheckIn && (
              <div>
                <DatePicker
                  label={checkInLabel}
                  selectedDate={checkInValue}
                  onChange={onCheckInChange}
                />
              </div>
            )}
            {showCheckOut && (
              <div>
                <DatePicker
                  label={checkOutLabel}
                  selectedDate={checkOutValue}
                  onChange={onCheckOutChange}
                  minDate={checkInValue}
                />
              </div>
            )}
            {(showGuests || showRooms) && (
              <div>
                <div className={`grid ${showGuests && showRooms ? 'grid-cols-2 gap-2' : ''}`}>
                  {showGuests && (
                    <Counter
                      label={guestsLabel}
                      value={guestsValue}
                      onChange={onGuestsChange}
                      min={1}
                      max={10}
                    />
                  )}
                  {showRooms && (
                    <Counter
                      label={roomsLabel}
                      value={roomsValue}
                      onChange={onRoomsChange}
                      min={1}
                      max={5}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            className="mt-6"
            onClick={onSearch}
          >
            {searchButtonLabel}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default UniversalSearchSection; 