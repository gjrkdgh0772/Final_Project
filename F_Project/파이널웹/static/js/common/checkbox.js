/***
 * 전체 체크 해지
 * @param objChk - tbody의 체크 박스 dom
 * @param objAllChk - thead의 체크 박스 dom
 * @returns
 */

function checkboxAllCheckFlag(objChk, objAllChk){
	const checkbox = objChk;
	const checkFlag = objAllChk.is(":checked");
	checkbox.each(function(){
		this.checked = checkFlag;    //체크값 변경
	});
}

/***
 * 체크된카트의  value값 불러옴
 * @param cartchkList - tbody의 체크 박스 dom
 * @returns
 */
function cartCheckedList(cartchkList){
	const cartList = new Array();
	cartchkList.each(function(){
		if(this.checked == true){ //체크된값
			cartList.push(this.value);   //리스트에 값 저장
		}
	});
	return cartList;
}
