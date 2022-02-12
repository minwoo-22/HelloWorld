let beforeValiData = "";
let aftervaliId = "";
let aftervaliNick = "";
let idCheck = 0;
let nickCheck = 0;

//-전화번호 체크용
let validityPhone = new RegExp("^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$");

function validate() {
	let fr = document.frm;
	if (fr.name.value.trim() == "") {
		alert("이름을 입력해주세요.");
		fr.name.value = "";
		fr.name.focus();
		return false;
	}
	if (fr.phone.value.trim() == "") {
		alert("전화번호를 입력해주세요.");
		fr.phone.value = "";
		fr.phone.focus();
		return false;
	}
	if (!validityPhone.test(fr.phone.value)) {
		alert("전화번호를 올바르게 입력해주세요\n ex)000-000-0000 or 000-0000-0000");
		fr.phone.value = "";
		fr.phone.focus();
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
	fr.birth.value = fr.yyyy.value + "-" + fr.mm.value + "-" + fr.dd.value;
	return true;
}
function find_send() {
	console.log("findId");
	if (validate()) {
		let fr = document.frm;
		$.ajax({
			url: "findId_go",
			type: "get",
			data: { name: fr.name.value, birth: fr.birth.value, phone: fr.phone.value },
			dataType: "text",
			success: function(data) {
				if (data != "null") {
					alert(fr.name.value + " 고객님의 아이디는 " + data + "입니다.");
					
					let message = "비밀번호 찾기 페이지로 이동하시겠습니까?";
					result = window.confirm(message);
					if(result){
						location.href = "findPwd";
					}else{
						location.href = "login";	
					}
				} else if(data == "null") {
					alert("일치하는 정보가 없습니다.\n확인 후 다시 진행해주세요.");
				}
			},
			error: function(request, status, error) {
				alert("code = " + request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
			}
		});
	}
}

