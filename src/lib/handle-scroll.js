export function handleScroll(id, offset = 64) {
  const section = document.getElementById(id);
  if (!section) return;

  const elementPosition = section.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}
