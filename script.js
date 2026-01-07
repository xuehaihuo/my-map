// script.js
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('nav-container');
  const searchInput = document.getElementById('searchInput');

  function renderNav(data) {
    container.innerHTML = '';
    data.forEach(group => {
      const section = document.createElement('section');
      section.innerHTML = `
        <h2><i class="${group.icon}"></i> ${group.category}</h2>
        <div class="links" id="links-${group.category}"></div>
      `;
      const linksDiv = section.querySelector('.links');
      
      group.links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.innerHTML = `<i class="${link.icon} icon"></i> ${link.name}`;
        linksDiv.appendChild(a);
      });
      
      container.appendChild(section);
    });
  }

  // 初始渲染
  renderNav(NAV_DATA);

  // 搜索功能
  searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.trim().toLowerCase();
    if (!keyword) {
      renderNav(NAV_DATA);
      return;
    }

    const filteredData = NAV_DATA.map(group => {
      const filteredLinks = group.links.filter(link =>
        link.name.toLowerCase().includes(keyword)
      );
      return { ...group, links: filteredLinks };
    }).filter(group => group.links.length > 0);

    renderNav(filteredData);
  });
});