(function($){
	$.fn.jsRichGrid = function(options){
		var data_array = [];
		return this.each(function() {			
			var thisTable = $(this);
			var row_count = thisTable.find('tbody tr').length;

			var tableStructure = options.tableType;
			var tableTdClass = options.tableTdClass;
			var dropdownSource = options.dropdownSource;
			for(row_index = 0;row_index<row_count;row_index++){
				var row_tr = thisTable.find('tbody tr')[row_index];
				data_array.push([]);
				for(col_index = 0;col_index < tableTdClass.length;col_index++){					
					var row_td = row_tr.children[col_index];
					data_array[row_index][col_index] = $(row_tr.children[col_index]).html();
				}
				
			}			

			for(iCount = 0;iCount<tableStructure.length;iCount++){
				switch(tableStructure[iCount]){
					case "textBox":
						thisTable.before('<div class="div'+ tableTdClass[iCount].substr(1) +
							'" style="display:none;position:absolute;" child="text'+ 
							tableTdClass[iCount].substr(1) +'"><input type="text" class="text'+ 
							tableTdClass[iCount].substr(1) +'" style="width:100%;border:0;"/></div>');
						break;
					case "dropDown":
						var divelement = '<div class="div'+ tableTdClass[iCount].substr(1) +
						'" style="display:none;position:absolute;" child="drop'+ 
						tableTdClass[iCount].substr(1) +'"><select class="drop'+ 
						tableTdClass[iCount].substr(1) +'" style="width:100%;border:0">'+ 
						'<option value="0">Choose</option>';						
						for(i=0;i<dropdownSource.length;i++){
							if(dropdownSource[i].key == tableTdClass[iCount]){								
								for(j=0;j<dropdownSource[i].source.length;j++){									
									divelement+='<option value="'+ dropdownSource[i].source[j].value +'">'+ dropdownSource[i].source[j].display +'</option>';
								}
								break;									
							}
						}
						thisTable.before(divelement+'</select></div>');
						break;
					case "label":
						thisTable.before('');
						break;
				}

				var current_td;
				$(document).on("click",tableTdClass[iCount],function(){					
				    $('.div'+$(this).attr("class")).css({
				        width:$(this).width(),
				        height:$(this).height(),
				        left:$(this).position().left,
				        top:$(this).position().top
			      	});			      	
			      	current_td = $(this);
			      	$('.'+ $('.div'+current_td.attr("class")).attr("child")).val(current_td.attr("select-val"));
			      	$('.div'+$(this).attr("class")).show();
				});

				$(document).on("focusout",'.text'+tableTdClass[iCount].substr(1),function(){
					var x,y;
					x = current_td[0].cellIndex;
					y = current_td.parent().index();					
					while(typeof data_array[y] == "undefined"){
						data_array.push([]);
					}
					data_array[y][x] = $(this).val();
					current_td.html($(this).val());
					current_td.attr("select-val",$(this).val());
					$(this).val('');					
					$(this).parent().hide();					
				});

				$(document).on("change",'.drop'+tableTdClass[iCount].substr(1),function(){
					var x,y;
					x = current_td[0].cellIndex;
					y = current_td.parent().index();
					while(typeof data_array[y] == "undefined"){
						data_array.push([]);
					}					
					data_array[y][x] = $(this).val();
					current_td.html($('option:selected',this).text());
					current_td.attr("select-val",$(this).val());
					$(this).val('');					
					$(this).parent().hide();
				});
			}

			$(document).on("click",'.richRowDelete',function(){
				data_array.splice($(this).parent().parent().index(), 1);
				$(this).parent().parent().remove();		

			});
			$('.rbtn-add-row').click(function(){
				var element_to_append = '<tr>';
				for(i=0;i<tableTdClass.length;i++){
					element_to_append+='<td class="'+ tableTdClass[i].substr(1)+'" select-val="unset">unset</td>';
				}
				element_to_append+='<td class="richAction"><span class="richRowDelete">Delete</span></td></tr>';
				thisTable.append(element_to_append);
			});
        
    	});
	}
})(jQuery);