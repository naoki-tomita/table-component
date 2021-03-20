
class Table extends HTMLElement {
  observer = new MutationObserver(this.onChildren.bind(this));
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.innerText = `
    :host {
      display: flex;
      flex-direction: column;
    }
    `;
    const slot = document.createElement("slot");
    this.shadowRoot?.append(style, slot);
    this.observer.observe(this, { childList: true });
  }

  onChildren() {
    const header = [...this.children].find(it => it instanceof Header)
    const widths = [...header?.children ?? []].map(it => it.getAttribute("width") ?? "0");
    [...this.children].forEach(el => {
      const children = [...el.children];
      for (let i = 0; i < widths.length; i++) {
        children[i]?.setAttribute("width", widths[i]);
      }
    })
  }

  connectedCallback() {

  }

  disconnectedCallback() {
    this.observer.disconnect();
  }
}

customElements.define("d-table", Table);

class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.innerText = `
    :host {
      display: flex;
    }
    `;
    const slot = document.createElement("slot");
    this.shadowRoot?.append(style, slot);
  }

  connectedCallback() {
  }
}

customElements.define("d-table-header", Header);

class Row extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.innerText = `
    :host {
      display: flex;
    }
    `;
    const slot = document.createElement("slot");
    this.shadowRoot?.append(style, slot);
  }

  connectedCallback() {
  }
}

customElements.define("d-table-row", Row);

class Cell extends HTMLElement {
  styleEl = document.createElement("style");
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.innerText = `
    :host {
      display: block;
    }
    `;
    const slot = document.createElement("slot");
    this.shadowRoot?.append(style, slot);
    this.shadowRoot?.append(this.styleEl);
  }

  connectedCallback() {

  }

  static observedAttributes = ["width"]
  attributeChangedCallback() {
    const width = this.getAttribute("width");
    this.styleEl.innerHTML = `:host { flex-basis: ${width}; }`;
  }
}

customElements.define("d-table-cell", Cell);
