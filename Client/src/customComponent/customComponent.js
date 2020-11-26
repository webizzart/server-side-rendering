const __configure__ = {
    ref:"ref:to",
    ev:"on",
    splitChar:":",
    reqExp:/{{([^}]+)}}/gm,
    template:{
        start:"{{",
        end:"}}"
    }
}
export class CustomElement extends HTMLElement {

    constructor() {
        super();
       
    }
    render(htmlElement,options) {
        const config = __configure__;
        if(!options) options = {};
        if(!htmlElement || typeof(htmlElement) !== "object"){
            htmlElement = this;
        } 
        htmlElement.innerHTML = valueChanger.call(this,  htmlElement.innerHTML,options);

        Array.from(htmlElement.childNodes).forEach(el => {
            this.renderElement(el, config);
        });
        return htmlElement;
    }

    renderElement(el, config) {
        if (el && el.nodeType === 1) {
            if (el.childNodes) {
                this.render(el);
            }
            const refAttr = el.getAttribute(config.ref);
            if (refAttr) {
                this.renderRefs(refAttr, el);
            }
            Array.from(el.attributes).forEach(attr => {
                this.renderEvents(attr, el);
            });
        }
    }

    renderRefs(attr, el) {
            const key = attr;
            el.removeAttribute(__configure__.ref);
            if(key)
            this[key] = el;
    }

    renderEvents(attr, el) {
        const on = __configure__.ev;
        if (attr.name.includes(`${on}${__configure__.splitChar}`)) {
            const event = getValueFromAttr(attr,__configure__.splitChar);
            el.removeAttribute(attr.name);
            el[on + event.toLowerCase()] = (e) => {
                this[attr.value](e);
            };
        }
    }
}
function getValueFromAttr(attr,splitChar) {
    if(!splitChar) splitChar = ":";
    const split = splitChar;
    const splitEvent = attr.name.split(split);
    const event = splitEvent[1];
    return event;
}

export function valueChanger(value,options){
    var regExp = __configure__.reqExp;
    const all = value.match(regExp);

    let result;
    if(Array.isArray(all))
    all.forEach(rep=>{
        rep = replaceTemplate(rep);
        if(options[rep]){
            result = options[rep];
        }
        result = promiseString(result);
        value = value.replace(`{{${rep}}}`,result);
    });
    return value;

    function promiseString(result) {
        if (typeof (result) !== "string")
            result = "";
        return result;
    }

    function replaceTemplate(rep) {
        const config = __configure__;
        rep = rep.replace(config.template.start, "").replace(config.template.end, "");
        return rep;
    }
}
