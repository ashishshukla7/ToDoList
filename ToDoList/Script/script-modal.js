
var myList;
window.onload=function(){
	initialload();
}
function initialload(){
	var xmlhttp=new XMLHttpRequest();
var url="Data/Listdata.json"

xmlhttp.onreadystatechange=function(){
	if(xmlhttp.readyState==4 && xmlhttp.status==200){
		myList=JSON.parse(xmlhttp.responseText);
		createItems(myList);
	}
}
xmlhttp.open("GET",url,true);
xmlhttp.send();
}
function createItems(myList){
	var list=document.getElementById("menu");
	var removeItems=list.getElementsByTagName("li");
	var length=removeItems.length;
	for(var j=0;j<length;j++)
	{
		list.removeChild(removeItems[0]);
	}
	//clearList();

	for (var i = 0; i < myList.length; i++) {
		createList(i,myList);
	
	}
}	

function createList(i,myList){
	var label=	createNode(myList[i]);
	var li= document.createElement("li");
	var editButton= document.createElement("button");
	var editButtonText=document.createTextNode("Edit");
	editButton.appendChild(editButtonText);
	editButton.onclick=function(){

			this.style.display="none";
			var textbox=this.parentElement.getElementsByTagName("input")[0];
			this.parentElement.getElementsByTagName("label")[0].style.display="none";
			textbox.style.display="inline-block";
			textbox.focus();
			textbox.value=this.parentElement.getElementsByTagName("label")[0].innerHTML;
			this.parentElement.getElementsByTagName("button")[1].style.display="none";
		}



	var deleteButton= document.createElement("button");
	var deleteButtonText=document.createTextNode("Delete");
	deleteButton.appendChild(deleteButtonText);

		deleteButton.onclick=function () {
			this.parentElement.remove();
			var taskMenu= document.getElementById("menu");
			var length=taskMenu.getElementsByTagName("li").length;
			if(length==0)
			{
				var listItem= document.createElement("li");
				var labelText= document.createTextNode("No Items in to do list.");
				
				listItem.appendChild(labelText);
				taskMenu.appendChild(listItem);

			}
		}




	var textbox=document.createElement("input");
	textbox.style.display="none";
	textbox.setAttribute("type","text");

		textbox.onblur=function(){
			var label=this.parentElement.getElementsByTagName("label")[0];
			label.style.display="inline-block";
			label.innerHTML=this.value;
			this.style.display="none";
			this.parentElement.getElementsByTagName("button")[0].style.display="inline-block";
			this.parentElement.getElementsByTagName("button")[1].style.display="inline-block";
		}
		textbox.onkeyup=function(e) {
    if (e.keyCode === 13) {

        var label=this.parentElement.getElementsByTagName("label")[0];
			label.style.display="inline-block";
			label.innerHTML=this.value;
			this.style.display="none";
			this.parentElement.getElementsByTagName("button")[0].style.display="inline-block";
			this.parentElement.getElementsByTagName("button")[1].style.display="inline-block";
    }
}

	li.appendChild(label);
	li.appendChild(textbox);
	li.appendChild(editButton);
	li.appendChild(deleteButton);
	menu.appendChild(li);
}


function createNode(details){

var label=document.createElement("label");
var labelText= document.createTextNode(details.item);
label.appendChild(labelText);
return label;
}


function clearList(){
	var list=document.getElementById("menu");
	var length=list.getElementsByTagName("li").length;
	var items=list.getElementsByTagName("li");
	var itemtext=items[0].innerHTML;
	if(length==1 && itemtext=="No Items in to do list.")
		{
			//alert(length);
			list.removeChild(items[0]);
			//console.log('sdfsdfss');
		}
}

document.getElementById("search").onkeyup = function(){

	if(this.value=="")
	{
		initialload();
	}
	else
	{
		var newList = [];
		for (var i = 0; i<myList.length ; i++) {
			if(myList[i].item.toLowerCase().indexOf(document.getElementById("search").value.toLowerCase())!=-1){
				newList.push(myList[i]);
				
			
			}
		}

		createItems(newList);
	}
}
