class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
      categories: [],
      useLink: "",
      init: false,
      isLight: false,
      themeName: "Dark",
      headingFont: {
        family: "",
        category: "",
        icon: "",
        selectedCategory: "",
        size: 32,
        sizeBig: 38 },

      bodyFont: {
        family: "",
        category: "",
        icon: "",
        selectedCategory: "",
        size: 18,
        sizeBig: 20 },

      api: "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAOLlUKLq0gXKXbqP8tr3rjfkWup4WxkuQ" };

  }

  componentDidMount() {
    this.getData();
  }

  changeHeadingCategory(e) {
    const selectedCategory = e.target.value;
    this.setState({
      headingFont: {
        ...this.state.headingFont,
        selectedCategory: selectedCategory } });


  }

  changeBodyCategory(e) {
    const selectedCategory = e.target.value;
    this.setState({
      bodyFont: {
        ...this.state.bodyFont,
        selectedCategory: selectedCategory } });


  }

  updateHeadingState(font) {
    this.setState({
      headingFont: {
        ...this.state.headingFont,
        family: font.family,
        category: font.category,
        icon: font.family.substr(0, 1),
        selectedCategory: font.category } });


  }

  updateBodyState(font) {
    this.setState({
      bodyFont: {
        ...this.state.bodyFont,
        family: font.family,
        category: font.category,
        icon: font.family.substr(0, 1),
        selectedCategory: font.category } });


  }

  getRandomFont(data, category) {
    let tempFonts = [],
    font;
    data.
    filter(item => {
      return item.category == category;
    }).
    map(obj => {
      tempFonts.push(obj);
    });
    font = tempFonts[Math.floor(Math.random() * (tempFonts.length - 1) + 1)];
    return font;
  }

  appendFont(src) {
    const link = document.createElement("link");
    link.href = src;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }

  applyFont(font, cssVariable) {
    const src = `https://fonts.googleapis.com/css?family=${font.family.replace(
    / /g,
    "+")
    }`;
    this.appendFont(src);
    document.documentElement.style.setProperty(cssVariable, font.family);
  }

  useFonts(e) {
    const headingFont = this.state.headingFont.family.replace(/ /g, "+");
    const bodyFont = this.state.bodyFont.family.replace(/ /g, "+");
    const useLink = `https://fonts.google.com/?selection.family=${headingFont}|${bodyFont}`;
    const win = window.open(useLink, "_blank");
    win.focus();
  }

  randomFonts() {
    const selectedHeadingCategory = this.state.headingFont.selectedCategory;
    const selectedBodyCategory = this.state.bodyFont.selectedCategory;
    const data = this.state.data;
    const categories = this.state.categories;
    const headingFont = this.getRandomFont(data, selectedHeadingCategory);
    const bodyFont = this.getRandomFont(data, selectedBodyCategory);
    this.applyFont(headingFont, "--headingFont");
    this.applyFont(bodyFont, "--bodyFont");
    this.updateHeadingState(headingFont);
    this.updateBodyState(bodyFont);
  }

  shuffleHeadingFont(e) {
    const selectedHeadingCategory = this.state.headingFont.selectedCategory;
    const data = this.state.data;
    const headingFont = this.getRandomFont(data, selectedHeadingCategory);
    this.applyFont(headingFont, "--headingFont");
    this.updateHeadingState(headingFont);
  }

  shuffleBodyFont(e) {
    const selectedBodyCategory = this.state.bodyFont.selectedCategory;
    const data = this.state.data;
    const bodyFont = this.getRandomFont(data, selectedBodyCategory);
    this.applyFont(bodyFont, "--bodyFont");
    this.updateBodyState(bodyFont);
  }

  increaseFontSize(e, type) {
    if (type == "body") {
      let sizeBig = this.state.bodyFont.sizeBig;
      let size = this.state.bodyFont.size;
      size++;
      sizeBig++;
      this.setState({
        bodyFont: {
          ...this.state.bodyFont,
          size,
          sizeBig } });


      document.documentElement.style.setProperty(
      "--bodyFont-size--big",
      `${sizeBig}px`);

      document.documentElement.style.setProperty(
      "--bodyFont-size",
      `${size}px`);

    } else if (type == "heading") {
      let sizeBig = this.state.headingFont.sizeBig;
      let size = this.state.headingFont.size;
      size++;
      sizeBig++;
      this.setState({
        headingFont: {
          ...this.state.headingFont,
          size,
          sizeBig } });


      document.documentElement.style.setProperty(
      "--headingFont-size--big",
      `${sizeBig}px`);

      document.documentElement.style.setProperty(
      "--headingFont-size",
      `${size}px`);

    }
  }
  decreaseFontSize(e, type) {
    if (type == "body") {
      let sizeBig = this.state.bodyFont.sizeBig;
      let size = this.state.bodyFont.size;
      size--;
      sizeBig--;
      this.setState({
        bodyFont: {
          ...this.state.bodyFont,
          size,
          sizeBig } });


      document.documentElement.style.setProperty(
      "--bodyFont-size--big",
      `${sizeBig}px`);

      document.documentElement.style.setProperty(
      "--bodyFont-size",
      `${size}px`);

    } else if (type == "heading") {
      let sizeBig = this.state.headingFont.sizeBig;
      let size = this.state.headingFont.size;
      size--;
      sizeBig--;
      this.setState({
        headingFont: {
          ...this.state.headingFont,
          size,
          sizeBig } });


      document.documentElement.style.setProperty(
      "--headingFont-size--big",
      `${sizeBig}px`);

      document.documentElement.style.setProperty(
      "--headingFont-size",
      `${size}px`);

    }
  }

  changeTheme(e) {
    const currentTheme = this.state.isLight;
    let newTheme, themeName;
    currentTheme ? newTheme = false : newTheme = true;
    newTheme ? themeName = "Light" : themeName = "Dark";
    this.setState({
      isLight: newTheme,
      themeName });

  }

  getData() {
    fetch(this.state.api).
    then(response => {
      return response.json();
    }).
    then(response => {
      const data = response.items;
      const categories = data.
      map(item => item.category).
      filter((value, index, self) => self.indexOf(value) === index);

      const randomHeadingCategory =
      categories[Math.floor(Math.random() * categories.length)];
      const randomBodyCategory =
      categories[Math.floor(Math.random() * categories.length)];
      const headingFont = this.getRandomFont(data, randomHeadingCategory);
      const bodyFont = this.getRandomFont(data, randomBodyCategory);
      this.applyFont(headingFont, "--headingFont");
      this.applyFont(bodyFont, "--bodyFont");
      this.updateHeadingState(headingFont);
      this.updateBodyState(bodyFont);
      this.setState({ data, categories });
      setTimeout(() => {
        this.setState({ init: true });
      }, 200);
    });
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", {
        className: `${this.state.init ? "show" : ""} ${
        this.state.isLight ? "app-light" : ""
        } app` }, /*#__PURE__*/

      React.createElement("div", { className: "sidebar flex-column" }, /*#__PURE__*/
      React.createElement("div", { className: "flex-content" }, /*#__PURE__*/
      React.createElement(Random, {
        headingOnChange: e => this.changeHeadingCategory(e),
        bodyOnChange: e => this.changeBodyCategory(e),
        randomButton: e => this.randomFonts(e),
        categories: this.state.categories,
        randomButtonText: "RANDOM",
        useButton: e => this.useFonts(e),
        useButtonText: "USE",
        selectedHeadingCategory: this.state.headingFont.selectedCategory,
        selectedBodyCategory: this.state.bodyFont.selectedCategory }), /*#__PURE__*/

      React.createElement(Font, {
        title: "HEADING FONT",
        additionalClass: "for-heading",
        name: this.state.headingFont.family,
        category: this.state.headingFont.category,
        icon: this.state.headingFont.icon,
        shuffleFont: e => this.shuffleHeadingFont(e),
        decreaseFontSize: e => this.decreaseFontSize(e, "heading"),
        increaseFontSize: e => this.increaseFontSize(e, "heading") }), /*#__PURE__*/

      React.createElement(Font, {
        title: "BODY FONT",
        additionalClass: "for-body",
        name: this.state.bodyFont.family,
        category: this.state.bodyFont.category,
        icon: this.state.bodyFont.icon,
        shuffleFont: e => this.shuffleBodyFont(e),
        decreaseFontSize: e => this.decreaseFontSize(e, "body"),
        increaseFontSize: e => this.increaseFontSize(e, "body") }))), /*#__PURE__*/



      React.createElement(Showcase, {
        themeName: this.state.themeName,
        themeClass: `${this.state.isLight ? "theme-light" : ""}`,
        changeTheme: e => this.changeTheme(e) })));



  }}


