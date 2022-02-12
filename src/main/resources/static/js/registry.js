// id, nickname 중복 검사
let beforeValiData = "";
let aftervaliId = "";
let aftervaliNick = "";
let idCheck = 0;
let nickCheck = 0;
let validity = 0;

//--유효성 검사용
//-아이디 체크용
const idChkCondition = {'min' : 4, 'max' : 12};
let validityId = new RegExp('^[a-z]{1}[a-z0-9]{' + (idChkCondition.min - 1) + ',' + (idChkCondition.max - 1)  +'}$'); //아이디 - 영문 소문자, 숫자 포함 최소 4~12글자

//-비밀번호 체크용
const pwdChkCondition = { 'min': 6, 'max': 12 }; //비밀번호 최소, 최대 값
let validityPwd = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{" + pwdChkCondition.min + "," + pwdChkCondition.max + "}$"); //(?=.*?[#?!@$%^&*-]) 특수문자 처리 대비

//-닉네임 체크용
const nickChkCondition = {'min' : 2, 'max' : 10};
let validityNick = new RegExp('^[a-zA-Z0-9가-힣\x20]{' + nickChkCondition['min'] + ',' + nickChkCondition['max'] +'}$');

//-이메일 체크용
let validityEmail = new RegExp("^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$", "i");

//-이름 체크용
const nameChkCondition = {'min' :2 , 'max' : 10};
let validityName = new RegExp("^[가-힣]{" + nameChkCondition['min'] + ',' + nameChkCondition['max'] + "}$");

//-전화번호 체크용
let validityPhone = new RegExp("^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$");

