package com.helloworld.project.domain;

import com.helloworld.project.domain.enums.Role;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@NoArgsConstructor
@Getter
@Setter
public class OAuthAttributes {
    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String name;
    private String email;
    private String picture;
    private String privateId;

    @Builder
    public OAuthAttributes(Map<String, Object> attributes, String nameAttributeKey, String name, String email,
                           String picture, String privateId) {
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.name = name;
        this.email = email;
        this.picture = picture;
        this.privateId = privateId;
    }

    // 해당 로그인 서비스가 kakao인지 google인지 구분하여, 알맞게 매핑하자
    // 여기서 registrationId는 OAuth2 로그인을 처리한 서비스 명("google", "kakao", "naver"..)이 되고,
    // userNameAttributeName은 해당 서비스의 map의 키값이 되는 값입니다. {google="sub", kakao="id" ...}
    public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes) {
        if ("naver".equals(registrationId)) {
            return ofNaver("id", attributes);
        } else if ("kakao".equals(registrationId)) {
            return ofKakao("id", attributes);
        }
        return ofGoogle(userNameAttributeName, attributes);
    }

    private static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
        // kakao는 kakao_account에 유저 정보가 있다.
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> kakaoProfile = (Map<String, Object>) kakaoAccount.get("profile");
        String userId = "kakao_"+ String.valueOf(attributes.get("id"));
        return OAuthAttributes.builder()
                .name((String) kakaoProfile.get("nickname"))
                .email((String) kakaoAccount.get("email"))
                .picture((String) kakaoProfile.get("profile_image_url"))
                .privateId(userId)
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    private static OAuthAttributes ofNaver(String userNameAttributeName, Map<String, Object> attributes) {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");
        String userId = "naver_"+ String.valueOf(attributes.get("response"));
        return OAuthAttributes.builder()
                .name((String) response.get("name"))
                .email((String) response.get("email"))
                .picture((String) response.get("profile_image"))
                .privateId(userId)
                .attributes(response)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    private static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {
        String userId = "google_"+ String.valueOf(attributes.get("sub"));
        return OAuthAttributes.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .picture((String) attributes.get("picture"))
                .privateId(userId)
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    public User toEntity() {
        return User.builder()
                .name(name)
                .email(email)
                .picture(picture)
                .role(Role.GUEST)
                .privateId(privateId)
                .build();
    }
}

// of : OAuth2User에서 반환하는 사용자 정보는 Map이기 때문에  값 하나하나를 변환해야만 한다.
// toEntity : User 엔티티를 생성한다.
   // OAuthAttributes에서 엔티티를 생성하는 시점은 처음 가입할 때다
   // 가입할 때의 기본 권한을 Guest로 주기 위해서 role 빌더값에는 Role.GUEST를 사용한다.
