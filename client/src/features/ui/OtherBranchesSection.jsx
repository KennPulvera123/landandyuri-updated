import React from 'react';

const OtherBranchesSection = () => {
  const branches = [
    {
      id: 1,
      name: "Legazpi Branch",
      address: "Door 5 shorehomes Rawis legazpi city, Legazpi, Philippines, 4500",
      phone: "0920 914 0071",
      icon: "fa-map-marker-alt"
    },
    {
      id: 2,
      name: "Daet Branch",
      address: "Ace and Jaja Building, Bagasbas, Philippines, 4600 DAET",
      phone: "0920 914 0071",
      icon: "fa-map-marker-alt"
    },
    {
      id: 3,
      name: "Guinobatan Branch",
      address: "Paternò St. Calzada Guinobatan, Guinobatan, Philippines, 4503",
      phone: "0977 463 0156",
      icon: "fa-map-marker-alt"
    },
    {
      id: 4,
      name: "Polangui Branch",
      address: "Door 4 2nd floor alpapara bldg. Purok mars centro occidental polangui albay",
      icon: "fa-map-marker-alt"
    },
    {
      id: 5,
      name: "Daraga Branch",
      address: "Daraga, Albay",
      icon: "fa-map-marker-alt"
    },
    {
      id: 6,
      name: "Tabaco Branch",
      address: "Tabaco City, Albay",
      icon: "fa-map-marker-alt"
    },
    {
      id: 7,
      name: "Sorsogon Branch",
      address: "Sorsogon City",
      icon: "fa-map-marker-alt"
    },
    {
      id: 8,
      name: "Ligao Branch",
      address: "Ligao City Albay",
      icon: "fa-map-marker-alt"
    },
    {
      id: 9,
      name: "Iriga Branch",
      address: "Iriga city",
      icon: "fa-map-marker-alt"
    }
  ];

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
        
        <div className="branches-grid">
          {branches.map((branch) => (
            <div key={branch.id} className="magic-branch-card">
              <div className="branch-icon">
                <i className={`fas ${branch.icon}`}></i>
              </div>
                             <div className="branch-info">
                 <h3 className="branch-name">{branch.name}</h3>
                 <p className="branch-address">
                   <i className="fas fa-map-marker-alt"></i>
                   {branch.address}
                 </p>
                 {branch.phone && (
                   <p className="branch-phone">
                     <i className="fas fa-phone"></i>
                     {branch.phone}
                   </p>
                 )}
               </div>
              <div className="branch-sparkles">
                <span className="sparkle">🏢</span>
                <span className="sparkle">📍</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherBranchesSection; 