const shuffleIcon = /*#__PURE__*/
React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 490.1 490.1" }, /*#__PURE__*/
React.createElement("path", { d: "M194.5 324.35l15-24.2c3.6-5.8 1.8-13.3-4-16.9-5.7-3.6-13.3-1.8-16.9 4l-15 24.2c-27.2 43.9-66 69.1-106.6 69.1H12.2c-6.8 0-12.2 5.5-12.2 12.3s5.5 12.3 12.2 12.3h54.9c49.3-.2 95.7-29.6 127.4-80.8zM486.4 88.75L427 29.25c-4.8-4.8-12.5-4.8-17.3 0s-4.8 12.5 0 17.3l38.6 38.6H391.4c-49.2 0-95.7 29.4-127.4 80.6l-9.2 14.9c-3.6 5.8-1.8 13.3 4 16.9 2 1.2 4.2 1.8 6.4 1.8 4.1 0 8.1-2.1 10.4-5.8l9.2-14.9c27.2-43.9 66-69 106.6-69H448.2l-38.6 38.6c-4.8 4.8-4.8 12.5 0 17.3 2.4 2.4 5.5 3.6 8.7 3.6s6.3-1.2 8.7-3.6l59.5-59.5c4.7-4.8 4.7-12.6-.1-17.3zm-26.1 8.8v-.2-.2l.2.2-.2.2z" }), /*#__PURE__*/
React.createElement("path", { d: "M409.6 460.85c2.4 2.4 5.5 3.6 8.7 3.6s6.3-1.2 8.7-3.6l59.5-59.5c4.8-4.8 4.8-12.5 0-17.3l-59.5-59.4c-4.8-4.8-12.5-4.8-17.3 0s-4.8 12.5 0 17.3l38.6 38.6h-55.1c-40.5 0-79.4-25.2-106.6-69.1l-90.2-145.7c-31.7-51.3-78.2-80.6-127.4-80.6H12.2c-6.8 0-12.2 5.5-12.2 12.3s5.5 12.3 12.2 12.3h56.7c40.5 0 79.4 25.2 106.6 69l90.2 145.7c31.7 51.3 78.2 80.7 127.4 80.7h55.1l-38.6 38.6c-4.7 4.6-4.7 12.3 0 17.1zm50.7-68.3l.2.2-.2.2v-.2-.2z" }));



