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
        <button class="like">Like<span class="likeIcon"></span></button>
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
        "username-href"
      ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case "avatar":;
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
      if(value == null)
        return true;
      else if (value == 'false')
        return false;
      else return true;
    }

    set showHeader(newValue) {
      if(newValue == true) return this.setAttribute("showheader", "true")
      else return this.setAttribute("showheader", "false");
    }

    get showFooter() {
      let value = this.getAttribute("showfooter");
      if(value == null)
        return true;
      else if (value == 'false')
        return false;
      else return true;
    }

    set showFooter(newValue) {
      if(newValue == true) return this.setAttribute("showfooter", "true")
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
      return this.getAttribute("userName");
    }

    set userName(newValue) {
      this.setAttribute("username", newValue);
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
      tabs.dispatchEvent(new Event('press-like', {bubbles: true, composed: true}));
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
    let showheader =  elem.showHeader == true ? "flex" : "none";
    let showfooter =  elem.showFooter == true ? "flex" : "none";
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

    .like{
      appearance: none;
      position: absolute;
      right: 0;

      background: none;
	    color: inherit;
	    border: none;
	    padding: 0;
	    font: inherit;
	    cursor: pointer;
	  outline: inherit;
    }

    .likeIcon{
      background: url(knowledge.png) no-repeat top left;
      background-size: contain;
      cursor: pointer;
      display: inline-block;
      margin-left: 2.5%;
      height: 80%;
      max-width: 100%;
    }
    `;
  }

  window.customElements.define("square-post", Square);
})();
