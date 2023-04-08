interface Options {
  attributes?: {[key: string]: string},
  classes?: string,
  text?: string,
}

export function makeElements (
  tag = 'div', options: Options) {
    const element = document.createElement(tag);

    if(options.attributes) {
      for(const item in options.attributes) {
        element.setAttribute(item, options.attributes[item]);
      }
    }

    if(options.classes) element.className = options.classes;

    if(options.text) element.textContent = options.text;

    return element;
}