function chkId(param) {
	console.log(param);
	let message = "";
	let message2 = "";
	let category = param;
	if (category == "id") {
		fr = document.frm.u_id;
		message = "아이디";
		message2 = "아이디를";
	} else if (category == "nickname") {
		fr = document.frm.nickname;
		message = "닉네임";
		message2 = "닉네임을";
	}
	if (fr.value.trim() == "") {
		alert(message2 + " 입력해주세요.");
		fr.value = "";
		fr.focus();
		return false;
	}

	if (category == "id") {
		if (!validityId.test(fr.value)) {
			alert(fr.value);
			alert("아이디는 영문(소문자)으로 시작, 숫자만 사용 가능합니다.\n(최소: 4 최대: 12)");
			fr.value = "";
			fr.focus();
			return false;
		}
	} else if (category == "nickname") {
		if (!validityNick.test(fr.value)) {
			alert(fr.value);
			alert("닉네임은 한글, 숫자, 영문 대/소문자만 사용 가능합니다.\n(최소: 2 최대: 10)");
			fr.value = "";
			fr.focus();
			return false;
		}
	}

	beforeValiData = fr.value;
	if(category == "id") {
		$.ajax({
		url: "checkId",
		type: "get",
		dataType: "json",
		data: { u_id: beforeValiData},
		success: function(data) {
			if (data == "1") {
				alert("사용 불가한 " + message + "입니다\n 다른 " + message2 + " 사용해주세요.");
				if (category == "id") {
					idCheck = 0;
				} else {
					nickCheck = 0;
				}

			} else {
				alert("사용 가능한 " + message + "입니다.");
				if (category == "id") {
					idCheck = 1;
					aftervaliId = beforeValiData;
				} else {
					nickCheck = 1;
					aftervaliNick = beforeValiData;
				}
			}
		},
		error: function(request, status, error) {
			alert("ajax 오류!");
			alert("code = " + request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
		}
		});
	} else if (category == "nickname") {
		$.ajax({
		url: "checkNickname",
		type: "get",
		dataType: "json",
		data: { nickname: beforeValiData},
		success: function(data) {
			if (data == "1") {
				alert("사용 불가한 " + message + "입니다\n 다른 " + message2 + " 사용해주세요.");
				if (category == "id") {
					idCheck = 0;
				} else {
					nickCheck = 0;
				}

			} else {
				alert("사용 가능한 " + message + "입니다.");
				if (category == "id") {
					idCheck = 1;
					aftervaliId = beforeValiData;
				} else {
					nickCheck = 1;
					aftervaliNick = beforeValiData;
				}
			}
		},
		error: function(request, status, error) {
			alert("ajax 오류!");
			alert("code = " + request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
		}
		});
	}
	
}

// 회원가입 검증
function validate() {
	let fr = document.frm;
	if (fr.u_id.value.trim() == "") {
		alert("아이디를 입력해주세요.");
		fr.u_id.value = "";
		fr.u_id.focus();
		return false;
	}
	if (fr.pwd.value.trim().length < 1) {
		alert("암호를 입력해주세요.");
		fr.pwd.focus();
		return false;
	}
	if (!validityPwd.test(fr.pwd.value)){
		alert("비밀번호는 영문 대/소문자, 특수문자, 숫자를 조합하여야 사용 가능합니다.\n(최소: " + + pwdChkCondition['min'] + " 최대: " + pwdChkCondition['max'] + ")");
		fr.pwd.value = "";
		fr.pwd2.value = "";
		fr.pwd.focus();
		return false;
	}
	if (fr.pwd2.value.trim().length < 1) {
		alert("확인 암호를 입력해주세요.");
		fr.pwd2.focus();
		return false;
	}
	if (fr.pwd.value != fr.pwd2.value) {
		alert("암호가 다릅니다.\n 다시 입력해주세요.");
		fr.pwd.value = "";
		fr.pwd2.value = "";
		fr.pwd.focus();
		return false;
	}
	if (fr.nickname.value.trim() == ""){
		alert("닉네임을 입력해주세요.");
		fr.nickname.value="";
		fr.nickname.focus();
		return false;
	}
	
	if (fr.email.value.trim() == "") {
		alert("이메일 주소를 입력해주세요.");
		fr.email.value = "";
		fr.email.focus();
		return false;
	}
	if (!validityEmail.test(fr.email.value)){
		alert("이메일 양식에 맞게 다시 작성해주세요.\nExample\n example@daum.net \n ex-ample@naver.com \n exam_ple@example.co.kr, ...");
		fr.email.value="";
		fr.email.focus();
		return false;
	}
	if (fr.name.value.trim() == "") {
		alert("이름을 입력해주세요.");
		fr.name.value = "";
		fr.name.focus();
		return false;
	}
	if (!validityName.test(fr.name.value)){
		alert("이름은 한글만 입력가능합니다. (" + nameChkCondition.min + "~" + nameChkCondition.max + ")");
		fr.name.value="";
		fr.name.focus();
		return false;
	}
	
	if (fr.yyyy.value < 1900 || fr.yyyy.value > 2021) {
		alert("올바른 연도 값을 입력해주세요.");
		fr.yyyy.value = "";
		fr.yyyy.focus();
		return false;
	}
	if (fr.mm.value < 1 || fr.mm.value > 12) {
		alert("월 값을 선택해주세요.");
		fr.mm.value = "";
		fr.mm.focus();
		return false;
	}
	if (fr.dd.value < 1 || fr.dd.value > 31) {
		alert("올바른 일 값을 입력해주세요.");
		fr.dd.value = "";
		fr.dd.focus();
		return false;
	}
	if (fr.gender.value == "") {
		alert("성별을 선택해주세요.");
		fr.gender.value = "";
		fr.gender.focus();
		return false;
	}
	if (fr.phone.value.trim() == "") {
		alert("전화번호를 입력해주세요.");
		fr.phone.value = "";
		fr.phone.focus();
		return false;
	}
	if (!validityPhone.test(fr.phone.value)){
		alert("전화번호를 올바르게 입력해주세요\n ex)01X-000-0000 or 01X-0000-0000");
		fr.phone.value = "";
		fr.phone.focus();
		return false;
	}
	if (idCheck != 1 || fr.u_id.value != aftervaliId) {
		alert("아이디 중복검사를 진행해주세요.");
		return false;
	}
	if (nickCheck != 1 || fr.nickname.value != aftervaliNick) {
		alert("닉네임 중복검사를 진행해주세요.");
		return false;
	}
	return true;
}