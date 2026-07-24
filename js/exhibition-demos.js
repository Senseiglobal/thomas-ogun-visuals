document.addEventListener("DOMContentLoaded", () => {
  const dialog = document.querySelector("#ar-demo-dialog");
  const player = dialog?.querySelector("[data-ar-demo-player]");
  const title = dialog?.querySelector("#ar-demo-dialog-title");
  const closeButton = dialog?.querySelector("[data-ar-demo-close]");

  if (!dialog || !player || !title || !closeButton || typeof dialog.showModal !== "function") return;

  const resetPlayer = () => {
    player.pause();
    player.removeAttribute("src");
    player.removeAttribute("poster");
    player.load();
  };

  document.querySelectorAll("[data-ar-demo-open]").forEach(button => {
    button.addEventListener("click", () => {
      title.textContent = button.dataset.arDemoTitle || "AR Demo";
      player.poster = button.dataset.arDemoPoster || "";
      player.src = button.dataset.arDemoSrc || "";
      dialog.showModal();
      player.play().catch(() => {});
    });
  });

  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", resetPlayer);
});
