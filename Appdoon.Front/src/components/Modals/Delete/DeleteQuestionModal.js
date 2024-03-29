import React from "react";
import { NavLink } from "react-router-dom";

import { useState } from "react";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useFetch from '../../Common/useFetch';
import { Col, Form } from "react-bootstrap";
import useDelete from '../../Common/useDelete';
import useUpdate from '../../Common/useUpdate';




function DeleteQuestionModal({ id, question , sensetive ,setSensetive, setStepIndex}) {

    const [url, setUrl] = useState(process.env.REACT_APP_API + "question/delete/");

    const HandleMessage = (resmess,colormess,id = "result_message_delete_question") => {
        document.getElementById(id).style.color = colormess;
        document.getElementById(id).innerHTML = resmess;
        setSensetive(!sensetive);
    }

    const HandleDelete = async() => {
        const [resmess, colormess] = await useDelete(url+question.Id);
        HandleMessage(resmess,colormess);
        setStepIndex(-1);
    }


    return (
        <div style={{top: "1%"}} dir="rtl" class="modal fade" id={id} role="dialog">
            <div style={{marginBottom:"50px", maxWidth: "550px"}} class="modal-dialog">
            
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">حذف سوال : {question.QuestionDescription}</h4>
                    </div>
                    <div class="modal-body">
                        <p>آیا مطمئن هستید که می‌خواهید این سوال را حذف کنید؟</p>
                        
                    </div>
                    <div class="modal-footer">
                        <div style={{width:"100%"}}>
                            <p style={{fontSize : "14px", float:"right", marginTop:"8px", marginBottom:"-8px"}} id="result_message_delete_question"></p>
                            <button style={{float:"left"}} type="button" class="btn btn-danger" onClick={() => HandleDelete()}>حذف سوال</button>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    );
}

export default DeleteQuestionModal;