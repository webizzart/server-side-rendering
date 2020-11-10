export function defineComponent(options) {
  if (!options) return console.error("error");
  if (!options.Selector || !options.Component) return console.error("component not valid");
  // let ctor = customElements.get('my-paragraph');
  //TODO: check if componnt defined allready
  customElements.define(options.Selector, options.Component);
}
export const html = String.raw;

