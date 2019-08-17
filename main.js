function loadData() {  
	
 	 var newArr = window.raw_loaded_json_data;
	 main2(newArr)
	
}

function isDictDerivate(typeName) {
	if (!data_json["types"][typeName]) {
		return false
	}
	return data_json["types"][typeName]["\"format"] == 'dict'
}

function createAddFieldButton() {
	return $("<li></li>").append($(".add-field-template").clone().removeClass("add-field-template").attr('hidden',false))
}

function createAddElementButton() {
	return $("<li></li>").append($(".add-element-template").clone().removeClass("add-field-template").attr('hidden',false))
}

function createInputElement(parent) {
	createInputFieldGivenKey(parent.children.length - 1, parent)
}
function createInputFieldGivenKey(key, parent) {
	var t = $("<div></div>").addClass('key-and-value')

	console.log($(parent).parent())
	console.log($(parent).parent().attr("data-theotype"))
	var datatype = 0
		|| window.data_json["types"][$(parent).parent().attr("data-theotype")]["keys"][key]
		|| $(parent).parent().attr("data-fixedchildrentype")
		|| "str"
	;
	

	switch (datatype.split('.')[0]) {
		case "array":
			var l = $("<span></span>")
					.addClass('key-text')
					.addClass("caret")
					.text(key)
					.append(makeControlIcons())
			addTreeTrigger(l[0])
			t.append(l)
			t.append(
				$("<ul></ul>")
				.addClass("nested")
				.attr(
					"data-fixedChildrenType",
				 	datatype.split('.')[1])
				.attr(
					"data-theotype",
					datatype.split('.')[0])
				.append(createAddElementButton())
			)

			break;
		case "str":
			t.append(
				$("<span></span>")
				.addClass('key-text')
				.text(key))

			var i = $("<input/>")[0]
			i.setAttribute("placeholder", window.data_json["tags"][key])
			t.append($(i))
			t.append(makeControlIcons())
			break;
	}
	console.log(datatype)
	if (isDictDerivate(datatype)) {
		var l = $("<span></span>")
				.addClass('key-text')
				.addClass("caret")
				.text(key)
				.append(makeControlIcons())
		addTreeTrigger(l[0])
		t.append(l)
		t.append(
			$("<ul></ul>")
			.addClass("nested")
			.attr(
				"data-fixedChildrenType",
			 	datatype.split('.')[1])
			.attr(
				"data-theotype",
				datatype.split('.')[0])
			.append(createAddFieldButton())
		)


	}
	parent.appendChild(t.get(0))
}
console.log("Loading...")

function addTreeTrigger(caret) {
	caret.addEventListener("click", function() {
	    this.parentElement.querySelector(".nested").classList.toggle("active");
	    this.classList.toggle("caret-down");
	  });
}
function main() {
	console.log("Fetching data...")
	loadData()

	var toggler = document.getElementsByClassName("caret");
	var i;

	for (i = 0; i < toggler.length; i++) {
	  	addTreeTrigger(toggler[i])
	} 
}
function main2(data_json) {
	console.log(data_json)
	window.data_json = data_json
	var type = "building"
	list = $('#valid_keys')
	Object.keys(window.data_json["types"][type]["keys"]).forEach(function(i, idx) {
		list.append($(`<option value = "${i}"></option>`))
	})
	$("#theoMain").append(createAddFieldButton()).attr("data-theotype", "building")
}


function add_field(e) {
	createInputFieldGivenKey($(e).parent().find('#key').val(), $(e).parent().parent()[0])
}

function add_element(e) {
	createInputElement($(e).parent().parent()[0])
}

function makeControlIcons() {
	return $("<span></span")// return $(".icon-svg").clone().removeClass("icon-svg").height("100%")
}