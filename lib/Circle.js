class Circle {
  constructor(id) {
    const el = document.getElementById(id);
    const parent = el.parentElement;
    parent.removeChild(el);
    const chars = el.innerText.split('');
    chars.push(' ');
    for (let i = 0; i < chars.length; i++) {
      const span = document.createElement('span');
      span.innerText = chars[i];
      span.className = `char${i + 1}`;
      parent.appendChild(span);
    }
  }
}

export default Circle;
