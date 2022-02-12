
function reset_send() {
	let fr = document.frm;
	//--비밀번호 유효성 검사용
	//-비밀번호 체크용
	const pwdChkCondition = { 'min': 6, 'max': 12 }; //비밀번호 최소, 최대 값
	let validityPwd = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{" + pwdChkCondition.min + "," + pwdChkCondition.max + "}$"); //(?=.*?[#?!@$%^&*-]) 특수문자 처리 대비

	if (fr.pwd.value.trim() == "") {
		alert("비밀번호를 입력해주세요.");
		fr.pwd.value = "";
		fr.pwd.focus();
		return false;
	}
	if (!validityPwd.test(fr.pwd.value)){
		alert("비밀번호 설정\n -영문(대/소문자)\n -특수문자 \n -숫자\n 모두 조합하여야 사용 가능합니다.\n(최소: " + + pwdChkCondition['min'] + " 최대: " + pwdChkCondition['max'] + ")");
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
	if (!validityPwd.test(fr.pwd.value)) {
		alert("영문(대/소문자)와 숫자를 포함하여 작상해주세요.\n(최소: " + pwdChkCondition.min + "최대: " + pwdChkCondition.max + ")");
		fr.pwd.value = "";
		fr.pwd.focus();
		return false;
	}
	if (fr.pwd.value != fr.pwd2.value) {
		alert("암호가 다릅니다.\n 다시 입력해주세요.");
		fr.pwd.value = "";
		fr.pwd2.value = "";
		fr.pwd.focus();
		return false;
	}

	//ajax 이용하여 페이지 전환 없이 비밀번호 설정 처리
	$.ajax({
		url: "resetPwd_go",
		type: "post",
		data: { u_id: fr.id.value, pwd: fr.pwd.value },
		dataType: "text",
		success: function(data) {
			if (data != 0) {
				alert("비밀번호 재설정이 완료되었습니다.\n로그인 페이지로 이동합니다.");
				location.href = "login";
				
			} else if (data == 0) {
				alert("비밀번호 재설정에 실패하였습니다.\n관리자에게 문의바랍니다.");
			}
		},
		error: function(request, status, error) {
			alert("code = " + request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
		}
	});
}