function RandomCol(props) {
  return /*#__PURE__*/(
    React.createElement("div", { className: `random-col ${props.additionalClass}` }, /*#__PURE__*/
    React.createElement("label", null, props.label), /*#__PURE__*/
    React.createElement("select", { onChange: props.onChange, value: props.selectedCategory },
    props.categories.map((item, index) => /*#__PURE__*/
    React.createElement("option", { key: index, value: item },
    item)))));





}

function Random(props) {
  return /*#__PURE__*/(
    React.createElement("div", { className: "random" }, /*#__PURE__*/
    React.createElement(RandomCol, {
      label: "HEADING",
      additionalClass: "for-heading",
      onChange: props.headingOnChange,
      categories: props.categories,
      selectedCategory: props.selectedHeadingCategory }), /*#__PURE__*/

    React.createElement(RandomCol, {
      label: "BODY",
      additionalClass: "for-body",
      onChange: props.bodyOnChange,
      categories: props.categories,
      selectedCategory: props.selectedBodyCategory }), /*#__PURE__*/

    React.createElement("div", { className: "random-button for-use" }, /*#__PURE__*/
    React.createElement("button", { onClick: props.useButton }, props.useButtonText)), /*#__PURE__*/

    React.createElement("div", { className: "random-button" }, /*#__PURE__*/
    React.createElement("button", { onClick: props.randomButton }, props.randomButtonText))));



}

