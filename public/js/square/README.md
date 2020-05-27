# square-post-custom-element
A simple square custom element

## Usage

```html
<script src="square.js"></script>
```
Html:
```html
<square-post
    avatar="avatar.png"
    width="40%"
    userName="User Name"
    text="This is a simple sample text."
    backgroundColor="#008080"
    textColor="#ffffff"></square-post>
```
or Javascript:
```javascript
    let square = document.createElement('square-post');

    square.setAttribute("backgroundcolor","#008080");
    square.setAttribute("textcolor", "#ffffff");
    square.setAttribute("text", "This is a simple sample text.");
    square.setAttribute("username", "User Name");
    square.setAttribute("avatar", "avatar.png");

    square.addEventListener('press-like', e => {
        alert('Like');
    });
```