import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Search, MapPin, Navigation } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { cn } from '../lib/utils';
import _ from 'lodash';
const url = 'https://places.googleapis.com/v1/places:searchText';
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const styles = {
  listContainer: {
    overflow: 'scroll',
    height: '20rem',
    position: 'absolute',
    top: '100%',
    left: '0px',
    zIndex: 100,
    width: '100%',
    background: 'white',
    padding: '1rem',
  },
  listItem: {
    padding: '0.5rem',
    cursor: 'pointer',
    borderBottom: '1px solid #ccc',
    listStyle: 'none',
  },
};

export function SearchBar({ handleSubmit, className }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [fromValue, setFromValue] = useState();
  const [toValue, setToValue] = useState();
  const [recs, setRecs] = useState([]);
  const [focused, setFocused] = useState();

  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);

  const handleExpand = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (fromValue.trim() && toValue.trim()) {
  //     onSearch?.(fromValue, toValue);
  //     setIsExpanded(false);
  //   }
  // };

  const getRecs = _.debounce(async (value) => {
    if (value.trim() === '') {
      setRecs([]);
      return;
    }
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': 'places.formattedAddress,places.location',
      },
      method: 'POST',
      body: JSON.stringify({
        textQuery: value,
      }),
    });

    const { places } = await res.json();
    setRecs(places);
  }, 500);

  return (
    <div
      className={cn(
        'relative transition-all duration-300 ease-out flex center-align',
        isExpanded ? 'w-[480px] h-[150px]' : 'w-[320px] h-12',
        className
      )}
      style={{ width: '100%', marginBottom: '1rem' }}
    >
      {/* Container with background and shadow */}
      <div
        className={cn(
          'absolute inset-0 bg-search-background border border-search-border rounded-xl transition-all duration-300 ease-out',
          isExpanded ? 'shadow-search-expanded' : 'shadow-search hover:shadow-search-expanded'
        )}
      >
        {!isExpanded ? (
          // Collapsed state - single search bar
          <button
            onClick={handleExpand}
            className="w-full h-full flex items-center px-4 gap-3 text-left group"
            type="button"
          >
            <Search
              className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors"
              color="white"
            />
            <span
              className="text-muted-foreground group-hover:text-foreground transition-colors"
              style={{ color: 'white' }}
            >
              Search destinations...
            </span>
          </button>
        ) : (
          // Expanded state - from/to inputs with submit
          <form className="p-4 space-y-3 animate-fade-in">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  ref={fromInputRef}
                  onFocus={() => setFocused('from')}
                  // onBlur={() => setTimeout(() => setFocused(null), 1000)}
                  placeholder="From"
                  // value={fromValue.name}
                  onChange={(e) => {
                    getRecs(e.target.value);
                  }}
                  className="pl-10 bg-input/50 border-search-border focus:border-primary"
                />
                {focused == 'from' && recs?.length ? (
                  <div style={styles.listContainer}>
                    {recs.map((e) => (
                      <li
                        style={styles.listItem}
                        className="rec"
                        onClick={() => {
                          fromInputRef.current.value = e.formattedAddress;
                          setFocused(null);
                          setRecs([]);
                          setFromValue(e.location);
                        }}
                      >
                        {e.formattedAddress}
                      </li>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="relative">
                <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  ref={toInputRef}
                  placeholder="To"
                  onChange={(e) => {
                    getRecs(e.target.value);
                  }}
                  onFocus={() => setFocused('to')}
                  // onBlur={() => setFocused(null)}
                  className="pl-10 bg-input/50 border-search-border focus:border-primary"
                />
                {focused == 'to' && recs?.length ? (
                  <div style={styles.listContainer}>
                    {recs.map((e) => (
                      <li
                        style={styles.listItem}
                        className="rec"
                        onClick={() => {
                          toInputRef.current.value = e.formattedAddress;
                          setFocused(null);
                          setRecs([]);
                          setToValue(e.location);
                        }}
                      >
                        {e.formattedAddress}
                      </li>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
            <Button
              type="button"
              className="w-full bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary transition-all duration-200"
              disabled={!fromValue || !toValue}
              onClick={(e) => {
                e.preventDefault();
                handleSubmit({
                  from: {
                    lat: parseFloat(fromValue?.latitude),
                    lng: parseFloat(fromValue?.longitude),
                  },
                  to: {
                    lat: parseFloat(toValue?.latitude),
                    lng: parseFloat(toValue?.longitude),
                  },
                });
              }}
            >
              <Search className="h-4 w-4 mr-2" />
              Search Routes
            </Button>
            {/* {fromValue && toValue ? ( */}
            <Button
              type="button"
              className="w-full bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary transition-all duration-200"
              onClick={() => {
                fromInputRef.current.value = '';
                toInputRef.current.value = '';
                setFromValue(null);
                setToValue(null);
                handleSubmit(null);
              }}
            >
              Clear
            </Button>
            {/* ) : null} */}
          </form>
        )}
      </div>
    </div>
  );
}
