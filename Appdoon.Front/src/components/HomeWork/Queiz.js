import {NavLink, useNavigate, useParams} from 'react-router-dom';
import { useEffect, useState } from "react";
import useFetch from '../Common/useFetch';
import { Col, Form } from "react-bootstrap";
import "../../Modular_Css/Questions.css";
import Roadmap from '../Roadmap/Roadmap';
import Answer from './Answer';
import React, {Component} from 'react';
import EditHomeworkModal from '../Modals/Edit/EditHomeworkModal';
import DeleteHomeworkModal from '../Modals/Delete/DeleteHomeworkModal';
import CreateQuestionModal from '../Modals/Create/CreateQuestionModal';
import EditQuestionModal from '../Modals/Edit/EditQuestionModal';
import DeleteQuestionModal from '../Modals/Delete/DeleteQuestionModal';


const Queiz = () => {
    const {id} = useParams();

    const [globalStep, setGlobalStep] = useState(1);

    const navigate = useNavigate();

    const [sensetive, setSensetive] = useState(false);

    const [stepIndex, setStepIndex] = useState(0);

    const [urlHomework, setUrlHomework] = useState(process.env.REACT_APP_API + 'homework/Get/'+id);
    const {data : homework} = useFetch(urlHomework, sensetive);

    const[state, setState] = useState({
        quiestions: [
            ""
        ],
        answers: [
            {}
        ],
        UserAnswers: [
            ""
        ],
    });
    
    useEffect (() => {
        if(homework.Questions){
            const quiestions = [];
            const answers = [];
            const UserAnswers = [];
    
            for(var i = 0; i < homework.Questions.length; i++){
                quiestions.push(homework.Questions[i].QuestionDescription);
                answers.push({
                    1: homework.Questions[i].Option1,
                    2: homework.Questions[i].Option2,
                    3: homework.Questions[i].Option3,
                    4: homework.Questions[i].Option4
                });
                UserAnswers.push('0');
            }           

            setState({
                quiestions : quiestions,
                answers : answers,
                UserAnswers : UserAnswers,
            })
        }
    },[homework])

    // the method that checks the correct answer
    const checkAnswer = (answer,idx) => {
        const { quiestions, answers, UserAnswers, step, score } = state;
        if(UserAnswers[idx] === answer){
            UserAnswers[idx] = '0';
        }
        else{
            UserAnswers[idx] = answer;
        }
        
        setState({
            UserAnswers : UserAnswers, 
            quiestions : quiestions,
            answers : answers,
        });
    }

    const clear = () =>{
        document.getElementById("TitleHomework").value = homework.Title;
        document.getElementById("MinScoreHomework").value = homework.MinScore;
        document.getElementById("result_message_edit_homework").innerHTML = "";
        document.getElementById("result_message_delete_homework").innerHTML = "";
        //setSensetive(!sensetive);
    }

    const clearQuestion = () =>{
        document.getElementById("CreateQuestionDescriptionQuestion").value = null;
        document.getElementById("CreateOption1Question").value = null;
        document.getElementById("CreateOption2Question").value = null;
        document.getElementById("CreateOption3Question").value = null;
        document.getElementById("CreateOption4Question").value = null;
        document.getElementById("Createop1").checked = true;
        document.getElementById("result_message_create_question").innerHTML = "";
        //setSensetive(!sensetive);
    }

    

    const clearQuestionUpdate = (idx) =>{
        document.getElementById("UpdateQuestionDescriptionQuestion").value = homework.Questions[idx].QuestionDescription;
        document.getElementById("UpdateOption1Question").value = homework.Questions[idx].Option1;
        document.getElementById("UpdateOption2Question").value = homework.Questions[idx].Option2;
        document.getElementById("UpdateOption3Question").value = homework.Questions[idx].Option3;
        document.getElementById("UpdateOption4Question").value = homework.Questions[idx].Option4;
        document.getElementById("Updateop"+homework.Questions[idx].Answer).checked = true;
        document.getElementById("result_message_edit_question").innerHTML = "";
        document.getElementById("result_message_delete_question").innerHTML = "";
        //setSensetive(!sensetive);
    }

    const HandleSubmit = () => {

    }

    let { quiestions, answers, UserAnswers } = state;
    
    return(
        <div>
            {<EditHomeworkModal id={"editModalHomework"} homework = {homework} sensetive = {sensetive} setSensetive = {setSensetive}/>}
            {<DeleteHomeworkModal id={"deleteModalHomework"} homework = {homework} sensetive = {sensetive} setSensetive = {setSensetive}/>}
            {<CreateQuestionModal id={"createModalQuestion"} homeworkId = {homework.Id} sensetive = {sensetive} setSensetive = {setSensetive}/>}

            {homework.Questions && <EditQuestionModal id={"editModalQuestion"+stepIndex} question = {stepIndex != -1 && homework.Questions[stepIndex]} sensetive = {sensetive} setSensetive = {setSensetive}/>}
            {homework.Questions && <DeleteQuestionModal id={"deleteModalQuestion"+stepIndex} question = {stepIndex != -1 && homework.Questions[stepIndex]} sensetive = {sensetive} setSensetive = {setSensetive} setStepIndex={setStepIndex}/>}

            <div class="post-item-cart d-block order-2" style={{marginBottom:"10px"}}>
                <div class="content-page" style={{marginTop:"15px"}}>
                    <div class="cart-form">
                    
                        <div className="Content">
                            <h1>{homework.Title}</h1>


                            <div>
                                <div style={{float:"right" , marginLeft:"0px"}}>
                                    <h6>حداقل نمره قبولی :  %{homework.MinScore}</h6>
                                </div>
                            
                                <div style={{float:"left" , marginTop:"-10px", marginLeft:"0px"}}>
                    
                                    <button style={{marginLeft:"10px"}} href="#!" data-toggle="modal" data-target="#createModalQuestion" variant="success" class="btn btn-success" onClick={() => {clearQuestion();}}><i class="far fa-plus-square"></i></button>
                                    <button style={{marginLeft:"10px"}} href="#!" data-toggle="modal" data-target="#editModalHomework" variant="primary" class="btn btn-primary" onClick={() => {clear();}}><i class="far fa-edit"></i></button>
                                    <button href="#!" data-toggle="modal" data-target="#deleteModalHomework" variant="primary" class="btn btn-danger" onClick={() => {clear();}}><i class="far fa-trash-alt"></i></button>

                                </div>
                            </div>


                        </div>



                    </div>
                </div>
            </div>


            {homework.Questions && homework.Questions.map((dd, idx) => (
                <div class="post-item-cart d-block order-2"  style={{marginBottom:"15px"}}>
                    <div class="content-page">
                        <div class="cart-form">
                        
                            <div className="Content">

                                {stepIndex <= quiestions.length ?
                                    (<>

                                        <div className="questionBox">
                                            <p className="pp">{quiestions[idx]}</p>
                                        </div>

                                        <ul disabled = {0 ? true : false} className="Answers">
                                            {answers[idx] && Object.keys(answers[idx]).map((qAnswer, i) => (
                                                <li className = {qAnswer === UserAnswers[idx] && 'correct'}
                                                onClick={() => checkAnswer(qAnswer,idx)}
                                                key={qAnswer}>
                                                     {answers[idx][qAnswer]}
                                                </li>
                                            ))
                                            }
                                        </ul>

                                    </>) : (
                                        <div className="finalPage">
                                            <h1>تمرین به پایان رسید</h1>
                                            <p>نمره ی شما: {0} از {quiestions.length}</p>
                                        </div>
                                    )

                                }
                            </div>

                            <div style={{display:"flex", justifyContent:"center", marginBottom:"5px"}}>
                                {homework.Questions && <button style={{marginLeft:"5px"}} href="#!" data-toggle="modal" data-target={"#editModalQuestion"+stepIndex} variant="primary" class="btn btn-primary" onClick={() => {clearQuestionUpdate(idx); setStepIndex(idx);}}><i class="far fa-edit"></i></button>}
                                {homework.Questions && <button href="#!" style={{marginRight:"5px"}} data-toggle="modal" data-target={"#deleteModalQuestion"+stepIndex} variant="primary" class="btn btn-danger" onClick={() => {clearQuestionUpdate(idx); setStepIndex(idx);}}><i class="far fa-trash-alt"></i></button>}
                            </div>

                        </div>
                    </div>
                </div>
            ))
            }
                <div class="post-item-cart d-block order-2"  style={{marginBottom:"15px", display:"flex", justifyContent:"center"}}>
                    <div class="content-page">
                        <div class="cart-form">
                        
                            <div className="Content" style={{display:"flex", justifyContent:"center"}}>
                                <button href="#!" style={{marginRight:"5px"}} variant="primary" class="btn btn-secondary" onClick={{HandleSubmit}}>ارسال نهایی</button>
                            </div>

                        </div>
                    </div>
                </div>

        </div>
    );
}

export default Queiz;