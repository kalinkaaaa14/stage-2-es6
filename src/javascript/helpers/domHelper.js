export function createElement({ tagName, className, attributes = {} }) {
  const element = document.createElement(tagName);

  if (className) {
    const classNames = className.split(' ').filter(Boolean); // Include only not empty className values after the splitting
    element.classList.add(...classNames);
  }

  Object.keys(attributes).forEach((key) => element.setAttribute(key, attributes[key]));

  return element;
}

export function createTextField({ tagName, className, text, attributes = {} }) {
  const element = createElement({ tagName, className, attributes });
  element.innerText = text;
  return element;
}
