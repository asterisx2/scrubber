# Scrubber - A recipe for scaffolding legacy angular code into templates

## To run, clone the project and open main.html / index.html

## Features

- Cleansizes legacy html by stripping of extra HTML, attributes on a node etc to create a template you can use directly as a template in your components

- Upgrades bootstrap classes if the page are using older versions of bootstrap, this helps you save some time in writing styling. yourself.

- Replaces HTML with library components such as select to df-select, table to df-grid. This can be configured inside config.js. You can also do much more powerful mapping for components by using the key creator. More later

## How to use
**It is recommended to check the ```How it works``` section first before proceeding**
- To create template from legacy, follow the following steps:
1. Copy the source html inside your browser, in chrome you can go to developer tools, select the HTML node and right click to select Copy > Copy as HTML
2. Open index.html, select converter by clicking on the top left ```Converter``` link, paste the HTML inside the left box and click on convert button.
3. Your template will appear inside the right box, click on the top left ```Copy``` button to copy it.

- To create a key for an HTML node, follow the following steps: 
1. Copy the source html inside your browser, in chrome you can go to developer tools, select the HTML node and right click to select Copy > Copy as HTML
2. Open index.html, select Key Converter by clicking on the top left ```Key Convert``` button, paste the HTML inside the left box and click on ```Generate Key``` button.
3. Your key will appear inside the right box, click on the top left ```Copy``` button to copy it.

## How it works

### There are three main parts of the page

- Converter (Inside index.html) - The page where you paste the legacy html inside the left textarea and click the convert button to get a template.

- Key Creator (Inside index.html) - Creates a key for a HTML node. This is used as a 'hash/key' to map HTML to df-components. This can be as complex or as simple as you want it to be. The mapping is generated automatically but YOU NEED TO MODIFY TO MAKE IT AS SUCCINT AS POSSIBLE BY MODIFYING WHAT'S GENERATED otherwise it will fail to match the correct HTML if it has more information then needed.

- The Config file. This is the main gist of the tool. The config file is a collection of mapping such as this

```
  'div::id="mainLeaderboard"::style="overflow:hidden;"': {
    component: 'df-panel',
    upgradeBootstrap: false,
    buildChildren: false,
    keepAttributes: ['onclick'],
    keepAttributesWithValue: ['ondblclick'],
  },
  
 ```
 
 What this tells the tool is 'hey whenever you encounter a div with ```id``` ```mainLeaderboard``` and an attribute ```style``` with value ```overflow:hidden;``` go ahead and do the following
 
 1. Inject a df-panel in its place inside the template, via passing its name to ```component```
 2. Don't upgrade its bootstrap if it has any, via the bool ```upgradeBootstrap```
 3. Do not build its children, via the bool ```buildChildren```
 4. Keep certain attributes but not their value, via ```keepAttributes``` array
 5. Keep certain attributes and also their value, via ```keepAttributesWithValue``` array
 6. There is an additional field called ```func```. In cases where more needs to be done then is possible by the above fields, you can pass a function which will recieve the node itself. Here is an example of that:
 ```
  'option': {
    upgradeBootstrap: false,
    buildChildren: false,
    keepAttributes: [],
    keepAttributesWithValue: [],
    func: function(node) {
      return htmlToElement('<df-option value="' + node.innerText + '" ' + 'displayText="'+ node.innerText + '"></df-input-container>');
    }
   ```
**The config file will most likely be different for different projects and will keep on growing as we start progressing on the project, there is an uptake in beginning as new mappings are to be created for the library components unique to the project, but its pretty straightforward and takes insignificant time** 
