export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row, index) => {
    const cells = [...row.children];

    if (cells.length < 2) return;

    const title = cells[0];
    const content = cells[1];

    // Create accordion item
    const item = document.createElement('div');
    item.className = 'accordion-item';

    // Accordion button
    const button = document.createElement('button');
    button.className = 'accordion-button';
    button.type = 'button';
    button.setAttribute('aria-expanded', index === 0 ? 'true' : 'false');

    button.innerHTML = `
      <span>${title.innerHTML}</span>
      <span class="accordion-icon">⌄</span>
    `;

    // Accordion content
    const panel = document.createElement('div');
    panel.className = 'accordion-panel';

    panel.innerHTML = content.innerHTML;

    if (index !== 0) {
      panel.hidden = true;
    }

    // Toggle accordion
    button.addEventListener('click', () => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';

      button.setAttribute('aria-expanded', String(!isOpen));
      panel.hidden = isOpen;
      item.classList.toggle('is-open', !isOpen);
    });

    item.append(button, panel);

    row.replaceWith(item);
  });
}