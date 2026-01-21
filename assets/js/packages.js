let allPackages = [];

fetch("assets/data/packages.json")
  .then(res => res.json())
  .then(data => {
    allPackages = data.packages
      .filter(p => p.active === true)
      .sort((a,b) => a.order - b.order);

    renderPackages(allPackages);
  });

function renderPackages(packages) {
  const grid = document.getElementById("packagesGrid");
  grid.innerHTML = "";

  packages.forEach(pkg => {

    const card = document.createElement("div");
    card.className = "package-card" + (pkg.featured ? " featured" : "");

    card.innerHTML = `
      ${pkg.badge ? `<div class="package-badge">${pkg.badge}</div>` : ""}
      ${pkg.seats === "Limited" ? `<div class="seat-badge">Limited Seats</div>` : ""}
      ${pkg.seats === "Coming Soon" ? `<div class="seat-badge soon">Coming Soon</div>` : ""}

      <div>
        <h3>${pkg.name}</h3>
        <div class="package-type">${pkg.type}</div>
        <p class="package-desc">${pkg.description}</p>

        <ul>
          ${pkg.features.map(f => `<li>✔ ${f}</li>`).join("")}
        </ul>
      </div>

      <div class="package-actions">
        <a href="https://wa.me/919945219252?text=I am interested in ${encodeURIComponent(pkg.name)}" 
           target="_blank" class="package-btn">Enquire</a>

        ${pkg.pdf ? `<a href="${pkg.pdf}" target="_blank" class="pdf-btn">📄 Download Plan</a>` : ""}
      </div>
    `;

    grid.appendChild(card);
  });
}

/* FILTERS */

document.addEventListener("click", function(e){
  if(e.target.classList.contains("filter-btn")){
    document.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));
    e.target.classList.add("active");

    const filter = e.target.dataset.filter;

    if(filter === "all"){
      renderPackages(allPackages);
    } else {
      renderPackages(allPackages.filter(p => p.category === filter));
    }
  }
});
