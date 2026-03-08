export const scrollToHash = (hash?: string) => {
  const targetId = (hash ?? window.location.hash).replace('#', '');
  if (!targetId) return;

  requestAnimationFrame(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    el.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    el.classList.add("ring-2", "ring-accent");
    setTimeout(() => {
      el.classList.remove("ring-2", "ring-accent");
    }, 1500);
  });
};
