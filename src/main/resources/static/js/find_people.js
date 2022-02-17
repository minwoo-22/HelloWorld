function findPeople_send() {
	let fr = document.frm;
	if (fr.name.value.trim() == "") {
		alert("검색할 닉네임을 입력해주세요.");
		fr.name.value = "";
		fr.name.focus();
		return false;
	}

	$.ajax({
		url: "findPeople_go",
		type: "get",
		data: { nickname: fr.nickname.value },
		dataType: "json",
		success: function(data) {
			if (data != 0) {
				console.log(data);
				console.log("실행중1");
				$("#divSearchRet").show();
				var tbody="";
				
				$.each(data, function(){
					tbody += "<tr>";
					tbody += "<td><a href=home_go?u_idx=" + this.u_idx + ">" + this.nickname + "</td>";
					tbody += "<td>" + this.name + "</td>";
					tbody += "<td>" + this.birth + "</td>";
					tbody += "<td>" + this.gender + "</td>";
					tbody += "</tr>";
				});
				console.log("tbody : " + tbody);
				$("#tbody").html(tbody);
				
			} else if (data == "0") {
				alert("failed data : " + data);
				alert("일치하는 정보가 없습니다.\n확인 후 다시 진행해주세요.");
			}
		},
		error: function(request, status, error) {
			alert("code = " + request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
		}
	});
}