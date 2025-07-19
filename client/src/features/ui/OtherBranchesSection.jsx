import React, { useState, useMemo } from 'react';

const OtherBranchesSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');

  const branches = useMemo(() => [
    {
      id: 1,
      name: "Legazpi Branch",
      city: "Legazpi",
      shortAddress: "Shorehomes Apartment, Rawis",
      fullAddress: "Door 5 Shorehomes Apartment Rawis Legazpi City infront of ltfrb beside kafe rustico",
      phone: "09774630156",
      distance: "5.2 km",
      status: "open",
      hours: "8:00 AM - 8:00 PM",
      icon: "fa-map-marker-alt"
    },
    {
      id: 2,
      name: "Daet Branch", 
      city: "Daet",
      shortAddress: "Ace and Jaja Building, Bagasbas",
      fullAddress: "Ace and Jaja Building, Bagasbas, Philippines, 4600 DAET",
      phone: "0920 914 0071",
      distance: "12.8 km",
      status: "open",
      hours: "8:00 AM - 8:00 PM",
      icon: "fa-map-marker-alt"
    },
    {
      id: 3,
      name: "Guinobatan Branch",
      city: "Guinobatan",
      shortAddress: "Paterno St, Calzada",
      fullAddress: "Door B Paterno St calzada Guinobatan Albay. Near Usurman trading Beside Guinobatan west central school",
      phone: "09456970557",
      distance: "8.5 km",
      status: "open",
      hours: "8:00 AM - 8:00 PM",
      icon: "fa-map-marker-alt"
    },
    {
      id: 4,
      name: "Polangui Branch",
      city: "Polangui",
      shortAddress: "Centro Occidental",
      fullAddress: "Centro Occidental Polangui Albay. Alpapara and Liria Building second floor Door D",
      phone: "0949 136 2045",
      distance: "15.3 km",
      status: "open",
      hours: "8:00 AM - 8:00 PM",
      icon: "fa-map-marker-alt"
    },
    {
      id: 5,
      name: "Daraga Branch",
      city: "Daraga",
      shortAddress: "Daraga Center",
      fullAddress: "Daraga, Albay",
      phone: "0920 914 0071",
      distance: "6.7 km",
      status: "opening-soon",
      hours: "Coming Soon",
      icon: "fa-map-marker-alt"
    },
    {
      id: 6,
      name: "Tabaco Branch",
      city: "Tabaco",
      shortAddress: "Zone 3 Panal",
      fullAddress: "Zone 3 Panal tabaco City Harap ng goyena old compound",
      phone: "09668474667",
      distance: "22.1 km",
      status: "open",
      hours: "8:00 AM - 8:00 PM",
      icon: "fa-map-marker-alt"
    },
    {
      id: 7,
      name: "Sorsogon Branch",
      city: "Sorsogon",
      shortAddress: "346 West District Tugos",
      fullAddress: "346 West District Tugos Sorsogon City. Infront of Sun Tiger or Bigmac Burger",
      phone: "0992-259-3967",
      distance: "45.2 km",
      status: "open",
      hours: "8:00 AM - 8:00 PM",
      icon: "fa-map-marker-alt"
    },
    {
      id: 8,
      name: "Iriga Branch",
      city: "Iriga",
      shortAddress: "APEM-DG Apartment, Zone 4",
      fullAddress: "DOOR 2 APEM -DG Apartment zone 4 San isidro iriga city 4431 beside PCA sa unahan ng Casureco",
      phone: "09770279122",
      distance: "18.9 km",
      status: "open",
      hours: "8:00 AM - 8:00 PM",
      icon: "fa-map-marker-alt"
    }
  ], []);

  const cities = useMemo(() => {
    const uniqueCities = [...new Set(branches.map(branch => branch.city))];
    return uniqueCities.sort();
  }, [branches]);

  const filteredBranches = useMemo(() => {
    return branches.filter(branch => {
      const matchesSearch = branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           branch.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           branch.shortAddress.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCity = selectedCity === 'all' || branch.city === selectedCity;
      return matchesSearch && matchesCity;
    });
  }, [searchTerm, selectedCity, branches]);



  return (
    <section className="other-branches" id="branches">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="sparkle">✨</span>
            Other Branches
            <span className="sparkle">✨</span>
          </h2>
          <p className="section-subtitle">
            Find us in these locations across the region
          </p>
        </div>

        {/* Enhanced Search and Filter Controls */}
        <div className="branches-controls">
          <div className="search-control">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search by branch name, city, or area..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="branch-search-input"
            />
            {searchTerm && (
              <button 
                className="clear-search"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
          
          <div className="filter-control">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="city-filter-select"
            >
              <option value="all">All Cities</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="search-results-info">
          <span className="results-count">
            {filteredBranches.length} {filteredBranches.length === 1 ? 'branch' : 'branches'} found
          </span>
          {searchTerm && (
            <span className="search-term">for "{searchTerm}"</span>
          )}
        </div>
        
        <div className="branches-grid">
          {filteredBranches.map((branch) => (
            <div key={branch.id} className="magic-branch-card">
              <div className="branch-header">
                <div className="branch-icon">
                  <i className={`fas ${branch.icon}`}></i>
                </div>
                <div className="branch-status-badges">
                  <span className="distance-badge">
                    <i className="fas fa-route"></i>
                    {branch.distance}
                  </span>
                </div>
              </div>

              <div className="branch-info">
                <h3 className="branch-name">{branch.name}</h3>
                
                <div className="branch-details">
                  <p className="branch-address">
                    <i className="fas fa-map-marker-alt"></i>
                    <span className="address-text">
                      <strong>{branch.shortAddress}</strong>
                      <small className="full-address">{branch.fullAddress}</small>
                    </span>
                  </p>
                  
                  <p className="branch-hours">
                    <i className="fas fa-clock"></i>
                    {branch.hours}
                  </p>
                  
                  {branch.phone && (
                    <p className="branch-phone">
                      <i className="fas fa-phone"></i>
                      <a href={`tel:${branch.phone}`} className="phone-link">
                        {branch.phone}
                      </a>
                    </p>
                  )}
                </div>


              </div>

              <div className="branch-sparkles">
                <span className="sparkle">🏢</span>
                <span className="sparkle">📍</span>
              </div>
            </div>
          ))}
        </div>

        {filteredBranches.length === 0 && (
          <div className="no-results">
            <div className="no-results-content">
              <i className="fas fa-search"></i>
              <h3>No branches found</h3>
              <p>Try adjusting your search terms or filter settings</p>
              <button 
                className="reset-filters-btn"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCity('all');
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OtherBranchesSection; 