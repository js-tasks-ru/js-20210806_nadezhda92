import fetchJson from './utils/fetch-json.js';

const BACKEND_URL = 'https://course-js.javascript.ru';

export default class ColumnChart {

  chartHeight = 50;
  res = {};
  subElements = { body: document.createElement('div') };

  constructor({
    label = '',
    link = '',
    formatHeading = data => data,
    url = '',
    range = {
      from: new Date(),
      to: new Date(),
    }
  } = {}) {
    this.url = new URL(url, BACKEND_URL);

    this.range = range;
    this.label = label;
    this.link = link;
    this.formatHeading = formatHeading;
    this.element = document.createElement('div');
    this.render();
    // this.update(this.range.from, this.range.to);
    if (url) {
      this.loadData().then(result => {
        this.res = result;
        this.render();
      });
    }
  }

  render() {
    this.setBodyHtml();
    const element = document.createElement('div'); // (*)

    const html = `<div>`
      + `<div class="column-chart" style="--chart-height: 50">`
      + `<div class="column-chart__title">Total ${this.label}`
      + ((this.link) ? `<a href="${this.link}" class="column-chart__link">View all</a>` : '')
      + `</div></div>`
      + `<div class="column-chart__container">`
      + `<div data-element="header" class="column-chart__header">${this.formatHeading(Object.values(this.res).reduce((res, item) => res + item, 0))}</div>`
      + `<div data-element="body" class="column-chart__chart">`
      + this.subElements.body.innerHTML
      + `</div></div></div>`;

    element.innerHTML = html;

    // NOTE: в этой строке мы избавляемся от обертки-пустышки в виде `div`
    // который мы создали на строке (*)
    this.element.innerHTML = element.firstElementChild.innerHTML;
    this.element.setAttribute('class', this.res && Object.values(this.res).length ? 'wrapper' : 'column-chart_loading');
  }

  async loadData() {
    this.url.searchParams.set('from', this.range.from.toISOString());
    this.url.searchParams.set('to', this.range.to.toISOString());

    return await fetchJson(this.url);
  }

  setBodyHtml() {
    let res = '';
    if (this.res && Object.values(this.res).length) {

      const max = Math.max(...Object.values(this.res));
      res = Object.values(this.res)
        .map((value) => `<div style="--value: ${Math.floor(value / max * this.chartHeight)}" data-tooltip="${(value / max * 100).toFixed(0) + '%'}"></div>`)
        .join('');
    }
    this.subElements.body.innerHTML = res;
    return res;

  }

  setNewRange(from, to) {
    this.range.from = from;
    this.range.to = to;
  }

  update(from, to) {

    this.setNewRange(from, to);
    const res = this.loadData();
    res.then(result => {
      this.res = result;
      this.render();
    });
    return res;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    // NOTE: удаляем обработчики событий, если они есть
  }
}
