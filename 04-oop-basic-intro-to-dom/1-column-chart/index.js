export default class ColumnChart {

  constructor(data = []) {
    this.data = data;
    this.chartHeight = 50;
    this.render();
  }

  render() {
    const element = document.createElement('div'); // (*)

    const html = `<div class="${this.data.data && this.data.data.length ? 'wrapper' : 'column-chart_loading'}">`
      + `<div class="column-chart" style="--chart-height: 50">`
      + `<div class="column-chart__title">Total ${this.data.label}`
      + ((this.data.link) ? `<a href="${this.data.link}" class="column-chart__link">View all</a>` : '')
      + `</div></div>`
      + `<div class="column-chart__container">`
      + `<div data-element="header" class="column-chart__header">${this.data.formatHeading ? this.data.formatHeading(this.data.value) : this.data.value}</div>`
      + `<div data-element="body" class="column-chart__chart">`
      + this.getDataHtml()
      + `</div></div></div>`;

    element.innerHTML = html;

    // NOTE: в этой строке мы избавляемся от обертки-пустышки в виде `div`
    // который мы создали на строке (*)
    this.element = element.firstElementChild;
  }

  getDataHtml() {

    if (this.data.data && this.data.data.length) {
      const max = Math.max(...this.data.data);
      const res = this.data.data
        .map((value) => `<div style="--value: ${Math.floor(value / max * this.chartHeight)}" data-tooltip="${(value / max * 100).toFixed(0) + '%'}"></div>`)
        .join('');

      return res;
    }
    return '';

  }

  update(data) {
    this.data = data;
    this.render();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    // NOTE: удаляем обработчики событий, если они есть
  }
}
