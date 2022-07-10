import React,{Component} from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import useFetch from '../Common/useFetch';

import DeleteCategoryModal from "../Modals/Delete/DeleteCategoryModal";
import EditCategoryModal from "../Modals/Edit/EditCategoryModal";
import CreateCategoryModal from "../Modals/Create/CreateCategoryModal";
import Pagination from "../Common/Pagination";
import CreateHomeworkModal from "../Modals/Create/CreateHomeworkModal";
import EditHomeworkModal from "../Modals/Edit/EditHomeworkModal";
import DeleteHomeworkModal from "../Modals/Delete/DeleteHomeworkModal";

const Queizzes = () => {

    const [sensetive, setSensetive] = useState(false);
    const [urlGet, setUrlGet] = useState(process.env.REACT_APP_API + "homework/get");
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [query_string_homeworks, set_query_string_homeworks] = useState(`${urlGet}?PageNumber=${pageNumber}&PageSize=${pageSize}`)
    const {data} = useFetch(query_string_homeworks,sensetive);
    const [homeworks, setHomeworks] = useState(null);
    const [rowCount, setRowCount] = useState(null);
    const [allPagesNumber, setAllPagesNumber] = useState(0)
    const [urlSearch, setUrlSearch] = useState(process.env.REACT_APP_API+'category/search');

    const handleSearch = () => {
        if(document.getElementById("search_box_info").value == ""){
            document.getElementById("search_box_info").dir = "rtl";
            setPageNumber(1);
            set_query_string_homeworks(`${urlGet}?PageNumber=${1}&PageSize=${pageSize}`);
        }
        else{
            document.getElementById("search_box_info").dir = "auto";
            //Query String
            
            let searched_text = document.getElementById("search_box_info").value;
            setPageNumber(1);
            const query_string_search = `${urlSearch}?SearchedText=${searched_text}&PageNumber=${1}&PageSize=${pageSize}`
            set_query_string_homeworks(query_string_search);

        }
    }

    useEffect(()=>{
        let new_all_pages_number = Math.max(Math.ceil(rowCount/pageSize),1);
        if(new_all_pages_number){
            setAllPagesNumber(new_all_pages_number);
            handlePageNumber(Math.min(pageNumber,new_all_pages_number))
        }
        //alert(allPagesNumber)
    },[pageSize,rowCount])

    useEffect(()=>{
        setHomeworks(data.Homeworks);
        setRowCount(data.RowCount)
    },[data])

    const handlePageNumber = (page_number) =>{
        if(document.getElementById("search_box_info").value != ""){
            setPageNumber(page_number);
            let searched_text = document.getElementById("search_box_info").value;
            set_query_string_homeworks(`${urlSearch}?SearchedText=${searched_text}&PageNumber=${page_number}&PageSize=${pageSize}`);
        }
        else{
            setPageNumber(page_number);
            set_query_string_homeworks(`${urlGet}?PageNumber=${page_number}&PageSize=${pageSize}`);
        }
    }


    const[id, setId] = useState(0);
    const {data : homework} = useFetch(urlGet+"/"+id,sensetive);

    const HandleId = ((id) => {
        setId(id);
        setSensetive(!sensetive);
    })

    const clear = () =>{
        document.getElementById("result_message_edit_category").innerHTML = null;
        document.getElementById("result_message_delete_category").innerHTML = null;
    }
    const clearCreate = () =>{
        document.getElementById("CreateTitleHomework").value = null;
        document.getElementById("CreateMinScoreHomework").value = null;
        document.getElementById("result_message_create_homework").innerHTML = null;
    }

    useEffect(() => {
        document.title = "بانک آزمون";
    }, []);

    return(
        <div>
                {<EditHomeworkModal id={"editModalHomework"} homework = {homework} sensetive = {sensetive} setSensetive = {setSensetive}/>}
                {<DeleteHomeworkModal id={"deleteModalHomework"} homework = {homework} sensetive = {sensetive} setSensetive = {setSensetive}/>}
                {<CreateHomeworkModal id={"createModalHomework"} sensetive = {sensetive} setSensetive = {setSensetive}/>}
                <div class="d-block">

                    <div class="container-main">

                    <div class="main-row">


                        <div style={{display:"flex", justifyContent:"center"}}>
                            <div class="info-page-faq" style={{marginTop:"-17px",marginBottom:"10px" ,width:"98%"}}>
                                <div id="content-bottom" style={{marginBottom:"-20px"}}>

                                    <div style={{marginTop:"-10px", marginBottom:"55px"}}>
                                        <h1>آزمون‌ها</h1>
                                    </div>
                                    

                                    <div style={{marginTop:"-15px", marginBottom:"20px"}}>
                                        <div style={{float:"left" , marginTop:"0px", marginLeft:"10px", marginBottom:"10px"}}>
                                            <button style={{marginLeft:"10px"}} href="#!" data-toggle="modal" data-target="#createModalHomework" variant="success" class="btn btn-success" onClick={() => {clearCreate();}}>افزودن آزمون</button>
                                        </div>

                                        <div style={{width:"25%", marginRight:"20px"}} class="input-group rounded">
                                            <input id="search_box_info" onChange={handleSearch} type="search" class="form-control rounded" placeholder="جستجو کنید ..." aria-label="Search" aria-describedby="search-addon" />
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                        {/*
                        <div style={{marginTop:"-20px",marginBottom:"-20px"}} id="breadcrumb">
                            <i class="mdi mdi-home"></i>
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item active" aria-current="page">دسته‌ها</li>
                                </ol>
                            </nav>
                        </div>
                        */}

                        <section class="cart-home">
                            <div class="post-item-cart d-block order-2">
                                
                                <div class="content-page">
                                    <div class="cart-form">
                                        
                                        <table class="cart table table-borderless">
                                            <thead>
                                                <tr>
                                                    <th style={{width:"5%"}} scope="col" class="product-cart-name">شماره</th>
                                                    <th style={{width:"20%"}} scope="col" class="product-cart-name">نام آزمون‌ها</th>
                                                    <th style={{width:"58%"}} scope="col" class="product-cart-name">حداقل نمره قبولی</th>
                                                    <th style={{textAlign:"center", width: "6%"} } scope="col" class="product-cart-Total">ویرایش</th>
                                                    <th style={{textAlign:"center", width: "5%"} } scope="col" class="product-cart-Total">حذف</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {homeworks &&
                                                    homeworks.map((data,idx) => (
                                                        <tr>
                                                            <td style={{wordWrap:"break-word" ,width:"5%"}} class="product-cart-price">
                                                                <span>
                                                                    {idx+1}
                                                                </span>
                                                            </td>

                                                            <td style={{wordWrap:"break-word" ,width:"20%" ,paddingLeft:"25px"}} class="product-cart-price">
                                                            <NavLink to={`/Queiz/${data.Id}`}>
                                                                {data.Title}
                                                            </NavLink>
                                                            </td>

                                                            <td style={{wordWrap:"break-word" ,width:"58%" ,paddingLeft:"25px"}} class="product-cart-price">
                                                            <span>
                                                                {data.MinScore}
                                                            </span>
                                                            </td>

                                                            <td style={{textAlign:"center" ,width:"6%"}}  class="product-cart-quantity">
                                                                <button href="#!" data-toggle="modal" data-target="#editModalHomework" variant="primary" class="btn btn-primary" onClick={() => {HandleId(data.Id); clear();}}><i class="far fa-edit"></i></button>
                                                            </td>
                                                            <td style={{textAlign:"center" ,width:"5%"}}  class="product-cart-quantity">
                                                                <button href="#!" data-toggle="modal" data-target="#deleteModalHomework" variant="primary" class="btn btn-danger" onClick={() => {HandleId(data.Id); clear();}}><i class="far fa-trash-alt"></i></button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <Pagination handlePageNumber={handlePageNumber} pageNumber={pageNumber} allPagesNumber={allPagesNumber}/>
                    </div>
                    
                </div>
                
                
            </div>

            


            
            {/*
            <div class="progress-wrap">
                <svg class="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
                    <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
                </svg>
            </div>

            <div class="P-loader">
                <div class="P-loader-content">
                    <div class="logo-loader">
                        <img src="assets/images/logo.png" alt="logo">
                    </div>
                    <div class="pic-loader text-center">
                        <img src="assets/images/three-dots.svg" width="50" alt="">
                    </div>
                </div>
            </div>
            */}

            
        </div>
    );
}

export default Queizzes;