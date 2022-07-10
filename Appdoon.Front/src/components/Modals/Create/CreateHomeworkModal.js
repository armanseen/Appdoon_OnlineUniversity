import React from "react";
import { NavLink } from "react-router-dom";

import { useState } from "react";
import useCreate from "../../Common/useCreate";

function CreateHomeworkModal({ id, sensetive, setSensetive }) {

    const [urlpost, setUrlPost] = useState(process.env.REACT_APP_API + "homework/post/");

    const HandleMessage = (resmess,colormess,id = "result_message_create_homework") => {
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

        const [resmess, colormess] = await useCreate(urlpost,body,headers);
        HandleMessage(resmess,colormess);
    }

    return (
        <div style={{top: "1%"}} dir="rtl" class="modal fade" id={id} role="dialog">
            <div style={{marginBottom:"50px", maxWidth: "550px"}} class="modal-dialog">
            
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">ساخت آزمون</h4>
                    </div>
                    <div style={{overflowY: "scroll", maxHeight:"500px"}} class="modal-body">
                        <div>
                            <div style={{marginTop:"-50px"}} class="container">
                                <div class="row">
                                    <div  class="col-lg">
                                        <section  class="page-account-box">
                                            <div>
                                                <div  class="ds-userlogin">
                                                    <div  class="account-box">
                                                        <div  class="Login-to-account mt-4">
                                                            <div style={{marginTop:"-20px", marginBottom:"40px"}} class="account-box-content">
                                                                <form onSubmit={HandleUpdate} id="createformhomework" action="#" class="form-account text-right">

                                                                    <div class="form-account-title">
                                                                        <label for="Title">عنوان آزمون</label>
                                                                        <input dir='auto' id="CreateTitleHomework" type="text" class="number-email-input" name="Title"/>
                                                                    </div>

                                                                    
                                                                    <div class="form-account-title">
                                                                        <label for="MinScore">حداقل نمره قبولی (از 100)</label>
                                                                        <input dir='auto' id="CreateMinScoreHomework" class="number-email-input" name="MinScore"/>
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
                            <p style={{fontSize : "14px", float:"right", marginTop:"8px", marginBottom:"-8px"}} id="result_message_create_homework"></p>
                            <button style={{float:"left"}} type="submit" class="btn btn-success" form="createformhomework">ساخت آزمون</button>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    );
}

export default CreateHomeworkModal;