import React from 'react';

const OtherBranchesSection = () => {
  const branches = [
    {
      id: 1,
      name: "Legazpi Branch",
      address: "Door 5 Shorehomes Apartment Rawis Legazpi City infront of ltfrb beside kafe rustico",
      phone: "09774630156",
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
      address: "Door B Paterno St calzada Guinobatan Albay. Near Usurman trading Beside Guinobatan west central school",
      phone: "09456970557",
      icon: "fa-map-marker-alt"
    },
    {
      id: 4,
      name: "Polangui Branch",
      address: "Centro Occidental Polangui Albay. Alpapara and Liria Building second floor Door D",
      phone: "0949 136 2045",
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
      address: "Zone 3 Panal tabaco City Harap ng goyena old compound",
      phone: "09668474667",
      icon: "fa-map-marker-alt"
    },
    {
      id: 7,
      name: "Sorsogon Branch",
      address: "346 West District Tugos Sorsogon City. Infront of Sun Tiger or Bigmac Burger",
      phone: "0992-259-3967",
      icon: "fa-map-marker-alt"
    },
    {
      id: 8,
      name: "Iriga Branch",
      address: "DOOR 2 APEM -DG Apartment zone 4 San isidro iriga city 4431 beside PCA sa unahan ng Casureco",
      phone: "09770279122",
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