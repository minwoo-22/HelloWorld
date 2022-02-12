package com.helloworld.project.domain;

import lombok.Getter;

import java.io.Serializable;

@Getter
public class SessionUser implements Serializable {
    private String name;
    private String email;
    private String picture;

    public SessionUser(User user) {
        this.name = user.getName();
        this.email = user.getEmail();
        this.picture = user.getPicture();
    }
}
// SessionUser에는 인증된 사용자 정보만 필요하다
// User 클래스를 사용하면 안되는 이유
   // 만약 사용하면 이런 에러가 발생함
   // Failed to convert from type [java.long.Object] to type [byte[] for value '~~~'
   // 이는 세션에 저장하기 위해 User 클래스를 세션에 저장하려고 하니, User 클래스에 직렬화를 구현하지 않았다는
   // 의미의 에러이다.
   // 하지만 User 클래스에 직렬화 코드를 넣는 것은 좋지 않다. User 클래스는 엔티티이기 때문에 언제 다른 엔티티와 관계가
   // 형성될지 모르기 때문
