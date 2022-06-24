/***
 * 최근 본 펀드 gnb에 그리기
 * footer.jsp
 * @returns
 */

const SELLER_IMG_ICON_MAP = {
		IMG000001:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG000004:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG000052:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG000010:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG000005:'/static/img/common/sales-s-logo-miraeasset.jpg'
		,IMG000013:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG000030:'/static/img/common/sales-s-logo-samsumg.jpg'
		,IMG000029:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG000006:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG000002:'/static/img/common/sales-s-logo-shinhan.jpg'
		,IMG000068:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG000024:'/static/img/common/sales-s-logo-yuanta.jpg'
		,IMG000008:'/static/img/common/sales-s-logo-eugene.jpg'
		,IMG000023:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG000752:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG000069:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG000072:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG000753:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG000050:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG000056:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG000046:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG000003:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG004325:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG000009:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG000021:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG000022:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG000758:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG000086:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG000031:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG000017:'/static/img/common/sales-s-logo-kb.jpg'
		,IMG000071:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG000012:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG000025:'/static/img/common/sales-s-logo-sh.jpg'

		,IMG001100:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG020160:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG020254:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG001290:'/static/img/common/sales-s-logo-gwangju.jpg'
		,IMG000950:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG020205:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG020162:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG000000:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG001050:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG001640:'/static/img/common/sales-s-logo-shinhan.jpg'
		,IMG020073:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG020071:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG020156:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG001040:'/static/img/common/sales-s-logo-dgb.jpg'
		,IMG003484:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG020207:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG020121:'/static/img/common/sales-s-logo-sh.jpg'
		,IMGA01170:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG001320:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG020211:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG020125:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG020155:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG020256:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG001230:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG020250:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG001520:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG001940:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG020122:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG020204:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG001000:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG020208:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG001300:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG020158:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG020161:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG020202:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG020159:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG020255:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG020124:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG020123:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG001170:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG020257:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG020206:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG020036:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG001420:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG020072:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG020210:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG001880:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG020209:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG020070:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG020157:'/static/img/common/sales-s-logo-sh.jpg'
		,IMG001120:'/static/img/common/sales-s-logo-kb.jpg'
		,IMG001800:'/static/img/common/sales-s-logo-sh.jpg'
};


function gnbCartCountView(){
	
	if( $("#U_IDN").val() == ""){
		$("#gnbCartCount").text( getCart().length );
	}else{
		var dbCart = $("#U_FCD").val();
		
		if( dbCart == ""){
			$("#gnbCartCount").text( "0" );
		}else{
			var dbCartSize = dbCart.split(",").length;
			$("#gnbCartCount").text( dbCartSize );
		}
		
	}
	
}

function calendarCalc(startD, endD, value){
	var sday = getCalcMonthDate(endD.val(), value);
	startD.val(sday);
}

//날짜 yyyy-mm-dd 형식으로 return
function getFormatDate(date){
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return  year + '-' + month + '-' + day;
}

//날짜 계산.
function getCalcMonthDate(endDate, month){
	let date = new Date(endDate);
	date.setMonth(date.getMonth() - month);

	return getFormatDate(date);
}

function getSellerImgIcon(code){
	return SELLER_IMG_ICON_MAP["IMG"+code];
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}