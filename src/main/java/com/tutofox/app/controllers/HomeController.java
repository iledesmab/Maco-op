package com.tutofox.app.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.ModelAndView; 
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {

    @RequestMapping(value= {"/home"}, method=RequestMethod.GET)
        public ModelAndView home(){
            ModelAndView model = new ModelAndView();
            model.setViewName("Home");
            return model;
        }
    @RequestMapping(value= {"/employee", "/employee/index", "/employee/form", "/employee/edit/{id}"}, method=RequestMethod.GET) 
        public ModelAndView employee() {
            ModelAndView model = new ModelAndView();
            model.setViewName("Employee");
            return model;
        }
}