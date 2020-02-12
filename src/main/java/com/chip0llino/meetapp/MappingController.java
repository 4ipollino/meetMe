package com.chip0llino.meetapp;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class MappingController {
    private  static final Logger LOGGER = LoggerFactory.getLogger(MappingController
            .class);
    @Autowired
    private UsersRepository repository;

    //TODO: add password encryption from spring security
    @ResponseBody
    @PostMapping("/register")
    public String registerUser(@RequestBody ServiceUser user) {
        try {
            repository.insert(user);
            return ("{\"result\": \"ok\", \"status\":\"200\"}, \"path\":\"/register\"");
        }
        catch (Error e)
        {
            LOGGER.error(e.getMessage());
            return (String.format("\"result\": %s", e.getMessage()));
        }
    }

    //TODO: add login processing
    @RequestMapping("/login")
    public void loginUser(@RequestBody ServiceUser user) {
        LOGGER.debug("logged in");
    }
}
