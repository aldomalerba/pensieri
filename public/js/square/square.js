(function () {
  const template = document.createElement("template");
  template.innerHTML = `

  <div class="square unselectable">
  <div class="wrapper">
      <div class="squareHeader">
          <img class="squarePicture" alt="...">
          <a href="" class="squareUsername"></a>
      </div>            
      <div class="squareBody">
          <div class="text-inner">
              
          </div>
      </div>
      <div class="squareFooter">
      <button class="button"><span class="icon"></span>Button</button>
      </div>
  </div>      
</div>`;

  class Square extends HTMLElement {
    constructor() {
      super();

      const shadow = this.attachShadow({ mode: "open" });
      shadow.appendChild(template.content.cloneNode(true));
      const style = document.createElement("style");

      shadow.appendChild(style);
    }

    connectedCallback() {
      console.info("connected");
      this.shadowRoot.querySelector(".like").onclick = () => { this.pressLike() };
      updateStyle(this);
    }

    static get observedAttributes() {
      return [
        "width",
        "backgroundcolor",
        "textcolor",
        "text",
        "avatar",
        "username",
        "showheader",
        "showfooter",
        "username-href",
        "icon-src"
      ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case "avatar": ;
          updateAvatar(this);
        case "username":
          updateUserName(this);
        case "text":
          updateText(this);
          break;
        case "text":
          updateOnPress(this);
          break;
        case "username-href":
          updateUserNameHref(this);
          break;
        case "icon-src":
          updateStyle(this);
          break;
        case "backgroundcolor" || "textcolor":
          updateStyle(this);
          break;
        default:
          updateStyle(this);
          break;
      }
    }

    get showHeader() {
      let value = this.getAttribute("showheader");
      if (value == null)
        return true;
      else if (value == 'false')
        return false;
      else return true;
    }

    set showHeader(newValue) {
      if (newValue == true) return this.setAttribute("showheader", "true")
      else return this.setAttribute("showheader", "false");
    }

    get showFooter() {
      let value = this.getAttribute("showfooter");
      if (value == null)
        return true;
      else if (value == 'false')
        return false;
      else return true;
    }

    set showFooter(newValue) {
      if (newValue == true) return this.setAttribute("showfooter", "true")
      else return this.setAttribute("showfooter", "false");
    }

    get text() {
      return this.getAttribute("text");
    }

    set text(newValue) {
      this.setAttribute("text", newValue);
    }

    get avatar() {
      return this.getAttribute("avatar");
    }

    set avatar(newValue) {
      this.setAttribute("avatar", newValue);
    }

    get userName() {
      return this.getAttribute("username");
    }

    set userName(newValue) {
      this.setAttribute("username", newValue);
    }

    get iconSrc() {
      return this.getAttribute("icon-src");
    }

    set iconSrc(newValue) {
      this.setAttribute("icon-src", newValue);
    }

    get backgroundColor() {
      return this.getAttribute("backgroundcolor");
    }

    set backgroundColor(newValue) {
      this.setAttribute("backgroundcolor", newValue);
    }

    get textColor() {
      return this.getAttribute("textcolor");
    }

    set textColor(newValue) {
      this.setAttribute("textcolor", newValue);
    }

    get width() {
      return this.getAttribute("width");
    }

    set width(newValue) {
      this.setAttribute("width", newValue);
    }

    get userNameHref() {
      return this.getAttribute("username-href");
    }

    set userNameHref(newValue) {
      this.setAttribute("username-href", newValue);
    }

    pressLike() {
      const tabs = this.shadowRoot.querySelector('.like');
      tabs.dispatchEvent(new Event('press-like', { bubbles: true, composed: true }));
    }

  }

  function updateText(elem) {
    const shadow = elem.shadowRoot;
    shadow.querySelector(".text-inner").textContent = elem.text;
  }

  function updateUserName(elem) {
    const shadow = elem.shadowRoot;
    shadow.querySelector(".squareUsername").textContent = elem.userName;
  }


  function updateUserNameHref(elem) {
    const shadow = elem.shadowRoot;
    shadow.querySelector(".squareUsername").href = elem.userNameHref;
  }

  function updateAvatar(elem) {
    const shadow = elem.shadowRoot;
    shadow.querySelector(".squarePicture").src = elem.avatar;
  }

  function updateStyle(elem) {
    let width = elem.getAttribute("width") || "100%";
    let backgroundColor = elem.getAttribute("backgroundcolor") || "";
    let textColor = elem.getAttribute("textcolor") || "";
    let showheader = elem.showHeader == true ? "flex" : "none";
    let showfooter = elem.showFooter == true ? "flex" : "none";
    let icon = elem.getAttribute("icon-src");
    const shadow = elem.shadowRoot;
    shadow.querySelector("style").textContent = `
    .square{
      position: relative;
      width: ${width || '100%'};
      background-color: ${backgroundColor || ""};
      font-family: 'Open Sans', sans-serif;
      letter-spacing: 0.2em;
    }

    .unselectable{
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
       -khtml-user-select: none; /* Konqueror HTML */
         -moz-user-select: none; /* Old versions of Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome, Edge, Opera and Firefox */
    }
    
    .square::before{
      content: '';
      display: block;
      padding-top: 100%;
    }
  
    .wrapper{
      position: absolute;
      top: 0; left:0;
      height: 100%;
      width: 100%;
    }
  
    .squareHeader,
    .squareFooter,
    .squareBody{
      position: absolute;
      width: 100%;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -ms-flex-align: center;
      -webkit-align-items: center;
      -webkit-box-align: center;
      align-items: center;
    }
    
    .squareHeader,
    .squareFooter{  
      height: 15%;
      background-color: rgba(255, 255, 255, 1);;
    }
  
    .squareHeader{
      display: ${showheader} !important;
      top: 0;
    }
  
    .squareFooter{
      display: ${showfooter} !important;
      bottom: 0;
    }
  
    .squareBody{
      top: 15%;
      height: 70%;
      cursor: pointer;
    }
  
    .squarePicture{
      margin-left: 2.5%;
      height: 80%;
      max-width: 100%;
      border-radius: 100%;
    }
  
    .squareUsername{
      margin-left: 2.5%;
      vertical-align: middle;
      padding-left: 10px;
      font-size: 1.2em;
      letter-spacing: 0;
    }
  
    .text-inner {
      margin-left: 2.5%;
      margin-right: 2.5%;
      overflow-wrap: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      text-align: left;
      -webkit-line-clamp: 6;
      -webkit-box-orient: vertical;
      white-space: pre-line;
      font-size: 20px;
      line-height: 1.4em;
      color: ${textColor || ""};
    }

    a{
      color: black;
    }
  
    a:link {
      text-decoration: none;
    }
    
    a:visited {
      text-decoration: none;
    }
    
    a:hover {
      text-decoration: underline;
    }
    
    a:active {
      text-decoration: underline;
    }

    .button {
      background-color: #4CAF50;
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
  }
  .button .icon {
      background: url(https://image.flaticon.com/icons/svg/281/281769.svg) no-repeat;
      float: left;
      width: 20px;
      height: 20px;
      margin-right: 10px
  }  
  .button .span {
      float: left;
      width: 20px;
      height: 20px;
  } 
    `;
  }

  window.customElements.define("square-post", Square);
})();
