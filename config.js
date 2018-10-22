var config = {
  'table': {
    upgradeBootstrap: false,
    buildChildren: false,
    keepAttributes: [],
    keepAttributesWithValue: [],
    func: function (node) {
      let ths = node.getElementsByTagName('th');
      let out = '<df-grid>';
      for (var i = 0; i < ths.length; i++) {
        out += '<df-grid-column field="Field" header="Header"></df-grid-column>'.replace('Header', ths[i].innerText.trim()).replace('Field', camelize(ths[i].innerText.trim()));
      }
      out += '</df-grid>';
      return htmlToElement(out);
    },
  },
  'input::type="text"': {
    upgradeBootstrap: true,
    buildChildren: false,
    keepAttributes: [],
    keepAttributesWithValue: [],
    func: function (node) {
      return htmlToElement('<df-input-container><input type="' + node.type + '"' + 'value="' + node.value + '"></df-input-container>');
    },
  },
  'input': {
    component: 'input',
    upgradeBootstrap: true,
    buildChildren: false,
    keepAttributes: [],
    keepAttributesWithValue: ['type'],
  },
  'select': {
    component: 'df-select',
    upgradeBootstrap: false,
    buildChildren: true,
    keepAttributes: [],
    keepAttributesWithValue: [],
  },
  'option': {
    upgradeBootstrap: false,
    buildChildren: false,
    keepAttributes: [],
    keepAttributesWithValue: [],
    func: function(node) {
      return htmlToElement('<df-option value="' + node.innerText + '" ' + 'displayText="'+ node.innerText + '"></df-option>');
    }
  },
}

