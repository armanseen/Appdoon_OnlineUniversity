import {NavLink} from 'react-router-dom';
import { useState } from "react";
import useFetch from '../Common/useFetch';
import { Col, Form } from "react-bootstrap";
import useCreate from '../Common/useCreate';
import $ from 'jquery'

const CreateLesson = () => {


    const [urlPost, setUrlPost] = useState(process.env.REACT_APP_API + "lesson");
    const [sensetive, setSensetive] = useState(false);

    const HandleMessage = (resmess,colormess,id = "result_message") => {
        document.getElementById(id).style.color = colormess;
        document.getElementById(id).innerHTML = resmess;
        setSensetive(!sensetive);
    }

    const HandleCreate = async(event) => {
        event.preventDefault();



        let imagesrc = "1.jpg";
        const formData = new FormData();

        if(event.target.Photo.files.length){
            imagesrc = event.target.Photo.files[0].name;
            formData.append("myFile",event.target.Photo.files[0]);
        }

        formData.append("Title",event.target.Title.value);
        formData.append("Text",event.target.Text.value);
        formData.append("PhotoFileName",imagesrc);
        
        let body = formData;

        const [resmess, colormess] = await useCreate(urlPost,body);
        HandleMessage(resmess,colormess);
    }

    const handleClick = () =>{
        document.getElementById("Photo").click();
    }

    const handlePhotoChange = (event) =>{
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#PreviewPhoto')
                .attr('src', e.target.result)
        };

        reader.readAsDataURL(event.target.files[0]);
    }

    return(
        <div>
            <div class="container">
                <div class="row">
                    <div class="col-lg">
                        <section class="page-account-box">
                            <div class="col-lg-6 col-md-6 col-xs-12 mx-auto">
                                <div class="ds-userlogin">
                                    <a href="#" className="account-box-logo">Appdoon</a>
                                    <div class="account-box">
                                        <div class="account-box-headline">

                                            
                                            
                                            <NavLink to="/create_roadmap" class="login-ds">
                                                <span class="title">رودمپ</span>
                                                <span class="sub-title">قالب رودمپ</span>
                                            </NavLink>

                                            <NavLink to="/create_category" class="register-ds">
                                                <span class="title">دسته‌</span>
                                                <span class="sub-title">دسته‌بندی رودمپ</span>
                                            </NavLink>

                                            <NavLink to="/create_step" class="register-ds">
                                                <span class="title">قدم‌</span>
                                                <span class="sub-title">مراحل رودمپ</span>
                                            </NavLink>

                                            <NavLink to="/create_child_step" class="register-ds">
                                                <span class="title">محتوا‌</span>
                                                <span class="sub-title">محتوا‌ قدم‌ها</span>
                                            </NavLink>

                                            <NavLink to="/create_lesson" class="register-ds active">
                                                <span class="title">مقاله</span>
                                                <span class="sub-title">مقاله درونی</span>
                                            </NavLink>



                                        </div>
                                        <div class="Login-to-account mt-4">
                                            <div class="account-box-content">
                                                <h4>ساخت مقاله</h4>
                                                <form onSubmit={HandleCreate} action="#" class="form-account text-right">





                                                    <div class="form-account-title">
                                                        <label for="Title">نام مقاله</label>
                                                        <input dir='auto' type="text" class="number-email-input" name="Title"/>
                                                    </div>

                                                    
                                                    <div class="form-account-title">
                                                        <label for="Text">متن</label>
                                                        <textarea dir='auto' class="number-email-input" name="Text"/>
                                                    </div>

                                                    <div style={{textAlign:"right", width:"100%" ,marginBottom:"50px"}} class="form-account-title">
                                                        
                                                        <label style={{float:"right"}} for="Photo">بنر مقاله</label>
                                                        
                                                        <input dir='auto' id="Photo" name='Photo' onChange={handlePhotoChange} class="form-control" type="File" hidden="hidden" />
                                                        
                                                        <br/>
                                                        <button type="button" class="btn btn-primary" onClick={handleClick}>آپلود تصویر</button>
                                                        <img id="PreviewPhoto" class="img-thumbnail" src={process.env.REACT_APP_PHOTOPATH+"lesson/"+"1.jpg"} style={{float:"left" , width:"100px"}}/>
                                                    </div>



                                                    <div style={{marginTop : "-20px", marginBottom : "-20px"}}>
                                                        <p style={{fontSize : "14px"}} id="result_message"></p>
                                                    </div>

                                                    <div class="form-row-account">
                                                        <button variant="primary" type="submit" class="btn btn-primary btn-login">ساخت مقاله</button>
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

            <div class="progress-wrap">
                <svg class="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
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


export default CreateLesson;
