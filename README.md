# jsRichGrid
A dynamic javascript based table for creating rich web applications. 

jsRichGrid is a JQuery plugin that allows you to create rich web based business applications. The basic idea of jsRichGrid is to bring the old style editable grid to the web platform. You can use this with any of the web progrmming langages. This plugin requires few parameters to be passed. These parameters defines the structure and behavior of the grid. Right now this project at the development period so only two types of input are supported. 

* SELECT BOX
* TEXT INPUT BOX

###How to use this plugin?
First you need to create an HTML table with the follwing structure
```html
 <table border="1" cellspacing="0" cellpadding="0" id="mytbl" width="75%">
	<thead>
	   <tr>
      <th>Sl</th>
      <th>Age</th>
      <th>Country</th> 
      <th><span class="rbtn-add-row">Add</th>
     </tr> 	
	</thead>
	<tbody>		 
	</tbody>  	
  </table>
```
You can simply include jsRichGrid.js in your html page
```html
<script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="crossorigin="anonymous"></script>
<script type="text/javascript" src="jsRichGrid.js"></script>
```

Now you need to initialize the plugin inside your document.ready() function.
```html
<script type="text/javascript">
```
```javascript

$(document).ready(function () {
  $('#test').click(function () {
    alert($('#mytbl').jsRichGridGetData());
  });
  $('#mytbl').jsRichGrid({
    'tableType': [
      'textBox',
      'dropDown',
      'dropDown'
    ],
    'tableTdClass': [
      '.txt',
      '.drp',
      '.lbl'
    ],
    'dropdownSource': [
      {
        'key': '.drp',
        'source': [
          {
            'display': 'Item 1',
            'value': '1'
          },
          {
            'display': 'Item 2',
            'value': '2'
          },
          {
            'display': 'Item 3',
            'value': '3'
          }
        ]
      },
      {
        'key': '.lbl',
        'source': [
          {
            'display': 'Item 1',
            'value': '1'
          },
          {
            'display': 'Item 2',
            'value': '2'
          },
          {
            'display': 'Item 3',
            'value': '3'
          }
        ]
      }
    ]
  }
  );
});


```
```html
</script>
```

### The properties

* **tableType**
  This is an array the defines the type of each cell of the table. That is when the cell is clicked what control to be diplyed?
* **tableTdClass**
  This array must have the same length of the tableType property. This defines class name for each column.
* **dropdownSource**
  When you use a select box in the grid you can specify the data for each dropdown by using this property. This poerty has two properties.
  * **key**
        is the class name of the columnt that contains the seelect input.
  * **source**
        specifies the data to be displayed in the drop down.
  
 ### Geting data from the jsRichGrid
 Simple do this
 ```javascript
 $('#mytbl').jsRichGridGetData()
 ```
