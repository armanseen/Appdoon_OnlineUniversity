import React,{Component} from "react";
//import{Button,Form} from 'react-bootstrap';
import { useEffect } from "react";

const AboutUs = () => {

    useEffect(() => {
        document.title = "درباره ما";
    }, []);

    return(
        <div class="container-main">
            <div class="col-12">
                <div id="content">
                    <div class="about">
                        <div class="about-us-head">
                            <div class="about-us-head-inner">
                                <h1>1</h1>
                                <div class="about-us-head-content mt-4 text-right">
                                    <p>
                                        2
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="page-content-about">
                            <div class="page-content-about-paragraph">
                                <p>
                                    3
                                </p>
                            </div>
                            <div class="page-content-about-paragraph">
                                <p>
                                    4
                                </p>
                            </div>
                            <div class="page-content-about-paragraph">
                                <p>
                                    5
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;