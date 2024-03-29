import React,{Component} from "react";
import {NavLink} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import Select from 'react-select';
import { useState } from "react";
//import{Button,Form} from 'react-bootstrap';

const Register = () => {

    let navigate = useNavigate();

    const [cookies, setCookie] = useCookies(['Appdoon_Auth']);

    useEffect(()=>{
        if(cookies.Appdoon_Auth){
            navigate('/profile')
        }
    },[cookies])

    useEffect(() => {
        document.title = "ثبت نام";
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        let role = "User";
        if(selectedOption){
            role = selectedOption.value;
        }

        //console.log(roles);

        fetch(process.env.REACT_APP_API+'authentication/register',{
            method:"POST",
            credentials:'include',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Email:event.target.Email.value,
                Username:event.target.Username.value,
                Password:event.target.Password.value,
                Role:role

            })
        })
        .then(res=>res.json())
        .then((result)=>{
            if(result.IsSuccess){
                document.getElementById("register_error").style.color = "green";
                document.getElementById("register_error").innerHTML = result.Message;
                setTimeout(() => {
                    navigate('/profile');
                    window.location.reload();
                }, 100);
            }
            else{
                document.getElementById("register_error").style.color = "red";
                document.getElementById("register_error").innerHTML = result.Message;
            }
            
            
        },
        (error)=>{
            document.getElementById("register_error").style.color = "red";
            document.getElementById("register_error").innerHTML = error.message;
        })
    }

    const customStyleForTestsList = {

        container:(provided) => ({
            ...provided,
            minWidth:"300px",
        }),

        menuList:(provided) => ({
            ...provided,
            maxHeight:"200px",
        }),
        menu:(provided) => ({
            ...provided,
            zIndex: "9999",
        }),
        
    };
    const [options, setOptions] = useState([
        {value: "User", label:"دانش آموز"},
        {value: "Teacher", label:"معلم"}
    ]);
    const [selectedOption,setSelectedOption] = useState({value: "User", label:"دانش آموز"});

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    return(
        !cookies.Appdoon_Auth &&
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-lg">
                        <br />
                        <br />
                        <br />
                        <br />
                        <section className="page-account-box">
                            <div className="col-lg-6 col-md-6 col-xs-12 mx-auto">
                                <div className="ds-userlogin">
                                    <a href="#" className="account-box-logo" style={{marginTop:"-10px"}}>Appdoon</a>
                                    <div className="account-box">
                                        <div className="account-box-headline">
                                            <NavLink to="/login" class="login-ds">
                                                <span class="title">ورود</span>
                                                <span class="sub-title">به حساب کاربری</span>
                                            </NavLink>


                                            <NavLink to="/register" class="register-ds active">
                                                <span class="title">ثبت نام</span>
                                                <span class="sub-title">در سایت</span>
                                            </NavLink>
                                        </div>

                                        <div className="Login-to-account mt-4">
                                            <div className="account-box-content">
                                                <h4>ثبت نام در سایت</h4>
                                                <form onSubmit={handleSubmit} action="#" className="form-account text-right">







                                                    <div className="form-account-title">
                                                        <label for="email-phone">ایمیل</label>
                                                        <input dir="auto" type="text" className="number-email-input" name="Email"/>
                                                    </div>

                                                    <div className="form-account-title">
                                                        <label for="email-phone">نام کاربری</label>
                                                        <input dir="auto" type="text" className="number-email-input" name="Username"/>
                                                    </div>

                                                    <div className="form-account-title">
                                                        <label for="password">رمز عبور</label>
                                                        <input dir="auto" type="password" className="password-input" name="Password"/>
                                                    </div>

                                                    <div className="form-account-title">
                                                        <label for="role">نقش</label>
                                                        <Select 
                                                            className="reactselect"
                                                            menuPlacement="top"
                                                            placeholder="نقش خود را انتخاب کنید ..."
                                                            value={selectedOption}
                                                            onChange={handleChange}
                                                            options={options}
                                                            styles={customStyleForTestsList}
                                                        />
                                                    </div>


                                                    {/*

                                                    <div className="form-auth-row">
                                                        <label for="#" className="ui-checkbox mt-1">
                                                            <input type="checkbox" value="1" name="login" id="remember"/>
                                                            <span className="ui-checkbox-check"></span>
                                                        </label>
                                                        <label for="remember" className="remember-me mr-0"><a href="#">حریم خصوصی</a> و <a href="#">شرایط قوانین </a>استفاده از سرویس های سایت دیجی‌اسمارت را مطالعه نموده و با کلیه موارد آن موافقم.</label>
                                                    </div>

                                                    */}

                                                    <div style={{marginTop : "-20px", marginBottom : "-20px"}}>
                                                        <p style={{fontSize : "14px"}} id="register_error"></p>
                                                    </div>

                                                    <div className="form-row-account">
                                                        <button variant="primary" type="submit" className="btn btn-primary btn-register">ثبت نام</button>
                                                    </div>







                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <div className="progress-wrap">
                <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
                    <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"/>
                </svg>
            </div>



            <br/>
            <br/>
            <br/>
            <br/>
        </div>




    );
}

export default Register;

