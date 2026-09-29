// Builds a "you are here" line from the headings in a post and tracks the scroll position.
export function mountToc(nav: HTMLElement, body: HTMLElement, title: string): void {
  const heads = Array.from(body.querySelectorAll<HTMLHeadingElement>('h2, h3'));
  if (heads.length < 2) return;

  const targets: Element[] = [body, ...heads];
  const names = [title, ...heads.map((h) => h.textContent?.trim() ?? '')];
  const list = document.createElement('ol');
  for (const name of names) {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = name;
    li.append(btn);
    list.append(li);
  }
  nav.querySelector('[data-toc-list]')!.replaceChildren(list);
  nav.hidden = false;

  const items = Array.from(list.children) as HTMLLIElement[];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  items.forEach((li, i) =>
    li.querySelector('button')!.addEventListener('click', () =>
      targets[i].scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth', block: 'start' }),
    ),
  );

  let frame = 0;
  const update = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      let active = 0;
      targets.forEach((t, i) => {
        if (t.getBoundingClientRect().top < window.innerHeight * 0.4) active = i;
      });
      items.forEach((li, i) => {
        li.classList.toggle('is-active', i === active);
        li.classList.toggle('is-past', i < active);
      });
    });
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}