function Font(props) {
  return /*#__PURE__*/(
    React.createElement("div", { className: `font ${props.additionalClass}` }, /*#__PURE__*/
    React.createElement("h2", { className: "font-title" },
    props.title, /*#__PURE__*/
    React.createElement("div", { className: "font-sizes" }, /*#__PURE__*/
    React.createElement("span", { className: "decrease", onClick: props.decreaseFontSize }, "A"), /*#__PURE__*/


    React.createElement("span", { className: "increase", onClick: props.increaseFontSize }, "A"))), /*#__PURE__*/




    React.createElement("div", { className: "font-content" }, /*#__PURE__*/
    React.createElement("div", { className: "font-icon" }, props.icon), /*#__PURE__*/
    React.createElement("div", { className: "font-detail" }, /*#__PURE__*/
    React.createElement("h2", { className: "font-name" }, props.name), /*#__PURE__*/
    React.createElement("p", { className: "font-type" }, props.category)), /*#__PURE__*/

    React.createElement("div", { className: "font-random", onClick: props.shuffleFont },
    shuffleIcon))));




}

function Showcase(props) {
  return /*#__PURE__*/(
    React.createElement("div", { className: "showcase flex-column" }, /*#__PURE__*/
    React.createElement("div", { className: "flex-content" }, /*#__PURE__*/
    React.createElement("div", {
      className: `${props.themeClass} theme`,
      onClick: props.changeTheme },

    props.themeName), /*#__PURE__*/

    React.createElement("div", { className: "card-row" }, /*#__PURE__*/
    React.createElement("div", { className: "card card-post w40" }, /*#__PURE__*/
    React.createElement("h1", null, "Master cleanse"), /*#__PURE__*/
    React.createElement("p", null, "Humblebrag post-ironic hexagon yuccie kogi la croix squid, ethical paleo cardigan enamel pin prism bespoke tumeric.")), /*#__PURE__*/




    React.createElement("div", { className: "card w60" }, /*#__PURE__*/
    React.createElement("h1", null, "Presentation"), /*#__PURE__*/
    React.createElement("p", null, "Humblebrag post-ironic hexagon yuccie kogi la croix squid, ethical paleo cardigan enamel pin prism bespoke tumeric. Freegan venmo authentic cred lumbersexual asymmetrical."), /*#__PURE__*/




    React.createElement("p", null, "Humblebrag post-ironic hexagon yuccie kogi la croix squid, ethical paleo cardigan enamel pin prism bespoke tumeric. Freegan venmo authentic cred lumbersexual asymmetrical"), /*#__PURE__*/




    React.createElement("p", null, "Cliche tumblr occupy chia, jean shorts ethical activated charcoal sriracha gastropub. Chambray live-edge kogi, forage vaporware kickstarter authentic cardigan cred squid viral."), /*#__PURE__*/




    React.createElement("p", null, "Distillery drinking vinegar schlitz shabby chic yr cred gluten-free. Farm-to-table lumbersexual kogi direct trade, umami crucifix hot chicken."))), /*#__PURE__*/


    React.createElement("div", { className: "card-row" }, /*#__PURE__*/
    React.createElement("div", { className: "card card-heading w33" }, /*#__PURE__*/
    React.createElement("h1", null, "Hoodie wayfarers selfies"), /*#__PURE__*/
    React.createElement("p", null, "Taiyaki hot chicken vegan, leggings aesthetic celiac tacos air plant subway tile.")), /*#__PURE__*/




    React.createElement("div", { className: "card card-body w33" }, /*#__PURE__*/
    React.createElement("h1", null, "Seitan knausgaard"), /*#__PURE__*/
    React.createElement("p", null, "Pug small batch pabst skateboard slow-carb, bespoke you probably haven't heard.")), /*#__PURE__*/




    React.createElement("div", { className: "card card-default w33" }, /*#__PURE__*/
    React.createElement("h1", null, "Hexagon coloring book"), /*#__PURE__*/
    React.createElement("p", null, "Authentic lyft gochujang vape leggings YOLO franzen. Locavore VHS cronut."))))));








}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));