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

function EditHomeworkModal({ id, homework, sensetive, setSensetive }) {

    const [urlput, setUrlPost] = useState(process.env.REACT_APP_API + "homework/put/");

    const HandleMessage = (resmess,colormess,id = "result_message_edit_homework") => {
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
            Title:event.target.Title.value,
            MinScore:event.target.MinScore.value,
        });

        const [resmess, colormess] = await useUpdate(urlput+homework.Id,body,headers);
        HandleMessage(resmess,colormess);
    }


    useEffect(()=> {
        document.getElementById("TitleHomework").value = homework.Title;
        document.getElementById("MinScoreHomework").value = homework.MinScore;
    },[homework])
      
    return (
        <div style={{top: "1%"}} dir="rtl" class="modal fade" id={id} role="dialog">
            <div style={{marginBottom:"50px", maxWidth: "550px"}} class="modal-dialog">
            
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">ویرایش آزمون : {homework.Title}</h4>
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
                                                                <form onSubmit={HandleUpdate} id="editformhomework" action="#" class="form-account text-right">

                                                                    <div class="form-account-title">
                                                                        <label for="Title">عنوان آزمون</label>
                                                                        <input dir='auto' id="TitleHomework" type="text" class="number-email-input" name="Title"/>
                                                                    </div>

                                                                    
                                                                    <div class="form-account-title">
                                                                        <label for="MinScore">حداقل نمره قبولی (از 100)</label>
                                                                        <input dir='auto' id="MinScoreHomework" class="number-email-input" name="MinScore"/>
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
                            <p style={{fontSize : "14px", float:"right", marginTop:"8px", marginBottom:"-8px"}} id="result_message_edit_homework"></p>
                            <button style={{float:"left"}} type="submit" class="btn btn-primary" form="editformhomework">ویرایش آزمون</button>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    );
}

export default EditHomeworkModal;