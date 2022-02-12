package com.helloworld.project.config;

import com.helloworld.project.domain.enums.Role;
import com.helloworld.project.service.CustomOAuth2UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity  // 해당 어노테이션을 붙인 필터(현재 클래스)를 스프링 필터체인에 등록.
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    // 커스텀한 OAuth2UserService DI
    @Autowired
    private CustomOAuth2UserService customOAuth2UserService;
    //httpsecurity보다 websecurity가 훨씬 빠름
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().mvcMatchers("/image/**"); // 해당 파일들은 security 적용 무시
        web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations()); // 정적인 리소스들에 대해 시큐리티 적용 무시
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()  // URL별 권한 관리를 설정하는 옵션의 시작점
                .antMatchers("/customer/**").authenticated() // customer로 접근하려면 인증받아야됨
                .antMatchers("/api/**").hasRole(Role.USER.name())
                .anyRequest().permitAll() // 나머지는 모두 마음대로 접근 가능하다
//                .anyRequest().authenticated()
            .and()
                .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/")
            .and()
                .oauth2Login()
                .loginPage("/login") // 로그인이 필요한 경우 이 페이지로 이동
                .defaultSuccessUrl("/main")  // 로그인 성공 후 페이지
                .userInfoEndpoint()
                .userService(customOAuth2UserService);
    }
    // andMatchers : 권한 관리 대상을 지정하는 옵션이다, URL, HTTP 메소드별로 관리가 가능하다.
       // "/" 등 지정된 URL들을 permitAll() 옵션을 통해 전체 열람 권한을 주었다.
       // "/api/**" 주소를 가진 API는 USER 권한을 가진 사람만 가능하도록 했다.
    // anyRequest : 설정된 값들 이외 나머지 URL들을 나타낸다.
       // 여기서는 authenticated()을 추가하여 나머지 URL들은 모두 인증된 사용자에게만 허용하게 한다.
    // logout().logoutSuccessUrl("/") : 로그아웃 기능에 대한 여러 설정의 진입점. 로그아웃 성공 시 "/" 주소로 이동한다
    // userInfoEndPoint : OAuth2 로그인 성공 이후 사용자 정보를 가져올 때의 설정들을 담당한다.
    // userService : 소셜 로그인 성공 후속 조치를 진행할 UserService 인터페이스의 구현체를 등록한다.
       // 리소스 서버(즉, 소셜 서비스들)에게 사용자 정보를 가져온 상태에서 추가로 진행하고자 하는 기능을 명시할 수 있다.
}
