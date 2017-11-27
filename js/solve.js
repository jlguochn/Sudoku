var a = new Array();
var visit_row = new Array();
var visit_column = new Array();
var visit_a = new Array();
var visit_area = new Array();
var end = 0;
for(var i=1;i<=9;i++){
	a[i] = new Array();
	visit_row[i] = new Array();
	visit_column[i] = new Array();
	visit_a[i] = new Array();
	visit_area[i] = new Array();
	for(var j=1;j<=9;j++){
		a[i][j] = 0;
		visit_row[i][j] = 0;
		visit_column[i][j] = 0;
		visit_a[i][j] = 0;
		visit_area[i][j] = 0;
	}
}

function figure(row,column){
	var r = Math.floor(row%3 ? row/3+1 : row/3);
	var c = Math.floor(column%3 ? column/3+1 : column/3);
	return (r-1)*3+c;
}

function dfs(depth){
	if(end)return;
	if(depth == 82){
		for(var i=1;i<=9;i++){
			for(var j=1;j<=9;j++){
				document.getElementById((i-1)*9+j).value = a[i][j];
			}
		}
		end = 1;
		return;
	}
	var row = Math.floor(depth%9 ? depth/9+1 : depth/9);
	var column = Math.floor(depth%9 ? depth%9 : 9);
	var area = figure(row,column);
	if(!visit_a[row][column]){
		for(var i=1;i<=9;i++){
			if(!visit_row[row][i] && !visit_column[column][i] && !visit_area[area][i]){
				a[row][column] = i;
				visit_row[row][i] = 1;
				visit_column[column][i] = 1;
				visit_area[area][i] = 1;
				dfs(depth+1);
				visit_row[row][i] = 0;
				visit_column[column][i] = 0;
				visit_area[area][i] = 0;
			}
		}
	}else{
		dfs(depth+1);
	}
}

function solve(){
	for(i=1;i<=9;i++){
		for(j=1;j<=9;j++){
			var v = document.getElementById((i-1)*9+j).value;
			if(v != ""){
				a[i][j] = v;
				visit_a[i][j] = 1;
				visit_row[i][v] = 1;
				visit_column[j][v] = 1;
				visit_area[figure(i,j)][v] = 1;
			}else{
				a[i][j] = 0;
			}
		}
	}
	dfs(1);
}
