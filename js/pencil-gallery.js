(() => {
  const input = document.querySelector("[data-pencil-search-input]");
  const count = document.querySelector("#pencil-results-count");
  const cards = Array.from(document.querySelectorAll(".pencil-evidence-item"));

  if (!input || !count || !cards.length) return;

  const updateResults = () => {
    const query = input.value.trim().toLowerCase();
    let visible = 0;

    cards.forEach((card) => {
      const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
      const alt = card.querySelector("img")?.alt.toLowerCase() || "";
      const matches = !query || `${title} ${alt}`.includes(query);

      card.hidden = !matches;
      if (matches) visible += 1;
    });

    count.textContent = query
      ? `${visible} ${visible === 1 ? "study" : "studies"} found`
      : `Showing ${cards.length} studies`;
  };

  input.addEventListener("input", updateResults);
})();
