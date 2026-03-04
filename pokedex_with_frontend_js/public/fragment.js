export const createFragment = ([tag, attributes, ...content]) => {
  const element = document.createElement(tag);
  for (const [key, val] of Object.entries(attributes)) {
    element.setAttribute(key, val);
  }

  if (content.length === 1 && typeof content[0] === "string"){
    element.textContent = content;
    return element;
  }

  const finalContent = content.map(createFragment);
  element.append(...finalContent);
  return element;
}