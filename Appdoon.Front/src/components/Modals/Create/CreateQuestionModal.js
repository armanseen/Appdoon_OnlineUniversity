import React from "react";
import { NavLink } from "react-router-dom";

import { useState } from "react";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useFetch from '../../Common/useFetch';
import { Col, Form } from "react-bootstrap";
import useDelete from '../../Common/useDelete';
import useUpdate from '../../Common/useUpdate';
import $ from 'jquery';
import Select from 'react-select';


import chroma from 'chroma-js';

import { StylesConfig } from 'react-select';
import useCreate from "../../Common/useCreate";

function CreateQuestionModal({ id, homeworkId, sensetive, setSensetive }) {

    
    const [urlpost, setUrlPost] = useState(process.env.REACT_APP_API + "question/post/");

    const HandleMessage = (resmess,colormess,id = "result_message_create_question") => {
        document.getElementById(id).style.color = colormess;
        document.getElementById(id).innerHTML = resmess;
        setSensetive(!sensetive);
    }
    
    const HandleUpdate = async(event) => {
        event.preventDefault();
        
        
        let headers = {
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
        let body = JSON.stringify({
            QuestionDescription:event.target.QuestionDescription.value,
            Option1:event.target.Option1.value,
            Option2:event.target.Option2.value,
            Option3:event.target.Option3.value,
            Option4:event.target.Option4.value,
            Answer:event.target.CreateAnswer.value,
            HomeworkId:homeworkId
        });

        const [resmess, colormess] = await useCreate(urlpost,body,headers);
        HandleMessage(resmess,colormess);
    }

    useEffect(()=> {

    },[])


      
    return (
        <div style={{top: "1%"}} dir="rtl" class="modal fade" id={id} role="dialog">
            <div style={{marginBottom:"50px", maxWidth: "550px"}} class="modal-dialog">
            
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">ساخت سوال</h4>
                    </div>
                    <div style={{overflowY: "scroll", maxHeight:"500px"}} class="modal-body">
                        <div>
                            <div style={{marginTop:"-40px"}} class="container">
                                <div class="row">
                                    <div  class="col-lg">
                                        <section  class="page-account-box">
                                            <div>
                                                <div  class="ds-userlogin">
                                                    <div  class="account-box">
                                                        <div  class="Login-to-account mt-4">
                                                            <div style={{marginTop:"-20px", marginBottom:"40px"}} class="account-box-content">
                                                                <form onSubmit={HandleUpdate} id="createformquestion" action="#" class="form-account text-right">

                                                                    <div class="form-account-title">
                                                                        <label for="QuestionDescription">صورت سوال</label>
                                                                        <input dir='auto' id="CreateQuestionDescriptionQuestion" type="text" class="number-email-input" name="QuestionDescription"/>
                                                                    </div>

                                                                    
                                                                    <div class="form-account-title">
                                                                        <label for="Option1">گزینه اول</label>
                                                                        <input dir='auto' type="text" id="CreateOption1Question" class="number-email-input" name="Option1"/>
                                                                    </div>

                                                                    <div class="form-account-title">
                                                                        <label for="Option2">گزینه دوم</label>
                                                                        <input dir='auto' type="text" id="CreateOption2Question" class="number-email-input" name="Option2"/>
                                                                    </div>

                                                                    <div class="form-account-title">
                                                                        <label for="Option3">گزینه سوم</label>
                                                                        <input dir='auto' type="text" id="CreateOption3Question" class="number-email-input" name="Option3"/>
                                                                    </div>

                                                                    <div class="form-account-title">
                                                                        <label for="Option4">گزینه چهارم</label>
                                                                        <input dir='auto' type="text" id="CreateOption4Question" class="number-email-input" name="Option4"/>
                                                                    </div>


                                                                    <div class="form-account-title" style={{marginBottom:"-10px"}}>
                                                                        <label for="CreateAnswer">جواب درست</label>
                                                                    </div>

                                                                    <div style={{marginBottom:"-20px"}}>
                                                                        <input type="radio" id="Createop1" name="CreateAnswer" value="1" style={{marginLeft:"5px"}}/>
                                                                        <label for="Createop1" style={{marginLeft:"15px"}}>1</label>
                                                                        <input type="radio" id="Createop2" name="CreateAnswer" value="2" style={{marginLeft:"5px"}}/>
                                                                        <label for="Createop2" style={{marginLeft:"15px"}}>2</label>
                                                                        <input type="radio" id="Createop3" name="CreateAnswer" value="3" style={{marginLeft:"5px"}}/>
                                                                        <label for="Createop3" style={{marginLeft:"15px"}}>3</label>
                                                                        <input type="radio" id="Createop4" name="CreateAnswer" value="4" style={{marginLeft:"5px"}}/>
                                                                        <label for="Createop4" style={{marginLeft:"15px"}}>4</label>
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
                        </div>
                        
                    </div>
                    <div class="modal-footer">
                        <div style={{width:"100%"}}>
                            <p style={{fontSize : "14px", float:"right", marginTop:"8px", marginBottom:"-8px"}} id="result_message_create_question"></p>
                            <button style={{float:"left"}} type="submit" class="btn btn-success" form="createformquestion">ساخت سوال</button>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    );
}

export default CreateQuestionModal;