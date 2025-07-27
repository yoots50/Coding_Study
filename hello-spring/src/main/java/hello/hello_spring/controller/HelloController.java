package hello.hello_spring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HelloController {
    @GetMapping("hello") // localhost:8080/hello으로 접속하면 Tomcat Server가 이쪽으로 유도
    public String hello(Model model) { // localhost:8080/hello에 접속 시 실행되는 메서드
        model.addAttribute("data", "hello!!"); // data변수에 "hello!!"를 할당
        return "hello"; // hello.html을 뜻함
    }
}